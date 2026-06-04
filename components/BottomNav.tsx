"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  {
    href: "/",
    label: "Ana Sayfa",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: "/randevu",
    label: "Randevu",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    href: "/musteriler",
    label: "Müşteriler",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: "/gelir",
    label: "Gelir",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const MORE_ITEMS = [
  { href: "/hizmetler", label: "Hizmetler", icon: "✂️", desc: "Tüm hizmet listesi" },
  { href: "/galeri", label: "Galeri", icon: "📸", desc: "Çalışmalar & yorumlar" },
  { href: "/iletisim", label: "İletişim", icon: "📍", desc: "Adres & çalışma saatleri" },
  { href: "/yonetim", label: "Yönetim", icon: "⚙️", desc: "Admin paneli" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = MORE_ITEMS.some((i) => i.href === pathname);

  return (
    <>
      {moreOpen && (
        <div
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          className="fixed inset-0 z-40"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {moreOpen && (
        <div
          className="anim-slide-in"
          style={{
            position: "fixed",
            bottom: 76,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 24px)",
            maxWidth: 468,
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 22,
            zIndex: 50,
            padding: 10,
            boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#444",
              textTransform: "uppercase",
              padding: "4px 8px 8px",
            }}
          >
            Daha Fazla
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {MORE_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  style={{
                    background: active ? "rgba(212,168,67,0.08)" : "#161616",
                    border: `1px solid ${active ? "rgba(212,168,67,0.3)" : "#1e1e1e"}`,
                    color: active ? "#d4a843" : "#d0d0d0",
                    borderRadius: 14,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <nav className="tab-bar">
        <div className="max-w-lg mx-auto flex items-center justify-around px-1 py-1.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ color: active ? "#d4a843" : "#4a4a4a" }}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]"
              >
                {item.icon(active)}
                <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#d4a843" : "#4a4a4a" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={() => setMoreOpen((p) => !p)}
            style={{
              color: isMoreActive || moreOpen ? "#d4a843" : "#4a4a4a",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[60px]"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="5" cy="12" r="1.2" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
              <circle cx="19" cy="12" r="1.2" fill="currentColor"/>
            </svg>
            <span style={{ fontSize: 10, fontWeight: 600 }}>Daha</span>
          </button>
        </div>
      </nav>
    </>
  );
}
