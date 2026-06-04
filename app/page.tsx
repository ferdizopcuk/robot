"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SALON_INFO, HIZMETLER, PAKETLER, KURUMSAL_DEGERLER } from "@/lib/data";
import { getYorumlar, getKampanyalar, seedDemoData } from "@/lib/storage";
import type { Yorum, Kampanya } from "@/lib/data";

export default function AnaSayfa() {
  const [yorumlar, setYorumlar] = useState<Yorum[]>([]);
  const [kampanyalar, setKampanyalar] = useState<Kampanya[]>([]);
  const [aktifK, setAktifK] = useState(0);

  useEffect(() => {
    seedDemoData();
    setYorumlar(getYorumlar());
    setKampanyalar(getKampanyalar().filter((k) => k.aktif));
  }, []);

  useEffect(() => {
    if (kampanyalar.length <= 1) return;
    const t = setInterval(() => setAktifK((p) => (p + 1) % kampanyalar.length), 4000);
    return () => clearInterval(t);
  }, [kampanyalar.length]);

  const ortPuan = yorumlar.length
    ? (yorumlar.reduce((s, y) => s + y.puan, 0) / yorumlar.length).toFixed(1)
    : "5.0";

  const WA = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20randevu%20almak%20istiyorum.`;
  const kamp = kampanyalar[aktifK];

  return (
    <div className="max-w-lg mx-auto">

      {/* ── HERO ─────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg,#0d0d0d 0%,#080808 100%)",
          borderBottom: "1px solid rgba(212,168,67,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
        className="px-5 pt-10 pb-9"
      >
        {/* top accent */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#d4a843,transparent)" }} />

        {/* subtle bg pattern */}
        <div
          style={{
            position:"absolute", inset:0, opacity:0.025,
            backgroundImage:"radial-gradient(circle at 1px 1px, #d4a843 1px, transparent 0)",
            backgroundSize:"28px 28px",
          }}
        />

        {/* decorative circle */}
        <div
          style={{
            position:"absolute", right:-60, top:-60,
            width:260, height:260,
            background:"radial-gradient(circle,rgba(212,168,67,0.07) 0%,transparent 70%)",
            borderRadius:"50%",
          }}
        />

        <div className="relative">
          {/* label */}
          <div className="flex items-center gap-2 mb-5">
            <div
              style={{
                width: 20, height: 1.5,
                background: "linear-gradient(90deg,#d4a843,transparent)",
              }}
            />
            <span
              style={{ fontSize:10, letterSpacing:"3px", color:"#d4a843", fontWeight:700, textTransform:"uppercase" }}
            >
              Adana Çukurova · Premium
            </span>
          </div>

          {/* main heading */}
          <h1
            style={{ fontFamily:"'Playfair Display',Georgia,serif", lineHeight:1.05 }}
            className="mb-4"
          >
            <span
              style={{
                display:"block", fontSize:38, fontWeight:900, color:"#f0f0f0",
                textShadow:"0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Adana&apos;nın En
            </span>
            <span
              style={{
                display:"block", fontSize:42, fontWeight:900,
                background:"linear-gradient(135deg,#f0c96a,#FFD700,#d4a843)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                textShadow:"none",
              }}
            >
              Prestijli
            </span>
            <span
              style={{
                display:"block", fontSize:38, fontWeight:900, color:"#f0f0f0",
              }}
            >
              Erkek Kuaförü
            </span>
          </h1>

          <p style={{ color:"#888", fontSize:13, lineHeight:1.7, maxWidth:320 }} className="mb-7">
            Çukurova&apos;nın kalbinde, geleneksel ustalık ve modern tekniklerle
            kişiye özel premium erkek bakım deneyimi.
          </p>

          {/* stats */}
          <div className="flex gap-3 mb-8">
            {[
              { v:"4.9", l:"Müşteri Puanı", i:"⭐" },
              { v:"500+", l:"Mutlu Müşteri", i:"👥" },
              { v:"5+", l:"Yıllık Deneyim", i:"🏆" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  flex:1, background:"rgba(255,255,255,0.03)",
                  border:"1px solid rgba(212,168,67,0.12)", borderRadius:14,
                  padding:"12px 8px", textAlign:"center",
                }}
              >
                <div style={{ fontSize:18, marginBottom:3 }}>{s.i}</div>
                <div
                  style={{
                    fontSize:20, fontWeight:900,
                    background:"linear-gradient(135deg,#f0c96a,#d4a843)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    lineHeight:1,
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize:9, color:"#555", marginTop:3, letterSpacing:"0.5px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href="/randevu"
              style={{
                flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                gap:8, padding:"15px 20px", borderRadius:50,
                background:"linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)",
                color:"#000", fontWeight:800, fontSize:14, letterSpacing:"0.3px",
                boxShadow:"0 4px 24px rgba(212,168,67,0.35)",
                textDecoration:"none",
              }}
            >
              📅 Randevu Al
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                gap:8, padding:"15px 20px", borderRadius:50,
                background:"rgba(37,211,102,0.07)",
                border:"1.5px solid rgba(37,211,102,0.35)",
                color:"#25D366", fontWeight:700, fontSize:14,
                textDecoration:"none",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── KAMPANYA ─────────────────────────── */}
      {kamp && (
        <section className="px-5 pt-5">
          <div
            style={{
              background:`linear-gradient(135deg,${kamp.renk}12,${kamp.renk}06)`,
              border:`1px solid ${kamp.renk}35`,
              borderRadius:18,
              padding:"14px 16px",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                style={{
                  width:40, height:40, borderRadius:12, flexShrink:0,
                  background:`linear-gradient(135deg,${kamp.renk},${kamp.renk}99)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:16, color:"#000", fontWeight:900,
                }}
              >
                %
              </div>
              <div className="flex-1">
                <div style={{ color:kamp.renk, fontWeight:800, fontSize:13, marginBottom:3 }}>
                  {kamp.baslik}
                </div>
                <div style={{ color:"#888", fontSize:12, lineHeight:1.6 }}>
                  {kamp.aciklama}
                </div>
              </div>
            </div>
            {kampanyalar.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {kampanyalar.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAktifK(i)}
                    style={{
                      width: i === aktifK ? 18 : 5, height:5,
                      background: i === aktifK ? "#d4a843" : "#2a2a2a",
                      borderRadius:3, border:"none", cursor:"pointer",
                      transition:"all 0.3s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── HİZMETLER ────────────────────────── */}
      <section className="px-5 pt-8 pb-2">
        <div className="section-header">
          <div className="section-label">✦ Ne Sunuyoruz</div>
          <h2 className="section-title">Hizmetlerimiz</h2>
          <div className="section-underline" />
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {HIZMETLER.slice(0, 9).map((h, i) => (
            <div
              key={h.id}
              className="hover-lift"
              style={{
                background:"#0e0e0e",
                border:"1px solid #1e1e1e",
                borderRadius:16,
                padding:"14px 8px",
                textAlign:"center",
                cursor:"pointer",
              }}
            >
              <div style={{ fontSize:26, marginBottom:7 }}>{h.ikon}</div>
              <div style={{ fontSize:11, fontWeight:600, color:"#d0d0d0", lineHeight:1.3 }}>{h.ad}</div>
            </div>
          ))}
        </div>

        <Link
          href="/hizmetler"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:6, padding:"13px", borderRadius:50,
            border:"1px solid #1e1e1e", color:"#888", fontSize:13, fontWeight:600,
            textDecoration:"none", background:"#0a0a0a",
          }}
        >
          Tüm 15 Hizmeti Gör →
        </Link>
      </section>

      {/* ── PAKETLER ─────────────────────────── */}
      <section className="px-5 pt-8 pb-2">
        <div className="section-header">
          <div className="section-label">✦ Özel Fiyatlandırma</div>
          <h2 className="section-title">Premium Paketler</h2>
          <div className="section-underline" />
        </div>

        <div className="flex flex-col gap-3">
          {PAKETLER.map((p) => (
            <div
              key={p.id}
              style={{
                background: p.popular ? "linear-gradient(145deg,#141200,#0f0e00)" : "#0e0e0e",
                border: `1px solid ${p.popular ? "rgba(255,215,0,0.3)" : "#1e1e1e"}`,
                borderRadius:20,
                overflow:"hidden",
                position:"relative",
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
                      <span
                        style={{
                          background:"linear-gradient(135deg,#FFD700,#d4a843)",
                          color:"#000", fontSize:8, fontWeight:900,
                          padding:"2px 8px", borderRadius:50,
                          letterSpacing:"1px", textTransform:"uppercase",
                          display:"inline-block", marginBottom:5,
                        }}
                      >
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
                    <span
                      style={{
                        fontSize:28, fontWeight:900,
                        background:`linear-gradient(135deg,${p.renk},${p.renk2})`,
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                        backgroundClip:"text",
                        lineHeight:1,
                      }}
                    >
                      {p.fiyat}
                    </span>
                    <span style={{ color:"#505050", fontSize:14 }}> ₺</span>
                  </div>
                </div>

                {/* divider */}
                <div style={{ height:1, background:"rgba(255,255,255,0.04)", margin:"12px 0" }} />

                <div className="flex flex-wrap gap-1.5">
                  {p.hizmetler.map((h) => (
                    <span
                      key={h}
                      style={{
                        background:`${p.renk}10`,
                        border:`1px solid ${p.renk}25`,
                        color:"#a0a0a0",
                        fontSize:10, fontWeight:500,
                        padding:"4px 9px", borderRadius:50,
                      }}
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/randevu"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"16px", borderRadius:50, marginTop:16,
            background:"linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)",
            color:"#000", fontWeight:800, fontSize:15,
            textDecoration:"none",
            boxShadow:"0 4px 24px rgba(212,168,67,0.3)",
          }}
        >
          Paket Randevusu Al →
        </Link>
      </section>

      {/* ── YORUMLAR ─────────────────────────── */}
      <section className="px-5 pt-8 pb-2">
        <div className="flex items-end justify-between mb-5">
          <div className="section-header" style={{ marginBottom:0 }}>
            <div className="section-label">✦ Müşterilerimiz Diyor Ki</div>
            <h2 className="section-title">Yorumlar</h2>
            <div className="section-underline" />
          </div>
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <div
              style={{
                fontSize:26, fontWeight:900,
                background:"linear-gradient(135deg,#f0c96a,#d4a843)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text",
              }}
            >
              {ortPuan}
            </div>
            <div style={{ fontSize:9, color:"#555", letterSpacing:"0.5px" }}>/ 5.0 ★</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {yorumlar.slice(0, 3).map((y) => (
            <div
              key={y.id}
              style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:18, padding:18 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width:40, height:40, borderRadius:12, flexShrink:0,
                      background:"linear-gradient(135deg,#FFD700,#8a6a1a)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#000", fontWeight:900, fontSize:15,
                    }}
                  >
                    {y.musteriAdi[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, color:"#e8e8e8", fontSize:14 }}>{y.musteriAdi}</div>
                    {y.hizmet && <div style={{ fontSize:10, color:"#555", marginTop:1 }}>{y.hizmet}</div>}
                  </div>
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} style={{ color: s <= y.puan ? "#d4a843" : "#242424", fontSize:14 }}>★</span>
                    ))}
                  </div>
                  <div style={{ fontSize:9, color:"#444", textAlign:"right", marginTop:2 }}>{y.tarih}</div>
                </div>
              </div>
              <p style={{ color:"#888", fontSize:13, lineHeight:1.7, fontStyle:"italic" }}>
                &ldquo;{y.yorum}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEĞERLER ─────────────────────────── */}
      <section className="px-5 pt-8 pb-2">
        <div className="section-header">
          <div className="section-label">✦ İlkelerimiz</div>
          <h2 className="section-title">Kurumsal Değerler</h2>
          <div className="section-underline" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {KURUMSAL_DEGERLER.map((d) => (
            <div
              key={d.baslik}
              style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:16, padding:14 }}
            >
              <div style={{ fontSize:22, marginBottom:7 }}>{d.ikon}</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#d8d8d8", marginBottom:3 }}>{d.baslik}</div>
              <div style={{ fontSize:10, color:"#555", lineHeight:1.5 }}>{d.aciklama}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <section
        style={{
          background:"#080808",
          borderTop:"1px solid rgba(212,168,67,0.08)",
          margin:"32px 0 0",
          padding:"32px 20px 24px",
          textAlign:"center",
        }}
      >
        {/* ornament */}
        <div className="flex items-center gap-3 mb-5" style={{ opacity:0.3 }}>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#d4a843)" }} />
          <span style={{ color:"#d4a843", fontSize:14 }}>✦</span>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#d4a843,transparent)" }} />
        </div>

        <div
          style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:20, fontWeight:900,
            background:"linear-gradient(135deg,#f0c96a,#FFD700,#d4a843,#8a6a1a)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            marginBottom:3,
          }}
        >
          SALOON FERDİ ZOPCUK
        </div>
        <div style={{ fontSize:9, letterSpacing:"3px", color:"#404040", textTransform:"uppercase", marginBottom:16 }}>
          Premium Erkek Kuaförü · Adana Çukurova
        </div>

        <div style={{ color:"#606060", fontSize:12, marginBottom:6 }}>
          📍 {SALON_INFO.addressFull}
        </div>
        <a href={`tel:${SALON_INFO.phone}`} style={{ color:"#d4a843", fontWeight:700, fontSize:13 }}>
          📞 {SALON_INFO.phoneDisplay}
        </a>

        <div style={{ height:1, background:"#111", margin:"16px 0" }} />

        <div style={{ fontSize:11, color:"#404040", lineHeight:1.8 }}>
          <div>{SALON_INFO.workingHours.weekdays}</div>
          <div>{SALON_INFO.workingHours.sunday}</div>
        </div>

        <Link
          href="/iletisim"
          style={{
            display:"inline-flex", alignItems:"center", gap:5,
            marginTop:14, fontSize:11, fontWeight:700, color:"#d4a843",
            border:"1px solid rgba(212,168,67,0.25)", padding:"9px 18px",
            borderRadius:50, textDecoration:"none",
          }}
        >
          Tüm İletişim →
        </Link>
      </section>
    </div>
  );
}
