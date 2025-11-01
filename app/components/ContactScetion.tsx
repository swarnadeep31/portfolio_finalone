"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Feel free to reach out using
          the form below or via email.
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side — Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Let’s <span className="text-primary">Talk</span>
              </h3>
              <p className="text-muted-foreground">
                You can reach me directly through any of the options below:
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <Link
                href="mailto:Swarnadeeproy35@gmail.com"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300 warp-break-words"
              >
                Swarnadeeproy35@gmail.com
              </Link>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <Link
                href="tel:+917439732996"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                +91 74397 32996
              </Link>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                Kolkata, WB, India
              </p>
            </div>
          </div>

          {/* Right Side — Form */}
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Your Name..."
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
