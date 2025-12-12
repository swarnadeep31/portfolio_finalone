"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export const ContactSection = () => {
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
          title: "Message sent!",
          description: "Thank you — I'll get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-linear-to-r from-pink-500 to-yellow-400 blur-[160px] opacity-20 rounded-full" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4"
        >
          Get In{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">
            Touch
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
        >
          I'm open to freelance work, collaborations, or full-time opportunities.
          Feel free to reach out!
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left Side — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Let's{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-yellow-400">
                  Connect
                </span>
              </h3>
              <p className="text-gray-400">
                Reach out anytime — I usually reply within 24 hours.
              </p>
            </div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Mail className="h-6 w-6 text-pink-400" />
              </div>
              <Link
                href="mailto:Swarnadeeproy35@gmail.com"
                className="text-gray-300 hover:text-white transition"
              >
                Swarnadeeproy35@gmail.com
              </Link>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <Phone className="h-6 w-6 text-pink-400" />
              </div>
              <Link
                href="tel:+917439732996"
                className="text-gray-300 hover:text-white transition"
              >
                +91 74397 32996
              </Link>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <MapPin className="h-6 w-6 text-pink-400" />
              </div>
              <p className="text-gray-300">Kolkata, WB, India</p>
            </motion.div>
          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 text-white"
              />

              <textarea
                name="message"
                rows={4}
                required
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 text-white resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 rounded-lg bg-linear-to-r from-pink-500 to-yellow-400 text-black font-semibold shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
