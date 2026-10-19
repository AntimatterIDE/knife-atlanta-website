import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import SitePreloader from "@/components/SitePreloader";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-family",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knifeatlanta.com"),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
    url: "https://knifeatlanta.com",
    siteName: site.fullName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/knife/lounge.jpg",
        width: 2000,
        height: 1369,
        alt: site.fullName,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-surface text-ink antialiased">
        <SitePreloader>
          <LenisProvider>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </SitePreloader>
      </body>
    </html>
  );
}
