import type { Metadata } from "next";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || "School Website",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || "School Website"}`,
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  description:
    "Providing quality education and nurturing young minds to become future leaders.",
  keywords: ["school", "education", "learning", "academics"],
  authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME || "School Website" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "School Website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
