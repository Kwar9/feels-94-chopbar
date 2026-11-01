import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feels 94 Chopbar | The True Taste of Nostalgia",
  description:
    "Enjoy authentic Ghanaian food prepared the traditional way at Feels 94 Chopbar. Visit us in Mallam-Gbawe or East Legon, Accra, or order on WhatsApp.",
  applicationName: "Feels 94 Chopbar",
  openGraph: {
    title: "Feels 94 Chopbar | The True Taste of Nostalgia",
    description:
      "Authentic Ghanaian food prepared the traditional way. Visit us in Mallam-Gbawe and East Legon.",
    type: "website",
    locale: "en_GH",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GH">
      <body>{children}</body>
    </html>
  );
}
