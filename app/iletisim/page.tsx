"use client";

import { SALON_INFO } from "@/lib/data";

export default function IletisimSayfasi() {
  const whatsappUrl = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20size%20ulaşmak%20istiyorum.`;

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
          ✦ İşletme Bilgileri
        </span>
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl font-black text-white mt-3 mb-1"
        >
          İletişim
        </h1>
        <p className="text-[#888] text-sm">Bize ulaşın, randevu alın</p>
        <div
          style={{
            width: 40,
            height: 2,
            background: "linear-gradient(135deg, #FFD700, #B8960C)",
            marginTop: 10,
          }}
        />
      </div>

      {/* Logo/Brand */}
      <div
        style={{
          background: "linear-gradient(145deg, #0f0f0f, #151505)",
          border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: 20,
        }}
        className="p-6 mb-5 text-center relative overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #FFD700, #FFF176, #B8960C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="text-2xl font-black mb-1"
        >
          SALOON FERDİ ZOPCUK
        </div>
        <div className="text-[#666] text-xs tracking-widest uppercase">
          Premium Erkek Kuaförü
        </div>
      </div>

      {/* Contact cards */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Phone */}
        <a
          href={`tel:${SALON_INFO.phone}`}
          style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
          className="flex items-center gap-4 p-4 active:scale-95 transition-all"
        >
          <div
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.2)",
              width: 48,
              height: 48,
              borderRadius: 14,
            }}
            className="flex items-center justify-center text-2xl flex-shrink-0"
          >
            📞
          </div>
          <div className="flex-1">
            <div className="text-[#666] text-xs mb-0.5">Telefon</div>
            <div style={{ color: "#FFD700" }} className="font-bold text-sm">
              {SALON_INFO.phoneDisplay}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "rgba(37,211,102,0.06)",
            border: "1px solid rgba(37,211,102,0.2)",
            borderRadius: 16,
          }}
          className="flex items-center gap-4 p-4 active:scale-95 transition-all"
        >
          <div
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.2)",
              width: 48,
              height: 48,
              borderRadius: 14,
            }}
            className="flex items-center justify-center text-2xl flex-shrink-0"
          >
            💬
          </div>
          <div className="flex-1">
            <div className="text-[#666] text-xs mb-0.5">WhatsApp</div>
            <div style={{ color: "#25D366" }} className="font-bold text-sm">
              {SALON_INFO.phoneDisplay}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>

        {/* Address */}
        <a
          href={SALON_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
          className="flex items-center gap-4 p-4 active:scale-95 transition-all"
        >
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              width: 48,
              height: 48,
              borderRadius: 14,
            }}
            className="flex items-center justify-center text-2xl flex-shrink-0"
          >
            📍
          </div>
          <div className="flex-1">
            <div className="text-[#666] text-xs mb-0.5">Adres</div>
            <div className="text-white font-semibold text-sm leading-relaxed">
              {SALON_INFO.addressFull}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>

        {/* Instagram */}
        <div
          style={{
            background: "rgba(131,58,180,0.06)",
            border: "1px solid rgba(131,58,180,0.2)",
            borderRadius: 16,
          }}
          className="flex items-center gap-4 p-4"
        >
          <div
            style={{
              background: "rgba(131,58,180,0.1)",
              border: "1px solid rgba(131,58,180,0.2)",
              width: 48,
              height: 48,
              borderRadius: 14,
            }}
            className="flex items-center justify-center text-2xl flex-shrink-0"
          >
            📸
          </div>
          <div>
            <div className="text-[#666] text-xs mb-0.5">Instagram</div>
            <div style={{ color: "#c084fc" }} className="font-bold text-sm">
              {SALON_INFO.instagram}
            </div>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div
        style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 18 }}
        className="p-5 mb-6"
      >
        <h2 className="text-white font-black mb-4 flex items-center gap-2">
          <span>🕐</span> Çalışma Saatleri
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { gun: "Pazartesi", saat: "07:00 - 22:00", acik: true },
            { gun: "Salı", saat: "07:00 - 22:00", acik: true },
            { gun: "Çarşamba", saat: "07:00 - 22:00", acik: true },
            { gun: "Perşembe", saat: "07:00 - 22:00", acik: true },
            { gun: "Cuma", saat: "07:00 - 22:00", acik: true },
            { gun: "Cumartesi", saat: "07:00 - 22:00", acik: true },
            { gun: "Pazar", saat: "12:00 - 20:00", acik: true },
          ].map(({ gun, saat, acik }) => {
            const today = new Date().toLocaleDateString("tr-TR", { weekday: "long" });
            const isToday = today === gun;
            return (
              <div
                key={gun}
                style={{
                  background: isToday ? "rgba(255,215,0,0.06)" : "transparent",
                  border: isToday ? "1px solid rgba(255,215,0,0.15)" : "1px solid transparent",
                  borderRadius: 10,
                }}
                className="flex items-center justify-between px-3 py-2"
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: isToday ? "#FFD700" : "#ccc" }}
                >
                  {gun}
                  {isToday && (
                    <span
                      style={{ background: "#FFD700", color: "#000", fontSize: 9 }}
                      className="ml-2 px-1.5 py-0.5 rounded-full font-black"
                    >
                      BUGÜN
                    </span>
                  )}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: acik ? "#34d399" : "#ff4444" }}
                >
                  {saat}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map button */}
      <a
        href={SALON_INFO.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "rgba(239,68,68,0.08)", border: "2px solid rgba(239,68,68,0.3)", color: "#f87171" }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm mb-3 active:scale-95 transition-all"
      >
        🗺️ Google Haritalar&apos;da Aç
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "rgba(37,211,102,0.08)", border: "2px solid rgba(37,211,102,0.3)", color: "#25D366" }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm active:scale-95 transition-all"
      >
        💬 WhatsApp&apos;tan Mesaj At
      </a>
    </div>
  );
}
