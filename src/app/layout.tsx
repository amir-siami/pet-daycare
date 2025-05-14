import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./styles/globals.css";


const inter =Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pet DayCare",
    description: "Your trusted partner in pet care, providing a safe and fun environment for your furry friends."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
