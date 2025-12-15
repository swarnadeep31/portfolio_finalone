"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./StackedSection";

/* --------------------------------------------
   Floating Toast (Modal Style)
-------------------------------------------- */
function FloatingToast({
  show,
  title,
  description,
  type = "success",
  onClose,
}: {
  show: boolean;
  title: string;
  description: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 left-1/2 z-999 w-[90%] max-w-md -translate-x-1/2 rounded-xl border bg-white px-5 py-4 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className={cn(
              "mt-1 text-lg",
              type === "success" ? "text-green-600" : "text-red-600"
            )}>
              {type === "success" ? "✅" : "❌"}
            </span>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------
   Contact Section
-------------------------------------------- */
export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: "success" | "error";
  }>({
    show: false,
    title: "",
    description: "",
    type: "success",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setToast({
        show: true,
        title: "Message sent",
        description: "Thanks for reaching out. I’ll reply shortly.",
        type: "success",
      });

      form.reset();
    } catch {
      setToast({
        show: true,
        title: "Something went wrong",
        description: "Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 3000);
    }
  };

  return (
    <SectionWrapper id="contact">
      {/* Floating Toast */}
      <FloatingToast
        show={toast.show}
        title={toast.title}
        description={toast.description}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />

      <div className="relative bg-[#f7f3ee] py-32">
        <div className="mx-auto max-w-3xl px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2b2118]">
              Let’s Connect
            </h2>
            <p className="mt-4 text-[#6b5a4a]">
              Open to opportunities, collaborations, and meaningful conversations.
            </p>
          </motion.div>

          {/* Contact Info */}
          <div className="mb-20 space-y-8">
            <ContactItem
              icon={<Mail className="h-5 w-5 text-[#5c4632]" />}
              label="Email"
              value="swarnadeeproy35@gmail.com"
              href="mailto:swarnadeeproy35@gmail.com"
            />
            <ContactItem
              icon={<Phone className="h-5 w-5 text-[#5c4632]" />}
              label="Phone"
              value="+91 74397 32996"
              href="tel:+917439732996"
            />
            <ContactItem
              icon={<MapPin className="h-5 w-5 text-[#5c4632]" />}
              label="Location"
              value="Kolkata, India"
            />
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <input name="name" required placeholder="Your name" className="w-full rounded-lg border px-4 py-3" />
            <input type="email" name="email" required placeholder="Email address" className="w-full rounded-lg border px-4 py-3" />
            <textarea name="message" rows={4} required placeholder="Your message" className="w-full rounded-lg border px-4 py-3" />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg bg-[#2b2118] px-4 py-3 text-sm font-semibold text-white transition",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* --------------------------------------------
   Contact Item
-------------------------------------------- */
function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrapper = href ? Link : "div";

  return (
    <motion.div whileHover={{ x: 6 }}>
      <Wrapper
        href={href as any}
        className="flex items-center gap-4 transition hover:text-[#2b2118]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border">
          {icon}
        </div>
        <div>
          <p className="text-xs">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </Wrapper>
    </motion.div>
  );
}
