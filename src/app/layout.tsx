import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DealPrep | Executive Meeting Intelligence & Cultural Protocol",
  description: "Instant B2B executive briefing dossiers, recent company deals radar, and cross-border cultural etiquette protocols.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-body selection:bg-[#fc5000] selection:text-white">
        {children}
      </body>
    </html>
  );
}
