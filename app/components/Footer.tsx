"use client";

import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Swarnadeep.co — All rights reserved.
        </p>

        {/* Back to top */}
        <Link
          href="#hero"
          className="p-3 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowUp size={20} />
        </Link>

        {/* Social Links */}
        <div className="flex space-x-4 justify-center md:justify-end">
          <Link
            href="https://www.linkedin.com/in/swarnadeeproy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://www.instagram.com/thatgoddamntrip/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook />
          </Link>
        </div>
      </div>
    </footer>
  );
};
