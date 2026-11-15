"use client";

import { useState } from "react";

export type SendStatus = "idle" | "sending" | "sent" | "error";

/* Posts a name / email / message form to /api/send */
export function useContactForm() {
  const [status, setStatus] = useState<SendStatus>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return { status, onSubmit };
}
