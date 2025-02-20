import { createClient } from "contentful-management";
import { BREVO_API_KEY } from "@/lib/constants";
// Validate environment variables
if (
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.BREVO_API_KEY
) {
  console.log("Missing required environment variables");
  throw new Error("Required environment variables are not set");
}

console.log("Creating Contentful client");
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function sendEmail(data) {
  try {
    // Send confirmation to user
    const userResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Clubhouse",
          email: "noreply@theclubhouse.com",
        },
        to: [
          {
            email: data.email,
            name: data.name,
          },
        ],
        subject: "Welcome to Clubhouse - We've Received Your Application",
        htmlContent: `
          <h1>Thank you for your interest in Clubhouse!</h1>
          <p>Dear ${data.name},</p>
          <p>We've received your application and our team will review it shortly. Here's what you shared with us:</p>
          <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Phone: ${data.phone}</li>
            ${data.message ? `<li>Message: ${data.message}</li>` : ""}
          </ul>
          <p>What happens next?</p>
          <ul>
            <li>Our team will review your application within 24 hours</li>
            <li>We'll contact you to discuss membership options</li>
            <li>You'll receive access to our exclusive member portal</li>
          </ul>
          <p>If you have any questions in the meantime, feel free to reach out to us.</p>
          <p>Best regards,<br>The Clubhouse Team</p>
        `,
      }),
    });

    // Send notification to admin
    const adminResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Clubhouse",
          email: "noreply@theclubhouse.com",
        },
        to: [
          {
            email: "karthik@profici.co.uk",
            name: "Karthik",
          },
        ],
        subject: "New Clubhouse Application Received",
        htmlContent: `
          <h2>New Application Details</h2>
          <p>A new application has been received from the Clubhouse website.</p>
          <h3>Applicant Details:</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Field</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Value</th>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Name</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.name
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Email</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.email
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Phone</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.phone
              }</td>
            </tr>
            ${
              data.message
                ? `
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Message</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${data.message}</td>
            </tr>
            `
                : ""
            }
          </table>
          <p>This application has been automatically saved to Contentful.</p>
          <p>Please review and take appropriate action.</p>
        `,
      }),
    });

    if (!userResponse.ok || !adminResponse.ok) {
      throw new Error("Failed to send one or more emails");
    }

    return {
      userEmail: await userResponse.json(),
      adminEmail: await adminResponse.json(),
    };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    console.log("Starting POST request handler");

    // Validate request
    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      return Response.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const data = await request.json();
    console.log("Received form data:", data);

    // Validate required fields
    if (!data.name?.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    if (!data.email?.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    if (!data.phone) {
      return Response.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Clean phone number - remove any non-digits and convert to integer
    const cleanPhone = parseInt(data.phone.replace(/\D/g, ""), 10);

    // Validate phone number is a valid integer
    if (isNaN(cleanPhone)) {
      return Response.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Get the space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    console.log("Space:", space);
    const environment = await space.getEnvironment("master");
    // Create the entry
    const entry = await environment.createEntry("contactForm", {
      fields: {
        name: {
          "en-US": data.name.trim(),
        },
        email: {
          "en-US": data.email.trim().toLowerCase(),
        },
        phone: {
          "en-US": cleanPhone,
        },
        message: {
          "en-US": data.message
            ? {
                nodeType: "document",
                data: {},
                content: [
                  {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                      {
                        nodeType: "text",
                        value: data.message.trim(),
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                ],
              }
            : undefined,
        },
      },
    });

    await entry.publish();

    // Send confirmation email
    await sendEmail(data);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Submission Error:", error);

    if (error.name === "AccessTokenInvalid") {
      return Response.json({ error: "Authentication failed" }, { status: 401 });
    }

    return Response.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
