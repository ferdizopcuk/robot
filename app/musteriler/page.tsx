"use client";

import { useState, useEffect } from "react";
import { getMusteriler, saveMusteri, deleteMusteri, generateId } from "@/lib/storage";
import { HIZMETLER, PAKETLER } from "@/lib/data";
import type { Musteri } from "@/lib/data";

const HIZMET_LISTESI = [
  ...HIZMETLER.map((h) => h.ad),
  ...PAKETLER.map((p) => `${p.ad} Paketi`),
];

const BOSH_FORM: Omit<Musteri, "id"> = {
  ad: "",
  telefon: "",
  sonGelisTarihi: new Date().toISOString().split("T")[0],
  alinanHizmet: "",
  odeme: 0,
  notlar: "",
  sadikMusteri: false,
  toplamZiyaret: 1,
  toplamHarcama: 0,
};

export default function MusterilerSayfasi() {
  const [musteriler, setMusteriler] = useState<Musteri[]>([]);
  const [arama, setArama] = useState("");
  const [formAcik, setFormAcik] = useState(false);
  const [form, setForm] = useState<Omit<Musteri, "id">>(BOSH_FORM);
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null);
  const [silOnayi, setSilOnayi] = useState<string | null>(null);

  useEffect(() => {
    setMusteriler(getMusteriler());
  }, []);

  const yenile = () => setMusteriler(getMusteriler());

  const filtrelenmis = musteriler.filter(
    (m) =>
      m.ad.toLowerCase().includes(arama.toLowerCase()) ||
      m.telefon.includes(arama)
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleKaydet = () => {
    const musteri: Musteri = {
      id: duzenlenenId || generateId(),
      ...form,
      toplamHarcama: form.toplamHarcama || form.odeme,
    };
    saveMusteri(musteri);
    yenile();
    setFormAcik(false);
    setDuzenlenenId(null);
    setForm(BOSH_FORM);
  };

  const handleDuzenle = (m: Musteri) => {
    setForm({ ...m });
    setDuzenlenenId(m.id);
    setFormAcik(true);
  };

  const handleSil = (id: string) => {
    deleteMusteri(id);
    setSilOnayi(null);
    yenile();
  };

  const sadikSayisi = musteriler.filter((m) => m.sadikMusteri).length;

  return (
    <div className="max-w-lg mx-auto px-5 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-black text-white mb-1">
            Müşteriler
          </h1>
          <p className="text-[#666] text-xs">
            {musteriler.length} müşteri · {sadikSayisi} sadık
          </p>
        </div>
        <button
          onClick={() => { setFormAcik(true); setDuzenlenenId(null); setForm(BOSH_FORM); }}
          style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs shadow-lg active:scale-95 transition-all"
        >
          + Müşteri Ekle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { rakam: musteriler.length, etiket: "Toplam", ikon: "👥" },
          { rakam: sadikSayisi, etiket: "Sadık", ikon: "💛" },
          {
            rakam:
              musteriler.length > 0
                ? Math.round(
                    musteriler.reduce((s, m) => s + m.toplamHarcama, 0) / musteriler.length
                  )
                : 0,
            etiket: "Ort. Harcama",
            ikon: "💰",
          },
        ].map((stat) => (
          <div
            key={stat.etiket}
            style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
            className="p-3 text-center"
          >
            <div className="text-xl mb-1">{stat.ikon}</div>
            <div style={{ color: "#FFD700" }} className="text-lg font-black">
              {stat.rakam}
            </div>
            <div className="text-[#666] text-xs">{stat.etiket}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]">🔍</span>
        <input
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="İsim veya telefon ara..."
          className="input-dark pl-9"
        />
      </div>

      {/* Customer list */}
      <div className="flex flex-col gap-3">
        {filtrelenmis.length === 0 ? (
          <div className="text-center py-12 text-[#555]">
            <div className="text-4xl mb-3">👥</div>
            <div className="font-semibold">Müşteri bulunamadı</div>
            <div className="text-xs mt-1">Yeni müşteri eklemek için + butonuna tıklayın</div>
          </div>
        ) : (
          filtrelenmis.map((m) => (
            <div
              key={m.id}
              style={{
                background: "#111",
                border: `1px solid ${m.sadikMusteri ? "rgba(255,215,0,0.25)" : "#1f1f1f"}`,
                borderRadius: 16,
              }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        background: m.sadikMusteri
                          ? "linear-gradient(135deg, #FFD700, #B8960C)"
                          : "#222",
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                      className="flex items-center justify-center font-black text-sm"
                    >
                      <span style={{ color: m.sadikMusteri ? "#000" : "#666" }}>
                        {m.ad.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        {m.ad}
                        {m.sadikMusteri && (
                          <span
                            style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", fontSize: 9 }}
                            className="px-1.5 py-0.5 rounded-full font-bold tracking-wider"
                          >
                            ★ SADIK
                          </span>
                        )}
                      </div>
                      <a
                        href={`tel:${m.telefon}`}
                        style={{ color: "#666" }}
                        className="text-xs"
                      >
                        {m.telefon}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDuzenle(m)}
                      style={{ background: "#1a1a1a", color: "#FFD700" }}
                      className="w-8 h-8 rounded-lg text-sm flex items-center justify-center"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setSilOnayi(m.id)}
                      style={{ background: "#1a1a1a", color: "#ff4444" }}
                      className="w-8 h-8 rounded-lg text-sm flex items-center justify-center"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                    <div className="text-[#555] mb-0.5">Son Hizmet</div>
                    <div className="text-white font-semibold truncate">{m.alinanHizmet || "—"}</div>
                  </div>
                  <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                    <div className="text-[#555] mb-0.5">Son Gelişi</div>
                    <div className="text-white font-semibold">{m.sonGelisTarihi || "—"}</div>
                  </div>
                  <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                    <div className="text-[#555] mb-0.5">Toplam Ziyaret</div>
                    <div style={{ color: "#FFD700" }} className="font-black">{m.toplamZiyaret}x</div>
                  </div>
                  <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                    <div className="text-[#555] mb-0.5">Toplam Harcama</div>
                    <div style={{ color: "#FFD700" }} className="font-black">{m.toplamHarcama.toLocaleString("tr-TR")}₺</div>
                  </div>
                </div>

                {m.notlar && (
                  <div
                    style={{ background: "#0f0f0f", borderRadius: 8, marginTop: 8 }}
                    className="p-2 text-xs"
                  >
                    <span className="text-[#555]">Not: </span>
                    <span className="text-[#aaa]">{m.notlar}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {formAcik && (
        <div
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setFormAcik(false)}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: "24px 24px 0 0",
            }}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto pb-8"
          >
            <div className="p-5 border-b border-[#1f1f1f] flex items-center justify-between sticky top-0 bg-[#111]">
              <h2 className="font-black text-white">
                {duzenlenenId ? "Müşteriyi Düzenle" : "Yeni Müşteri"}
              </h2>
              <button
                onClick={() => setFormAcik(false)}
                style={{ background: "#1a1a1a", color: "#888" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                ×
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {[
                { name: "ad", label: "Ad Soyad", type: "text", placeholder: "Müşteri adı" },
                { name: "telefon", label: "Telefon", type: "tel", placeholder: "0 5XX XXX XX XX" },
                { name: "sonGelisTarihi", label: "Son Geliş Tarihi", type: "date", placeholder: "" },
                { name: "odeme", label: "Ödeme Tutarı (₺)", type: "number", placeholder: "0" },
                { name: "toplamZiyaret", label: "Toplam Ziyaret", type: "number", placeholder: "1" },
                { name: "toplamHarcama", label: "Toplam Harcama (₺)", type: "number", placeholder: "0" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={(form as Record<string, unknown>)[field.name] as string | number}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    className="input-dark"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
                  Alınan Hizmet
                </label>
                <select
                  name="alinanHizmet"
                  value={form.alinanHizmet}
                  onChange={handleFormChange}
                  className="input-dark"
                  style={{ appearance: "none" }}
                >
                  <option value="">Seçin</option>
                  {HIZMET_LISTESI.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">
                  Notlar
                </label>
                <textarea
                  name="notlar"
                  value={form.notlar}
                  onChange={handleFormChange}
                  placeholder="Müşteri hakkında notlar..."
                  rows={2}
                  className="input-dark resize-none"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((p) => ({ ...p, sadikMusteri: !p.sadikMusteri }))}
                  style={{
                    width: 48,
                    height: 28,
                    background: form.sadikMusteri ? "#FFD700" : "#222",
                    borderRadius: 14,
                    position: "relative",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      left: form.sadikMusteri ? 23 : 3,
                      width: 22,
                      height: 22,
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "all 0.3s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>
                <span className="text-sm text-white font-semibold">Sadık Müşteri</span>
              </label>

              <button
                onClick={handleKaydet}
                disabled={!form.ad.trim() || !form.telefon.trim()}
                style={{
                  background: form.ad.trim() && form.telefon.trim()
                    ? "linear-gradient(135deg, #FFD700, #B8960C)"
                    : "#1a1a1a",
                  color: form.ad.trim() && form.telefon.trim() ? "#000" : "#444",
                }}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all"
              >
                {duzenlenenId ? "Güncelle" : "Müşteri Ekle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {silOnayi && (
        <div
          style={{ background: "rgba(0,0,0,0.85)" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div
            style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 20 }}
            className="w-full max-w-sm p-6 text-center"
          >
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-black text-white mb-2">Müşteriyi Sil</h3>
            <p className="text-[#888] text-sm mb-5">Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSilOnayi(null)}
                style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #2a2a2a" }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm"
              >
                İptal
              </button>
              <button
                onClick={() => handleSil(silOnayi)}
                style={{ background: "rgba(255,68,68,0.2)", color: "#ff4444", border: "1px solid rgba(255,68,68,0.3)" }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
