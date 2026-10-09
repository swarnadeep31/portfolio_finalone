"use client";

import { ArrowRight, ArrowUpRight, Check, CircleAlert, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./StackedSection";
import Reveal from "./Reveal";
import { socials } from "../lib/socials";

/* --------------------------------------------
   Floating Toast
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
          role="status"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-20 left-1/2 z-[80] w-[90%] max-w-md -translate-x-1/2 rounded-2xl border bg-background px-5 py-4 shadow-2xl shadow-black/40">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                type === "success"
                  ? "bg-foreground text-background"
                  : "border text-foreground"
              )}>
              {type === "success" ? (
                <Check size={14} />
              ) : (
                <CircleAlert size={14} />
              )}
            </span>

            <div className="flex-1">
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted">{description}</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Dismiss"
              className="text-muted transition-colors hover:text-foreground">
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
    <SectionWrapper id="contact" className="py-24 md:py-32">
      <FloatingToast
        show={toast.show}
        title={toast.title}
        description={toast.description}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />

      <div className="container-page">
        <Reveal className="border-t pt-6">
          <p className="label-mono">
            (04) <span className="ml-2">Contact</span>
          </p>
        </Reveal>

        {/* Header */}
        <Reveal className="mt-16 md:mt-24">
          <h2 className="text-[clamp(2.75rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-[-0.05em]">
            Let’s build
            <br />
            something{" "}
            <span className="font-serif font-normal italic">together.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Open to opportunities, collaborations, and meaningful
            conversations.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-16 border-t pt-12 md:mt-28 md:grid-cols-12 md:gap-8">
          {/* Contact Info */}
          <Reveal className="space-y-10 md:col-span-5">
            <InfoItem label="Email">
              <a
                href="mailto:swarnadeeproy35@gmail.com"
                className="group inline-flex items-center gap-2 text-xl break-all md:text-2xl">
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:0%_1px]">
                  swarnadeeproy35@gmail.com
                </span>
              </a>
            </InfoItem>
            <InfoItem label="Phone">
              <a
                href="tel:+917439732996"
                className="text-xl transition-colors hover:text-muted md:text-2xl">
                +91 74397 32996
              </a>
            </InfoItem>
            <InfoItem label="Location">
              <p className="text-xl md:text-2xl">Kolkata, India</p>
            </InfoItem>
            <InfoItem label="Elsewhere">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground">
                      {s.name}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </InfoItem>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
                <Field label="Name" name="name" placeholder="Jane Doe" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                />
              </div>
              <Field
                label="Message"
                name="message"
                placeholder="Tell me about your project…"
                textarea
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "group inline-flex w-full items-center justify-between gap-2 rounded-full bg-foreground py-2 pr-2 pl-6 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto sm:gap-10",
                  isSubmitting && "cursor-not-allowed opacity-60"
                )}>
                {isSubmitting ? "Sending…" : "Send message"}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={16} />
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* --------------------------------------------
   Info Item
-------------------------------------------- */
function InfoItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-mono mb-3">{label}</p>
      {children}
    </div>
  );
}

/* --------------------------------------------
   Form Field
-------------------------------------------- */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const input =
    "w-full resize-none border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-subtle focus:border-foreground";

  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          placeholder={placeholder}
          className={input}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className={input}
        />
      )}
    </label>
  );
}
