"use client";

import { useState, useEffect } from "react";
import { getMusteriler, saveMusteri, deleteMusteri, generateId } from "@/lib/storage";
import { HIZMETLER, PAKETLER } from "@/lib/data";
import type { Musteri } from "@/lib/data";

const HIZMET_LISTESI = [
  ...HIZMETLER.map((h) => h.ad),
  ...PAKETLER.map((p) => `${p.ad} Paketi`),
];

const EMPTY: Omit<Musteri, "id"> = {
  ad: "", telefon: "",
  sonGelisTarihi: new Date().toISOString().split("T")[0],
  alinanHizmet: "", odeme: 0, notlar: "",
  sadikMusteri: false, toplamZiyaret: 1, toplamHarcama: 0,
};

export default function MusterilerSayfasi() {
  const [list, setList] = useState<Musteri[]>([]);
  const [arama, setArama] = useState("");
  const [modalAcik, setModalAcik] = useState(false);
  const [form, setForm] = useState<Omit<Musteri, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [silId, setSilId] = useState<string | null>(null);

  useEffect(() => { setList(getMusteriler()); }, []);
  const refresh = () => setList(getMusteriler());

  const filtered = list.filter(
    (m) => m.ad.toLowerCase().includes(arama.toLowerCase()) || m.telefon.includes(arama)
  );

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const save = () => {
    saveMusteri({ id: editId || generateId(), ...form, toplamHarcama: form.toplamHarcama || form.odeme });
    refresh(); setModalAcik(false); setEditId(null); setForm(EMPTY);
  };

  const edit = (m: Musteri) => { setForm({ ...m }); setEditId(m.id); setModalAcik(true); };
  const del  = (id: string) => { deleteMusteri(id); setSilId(null); refresh(); };

  const sadik = list.filter((m) => m.sadikMusteri).length;
  const toplamHarcama = list.reduce((s, m) => s + m.toplamHarcama, 0);

  return (
    <div className="max-w-lg mx-auto px-5 py-7">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="section-header" style={{ marginBottom:0 }}>
          <div className="section-label">✦ Müşteri Yönetimi</div>
          <h1 className="section-title">Müşteriler</h1>
          <div className="section-underline" />
        </div>
        <button
          onClick={() => { setModalAcik(true); setEditId(null); setForm(EMPTY); }}
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { v: list.length, l: "Toplam", i: "👥" },
          { v: sadik, l: "Sadık", i: "💛" },
          { v: list.length > 0 ? `${Math.round(toplamHarcama / list.length).toLocaleString("tr-TR")}₺` : "0₺", l: "Ort. Harcama", i: "💰" },
        ].map((s) => (
          <div key={s.l} className="stat-card">
            <div style={{ fontSize:20, marginBottom:5 }}>{s.i}</div>
            <div style={{ fontSize:18, fontWeight:900, color:"#d4a843" }}>{s.v}</div>
            <div style={{ fontSize:9, color:"#505050", marginTop:2, letterSpacing:"0.5px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position:"relative", marginBottom:18 }}>
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#404040", fontSize:15 }}>🔍</span>
        <input
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="İsim veya telefon ara..."
          className="field"
          style={{ paddingLeft:40 }}
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"48px 0", color:"#404040" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>👥</div>
            <div style={{ fontWeight:600, fontSize:14 }}>Müşteri bulunamadı</div>
            <div style={{ fontSize:12, marginTop:4 }}>+ butonu ile müşteri ekleyin</div>
          </div>
        ) : filtered.map((m) => (
          <div
            key={m.id}
            style={{
              background:"#0e0e0e",
              border:`1px solid ${m.sadikMusteri ? "rgba(212,168,67,0.2)" : "#1e1e1e"}`,
              borderRadius:18, overflow:"hidden",
            }}
          >
            <div style={{ padding:16 }}>
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width:44, height:44, borderRadius:13, flexShrink:0,
                      background: m.sadikMusteri
                        ? "linear-gradient(135deg,#FFD700,#8a6a1a)"
                        : "#1a1a1a",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontWeight:900, fontSize:15,
                      color: m.sadikMusteri ? "#000" : "#505050",
                    }}
                  >
                    {m.ad.split(" ").map((n) => n[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontWeight:700, color:"#e0e0e0", fontSize:14 }}>{m.ad}</span>
                      {m.sadikMusteri && (
                        <span style={{
                          background:"rgba(212,168,67,0.1)",
                          color:"#d4a843",
                          fontSize:8, fontWeight:900,
                          padding:"2px 6px", borderRadius:50,
                          letterSpacing:"1px",
                        }}>
                          ★ SADIK
                        </span>
                      )}
                    </div>
                    <a href={`tel:${m.telefon}`} style={{ color:"#505050", fontSize:11 }}>{m.telefon}</a>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button
                    onClick={() => edit(m)}
                    style={{
                      width:32, height:32, borderRadius:9, border:"none",
                      background:"rgba(212,168,67,0.08)", cursor:"pointer",
                      fontSize:14, display:"flex", alignItems:"center", justifyContent:"center",
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setSilId(m.id)}
                    style={{
                      width:32, height:32, borderRadius:9, border:"none",
                      background:"rgba(255,77,77,0.08)", cursor:"pointer",
                      fontSize:14, display:"flex", alignItems:"center", justifyContent:"center",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {[
                  { l:"Son Hizmet", v: m.alinanHizmet || "—" },
                  { l:"Son Geliş", v: m.sonGelisTarihi || "—" },
                  { l:"Ziyaret", v: `${m.toplamZiyaret}x`, gold:true },
                  { l:"Toplam Harcama", v: `${m.toplamHarcama.toLocaleString("tr-TR")}₺`, gold:true },
                ].map((s) => (
                  <div key={s.l} style={{ background:"#080808", borderRadius:9, padding:"8px 10px" }}>
                    <div style={{ fontSize:9, color:"#404040", marginBottom:2, letterSpacing:"0.5px" }}>{s.l}</div>
                    <div style={{ fontSize:12, fontWeight:700, color: s.gold ? "#d4a843" : "#a0a0a0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.v}</div>
                  </div>
                ))}
              </div>

              {m.notlar && (
                <div style={{ background:"#080808", borderRadius:9, padding:"8px 10px", marginTop:6 }}>
                  <span style={{ fontSize:9, color:"#404040" }}>NOT: </span>
                  <span style={{ fontSize:11, color:"#707070" }}>{m.notlar}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
            <div style={{
              padding:"16px 18px", borderBottom:"1px solid #161616",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              position:"sticky", top:0, background:"#0e0e0e", zIndex:1,
            }}>
              <span style={{ fontWeight:800, color:"#e0e0e0", fontSize:16 }}>
                {editId ? "Müşteriyi Düzenle" : "Yeni Müşteri"}
              </span>
              <button onClick={() => setModalAcik(false)} style={{ width:28, height:28, borderRadius:"50%", background:"#1a1a1a", border:"none", color:"#666", fontSize:16, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ padding:"18px 18px 0", display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { name:"ad", label:"Ad Soyad", type:"text", placeholder:"Müşteri adı" },
                { name:"telefon", label:"Telefon", type:"tel", placeholder:"0 5XX XXX XX XX" },
                { name:"sonGelisTarihi", label:"Son Geliş Tarihi", type:"date", placeholder:"" },
                { name:"odeme", label:"Ödeme (₺)", type:"number", placeholder:"0" },
                { name:"toplamZiyaret", label:"Toplam Ziyaret", type:"number", placeholder:"1" },
                { name:"toplamHarcama", label:"Toplam Harcama (₺)", type:"number", placeholder:"0" },
              ].map((f) => (
                <div key={f.name}>
                  <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>{f.label}</label>
                  <input name={f.name} type={f.type} value={(form as Record<string,unknown>)[f.name] as string|number} onChange={set} placeholder={f.placeholder} className="field" />
                </div>
              ))}

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Alınan Hizmet</label>
                <select name="alinanHizmet" value={form.alinanHizmet} onChange={set} className="field" style={{ appearance:"none" }}>
                  <option value="">Seçin</option>
                  {HIZMET_LISTESI.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize:10, fontWeight:700, color:"#505050", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:6 }}>Notlar</label>
                <textarea name="notlar" value={form.notlar} onChange={set} placeholder="Müşteri hakkında notlar..." rows={2} className="field" style={{ resize:"none" }} />
              </div>

              {/* Toggle */}
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"4px 0" }}>
                <div
                  className="toggle"
                  style={{ background: form.sadikMusteri ? "#d4a843" : "#1e1e1e" }}
                  onClick={() => setForm((p) => ({ ...p, sadikMusteri: !p.sadikMusteri }))}
                >
                  <div className="toggle-thumb" style={{ left: form.sadikMusteri ? 23 : 3 }} />
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:"#d0d0d0" }}>Sadık Müşteri</span>
              </div>

              <button
                onClick={save}
                disabled={!form.ad.trim() || !form.telefon.trim()}
                style={{
                  padding:"16px", borderRadius:50,
                  background: form.ad.trim() && form.telefon.trim() ? "linear-gradient(135deg,#FFD700,#d4a843)" : "#161616",
                  color: form.ad.trim() && form.telefon.trim() ? "#000" : "#404040",
                  fontWeight:800, fontSize:15, border:"none", cursor: form.ad.trim() ? "pointer" : "not-allowed",
                  marginTop:4,
                }}
              >
                {editId ? "Güncelle" : "Müşteri Ekle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {silId && (
        <div style={{ background:"rgba(0,0,0,0.85)", position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:"#0e0e0e", border:"1px solid #242424", borderRadius:20, padding:24, maxWidth:300, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>⚠️</div>
            <div style={{ fontWeight:800, color:"#e0e0e0", marginBottom:6 }}>Müşteriyi Sil</div>
            <div style={{ color:"#606060", fontSize:13, marginBottom:20 }}>Bu işlem geri alınamaz.</div>
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
