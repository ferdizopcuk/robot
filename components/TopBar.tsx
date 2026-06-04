"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <header
      style={{
        background: "rgba(8,8,8,0.95)",
        borderBottom: "1px solid rgba(255,215,0,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #FFD700, #FFF176, #B8960C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="text-xl font-black tracking-wider"
          >
            SALOON FERDİ ZOPCUK
          </span>
          <span className="text-[10px] text-[#888] tracking-[3px] uppercase mt-0.5">
            Premium Erkek Kuaförü · Adana
          </span>
        </Link>
        <a
          href="tel:05347730461"
          style={{
            background: "linear-gradient(135deg, #FFD700, #B8960C)",
            color: "#000",
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          Ara
        </a>
      </div>
    </header>
  );
}
