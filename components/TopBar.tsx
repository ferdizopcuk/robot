"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <header
      style={{
        background: "rgba(5,5,5,0.97)",
        borderBottom: "1px solid rgba(212,168,67,0.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 leading-none">
          {/* Icon mark */}
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 10px rgba(212,168,67,0.35)",
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>✂️</span>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: "0.5px",
                lineHeight: 1,
                background: "linear-gradient(135deg,#f0c96a,#FFD700,#d4a843,#8a6a1a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SALOON FERDİ ZOPCUK
            </div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "2.5px",
                color: "#505050",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Adana Çukurova
            </div>
          </div>
        </Link>

        {/* Call CTA */}
        <a
          href="tel:05347730461"
          style={{
            background: "linear-gradient(135deg,#FFD700,#d4a843)",
            color: "#000",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: "0.3px",
            padding: "7px 13px",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 2px 12px rgba(212,168,67,0.3)",
            flexShrink: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Ara
        </a>
      </div>
    </header>
  );
}
