"use client";

import { HIZMETLER, PAKETLER, SALON_INFO } from "@/lib/data";
import Link from "next/link";

export default function HizmetlerSayfasi() {
  const WA = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`;

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      <div className="section-header">
        <div className="section-label">✦ Profesyonel Hizmetler</div>
        <h1 className="section-title">Hizmetlerimiz</h1>
        <div className="section-underline" />
        <p style={{ color:"#606060", fontSize:12, marginTop:8 }}>
          Her müşterimize özel, kişiye uyarlanmış bakım hizmetleri
        </p>
      </div>

      {/* Services list */}
      <div className="flex flex-col gap-2 mb-10">
        {HIZMETLER.map((h, i) => (
          <div
            key={h.id}
            className="hover-lift"
            style={{
              background:"#0e0e0e",
              border:"1px solid #1e1e1e",
              borderRadius:16,
              display:"flex",
              alignItems:"center",
              gap:14,
              padding:"14px 16px",
              cursor:"pointer",
            }}
          >
            <div
              style={{
                width:48, height:48, borderRadius:14, flexShrink:0,
                background:"rgba(212,168,67,0.06)",
                border:"1px solid rgba(212,168,67,0.12)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:22,
              }}
            >
              {h.ikon}
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontWeight:700, color:"#e0e0e0", fontSize:14 }}>{h.ad}</div>
              <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{h.aciklama}</div>
            </div>
            <div
              style={{
                fontSize:11, fontWeight:800,
                color:"rgba(212,168,67,0.3)",
                letterSpacing:"1px",
                flexShrink:0,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 mb-6" style={{ opacity:0.3 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#d4a843)" }} />
        <span style={{ color:"#d4a843", fontSize:12 }}>✦</span>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#d4a843,transparent)" }} />
      </div>

      {/* Packages */}
      <div className="section-header">
        <div className="section-label">✦ Avantajlı Fiyatlar</div>
        <h2 className="section-title">Premium Paketler</h2>
        <div className="section-underline" />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {PAKETLER.map((p) => (
          <div
            key={p.id}
            style={{
              background: p.popular ? "linear-gradient(145deg,#141200,#0f0e00)" : "#0e0e0e",
              border:`1px solid ${p.popular ? "rgba(255,215,0,0.3)" : "#1e1e1e"}`,
              borderRadius:20, overflow:"hidden", position:"relative",
            }}
          >
            {p.popular && (
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:2,
                background:"linear-gradient(90deg,transparent,#FFD700 30%,#d4a843 70%,transparent)",
              }} />
            )}
            <div style={{ padding:"18px 18px 16px" }}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  {p.popular && (
                    <span style={{
                      background:"linear-gradient(135deg,#FFD700,#d4a843)",
                      color:"#000", fontSize:8, fontWeight:900,
                      padding:"2px 8px", borderRadius:50,
                      letterSpacing:"1px", textTransform:"uppercase",
                      display:"inline-block", marginBottom:5,
                    }}>
                      ★ En Çok Tercih Edilen
                    </span>
                  )}
                  <div
                    style={{
                      fontFamily:"'Playfair Display',Georgia,serif",
                      fontSize:20, fontWeight:900,
                      background:`linear-gradient(135deg,${p.renk},${p.renk2})`,
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                      backgroundClip:"text",
                    }}
                  >
                    {p.ad}
                  </div>
                  <div style={{ fontSize:11, color:"#505050", marginTop:2 }}>{p.aciklama}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                  <span style={{
                    fontSize:30, fontWeight:900, lineHeight:1,
                    background:`linear-gradient(135deg,${p.renk},${p.renk2})`,
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                    backgroundClip:"text",
                  }}>
                    {p.fiyat}
                  </span>
                  <span style={{ color:"#505050", fontSize:14 }}> ₺</span>
                </div>
              </div>
              <div style={{ height:1, background:"rgba(255,255,255,0.04)", margin:"12px 0" }} />
              <div className="flex flex-wrap gap-1.5">
                {p.hizmetler.map((h) => (
                  <span key={h} style={{
                    background:`${p.renk}10`,
                    border:`1px solid ${p.renk}25`,
                    color:"#909090",
                    fontSize:10, fontWeight:500,
                    padding:"4px 9px", borderRadius:50,
                  }}>
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Link
          href="/randevu"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, padding:"16px", borderRadius:50,
            background:"linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)",
            color:"#000", fontWeight:800, fontSize:15,
            textDecoration:"none",
            boxShadow:"0 4px 24px rgba(212,168,67,0.3)",
          }}
        >
          📅 Hemen Randevu Al
        </Link>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, padding:"14px", borderRadius:50,
            background:"rgba(37,211,102,0.06)",
            border:"1.5px solid rgba(37,211,102,0.3)",
            color:"#25D366", fontWeight:700, fontSize:14,
            textDecoration:"none",
          }}
        >
          💬 WhatsApp&apos;tan Bilgi Al
        </a>
      </div>
    </div>
  );
}
