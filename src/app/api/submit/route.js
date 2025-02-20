import { createClient } from "contentful-management";

// Validate environment variables
if (
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_SPACE_ID
) {
  console.log("Missing required environment variables");
  throw new Error("Required environment variables are not set");
}

console.log("Creating Contentful client");
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

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
    return Response.json({ success: true });
  } catch (error) {
    console.error("Submission Error:", error);

    if (error.name === "AccessTokenInvalid") {
      return Response.json({ error: "Authentication failed" }, { status: 401 });
    }

    return Response.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
