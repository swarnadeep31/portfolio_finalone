import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "./components/ui/toaster";

export const metadata: Metadata = {
  title: "Swarnadeep Portfolio",
  description:
    "Frontend Developer Portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased transition-colors duration-300">
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
