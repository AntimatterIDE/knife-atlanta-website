import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knifeatlanta.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "https://knifeatlanta.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${site.name} steakhouse`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-knife-black text-knife-cream antialiased">
        <LenisProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
