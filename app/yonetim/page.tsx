"use client";

import { useState, useEffect } from "react";
import {
  getRandevular, updateRandevu,
  getKampanyalar, saveKampanya, deleteKampanya,
  getGelirler, getMusteriler, getYorumlar, generateId,
} from "@/lib/storage";
import type { Randevu, Kampanya } from "@/lib/data";

const DURUM_CFG: Record<string, { label:string; color:string }> = {
  bekliyor:    { label:"Bekliyor",    color:"#f59e0b" },
  onaylandi:   { label:"Onaylandı",   color:"#27c982" },
  tamamlandi:  { label:"Tamamlandı",  color:"#60a5fa" },
  iptal:       { label:"İptal",       color:"#ff4d4d" },
};

const TABS = [
  { key:"ozet",       label:"Özet" },
  { key:"randevular", label:"Randevular" },
  { key:"kampanyalar",label:"Kampanyalar" },
] as const;

const RENKLER = ["#FFD700","#C084FC","#27c982","#ff4d4d","#60a5fa","#f59e0b"];

export default function YonetimSayfasi() {
  const [tab, setTab] = useState<"ozet"|"randevular"|"kampanyalar">("ozet");
  const [randevular, setRandevular]   = useState<Randevu[]>([]);
  const [kampanyalar, setKampanyalar] = useState<Kampanya[]>([]);
  const [istat, setIstat] = useState({ bugunCiro:0, ayCiro:0, toplamCiro:0, musteriler:0, randevuSayisi:0, yorumSayisi:0 });
  const [kampModal, setKampModal] = useState(false);
  const [kf, setKf] = useState({ baslik:"", aciklama:"", tarih:"", renk:"#FFD700", aktif:true });

  useEffect(() => { refresh(); }, []);

  const refresh = () => {
    setRandevular(getRandevular());
    setKampanyalar(getKampanyalar());
    const gelirler  = getGelirler();
    const today     = new Date().toISOString().split("T")[0];
    const ayBas     = new Date().toISOString().slice(0,7) + "-01";
    setIstat({
      bugunCiro:     gelirler.filter((g) => g.tarih === today).reduce((s,g) => s+g.miktar, 0),
      ayCiro:        gelirler.filter((g) => g.tarih >= ayBas).reduce((s,g) => s+g.miktar, 0),
      toplamCiro:    gelirler.reduce((s,g) => s+g.miktar, 0),
      musteriler:    getMusteriler().length,
      randevuSayisi: getRandevular().length,
      yorumSayisi:   getYorumlar().length,
    });
  };

  const saveK = () => {
    if (!kf.baslik.trim()) return;
    saveKampanya({ id:generateId(), ...kf });
    refresh(); setKampModal(false);
    setKf({ baslik:"", aciklama:"", tarih:"", renk:"#FFD700", aktif:true });
  };

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      {/* Header */}
      <div className="section-header">
        <div className="section-label">⚙️ Yönetici Paneli</div>
        <h1 className="section-title">Yönetim</h1>
        <div className="section-underline" />
      </div>

      {/* Tabs */}
      <div style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:14, display:"flex", padding:4, gap:3, marginBottom:22 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex:1, padding:"9px 6px", borderRadius:10, border:"none",
              background: tab === t.key ? "linear-gradient(135deg,#FFD700,#d4a843)" : "transparent",
              color: tab === t.key ? "#000" : "#505050",
              fontWeight: tab === t.key ? 800 : 600,
              fontSize:12, cursor:"pointer", transition:"all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── ÖZET ─────────────────────────────── */}
      {tab === "ozet" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
            {[
              { v:`${istat.bugunCiro.toLocaleString("tr-TR")}₺`, l:"Bugünkü Ciro",  i:"📅", c:"#d4a843" },
              { v:`${istat.ayCiro.toLocaleString("tr-TR")}₺`,    l:"Aylık Ciro",    i:"📆", c:"#27c982" },
              { v:`${istat.toplamCiro.toLocaleString("tr-TR")}₺`,l:"Toplam Ciro",   i:"💰", c:"#60a5fa" },
              { v:`${istat.musteriler}`,                          l:"Müşteri Sayısı",i:"👥", c:"#f59e0b" },
              { v:`${istat.randevuSayisi}`,                       l:"Randevu",       i:"📋", c:"#c084fc" },
              { v:`${istat.yorumSayisi}`,                         l:"Yorum",         i:"⭐", c:"#d4a843" },
            ].map((s) => (
              <div key={s.l} className="stat-card">
                <div style={{ fontSize:22, marginBottom:6 }}>{s.i}</div>
                <div style={{ fontSize:20, fontWeight:900, color:s.c, lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:10, color:"#505050", marginTop:4, letterSpacing:"0.5px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize:14, fontWeight:800, color:"#d0d0d0", marginBottom:10 }}>Hızlı İşlemler</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { l:"Randevuları Yönet", i:"📋", fn:() => setTab("randevular") },
              { l:"Kampanya Ekle",     i:"📢", fn:() => { setTab("kampanyalar"); setKampModal(true); } },
            ].map((item) => (
              <button
                key={item.l}
                onClick={item.fn}
                style={{
                  background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:14,
                  display:"flex", alignItems:"center", gap:12, padding:"14px 16px",
                  cursor:"pointer", width:"100%", textAlign:"left",
                }}
              >
                <span style={{ fontSize:20 }}>{item.i}</span>
                <span style={{ fontWeight:700, color:"#d0d0d0", fontSize:14, flex:1 }}>{item.l}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── RANDEVULAR ───────────────────────── */}
      {tab === "randevular" && (
        <div>
          <div style={{ fontSize:12, color:"#606060", marginBottom:14 }}>
            {randevular.length} randevu kayıtlı
          </div>
          {randevular.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 0", color:"#404040" }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📋</div>
              <div style={{ fontSize:14, fontWeight:600 }}>Henüz randevu yok</div>
            </div>
          ) : [...randevular].reverse().map((r) => {
            const cfg = DURUM_CFG[r.durum];
            return (
              <div key={r.id} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:18, marginBottom:10, overflow:"hidden" }}>
                <div style={{ padding:"14px 16px" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div style={{ fontWeight:700, color:"#e0e0e0", fontSize:14 }}>{r.ad}</div>
                      <div style={{ fontSize:11, color:"#505050", marginTop:1 }}>{r.telefon}</div>
                    </div>
                    <span style={{
                      background:`${cfg.color}15`,
                      color:cfg.color,
                      border:`1px solid ${cfg.color}35`,
                      fontSize:10, fontWeight:800,
                      padding:"3px 9px", borderRadius:50,
                    }}>
                      {cfg.label}
                    </span>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
                    {[
                      { l:"Hizmet", v:r.hizmet },
                      { l:"Tarih & Saat", v:`${r.tarih} ${r.saat}` },
                    ].map((f) => (
                      <div key={f.l} style={{ background:"#080808", borderRadius:9, padding:"8px 10px" }}>
                        <div style={{ fontSize:9, color:"#404040", marginBottom:2 }}>{f.l}</div>
                        <div style={{ fontSize:11, fontWeight:600, color:"#a0a0a0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.v}</div>
                      </div>
                    ))}
                  </div>

                  {r.not && (
                    <div style={{ fontSize:11, color:"#505050", marginBottom:10 }}>
                      📝 {r.not}
                    </div>
                  )}

                  {/* Status buttons */}
                  <div style={{ display:"flex", gap:5 }}>
                    {(Object.keys(DURUM_CFG) as Array<keyof typeof DURUM_CFG>).map((d) => (
                      <button
                        key={d}
                        onClick={() => { updateRandevu(r.id, { durum: d as Randevu["durum"] }); refresh(); }}
                        style={{
                          flex:1, padding:"6px 2px", borderRadius:8, border:"none",
                          background: r.durum === d ? `${DURUM_CFG[d].color}18` : "#0a0a0a",
                          color: r.durum === d ? DURUM_CFG[d].color : "#3a3a3a",
                          fontSize:9, fontWeight:700, cursor:"pointer",
                          transition:"all 0.2s",
                          outline: r.durum === d ? `1px solid ${DURUM_CFG[d].color}40` : "none",
                        }}
                      >
                        {DURUM_CFG[d].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── KAMPANYALAR ──────────────────────── */}
      {tab === "kampanyalar" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize:12, color:"#606060" }}>{kampanyalar.length} kampanya</div>
            <button
              onClick={() => setKampModal(true)}
              style={{
                background:"linear-gradient(135deg,#FFD700,#d4a843)",
                color:"#000", fontWeight:800, fontSize:11,
                padding:"8px 12px", borderRadius:50, border:"none", cursor:"pointer",
              }}
            >
              + Kampanya Ekle
            </button>
          </div>

          {kampanyalar.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 0", color:"#404040" }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📢</div>
              <div style={{ fontSize:14, fontWeight:600 }}>Kampanya yok</div>
            </div>
          ) : kampanyalar.map((k) => (
            <div
              key={k.id}
              style={{
                background:`${k.renk}06`, border:`1px solid ${k.renk}28`,
                borderRadius:16, padding:16, marginBottom:10,
              }}
            >
              <div className="flex items-start justify-between">
                <div style={{ flex:1, marginRight:12 }}>
                  <div style={{ color:k.renk, fontWeight:800, fontSize:14, marginBottom:4 }}>{k.baslik}</div>
                  <div style={{ color:"#808080", fontSize:12, lineHeight:1.6, marginBottom:6 }}>{k.aciklama}</div>
                  {k.tarih && <div style={{ color:"#505050", fontSize:10 }}>📅 {k.tarih} tarihine kadar</div>}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:5, flexShrink:0 }}>
                  <button
                    onClick={() => { saveKampanya({ ...k, aktif:!k.aktif }); refresh(); }}
                    style={{
                      background: k.aktif ? "rgba(39,201,130,0.1)" : "#161616",
                      color: k.aktif ? "#27c982" : "#505050",
                      border: `1px solid ${k.aktif ? "rgba(39,201,130,0.25)" : "#1e1e1e"}`,
                      fontSize:10, fontWeight:700,
                      padding:"5px 10px", borderRadius:50, cursor:"pointer",
                    }}
                  >
                    {k.aktif ? "Aktif" : "Pasif"}
                  </button>
                  <button
                    onClick={() => { deleteKampanya(k.id); refresh(); }}
                    style={{
                      background:"rgba(255,77,77,0.08)", color:"#ff4d4d",
                      border:"1px solid rgba(255,77,77,0.2)",
                      fontSize:10, fontWeight:600,
                      padding:"5px 10px", borderRadius:50, cursor:"pointer",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign modal */}
      {kampModal && (
        <div
          style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(10px)", position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:12 }}
          onClick={(e) => e.target === e.currentTarget && setKampModal(false)}
        >
          <div
            className="anim-slide-in"
            style={{
              background:"#0e0e0e", border:"1px solid #242424",
              borderRadius:"22px 22px 0 0", width:"100%", maxWidth:468,
              maxHeight:"90vh", overflowY:"auto", paddingBottom:32,
            }}
          >
            <div style={{ padding:"16px 18px", borderBottom:"1px solid #161616", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:"#0e0e0e" }}>
              <span style={{ fontWeight:800, color:"#e0e0e0", fontSize:16 }}>Yeni Kampanya</span>
              <button onClick={() => setKampModal(false)} style={{ width:28, height:28, borderRadius:"50%", background:"#1a1a1a", border:"none", color:"#666", fontSize:16, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ padding:"18px 18px 0", display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Başlık *</label>
                <input value={kf.baslik} onChange={(e) => setKf((p) => ({ ...p, baslik:e.target.value }))} placeholder="Kampanya başlığı" className="field" />
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Açıklama</label>
                <textarea value={kf.aciklama} onChange={(e) => setKf((p) => ({ ...p, aciklama:e.target.value }))} placeholder="Kampanya detayları..." rows={3} className="field" style={{ resize:"none" }} />
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Bitiş Tarihi</label>
                <input type="date" value={kf.tarih} onChange={(e) => setKf((p) => ({ ...p, tarih:e.target.value }))} className="field" />
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:8 }}>Renk Teması</label>
                <div style={{ display:"flex", gap:8 }}>
                  {RENKLER.map((r) => (
                    <button
                      key={r}
                      onClick={() => setKf((p) => ({ ...p, renk:r }))}
                      style={{
                        width:36, height:36, borderRadius:10, background:r,
                        border: kf.renk === r ? "3px solid #fff" : "2px solid transparent",
                        cursor:"pointer", transition:"all 0.15s",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"4px 0" }}>
                <div
                  className="toggle"
                  style={{ background: kf.aktif ? "#d4a843" : "#1e1e1e" }}
                  onClick={() => setKf((p) => ({ ...p, aktif:!p.aktif }))}
                >
                  <div className="toggle-thumb" style={{ left: kf.aktif ? 23 : 3 }} />
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:"#d0d0d0" }}>Aktif olarak yayınla</span>
              </div>

              <button
                onClick={saveK}
                disabled={!kf.baslik.trim()}
                style={{
                  padding:"16px", borderRadius:50,
                  background: kf.baslik.trim() ? "linear-gradient(135deg,#FFD700,#d4a843)" : "#161616",
                  color: kf.baslik.trim() ? "#000" : "#404040",
                  fontWeight:800, fontSize:15, border:"none",
                  cursor: kf.baslik.trim() ? "pointer" : "not-allowed",
                  marginTop:4,
                }}
              >
                Kampanya Yayınla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
