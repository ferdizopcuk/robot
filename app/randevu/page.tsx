"use client";

import { useState } from "react";
import { HIZMETLER, PAKETLER, SALON_INFO, RANDEVU_SAATLERI } from "@/lib/data";
import { saveRandevu, generateId } from "@/lib/storage";

const TUMHIZMETLER = [
  ...HIZMETLER.map((h) => h.ad),
  ...PAKETLER.map((p) => `${p.ad} Paketi`),
];

export default function RandevuSayfasi() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    hizmet: "",
    tarih: "",
    saat: "",
    not: "",
  });
  const [gonderildi, setGonderildi] = useState(false);

  const bugün = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const buildWhatsApp = () => {
    const msg =
      `*YENİ RANDEVU TALEBİ*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `👤 *Ad Soyad:* ${form.ad}%0A` +
      `📞 *Telefon:* ${form.telefon}%0A` +
      `✂️ *Hizmet:* ${form.hizmet}%0A` +
      `📅 *Tarih:* ${form.tarih}%0A` +
      `🕐 *Saat:* ${form.saat}%0A` +
      (form.not ? `📝 *Not:* ${form.not}%0A` : "") +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `_Saloon Ferdi Zopcuk Randevu Sistemi_`;
    return `https://wa.me/${SALON_INFO.phone}?text=${msg}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveRandevu({
      id: generateId(),
      ad: form.ad,
      telefon: form.telefon,
      hizmet: form.hizmet,
      tarih: form.tarih,
      saat: form.saat,
      not: form.not,
      durum: "bekliyor",
      olusturmaTarihi: new Date().toISOString(),
    });
    setGonderildi(true);
    window.open(buildWhatsApp(), "_blank");
  };

  const isValid =
    form.ad.trim() &&
    form.telefon.trim() &&
    form.hizmet &&
    form.tarih &&
    form.saat;

  if (gonderildi) {
    return (
      <div className="max-w-lg mx-auto px-5 py-12 flex flex-col items-center text-center">
        <div
          style={{
            background: "rgba(255,215,0,0.1)",
            border: "2px solid rgba(255,215,0,0.3)",
            width: 90,
            height: 90,
            borderRadius: "50%",
          }}
          className="flex items-center justify-center text-5xl mb-6"
        >
          ✅
        </div>
        <h2
          style={{ fontFamily: "'Playfair Display', serif", color: "#FFD700" }}
          className="text-2xl font-black mb-3"
        >
          Randevunuz Alındı!
        </h2>
        <p className="text-[#aaa] text-sm leading-relaxed mb-2">
          WhatsApp mesajınız hazırlandı. Onay için salonumuzu aramanız veya WhatsApp mesajını
          göndermeniz yeterlidir.
        </p>
        <div
          style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
          className="w-full p-4 mt-4 mb-8 text-left"
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-[#666]">Ad:</div>
            <div className="text-white font-semibold">{form.ad}</div>
            <div className="text-[#666]">Hizmet:</div>
            <div className="text-white font-semibold">{form.hizmet}</div>
            <div className="text-[#666]">Tarih:</div>
            <div className="text-white font-semibold">{form.tarih}</div>
            <div className="text-[#666]">Saat:</div>
            <div className="text-white font-semibold">{form.saat}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <a
            href={buildWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "rgba(37,211,102,0.1)", border: "2px solid rgba(37,211,102,0.4)", color: "#25D366" }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm"
          >
            💬 WhatsApp Mesajı Gönder
          </a>
          <button
            onClick={() => {
              setGonderildi(false);
              setForm({ ad: "", telefon: "", hizmet: "", tarih: "", saat: "", not: "" });
            }}
            style={{ background: "#111", border: "1px solid #1f1f1f", color: "#aaa" }}
            className="w-full py-4 rounded-2xl font-semibold text-sm"
          >
            Yeni Randevu Al
          </button>
        </div>
      </div>
    );
  }

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
          ✦ Online Randevu
        </span>
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl font-black text-white mt-3 mb-1"
        >
          Randevu Al
        </h1>
        <p className="text-[#888] text-sm">
          Formu doldurun, WhatsApp üzerinden onaylayın
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

      {/* Working hours notice */}
      <div
        style={{
          background: "rgba(255,215,0,0.05)",
          border: "1px solid rgba(255,215,0,0.15)",
          borderRadius: 12,
        }}
        className="p-3 mb-6 flex items-start gap-2"
      >
        <span className="text-base">🕐</span>
        <div className="text-xs text-[#aaa]">
          <span style={{ color: "#FFD700" }} className="font-bold block mb-0.5">Çalışma Saatleri</span>
          <span>{SALON_INFO.workingHours.weekdays}</span>
          <br />
          <span>{SALON_INFO.workingHours.sunday}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
            Ad Soyad *
          </label>
          <input
            name="ad"
            value={form.ad}
            onChange={handleChange}
            placeholder="Adınızı girin"
            required
            className="input-dark"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
            Telefon *
          </label>
          <input
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            placeholder="0 5XX XXX XX XX"
            type="tel"
            required
            className="input-dark"
          />
        </div>

        {/* Service */}
        <div>
          <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
            Hizmet *
          </label>
          <select
            name="hizmet"
            value={form.hizmet}
            onChange={handleChange}
            required
            className="input-dark"
            style={{ appearance: "none" }}
          >
            <option value="">Hizmet seçin</option>
            <optgroup label="— Tekil Hizmetler —">
              {HIZMETLER.map((h) => (
                <option key={h.id} value={h.ad}>
                  {h.ikon} {h.ad}
                </option>
              ))}
            </optgroup>
            <optgroup label="— Premium Paketler —">
              {PAKETLER.map((p) => (
                <option key={p.id} value={`${p.ad} Paketi`}>
                  ★ {p.ad} Paketi — {p.fiyat}₺
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
              Tarih *
            </label>
            <input
              name="tarih"
              type="date"
              value={form.tarih}
              onChange={handleChange}
              min={bugün}
              required
              className="input-dark"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
              Saat *
            </label>
            <select
              name="saat"
              value={form.saat}
              onChange={handleChange}
              required
              className="input-dark"
              style={{ appearance: "none" }}
            >
              <option value="">Saat seçin</option>
              {RANDEVU_SAATLERI.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
            Not (İsteğe bağlı)
          </label>
          <textarea
            name="not"
            value={form.not}
            onChange={handleChange}
            placeholder="İsteklerinizi belirtin..."
            rows={3}
            className="input-dark resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            background: isValid ? "linear-gradient(135deg, #FFD700, #B8960C)" : "#1a1a1a",
            color: isValid ? "#000" : "#444",
            border: isValid ? "none" : "1px solid #222",
          }}
          className="w-full py-4 rounded-2xl font-black text-sm mt-2 transition-all active:scale-95"
        >
          {isValid ? "📲 Randevuyu WhatsApp'tan Gönder" : "Lütfen tüm alanları doldurun"}
        </button>

        <p className="text-[#555] text-xs text-center">
          Randevunuz WhatsApp üzerinden salonumuza iletilecektir.
          <br />
          Onay için sizi arayacağız.
        </p>
      </form>
    </div>
  );
}
