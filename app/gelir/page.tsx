"use client";

import { useState, useEffect } from "react";
import { getGelirler, saveGelir, deleteGelir, generateId } from "@/lib/storage";
import { HIZMETLER, PAKETLER } from "@/lib/data";
import type { GelirKayit } from "@/lib/data";

const HIZMET_LISTESI = [
  ...HIZMETLER.map((h) => h.ad),
  ...PAKETLER.map((p) => `${p.ad} Paketi`),
];

const BOSH_FORM = {
  tarih: new Date().toISOString().split("T")[0],
  miktar: 0,
  hizmet: "",
  musteriAdi: "",
  efeKazanc: 0,
  efeDukkanKatkisi: 0,
  notlar: "",
};

export default function GelirSayfasi() {
  const [gelirler, setGelirler] = useState<GelirKayit[]>([]);
  const [formAcik, setFormAcik] = useState(false);
  const [form, setForm] = useState(BOSH_FORM);
  const [silOnayi, setSilOnayi] = useState<string | null>(null);
  const [aktifFiltre, setAktifFiltre] = useState<"bugun" | "hafta" | "ay" | "tum">("bugun");

  useEffect(() => {
    setGelirler(getGelirler());
  }, []);

  const yenile = () => setGelirler(getGelirler());

  const bugun = new Date().toISOString().split("T")[0];
  const haftaBas = (() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 1);
    return d.toISOString().split("T")[0];
  })();
  const ayBas = new Date().toISOString().slice(0, 7) + "-01";

  const filtrelenmis = gelirler.filter((g) => {
    if (aktifFiltre === "bugun") return g.tarih === bugun;
    if (aktifFiltre === "hafta") return g.tarih >= haftaBas;
    if (aktifFiltre === "ay") return g.tarih >= ayBas;
    return true;
  });

  const toplamCiro = filtrelenmis.reduce((s, g) => s + g.miktar, 0);
  const toplamEfeKazanc = filtrelenmis.reduce((s, g) => s + (g.efeKazanc || 0), 0);
  const toplamEfeDukkan = filtrelenmis.reduce((s, g) => s + (g.efeDukkanKatkisi || 0), 0);
  const ortalamaKisi = filtrelenmis.length > 0 ? Math.round(toplamCiro / filtrelenmis.length) : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) =>
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));

  const handleKaydet = () => {
    saveGelir({ id: generateId(), ...form });
    yenile();
    setFormAcik(false);
    setForm(BOSH_FORM);
  };

  const handleSil = (id: string) => {
    deleteGelir(id);
    setSilOnayi(null);
    yenile();
  };

  const filterLabels: Record<string, string> = {
    bugun: "Bugün",
    hafta: "Bu Hafta",
    ay: "Bu Ay",
    tum: "Tümü",
  };

  return (
    <div className="max-w-lg mx-auto px-5 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-black text-white mb-1">
            Gelir Takibi
          </h1>
          <p className="text-[#666] text-xs">{gelirler.length} kayıt</p>
        </div>
        <button
          onClick={() => { setFormAcik(true); setForm(BOSH_FORM); }}
          style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs shadow-lg active:scale-95 transition-all"
        >
          + Gelir Ekle
        </button>
      </div>

      {/* Filter tabs */}
      <div
        style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
        className="flex p-1 mb-5"
      >
        {(["bugun", "hafta", "ay", "tum"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setAktifFiltre(f)}
            style={{
              background: aktifFiltre === f ? "linear-gradient(135deg, #FFD700, #B8960C)" : "transparent",
              color: aktifFiltre === f ? "#000" : "#666",
            }}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {[
          { rakam: `${toplamCiro.toLocaleString("tr-TR")}₺`, etiket: "Toplam Ciro", ikon: "💰", renk: "#FFD700" },
          { rakam: filtrelenmis.length.toString(), etiket: "İşlem", ikon: "🧾", renk: "#60a5fa" },
          { rakam: `${toplamEfeKazanc.toLocaleString("tr-TR")}₺`, etiket: "Efe Kazancı", ikon: "👨", renk: "#34d399" },
          { rakam: `${ortalamaKisi.toLocaleString("tr-TR")}₺`, etiket: "Kişi Başı Ort.", ikon: "📊", renk: "#f59e0b" },
        ].map((stat) => (
          <div
            key={stat.etiket}
            style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
            className="p-4"
          >
            <div className="text-2xl mb-2">{stat.ikon}</div>
            <div style={{ color: stat.renk }} className="text-xl font-black">
              {stat.rakam}
            </div>
            <div className="text-[#666] text-xs mt-0.5">{stat.etiket}</div>
          </div>
        ))}
      </div>

      {/* Efe summary */}
      {(toplamEfeKazanc > 0 || toplamEfeDukkan > 0) && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(52,211,153,0.04))",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 16,
          }}
          className="p-4 mb-5"
        >
          <div style={{ color: "#34d399" }} className="font-black text-sm mb-3">
            👨 Efe Çalışan Özeti — {filterLabels[aktifFiltre]}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[#666] text-xs mb-0.5">Efe Kazancı</div>
              <div style={{ color: "#34d399" }} className="text-lg font-black">
                {toplamEfeKazanc.toLocaleString("tr-TR")}₺
              </div>
            </div>
            <div>
              <div className="text-[#666] text-xs mb-0.5">Dükkana Katkı</div>
              <div style={{ color: "#60a5fa" }} className="text-lg font-black">
                {toplamEfeDukkan.toLocaleString("tr-TR")}₺
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Records */}
      <div className="flex flex-col gap-2.5">
        {filtrelenmis.length === 0 ? (
          <div className="text-center py-12 text-[#555]">
            <div className="text-4xl mb-3">💰</div>
            <div className="font-semibold">Kayıt bulunamadı</div>
            <div className="text-xs mt-1">{filterLabels[aktifFiltre]} için gelir kaydı yok</div>
          </div>
        ) : (
          [...filtrelenmis].reverse().map((g) => (
            <div
              key={g.id}
              style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
              className="p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: "#FFD700" }} className="font-black text-lg">
                      {g.miktar.toLocaleString("tr-TR")}₺
                    </span>
                    {g.musteriAdi && (
                      <span
                        style={{ background: "#1a1a1a", color: "#888" }}
                        className="text-xs px-2 py-0.5 rounded-full"
                      >
                        {g.musteriAdi}
                      </span>
                    )}
                  </div>
                  <div className="text-[#aaa] text-xs">{g.hizmet}</div>
                  <div className="text-[#555] text-xs mt-1">{g.tarih}</div>
                  {(g.efeKazanc || g.efeDukkanKatkisi) ? (
                    <div className="flex gap-3 mt-2">
                      {g.efeKazanc ? (
                        <span
                          style={{ background: "rgba(52,211,153,0.1)", color: "#34d399" }}
                          className="text-xs px-2 py-0.5 rounded-full"
                        >
                          Efe: {g.efeKazanc}₺
                        </span>
                      ) : null}
                      {g.efeDukkanKatkisi ? (
                        <span
                          style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa" }}
                          className="text-xs px-2 py-0.5 rounded-full"
                        >
                          Katkı: {g.efeDukkanKatkisi}₺
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={() => setSilOnayi(g.id)}
                  style={{ color: "#333" }}
                  className="text-lg ml-2 hover:text-red-500 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add form modal */}
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
              <h2 className="font-black text-white">Gelir Ekle</h2>
              <button
                onClick={() => setFormAcik(false)}
                style={{ background: "#1a1a1a", color: "#888" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                ×
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Tarih</label>
                <input name="tarih" type="date" value={form.tarih} onChange={handleChange} className="input-dark" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Tutar (₺) *</label>
                <input name="miktar" type="number" value={form.miktar || ""} onChange={handleChange} placeholder="0" className="input-dark" min="0" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Hizmet</label>
                <select name="hizmet" value={form.hizmet} onChange={handleChange} className="input-dark" style={{ appearance: "none" }}>
                  <option value="">Seçin</option>
                  {HIZMET_LISTESI.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Müşteri Adı</label>
                <input name="musteriAdi" value={form.musteriAdi} onChange={handleChange} placeholder="İsteğe bağlı" className="input-dark" />
              </div>

              <div
                style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 12 }}
                className="p-3"
              >
                <div style={{ color: "#34d399" }} className="text-xs font-bold mb-3 uppercase tracking-wider">
                  👨 Efe Çalışan Takibi
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs text-[#666] mb-1.5 block">Efe Kazancı (₺)</label>
                    <input name="efeKazanc" type="number" value={form.efeKazanc || ""} onChange={handleChange} placeholder="0" className="input-dark" min="0" />
                  </div>
                  <div>
                    <label className="text-xs text-[#666] mb-1.5 block">Dükkana Katkı (₺)</label>
                    <input name="efeDukkanKatkisi" type="number" value={form.efeDukkanKatkisi || ""} onChange={handleChange} placeholder="0" className="input-dark" min="0" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Notlar</label>
                <textarea name="notlar" value={form.notlar} onChange={handleChange} placeholder="Ek notlar..." rows={2} className="input-dark resize-none" />
              </div>

              <button
                onClick={handleKaydet}
                disabled={!form.miktar}
                style={{
                  background: form.miktar ? "linear-gradient(135deg, #FFD700, #B8960C)" : "#1a1a1a",
                  color: form.miktar ? "#000" : "#444",
                }}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all"
              >
                Geliri Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {silOnayi && (
        <div
          style={{ background: "rgba(0,0,0,0.85)" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 20 }} className="w-full max-w-sm p-6 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-black text-white mb-2">Kaydı Sil</h3>
            <p className="text-[#888] text-sm mb-5">Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button onClick={() => setSilOnayi(null)} style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #2a2a2a" }} className="flex-1 py-3 rounded-xl font-semibold text-sm">İptal</button>
              <button onClick={() => handleSil(silOnayi)} style={{ background: "rgba(255,68,68,0.2)", color: "#ff4444", border: "1px solid rgba(255,68,68,0.3)" }} className="flex-1 py-3 rounded-xl font-semibold text-sm">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
