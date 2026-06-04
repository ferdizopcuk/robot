"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainNavItems = [
  {
    href: "/",
    label: "Ana Sayfa",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/randevu",
    label: "Randevu",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/musteriler",
    label: "Müşteriler",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/gelir",
    label: "Gelir",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const moreItems = [
  { href: "/hizmetler", label: "Hizmetler", ikon: "✂️" },
  { href: "/galeri", label: "Galeri", ikon: "📸" },
  { href: "/iletisim", label: "İletişim", ikon: "📍" },
  { href: "/yonetim", label: "Yönetim", ikon: "⚙️" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreItems.some((i) => i.href === pathname);

  return (
    <>
      {/* More menu backdrop */}
      {moreOpen && (
        <div
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          className="fixed inset-0 z-40"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* More menu */}
      {moreOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 74,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 32px)",
            maxWidth: 480,
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 20,
            zIndex: 50,
            padding: "8px",
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {moreItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  style={{
                    background: active ? "rgba(255,215,0,0.1)" : "#1a1a1a",
                    border: `1px solid ${active ? "rgba(255,215,0,0.3)" : "#222"}`,
                    color: active ? "#FFD700" : "#aaa",
                    borderRadius: 14,
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{item.ikon}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <nav className="tab-bar safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
          {mainNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200"
                style={{
                  color: active ? "#FFD700" : "#555",
                  background: active ? "rgba(255,215,0,0.08)" : "transparent",
                }}
              >
                {item.icon(active)}
                <span
                  className="text-[10px] font-semibold tracking-wide"
                  style={{ color: active ? "#FFD700" : "#555" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen((p) => !p)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200"
            style={{
              color: isMoreActive || moreOpen ? "#FFD700" : "#555",
              background: isMoreActive || moreOpen ? "rgba(255,215,0,0.08)" : "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="19" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: isMoreActive || moreOpen ? "#FFD700" : "#555" }}>
              Daha Fazla
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
