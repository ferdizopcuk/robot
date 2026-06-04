"use client";

import { HIZMETLER, PAKETLER, SALON_INFO } from "@/lib/data";
import Link from "next/link";

export default function HizmetlerSayfasi() {
  const whatsappUrl = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`;

  return (
    <div className="max-w-lg mx-auto px-5 py-6">
      {/* Header */}
      <div className="mb-7">
        <span
          style={{
            background: "rgba(255,215,0,0.1)",
            border: "1px solid rgba(255,215,0,0.3)",
            color: "#FFD700",
          }}
          className="text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase"
        >
          ✦ Profesyonel Hizmetler
        </span>
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl font-black text-white mt-3 mb-1"
        >
          Hizmetlerimiz
        </h1>
        <p className="text-[#888] text-sm">
          Her müşterimize özel, profesyonel bakım ve stil hizmetleri
        </p>
        <div
          style={{
            width: 40,
            height: 2,
            background: "linear-gradient(135deg, #FFD700, #B8960C)",
            marginTop: 10,
          }}
        />
      </div>

      {/* Services Grid */}
      <div className="flex flex-col gap-2.5 mb-10">
        {HIZMETLER.map((h, i) => (
          <div
            key={h.id}
            style={{
              background: "#111",
              border: "1px solid #1f1f1f",
              borderRadius: 16,
              transition: "all 0.2s",
            }}
            className="flex items-center gap-4 p-4 card-hover"
          >
            <div
              style={{
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.15)",
                width: 50,
                height: 50,
                borderRadius: 14,
                flexShrink: 0,
              }}
              className="flex items-center justify-center text-2xl"
            >
              {h.ikon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-sm">{h.ad}</div>
              <div className="text-[#666] text-xs mt-0.5">{h.aciklama}</div>
            </div>
            <div
              style={{ color: "#FFD700", opacity: 0.5 }}
              className="text-lg font-black"
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>

      {/* Packages */}
      <div className="mb-8">
        <h2 className="text-xl font-black text-white mb-1">Premium Paketler</h2>
        <p className="text-[#666] text-xs mb-4">Özel indirimli kombinasyonlar</p>
        <div className="flex flex-col gap-3">
          {PAKETLER.map((paket) => (
            <div
              key={paket.id}
              style={{
                background: paket.popular ? "linear-gradient(145deg, #1a1500, #1f1a00)" : "#111",
                border: `1px solid ${paket.popular ? paket.renk + "60" : "#1f1f1f"}`,
                borderRadius: 18,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {paket.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${paket.renk}, transparent)`,
                  }}
                />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {paket.popular && (
                      <span
                        style={{
                          background: paket.renk,
                          color: "#000",
                          fontSize: 9,
                          fontWeight: 800,
                        }}
                        className="px-2 py-0.5 rounded-full tracking-widest uppercase block mb-1.5"
                      >
                        ★ EN POPÜLER
                      </span>
                    )}
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${paket.renk}, ${paket.renk2})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Playfair Display', serif",
                      }}
                      className="text-xl font-black"
                    >
                      {paket.ad}
                    </span>
                    <div className="text-[#666] text-xs mt-0.5">{paket.aciklama}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: paket.renk }} className="text-3xl font-black">
                      {paket.fiyat}
                      <span className="text-lg">₺</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {paket.hizmetler.map((h) => (
                    <span
                      key={h}
                      style={{
                        background: `${paket.renk}15`,
                        border: `1px solid ${paket.renk}30`,
                        color: "#ccc",
                      }}
                      className="text-xs px-2.5 py-1 rounded-full"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Link
          href="/randevu"
          style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all"
        >
          📅 Hemen Randevu Al
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "rgba(37,211,102,0.08)",
            border: "2px solid rgba(37,211,102,0.3)",
            color: "#25D366",
          }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm active:scale-95 transition-all"
        >
          💬 WhatsApp&apos;tan Bilgi Al
        </a>
      </div>
    </div>
  );
}
