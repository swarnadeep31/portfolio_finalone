import { Resend } from "resend";
import React from "react";
import { NextResponse } from "next/server";

/* --------------------------------------------
   Email Template
-------------------------------------------- */
const EmailTemplate: React.FC<{
  firstName: string;
  email: string;
  message: string;
}> = ({ firstName, email, message }) => (
  <div
    style={{
      fontFamily:
        "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
      lineHeight: 1.6,
    }}>
    <h2>Hello 👋</h2>

    <p>You received a new message from your website contact form.</p>

    <p>
      <strong>Name:</strong> {firstName}
      <br />
      <strong>Email:</strong> {email}
    </p>

    <p>
      <strong>Message:</strong>
    </p>

    <div
      style={{
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        whiteSpace: "pre-wrap",
      }}>
      {message}
    </div>

    <hr style={{ margin: "20px 0" }} />

    <small>This email was sent from your portfolio website.</small>
  </div>
);

/* --------------------------------------------
   Resend Setup
-------------------------------------------- */
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const TO = process.env.TO_EMAIL?.split(",").map((e) => e.trim()) || [
  "your-email@example.com",
];

/* --------------------------------------------
   POST Handler
-------------------------------------------- */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New contact message from ${name}`,
      react: <EmailTemplate firstName={name} email={email} message={message} />,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message },
      { status: 500 }
    );
  }
}
