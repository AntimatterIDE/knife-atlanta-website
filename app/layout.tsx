import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Knife Atlanta — Prime Steakhouse",
  description:
    "Knife Atlanta is an elevated prime steakhouse in the heart of Atlanta, GA. Bold flavors, handcrafted cocktails, and an unforgettable dining experience.",
  openGraph: {
    title: "Knife Atlanta — Prime Steakhouse",
    description:
      "An elevated prime steakhouse in the heart of Atlanta, GA.",
    url: "https://knifeatlanta.com",
    siteName: "Knife Atlanta",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knife Atlanta — Prime Steakhouse",
    description: "An elevated prime steakhouse in the heart of Atlanta, GA.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://knifeatlanta.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-knife-black text-knife-cream min-h-full flex flex-col">
        <LenisProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
