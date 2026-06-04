"use client";

import { useState, useEffect } from "react";
import { getYorumlar, saveYorum, generateId } from "@/lib/storage";
import type { Yorum } from "@/lib/data";

const GALERI = [
  { id:1, baslik:"Klasik Fade Kesim",        tip:"onceSonra", g1:"#1a0a2e", g2:"#d4a843" },
  { id:2, baslik:"Modern Sakal Şekillendirme",tip:"hizmet",   g1:"#0a1a2e", g2:"#4a9eff" },
  { id:3, baslik:"Pompadour Stil",            tip:"onceSonra", g1:"#1a1a0a", g2:"#f0c96a" },
  { id:4, baslik:"ROYAL EXPERIENCE",          tip:"paket",    g1:"#1a0a2e", g2:"#c084fc" },
  { id:5, baslik:"Saç + Sakal Combo",         tip:"hizmet",   g1:"#0a1a10", g2:"#27c982" },
  { id:6, baslik:"Keratin Sonuçları",         tip:"onceSonra", g1:"#1a0a0a", g2:"#f59e0b" },
];

const CATS = [
  { key:"hepsi",    label:"Tümü" },
  { key:"onceSonra",label:"Önce/Sonra" },
  { key:"hizmet",   label:"Hizmet" },
  { key:"paket",    label:"Paket" },
] as const;

