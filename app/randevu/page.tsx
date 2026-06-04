"use client";

import { useState } from "react";
import { HIZMETLER, PAKETLER, SALON_INFO, RANDEVU_SAATLERI } from "@/lib/data";
import { saveRandevu, generateId } from "@/lib/storage";

export default function RandevuSayfasi() {
  const [form, setForm] = useState({
    ad: "", telefon: "", hizmet: "", tarih: "", saat: "", not: "",
  });
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const waUrl = () => {
    const msg =
      `*YENİ RANDEVU TALEBİ* ✂️%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `👤 *Ad Soyad:* ${form.ad}%0A` +
      `📞 *Telefon:* ${form.telefon}%0A` +
      `✂️ *Hizmet:* ${form.hizmet}%0A` +
      `📅 *Tarih:* ${form.tarih}%0A` +
      `🕐 *Saat:* ${form.saat}%0A` +
      (form.not ? `📝 *Not:* ${form.not}%0A` : "") +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `_Saloon Ferdi Zopcuk · Adana Çukurova_`;
    return `https://wa.me/${SALON_INFO.phone}?text=${msg}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveRandevu({
      id: generateId(), ad: form.ad, telefon: form.telefon,
      hizmet: form.hizmet, tarih: form.tarih, saat: form.saat,
      not: form.not, durum: "bekliyor",
      olusturmaTarihi: new Date().toISOString(),
    });
    setDone(true);
    window.open(waUrl(), "_blank");
  };

  const valid = form.ad.trim() && form.telefon.trim() && form.hizmet && form.tarih && form.saat;

  if (done) return (
    <div className="max-w-lg mx-auto px-5 py-12 flex flex-col items-center text-center">
      <div
        style={{
          width:88, height:88, borderRadius:"50%",
          background:"rgba(39,201,130,0.08)",
          border:"2px solid rgba(39,201,130,0.3)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:40, marginBottom:24,
        }}
      >
        ✅
      </div>
      <h2
        style={{
          fontFamily:"'Playfair Display',Georgia,serif",
          fontSize:24, fontWeight:900, color:"#d4a843", marginBottom:10,
        }}
      >
        Randevunuz Alındı!
      </h2>
      <p style={{ color:"#888", fontSize:13, lineHeight:1.7, maxWidth:280, marginBottom:6 }}>
        WhatsApp mesajınız hazırlandı. Onay için mesajı gönderin veya sizi arayalım.
      </p>

      <div
        style={{
          background:"#0e0e0e", border:"1px solid #1e1e1e", borderRadius:18,
          padding:18, width:"100%", marginTop:16, marginBottom:24,
        }}
      >
        <div className="grid grid-cols-2 gap-y-3 text-left">
          {[
            ["👤 Ad", form.ad],
            ["✂️ Hizmet", form.hizmet],
            ["📅 Tarih", form.tarih],
            ["🕐 Saat", form.saat],
          ].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize:10, color:"#555", marginBottom:2 }}>{l}</div>
              <div style={{ fontWeight:700, color:"#e0e0e0", fontSize:13 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, padding:"16px", borderRadius:50,
            background:"rgba(37,211,102,0.08)",
            border:"1.5px solid rgba(37,211,102,0.35)",
            color:"#25D366", fontWeight:700, fontSize:14, textDecoration:"none",
          }}
        >
          💬 WhatsApp Mesajını Gönder
        </a>
        <button
          onClick={() => { setDone(false); setForm({ ad:"",telefon:"",hizmet:"",tarih:"",saat:"",not:"" }); }}
          style={{
            padding:"14px", borderRadius:50,
            background:"#0e0e0e", border:"1px solid #1e1e1e",
            color:"#606060", fontWeight:600, fontSize:14, cursor:"pointer",
          }}
        >
          Yeni Randevu Al
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-5 py-7">
      <div className="section-header">
        <div className="section-label">✦ Online Randevu</div>
        <h1 className="section-title">Randevu Al</h1>
        <div className="section-underline" />
        <p style={{ color:"#606060", fontSize:12, marginTop:8 }}>
          Formu doldurun, WhatsApp ile onaylayın
        </p>
      </div>

      {/* Hours notice */}
      <div
        style={{
          background:"rgba(212,168,67,0.04)",
          border:"1px solid rgba(212,168,67,0.12)",
          borderRadius:14, padding:"12px 14px",
          display:"flex", alignItems:"flex-start", gap:10,
          marginBottom:24,
        }}
      >
        <span style={{ fontSize:16, flexShrink:0 }}>🕐</span>
        <div>
          <div style={{ color:"#d4a843", fontWeight:700, fontSize:11, marginBottom:2 }}>
            Çalışma Saatleri
          </div>
          <div style={{ color:"#666", fontSize:11, lineHeight:1.7 }}>
            {SALON_INFO.workingHours.weekdays}<br/>
            {SALON_INFO.workingHours.sunday}
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
            Ad Soyad *
          </label>
          <input name="ad" value={form.ad} onChange={set} placeholder="Adınızı girin" required className="field" />
        </div>

        {/* Phone */}
        <div>
          <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
            Telefon *
          </label>
          <input name="telefon" value={form.telefon} onChange={set} placeholder="0 5XX XXX XX XX" type="tel" required className="field" />
        </div>

        {/* Service */}
        <div>
          <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
            Hizmet *
          </label>
          <select name="hizmet" value={form.hizmet} onChange={set} required className="field" style={{ appearance:"none", cursor:"pointer" }}>
            <option value="">Hizmet seçin</option>
            <optgroup label="— Tekil Hizmetler —">
              {HIZMETLER.map((h) => <option key={h.id} value={h.ad}>{h.ikon} {h.ad}</option>)}
            </optgroup>
            <optgroup label="— Premium Paketler —">
              {PAKETLER.map((p) => <option key={p.id} value={`${p.ad} Paketi`}>★ {p.ad} — {p.fiyat}₺</option>)}
            </optgroup>
          </select>
        </div>

        {/* Date & Time */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
              Tarih *
            </label>
            <input name="tarih" type="date" value={form.tarih} onChange={set} min={today} required className="field" />
          </div>
          <div>
            <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
              Saat *
            </label>
            <select name="saat" value={form.saat} onChange={set} required className="field" style={{ appearance:"none", cursor:"pointer" }}>
              <option value="">Saat seçin</option>
              {RANDEVU_SAATLERI.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginBottom:7 }}>
            Not (isteğe bağlı)
          </label>
          <textarea name="not" value={form.not} onChange={set} placeholder="İsteklerinizi belirtin..." rows={3} className="field" style={{ resize:"none" }} />
        </div>

        <button
          type="submit"
          disabled={!valid}
          style={{
            padding:"17px", borderRadius:50, marginTop:4,
            background: valid ? "linear-gradient(135deg,#FFD700,#d4a843,#8a6a1a)" : "#161616",
            color: valid ? "#000" : "#404040",
            fontWeight: 800, fontSize: 15,
            border: valid ? "none" : "1px solid #1e1e1e",
            cursor: valid ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            boxShadow: valid ? "0 4px 24px rgba(212,168,67,0.3)" : "none",
          }}
        >
          {valid ? "📲 Randevuyu WhatsApp'tan Gönder" : "Lütfen tüm alanları doldurun"}
        </button>

        <p style={{ color:"#404040", fontSize:11, textAlign:"center", lineHeight:1.6 }}>
          Randevunuz WhatsApp üzerinden iletilecektir.<br/>
          Onay için sizi arayacağız.
        </p>
      </form>
    </div>
  );
}
