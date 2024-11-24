import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVariable.ttf", // Path to your font file
  variable: "--font-inter", // Custom CSS variable for the font
  weight: "100 900", // Specify the font's weight range
  display: "swap", // Use font-display: swap for better performance
});

export const metadata: Metadata = {
  title: "Raffi Chilingaryan",
  description: "I like apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
