import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowCrate — Premium AI Workflow Templates",
  description:
    "Deploy production-ready AI automation workflows in minutes. Premium n8n templates for lead generation, content creation, e-commerce, and more.",
  keywords: [
    "n8n templates",
    "AI workflows",
    "automation templates",
    "n8n automation",
    "AI agents",
    "workflow automation",
  ],
  openGraph: {
    title: "FlowCrate — Premium AI Workflow Templates",
    description:
      "Deploy production-ready AI automation workflows in minutes.",
    url: "https://flowcrate.ai",
    siteName: "FlowCrate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowCrate — Premium AI Workflow Templates",
    description:
      "Deploy production-ready AI automation workflows in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
