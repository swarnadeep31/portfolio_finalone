"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./StackedSection";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out. I’ll reply shortly.",
        });
        form.reset();
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <section className="relative bg-[#f7f3ee] py-32">
        {/* Paper texture */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.05),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* CENTER COLUMN */}
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
              value="Swarnadeeproy35@gmail.com"
              href="mailto:Swarnadeeproy35@gmail.com"
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

          {/* FORM – NO CARD / NO BOX */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-[#2b2118]/30 bg-transparent px-4 py-3 text-[#2b2118] placeholder:text-[#6b5a4a] focus:outline-none focus:border-[#2b2118]"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full rounded-lg border border-[#2b2118]/30 bg-transparent px-4 py-3 text-[#2b2118] placeholder:text-[#6b5a4a] focus:outline-none focus:border-[#2b2118]"
            />

            <textarea
              name="message"
              rows={4}
              required
              placeholder="Your message"
              className="w-full resize-none rounded-lg border border-[#2b2118]/30 bg-transparent px-4 py-3 text-[#2b2118] placeholder:text-[#6b5a4a] focus:outline-none focus:border-[#2b2118]"
            />

            <button
              disabled={isSubmitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg bg-[#2b2118] px-4 py-3 text-sm font-semibold text-[#f7f3ee] hover:bg-[#3a2c20] transition",
                isSubmitting && "opacity-70"
              )}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </section>
    </SectionWrapper>
  );
}

/* --------------------------------------------
   CONTACT ITEM
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
        className="flex items-center gap-4 text-[#6b5a4a] hover:text-[#2b2118] transition"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2b2118]/30">
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
