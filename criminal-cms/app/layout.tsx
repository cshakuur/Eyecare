import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INCCMS – Integrated National Criminal Case Management System",
  description: "Secure government criminal case management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