export default function GaleriSayfasi() {
  const [yorumlar, setYorumlar] = useState<Yorum[]>([]);
  const [formAcik, setFormAcik] = useState(false);
  const [fy, setFy] = useState({ musteriAdi:"", puan:5, yorum:"", hizmet:"" });
  const [cat, setCat] = useState<"hepsi"|"onceSonra"|"hizmet"|"paket">("hepsi");

  useEffect(() => { setYorumlar(getYorumlar()); }, []);

  const filtered = cat === "hepsi" ? GALERI : GALERI.filter((g) => g.tip === cat);

  const saveY = () => {
    if (!fy.musteriAdi.trim() || !fy.yorum.trim()) return;
    saveYorum({ id:generateId(), ...fy, tarih:new Date().toLocaleDateString("tr-TR") });
    setYorumlar(getYorumlar());
    setFormAcik(false);
    setFy({ musteriAdi:"", puan:5, yorum:"", hizmet:"" });
  };

  const ort = yorumlar.length ? yorumlar.reduce((s, y) => s + y.puan, 0) / yorumlar.length : 5;

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      {/* Header */}
      <div className="section-header">
        <div className="section-label">✦ Çalışmalar & Deneyimler</div>
        <h1 className="section-title">Galeri</h1>
        <div className="section-underline" />
      </div>

      {/* Category filter */}
      <div style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:14, display:"flex", padding:4, gap:3, marginBottom:18 }}>
        {CATS.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            style={{
              flex:1, padding:"9px 4px", borderRadius:10, border:"none",
              background: cat === c.key ? "linear-gradient(135deg,#FFD700,#d4a843)" : "transparent",
              color: cat === c.key ? "#000" : "#505050",
              fontWeight: cat === c.key ? 800 : 600,
              fontSize:10, cursor:"pointer", transition:"all 0.2s",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:32 }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            className="hover-lift"
            style={{
              height:160, borderRadius:18,
              background:`linear-gradient(135deg,${item.g1},${item.g2}55)`,
              border:"1px solid rgba(255,255,255,0.04)",
              position:"relative", overflow:"hidden", cursor:"pointer",
            }}
          >
            <div style={{
              position:"absolute", inset:0,
              background:`radial-gradient(circle at 75% 25%,${item.g2}40,transparent 65%)`,
            }} />
            {/* type badge */}
            <div style={{
              position:"absolute", top:10, right:10,
              background:"rgba(0,0,0,0.5)", borderRadius:8,
              width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, backdropFilter:"blur(4px)",
            }}>
              {item.tip === "onceSonra" ? "↔️" : item.tip === "paket" ? "👑" : "✂️"}
            </div>
            {/* label */}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              background:"linear-gradient(transparent,rgba(0,0,0,0.88))",
              padding:"24px 12px 12px",
            }}>
              <div style={{ color:"#fff", fontSize:11, fontWeight:700, lineHeight:1.3 }}>{item.baslik}</div>
              <div style={{ color:item.g2, fontSize:9, marginTop:3, textTransform:"capitalize", opacity:0.8 }}>
                {item.tip === "onceSonra" ? "Önce / Sonra" : item.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add photo placeholder */}
      <div
        style={{
          background:"#080808", border:"2px dashed #1a1a1a",
          borderRadius:18, padding:28, textAlign:"center", marginBottom:32,
        }}
      >
        <div style={{ fontSize:28, marginBottom:8, opacity:0.3 }}>📸</div>
        <div style={{ color:"#404040", fontSize:12, fontWeight:600 }}>Yeni fotoğraf ekle</div>
        <div style={{ color:"#2a2a2a", fontSize:10, marginTop:3 }}>Yakında aktif olacak</div>
      </div>

      {/* Section divider */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, opacity:0.25 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#d4a843)" }} />
        <span style={{ color:"#d4a843", fontSize:12 }}>✦</span>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#d4a843,transparent)" }} />
      </div>

      {/* Reviews header */}
      <div className="flex items-end justify-between mb-5">
        <div className="section-header" style={{ marginBottom:0 }}>
          <div className="section-label">✦ Müşteri Yorumları</div>
          <h2 className="section-title">Değerlendirmeler</h2>
          <div className="section-underline" />
        </div>
        <button
          onClick={() => setFormAcik(true)}
          style={{
            background:"rgba(212,168,67,0.08)",
            border:"1px solid rgba(212,168,67,0.2)",
            color:"#d4a843",
            fontSize:11, fontWeight:700,
            padding:"8px 12px", borderRadius:50, cursor:"pointer",
            flexShrink:0,
          }}
        >
          + Yorum Yap
        </button>
      </div>

      {/* Rating overview */}
      <div style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:18, padding:18, marginBottom:16, display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ textAlign:"center", minWidth:70 }}>
          <div style={{ fontSize:36, fontWeight:900, color:"#d4a843", lineHeight:1 }}>{ort.toFixed(1)}</div>
          <div style={{ display:"flex", gap:2, justifyContent:"center", marginTop:4 }}>
            {[1,2,3,4,5].map((s) => (
              <span key={s} style={{ color: s <= Math.round(ort) ? "#d4a843" : "#1e1e1e", fontSize:14 }}>★</span>
            ))}
          </div>
          <div style={{ fontSize:9, color:"#505050", marginTop:4 }}>{yorumlar.length} yorum</div>
        </div>
        <div style={{ flex:1 }}>
          {[5,4,3,2,1].map((s) => {
            const sayi = yorumlar.filter((y) => y.puan === s).length;
            const pct  = yorumlar.length ? (sayi / yorumlar.length) * 100 : 0;
            return (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                <span style={{ fontSize:10, color:"#505050", width:8 }}>{s}</span>
                <span style={{ color:"#d4a843", fontSize:10 }}>★</span>
                <div style={{ flex:1, height:5, background:"#161616", borderRadius:3 }}>
                  <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#d4a843,#8a6a1a)", borderRadius:3, transition:"width 0.4s" }} />
                </div>
                <span style={{ fontSize:9, color:"#404040", width:12 }}>{sayi}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-3">
        {yorumlar.length === 0 ? (
          <div style={{ textAlign:"center", padding:"36px 0", color:"#404040" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>💬</div>
            <div style={{ fontSize:14, fontWeight:600 }}>Henüz yorum yok</div>
            <div style={{ fontSize:11, marginTop:4 }}>İlk yorumu siz yapın!</div>
          </div>
        ) : yorumlar.map((y) => (
          <div key={y.id} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:18, padding:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{
                  width:40, height:40, borderRadius:12,
                  background:"linear-gradient(135deg,#FFD700,#8a6a1a)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#000", fontWeight:900, fontSize:15, flexShrink:0,
                }}>
                  {y.musteriAdi[0]}
                </div>
                <div>
                  <div style={{ fontWeight:700, color:"#e0e0e0", fontSize:14 }}>{y.musteriAdi}</div>
                  {y.hizmet && <div style={{ fontSize:10, color:"#505050", marginTop:1 }}>{y.hizmet}</div>}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map((s) => <span key={s} style={{ color: s <= y.puan ? "#d4a843" : "#1e1e1e", fontSize:13 }}>★</span>)}
                </div>
                <div style={{ fontSize:9, color:"#404040", marginTop:2 }}>{y.tarih}</div>
              </div>
            </div>
            <p style={{ color:"#808080", fontSize:13, lineHeight:1.7, fontStyle:"italic" }}>&ldquo;{y.yorum}&rdquo;</p>
          </div>
        ))}
      </div>

      {/* Review form modal */}
      {formAcik && (
        <div
          style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(10px)", position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:12 }}
          onClick={(e) => e.target === e.currentTarget && setFormAcik(false)}
        >
          <div
            className="anim-slide-in"
            style={{
              background:"#0e0e0e", border:"1px solid #242424",
              borderRadius:"22px 22px 0 0", width:"100%", maxWidth:468,
              paddingBottom:32,
            }}
          >
            <div style={{ padding:"16px 18px", borderBottom:"1px solid #161616", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontWeight:800, color:"#e0e0e0", fontSize:16 }}>Yorum Yap</span>
              <button onClick={() => setFormAcik(false)} style={{ width:28, height:28, borderRadius:"50%", background:"#1a1a1a", border:"none", color:"#666", fontSize:16, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ padding:"18px 18px 0", display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Adınız</label>
                <input value={fy.musteriAdi} onChange={(e) => setFy((p) => ({ ...p, musteriAdi:e.target.value }))} placeholder="Ad Soyad" className="field" />
              </div>

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:8 }}>Puanınız</label>
                <div style={{ display:"flex", gap:6 }}>
                  {[1,2,3,4,5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFy((p) => ({ ...p, puan:s }))}
                      style={{
                        fontSize:30, color: s <= fy.puan ? "#d4a843" : "#1e1e1e",
                        background:"none", border:"none", cursor:"pointer",
                        transform: s <= fy.puan ? "scale(1.1)" : "scale(1)",
                        transition:"all 0.15s",
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Aldığınız Hizmet</label>
                <input value={fy.hizmet} onChange={(e) => setFy((p) => ({ ...p, hizmet:e.target.value }))} placeholder="Örn: SIGNATURE Paket" className="field" />
              </div>

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Yorumunuz</label>
                <textarea value={fy.yorum} onChange={(e) => setFy((p) => ({ ...p, yorum:e.target.value }))} placeholder="Deneyiminizi paylaşın..." rows={3} className="field" style={{ resize:"none" }} />
              </div>

              <button
                onClick={saveY}
                disabled={!fy.musteriAdi.trim() || !fy.yorum.trim()}
                style={{
                  padding:"16px", borderRadius:50,
                  background: fy.musteriAdi.trim() && fy.yorum.trim() ? "linear-gradient(135deg,#FFD700,#d4a843)" : "#161616",
                  color: fy.musteriAdi.trim() && fy.yorum.trim() ? "#000" : "#404040",
                  fontWeight:800, fontSize:15, border:"none",
                  cursor: fy.musteriAdi.trim() && fy.yorum.trim() ? "pointer" : "not-allowed",
                  marginTop:4,
                }}
              >
                Yorum Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
