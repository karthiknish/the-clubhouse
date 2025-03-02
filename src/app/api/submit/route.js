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

async function uploadToContentful(environment, file, title, description) {
  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Create upload
    const upload = await environment.createUpload({
      file: buffer,
    });

    // Create the asset with the upload
    const asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": title,
        },
        description: {
          "en-US": description,
        },
        file: {
          "en-US": {
            contentType: file.type,
            fileName: file.name,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: upload.sys.id,
              },
            },
          },
        },
      },
    });

    // Process and publish the asset
    const processedAsset = await asset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();

    return publishedAsset.sys.id;
  } catch (error) {
    console.error("Asset upload error:", error);
    throw error;
  }
}

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
          email: "noreply@theclubhouse.co.uk",
        },
        to: [
          {
            email: data.email,
            name: data.firstName,
          },
        ],
        subject: "Welcome to Clubhouse - We've Received Your Application",
        htmlContent: `
          <h1>Thank you for your interest in Clubhouse!</h1>
          <p>Dear ${data.firstName},</p>
          <p>We've received your application and our team will review it shortly. Here's what you shared with us:</p>
      
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
          email: "noreply@theclubhouse.co.uk",
        },
        to: [
          {
            email: "support@theclubhouse.co.uk",
            name: "Support",
          },
          {
            email: "mark@theclubhouse.co.uk",
            name: "Mark",
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
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>First Name</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.firstName
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Last Name</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.lastName
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
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Company Name</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.companyName
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Company Number</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.companyNumber
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Company Address</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.companyAddress
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Company Website</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;">${
                data.companyWebsite
              }</td>
            </tr>
            ${
              data.proofOfIdUrl
                ? `
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Proof of ID</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><a href="${data.proofOfIdUrl}" target="_blank">View Document</a></td>
            </tr>
            `
                : ""
            }
            ${
              data.proofOfAddressUrl
                ? `
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><strong>Proof of Address</strong></td>
              <td style="border: 1px solid #dee2e6; padding: 12px;"><a href="${data.proofOfAddressUrl}" target="_blank">View Document</a></td>
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

    // Check if the request is multipart/form-data
    const contentType = request.headers.get("Content-Type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return Response.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    // Parse the FormData
    const formData = await request.formData();
    console.log("Received form data");

    // Extract form fields
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const companyName = formData.get("companyName");
    const companyNumber = formData.get("companyNumber");
    const companyAddress = formData.get("companyAddress");
    const companyWebsite = formData.get("companyWebsite");
    const proofOfIdFile = formData.get("proofofID");
    const proofOfAddressFile = formData.get("proofofAddress");

    // Validate required fields
    if (!firstName?.trim()) {
      return Response.json(
        { error: "First Name is required" },
        { status: 400 }
      );
    }
    if (!lastName?.trim()) {
      return Response.json({ error: "Last Name is required" }, { status: 400 });
    }
    if (!email?.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    if (!phone) {
      return Response.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Clean phone number - remove any non-digits and convert to integer
    const cleanPhone = parseInt(phone.toString().replace(/\D/g, ""), 10);

    // Validate phone number is a valid integer
    if (isNaN(cleanPhone)) {
      return Response.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Validate and parse company number
    let companyNumberInt;
    try {
      companyNumberInt = parseInt(companyNumber?.trim() || "0", 10);
      if (
        isNaN(companyNumberInt) ||
        companyNumberInt < 0 ||
        companyNumberInt > 2147483647
      ) {
        return Response.json(
          { error: "Company registration number is invalid" },
          { status: 400 }
        );
      }
    } catch (err) {
      return Response.json(
        { error: "Company registration number must be a valid number" },
        { status: 400 }
      );
    }

    // Format company website to ensure it has https://
    let formattedWebsite = companyWebsite?.trim() || "";
    if (formattedWebsite && !formattedWebsite.startsWith("http")) {
      formattedWebsite = `https://${formattedWebsite}`;
    }

    // Get the space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    console.log("Space:", space);
    const environment = await space.getEnvironment("master");
    let proofOfIdAssetId = null;
    let proofOfAddressAssetId = null;
    let proofOfIdUrl = null;
    let proofOfAddressUrl = null;

    if (proofOfIdFile && proofOfIdFile instanceof File) {
      console.log("Uploading proof of ID document");
      proofOfIdAssetId = await uploadToContentful(
        environment,
        proofOfIdFile,
        `ID Document - ${firstName} ${lastName}`,
        "Proof of identification document"
      );
      console.log("Proof of ID uploaded, asset ID:", proofOfIdAssetId);

      // Get the asset URL
      if (proofOfIdAssetId) {
        const asset = await environment.getAsset(proofOfIdAssetId);
        proofOfIdUrl = asset.fields.file["en-US"].url;
        // Make sure URL is absolute
        if (proofOfIdUrl && !proofOfIdUrl.startsWith("http")) {
          proofOfIdUrl = `https:${proofOfIdUrl}`;
        }
      }
    }

    if (proofOfAddressFile && proofOfAddressFile instanceof File) {
      console.log("Uploading proof of address document");
      proofOfAddressAssetId = await uploadToContentful(
        environment,
        proofOfAddressFile,
        `Address Document - ${firstName} ${lastName}`,
        "Proof of address document"
      );
      console.log(
        "Proof of address uploaded, asset ID:",
        proofOfAddressAssetId
      );

      // Get the asset URL
      if (proofOfAddressAssetId) {
        const asset = await environment.getAsset(proofOfAddressAssetId);
        proofOfAddressUrl = asset.fields.file["en-US"].url;
        // Make sure URL is absolute
        if (proofOfAddressUrl && !proofOfAddressUrl.startsWith("http")) {
          proofOfAddressUrl = `https:${proofOfAddressUrl}`;
        }
      }
    }

    // Create the entry
    const entry = await environment.createEntry("contactForm", {
      fields: {
        firstName: {
          "en-US": firstName.trim(),
        },
        lastName: {
          "en-US": lastName.trim(),
        },
        email: {
          "en-US": email.trim().toLowerCase(),
        },
        phone: {
          "en-US": cleanPhone,
        },
        companyName: {
          "en-US": companyName?.trim() || "",
        },
        companyNumber: {
          "en-US": companyNumberInt,
        },
        companyAddress: {
          "en-US": companyAddress?.trim() || "",
        },
        companyWebsite: {
          "en-US": formattedWebsite,
        },
        proofofId: {
          "en-US": proofOfIdAssetId
            ? {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: proofOfIdAssetId,
                },
              }
            : null,
        },
        proofofAddress: {
          "en-US": proofOfAddressAssetId
            ? {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: proofOfAddressAssetId,
                },
              }
            : null,
        },
      },
    });

    await entry.publish();

    // Send confirmation email
    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      companyName: companyName?.trim() || "",
      companyNumber: companyNumberInt,
      companyAddress: companyAddress?.trim() || "",
      companyWebsite: formattedWebsite,
      proofOfIdUrl: proofOfIdUrl,
      proofOfAddressUrl: proofOfAddressUrl,
    };

    await sendEmail(userData);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Submission Error:", error);

    if (error.name === "AccessTokenInvalid") {
      return Response.json({ error: "Authentication failed" }, { status: 401 });
    }

    if (error.name === "RateLimitExceeded") {
      return Response.json(
        { error: "Too many requests, please try again later" },
        { status: 429 }
      );
    }

    if (error.name === "ValidationFailed") {
      // Check for specific validation errors
      if (
        error.details?.errors?.some((e) => e.path?.includes("companyNumber"))
      ) {
        return Response.json(
          { error: "Company registration number must be a valid number" },
          { status: 400 }
        );
      }
      return Response.json(
        { error: "Form validation failed. Please check your inputs." },
        { status: 400 }
      );
    }

    if (error.message && error.message.includes("email")) {
      return Response.json(
        { error: "Failed to send confirmation email" },
        { status: 500 }
      );
    }

    if (error.message && error.message.includes("upload")) {
      return Response.json(
        { error: "Failed to upload documents" },
        { status: 500 }
      );
    }

    if (error.message && error.message.includes("asset")) {
      return Response.json(
        { error: "Invalid document format" },
        { status: 400 }
      );
    }

    if (error.message && error.message.includes("contentful")) {
      return Response.json(
        { error: "Failed to save your application" },
        { status: 500 }
      );
    }

    return Response.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
