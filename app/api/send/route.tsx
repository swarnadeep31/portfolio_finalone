import { Resend } from "resend";
import React from "react";

// ✅ Email template
const EmailTemplate: React.FC<{
  firstName: string;
  email?: string;
  message?: string;
}> = ({ firstName, email, message }) => (
  <div
    style={{
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    }}
  >
    <h1 style={{ marginBottom: 8 }}>Hello, {firstName}!</h1>
    <p style={{ marginBottom: 12 }}>
      You received a new message from your website contact form.
    </p>

    {email && (
      <div style={{ marginBottom: 8 }}>
        <strong>From:</strong> {firstName} &lt;{email}&gt;
      </div>
    )}

    {message && (
      <div>
        <strong>Message:</strong>
        <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{message}</div>
      </div>
    )}

    <hr style={{ margin: "12px 0" }} />
    <small>This email was sent from your website contact form.</small>
  </div>
);

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM =
  process.env.FROM_EMAIL?.trim() || "Your Site <no-reply@yourdomain.com>";
const TO = process.env.TO_EMAIL?.split(",").map((t) => t.trim()) || [
  "your-email@example.com",
];

// ✅ Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const reactBody = React.createElement(EmailTemplate, {
      firstName: name,
      email,
      message,
    });

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New contact form message from ${name}`,
      react: reactBody,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(JSON.stringify({ error: "Email failed to send" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err: any) {
    console.error("Server Error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        details: err?.message || "Unknown error",
      }),
      { status: 500 }
    );
  }
}
