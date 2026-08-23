import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Ibrahim — Fullstack Web Developer Dossier",
  description:
    "Engineering portfolio and technical dossier of Muhammad Ibrahim, Fullstack Web Developer based in Banasree, Dhaka, Bangladesh. Specializing in Next.js, TypeScript, PostgreSQL, and Express.",
  keywords: [
    "Muhammad Ibrahim",
    "Fullstack Developer",
    "Next.js Developer",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Web Developer Dhaka",
  ],
  authors: [{ name: "Muhammad Ibrahim" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAFAF9] text-[#141413] selection:bg-[#E5E5E3] selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
