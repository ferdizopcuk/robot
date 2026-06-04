"use client";

import { useState, useEffect } from "react";
import { getGelirler, saveGelir, deleteGelir, generateId } from "@/lib/storage";
import { HIZMETLER, PAKETLER } from "@/lib/data";
import type { GelirKayit } from "@/lib/data";

const HIZMET_LISTESI = [
  ...HIZMETLER.map((h) => h.ad),
  ...PAKETLER.map((p) => `${p.ad} Paketi`),
];

const EMPTY = {
  tarih: new Date().toISOString().split("T")[0],
  miktar: 0, hizmet: "", musteriAdi: "",
  efeKazanc: 0, efeDukkanKatkisi: 0, notlar: "",
};

const FILTERS = [
  { key:"bugun",  label:"Bugün" },
  { key:"hafta",  label:"Bu Hafta" },
  { key:"ay",     label:"Bu Ay" },
  { key:"tum",    label:"Tümü" },
] as const;

export default function GelirSayfasi() {
  const [gelirler, setGelirler] = useState<GelirKayit[]>([]);
  const [modalAcik, setModalAcik] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [silId, setSilId] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<"bugun"|"hafta"|"ay"|"tum">("bugun");

  useEffect(() => { setGelirler(getGelirler()); }, []);
  const refresh = () => setGelirler(getGelirler());

  const today   = new Date().toISOString().split("T")[0];
  const ayBas   = new Date().toISOString().slice(0, 7) + "-01";
  const haftaBas = (() => { const d = new Date(); d.setDate(d.getDate() - d.getDay() + 1); return d.toISOString().split("T")[0]; })();

  const filtered = gelirler.filter((g) => {
    if (filtre === "bugun") return g.tarih === today;
    if (filtre === "hafta") return g.tarih >= haftaBas;
    if (filtre === "ay")    return g.tarih >= ayBas;
    return true;
  });

  const ciro    = filtered.reduce((s, g) => s + g.miktar, 0);
  const efe     = filtered.reduce((s, g) => s + (g.efeKazanc || 0), 0);
  const katkı   = filtered.reduce((s, g) => s + (g.efeDukkanKatkisi || 0), 0);
  const ortKisi = filtered.length ? Math.round(ciro / filtered.length) : 0;

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value }));

  const save = () => { saveGelir({ id: generateId(), ...form }); refresh(); setModalAcik(false); setForm(EMPTY); };
  const del  = (id: string) => { deleteGelir(id); setSilId(null); refresh(); };

  const filtreLbl = FILTERS.find((f) => f.key === filtre)?.label || "";

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="section-header" style={{ marginBottom:0 }}>
          <div className="section-label">✦ Ciro & Kazanç</div>
          <h1 className="section-title">Gelir Takibi</h1>
          <div className="section-underline" />
        </div>
        <button
          onClick={() => { setModalAcik(true); setForm(EMPTY); }}
          style={{
            background:"linear-gradient(135deg,#FFD700,#d4a843)",
            color:"#000", fontWeight:800, fontSize:12,
            padding:"9px 14px", borderRadius:50, border:"none",
            cursor:"pointer", flexShrink:0,
            boxShadow:"0 3px 12px rgba(212,168,67,0.3)",
          }}
        >
          + Ekle
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:14, display:"flex", padding:4, gap:3, marginBottom:18 }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltre(f.key)}
            style={{
              flex:1, padding:"9px 6px", borderRadius:10, border:"none",
              background: filtre === f.key ? "linear-gradient(135deg,#FFD700,#d4a843)" : "transparent",
              color: filtre === f.key ? "#000" : "#505050",
              fontWeight: filtre === f.key ? 800 : 600,
              fontSize:11, cursor:"pointer", transition:"all 0.2s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        {[
          { v:`${ciro.toLocaleString("tr-TR")}₺`, l:`${filtreLbl} Ciro`, i:"💰", c:"#d4a843" },
          { v:`${filtered.length}`, l:"İşlem Sayısı", i:"🧾", c:"#60a5fa" },
          { v:`${efe.toLocaleString("tr-TR")}₺`, l:"Efe Kazancı", i:"👨", c:"#27c982" },
          { v:`${ortKisi.toLocaleString("tr-TR")}₺`, l:"Kişi Başı Ort.", i:"📊", c:"#f59e0b" },
        ].map((s) => (
          <div key={s.l} className="stat-card">
            <div style={{ fontSize:22, marginBottom:6 }}>{s.i}</div>
            <div style={{ fontSize:20, fontWeight:900, color:s.c, lineHeight:1 }}>{s.v}</div>
            <div style={{ fontSize:10, color:"#505050", marginTop:4, letterSpacing:"0.5px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Efe summary */}
      {(efe > 0 || katkı > 0) && (
        <div
          style={{
            background:"rgba(39,201,130,0.05)",
            border:"1px solid rgba(39,201,130,0.15)",
            borderRadius:16, padding:14, marginBottom:16,
          }}
        >
          <div style={{ color:"#27c982", fontWeight:800, fontSize:12, marginBottom:10, letterSpacing:"0.5px" }}>
            👨 Efe Çalışan Özeti — {filtreLbl}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <div>
              <div style={{ fontSize:10, color:"#404040", marginBottom:3 }}>Efe Kazancı</div>
              <div style={{ fontSize:18, fontWeight:900, color:"#27c982" }}>{efe.toLocaleString("tr-TR")}₺</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:"#404040", marginBottom:3 }}>Dükkana Katkı</div>
              <div style={{ fontSize:18, fontWeight:900, color:"#60a5fa" }}>{katkı.toLocaleString("tr-TR")}₺</div>
            </div>
          </div>
        </div>
      )}

      {/* Records */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"48px 0", color:"#404040" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>💰</div>
            <div style={{ fontWeight:600, fontSize:14 }}>{filtreLbl} için kayıt yok</div>
            <div style={{ fontSize:12, marginTop:4 }}>+ butonu ile gelir ekleyin</div>
          </div>
        ) : [...filtered].reverse().map((g) => (
          <div key={g.id} style={{ background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:16, padding:14 }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20, fontWeight:900, color:"#d4a843", lineHeight:1 }}>
                    {g.miktar.toLocaleString("tr-TR")}₺
                  </span>
                  {g.musteriAdi && (
                    <span style={{ background:"#161616", color:"#606060", fontSize:10, padding:"2px 8px", borderRadius:50 }}>
                      {g.musteriAdi}
                    </span>
                  )}
                </div>
                <div style={{ fontSize:12, color:"#808080", marginBottom:3 }}>{g.hizmet || "—"}</div>
                <div style={{ fontSize:10, color:"#404040" }}>{g.tarih}</div>
                {(g.efeKazanc || g.efeDukkanKatkisi) ? (
                  <div style={{ display:"flex", gap:6, marginTop:6 }}>
                    {g.efeKazanc ? (
                      <span style={{ background:"rgba(39,201,130,0.08)", color:"#27c982", fontSize:10, padding:"3px 8px", borderRadius:50 }}>
                        Efe {g.efeKazanc}₺
                      </span>
                    ) : null}
                    {g.efeDukkanKatkisi ? (
                      <span style={{ background:"rgba(96,165,250,0.08)", color:"#60a5fa", fontSize:10, padding:"3px 8px", borderRadius:50 }}>
                        Katkı {g.efeDukkanKatkisi}₺
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <button
                onClick={() => setSilId(g.id)}
                style={{ background:"none", border:"none", color:"#2a2a2a", cursor:"pointer", fontSize:16, padding:"4px", flexShrink:0 }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add modal */}
      {modalAcik && (
        <div
          style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(10px)", position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:12 }}
          onClick={(e) => e.target === e.currentTarget && setModalAcik(false)}
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
              <span style={{ fontWeight:800, color:"#e0e0e0", fontSize:16 }}>Gelir Ekle</span>
              <button onClick={() => setModalAcik(false)} style={{ width:28, height:28, borderRadius:"50%", background:"#1a1a1a", border:"none", color:"#666", fontSize:16, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ padding:"18px 18px 0", display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { name:"tarih", label:"Tarih", type:"date" },
                { name:"miktar", label:"Tutar (₺) *", type:"number" },
                { name:"musteriAdi", label:"Müşteri Adı", type:"text" },
              ].map((f) => (
                <div key={f.name}>
                  <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>{f.label}</label>
                  <input name={f.name} type={f.type} value={(form as Record<string,unknown>)[f.name] as string|number} onChange={set} placeholder={f.type==="number"?"0":""} className="field" min={f.type==="number"?"0":undefined} />
                </div>
              ))}

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Hizmet</label>
                <select name="hizmet" value={form.hizmet} onChange={set} className="field" style={{ appearance:"none" }}>
                  <option value="">Seçin</option>
                  {HIZMET_LISTESI.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              {/* Efe section */}
              <div style={{ background:"rgba(39,201,130,0.04)", border:"1px solid rgba(39,201,130,0.12)", borderRadius:14, padding:14 }}>
                <div style={{ color:"#27c982", fontSize:11, fontWeight:700, marginBottom:12, letterSpacing:"0.5px" }}>👨 Efe Çalışan Takibi</div>
                {[
                  { name:"efeKazanc", label:"Efe Kazancı (₺)" },
                  { name:"efeDukkanKatkisi", label:"Dükkana Katkı (₺)" },
                ].map((f) => (
                  <div key={f.name} style={{ marginBottom:10 }}>
                    <label style={{ fontSize:10, color:"#505050", display:"block", marginBottom:5 }}>{f.label}</label>
                    <input name={f.name} type="number" value={(form as Record<string,unknown>)[f.name] as number} onChange={set} placeholder="0" className="field" min="0" />
                  </div>
                ))}
              </div>

              <button
                onClick={save}
                disabled={!form.miktar}
                style={{
                  padding:"16px", borderRadius:50,
                  background: form.miktar ? "linear-gradient(135deg,#FFD700,#d4a843)" : "#161616",
                  color: form.miktar ? "#000" : "#404040",
                  fontWeight:800, fontSize:15, border:"none",
                  cursor: form.miktar ? "pointer" : "not-allowed",
                  marginTop:4,
                }}
              >
                Geliri Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {silId && (
        <div style={{ background:"rgba(0,0,0,0.85)", position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:"#0e0e0e", border:"1px solid #242424", borderRadius:20, padding:24, maxWidth:280, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>⚠️</div>
            <div style={{ fontWeight:800, color:"#e0e0e0", marginBottom:5 }}>Kaydı Sil</div>
            <div style={{ color:"#606060", fontSize:12, marginBottom:18 }}>Bu işlem geri alınamaz.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setSilId(null)} style={{ flex:1, padding:"12px", borderRadius:50, background:"#161616", border:"1px solid #1e1e1e", color:"#888", fontWeight:600, cursor:"pointer" }}>İptal</button>
              <button onClick={() => del(silId)} style={{ flex:1, padding:"12px", borderRadius:50, background:"rgba(255,77,77,0.15)", border:"1px solid rgba(255,77,77,0.3)", color:"#ff4d4d", fontWeight:700, cursor:"pointer" }}>Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
