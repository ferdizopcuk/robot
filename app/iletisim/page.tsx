"use client";

import { SALON_INFO } from "@/lib/data";

const GUNLER = [
  { gun: "Pazartesi", saat: "07:00 - 22:00" },
  { gun: "Salı",      saat: "07:00 - 22:00" },
  { gun: "Çarşamba",  saat: "07:00 - 22:00" },
  { gun: "Perşembe",  saat: "07:00 - 22:00" },
  { gun: "Cuma",      saat: "07:00 - 22:00" },
  { gun: "Cumartesi", saat: "07:00 - 22:00" },
  { gun: "Pazar",     saat: "12:00 - 20:00" },
];

export default function IletisimSayfasi() {
  const WA = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20size%20ula%C5%9Fmak%20istiyorum.`;

  const bugunAdi = new Date().toLocaleDateString("tr-TR", { weekday: "long" });

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      <div className="section-header">
        <div className="section-label">✦ İşletme Bilgileri</div>
        <h1 className="section-title">İletişim</h1>
        <div className="section-underline" />
      </div>

      {/* Brand card */}
      <div
        style={{
          background:"linear-gradient(145deg,#0f0f00,#0d0d00)",
          border:"1px solid rgba(212,168,67,0.2)",
          borderRadius:22,
          padding:24, textAlign:"center",
          position:"relative", overflow:"hidden",
          marginBottom:20,
        }}
      >
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#d4a843,transparent)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,168,67,0.2),transparent)" }} />

        <div
          style={{
            width:56, height:56, borderRadius:16,
            background:"linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:28, margin:"0 auto 14px",
            boxShadow:"0 4px 20px rgba(212,168,67,0.3)",
          }}
        >
          ✂️
        </div>
        <div
          style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:20, fontWeight:900,
            background:"linear-gradient(135deg,#f0c96a,#FFD700,#d4a843,#8a6a1a)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", marginBottom:4,
          }}
        >
          SALOON FERDİ ZOPCUK
        </div>
        <div style={{ fontSize:10, letterSpacing:"2.5px", color:"#404040", textTransform:"uppercase" }}>
          Premium Erkek Kuaförü · Adana Çukurova
        </div>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-2.5 mb-7">
        {[
          {
            href: `tel:${SALON_INFO.phone}`,
            icon: "📞", label: "Telefon", value: SALON_INFO.phoneDisplay,
            bg: "rgba(212,168,67,0.05)", border: "rgba(212,168,67,0.15)", color: "#d4a843",
          },
          {
            href: WA, target: "_blank",
            icon: "💬", label: "WhatsApp", value: SALON_INFO.phoneDisplay,
            bg: "rgba(37,211,102,0.05)", border: "rgba(37,211,102,0.15)", color: "#25D366",
          },
          {
            href: SALON_INFO.mapUrl, target: "_blank",
            icon: "📍", label: "Adres", value: SALON_INFO.addressFull,
            bg: "rgba(248,113,113,0.05)", border: "rgba(248,113,113,0.15)", color: "#f87171",
          },
          {
            href: "#",
            icon: "📸", label: "Instagram", value: SALON_INFO.instagram,
            bg: "rgba(192,132,252,0.05)", border: "rgba(192,132,252,0.15)", color: "#c084fc",
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={(item as {target?: string}).target}
            rel={(item as {target?: string}).target === "_blank" ? "noopener noreferrer" : undefined}
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                background: `${item.color}15`,
                border: `1px solid ${item.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 10, color: "#505050", marginBottom: 2, letterSpacing: "0.5px" }}>
                {item.label}
              </div>
              <div
                style={{
                  fontWeight: 700, fontSize: 13, color: item.color,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}
              >
                {item.value}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        ))}
      </div>

      {/* Working Hours */}
      <div
        style={{
          background:"#0e0e0e",
          border:"1px solid #1e1e1e",
          borderRadius:20,
          overflow:"hidden",
          marginBottom:20,
        }}
      >
        <div
          style={{
            padding:"16px 18px 14px",
            borderBottom:"1px solid #1a1a1a",
            display:"flex", alignItems:"center", gap:8,
          }}
        >
          <span style={{ fontSize:16 }}>🕐</span>
          <span style={{ fontWeight:800, fontSize:15, color:"#e0e0e0" }}>Çalışma Saatleri</span>
        </div>
        <div>
          {GUNLER.map(({ gun, saat }, i) => {
            const isToday = bugunAdi === gun;
            return (
              <div
                key={gun}
                style={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  padding:"11px 18px",
                  background: isToday ? "rgba(212,168,67,0.05)" : "transparent",
                  borderBottom: i < GUNLER.length - 1 ? "1px solid #161616" : "none",
                }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:13, fontWeight:600, color: isToday ? "#d4a843" : "#a0a0a0" }}>
                    {gun}
                  </span>
                  {isToday && (
                    <span style={{
                      background:"linear-gradient(135deg,#FFD700,#d4a843)",
                      color:"#000", fontSize:7, fontWeight:900,
                      padding:"2px 6px", borderRadius:50, letterSpacing:"1px",
                    }}>
                      BUGÜN
                    </span>
                  )}
                </div>
                <span style={{
                  fontWeight:700, fontSize:13,
                  color: gun === "Pazar" ? "#60a5fa" : "#27c982",
                }}>
                  {saat}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={SALON_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, padding:"16px", borderRadius:50,
            background:"rgba(248,113,113,0.06)",
            border:"1.5px solid rgba(248,113,113,0.25)",
            color:"#f87171", fontWeight:700, fontSize:14, textDecoration:"none",
          }}
        >
          🗺️ Google Haritalar&apos;da Aç
        </a>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, padding:"16px", borderRadius:50,
            background:"rgba(37,211,102,0.06)",
            border:"1.5px solid rgba(37,211,102,0.3)",
            color:"#25D366", fontWeight:700, fontSize:14, textDecoration:"none",
          }}
        >
          💬 WhatsApp&apos;tan Mesaj At
        </a>
      </div>
    </div>
  );
}
