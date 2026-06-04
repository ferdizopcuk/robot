import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "SALOON FERDİ ZOPCUK | Profesyonel Erkek Kuaförü - Adana Çukurova",
  description:
    "Adana Çukurova'nın en premium erkek kuaförü. Profesyonel saç kesimi, sakal bakımı ve özel paket hizmetleri. Randevu için arayın: 0534 773 04 61",
  keywords:
    "berber adana, erkek kuaförü adana, çukurova berber, saç kesimi adana, sakal tıraşı adana",
  authors: [{ name: "Saloon Ferdi Zopcuk" }],
  openGraph: {
    title: "SALOON FERDİ ZOPCUK | Adana Çukurova",
    description: "Adana Çukurova'nın en premium erkek kuaförü",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
        className="bg-[#080808] text-white min-h-screen antialiased"
      >
        <TopBar />
        <main className="pb-nav min-h-screen">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
