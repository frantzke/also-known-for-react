import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Also Known For",
  description: "Discover movies, TV shows, and actors",
  icons: {
    icon: "/AKF-Logo.ico",
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
        <Navbar />
        <main className="pt-16">
          <div className="mx-auto max-w-[1280px] px-4">{children}</div>
        </main>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
