"use client";

import { useState, useEffect } from "react";
import {
  getRandevular,
  updateRandevu,
  deleteRandevu,
  getKampanyalar,
  saveKampanya,
  deleteKampanya,
  getGelirler,
  getMusteriler,
  getYorumlar,
  generateId,
} from "@/lib/storage";
import type { Randevu, Kampanya } from "@/lib/data";

export default function YonetimSayfasi() {
  const [aktifSekme, setAktifSekme] = useState<"randevular" | "kampanyalar" | "ozet">("ozet");
  const [randevular, setRandevular] = useState<Randevu[]>([]);
  const [kampanyalar, setKampanyalar] = useState<Kampanya[]>([]);
  const [istatistikler, setIstatistikler] = useState({
    toplamMusteri: 0,
    toplamGelir: 0,
    toplamRandevu: 0,
    toplamYorum: 0,
    bugunGelir: 0,
    ayGelir: 0,
  });
  const [kampanyaFormAcik, setKampanyaFormAcik] = useState(false);
  const [kampanyaForm, setKampanyaForm] = useState({
    baslik: "",
    aciklama: "",
    tarih: "",
    renk: "#FFD700",
    aktif: true,
  });

  useEffect(() => {
    yenile();
  }, []);

  const yenile = () => {
    setRandevular(getRandevular());
    setKampanyalar(getKampanyalar());
    const gelirler = getGelirler();
    const musteriler = getMusteriler();
    const yorumlar = getYorumlar();
    const bugun = new Date().toISOString().split("T")[0];
    const ayBas = new Date().toISOString().slice(0, 7) + "-01";
    setIstatistikler({
      toplamMusteri: musteriler.length,
      toplamGelir: gelirler.reduce((s, g) => s + g.miktar, 0),
      toplamRandevu: getRandevular().length,
      toplamYorum: yorumlar.length,
      bugunGelir: gelirler.filter((g) => g.tarih === bugun).reduce((s, g) => s + g.miktar, 0),
      ayGelir: gelirler.filter((g) => g.tarih >= ayBas).reduce((s, g) => s + g.miktar, 0),
    });
  };

  const durumRenk: Record<string, string> = {
    bekliyor: "#f59e0b",
    onaylandi: "#34d399",
    tamamlandi: "#60a5fa",
    iptal: "#f87171",
  };

  const durumEtiket: Record<string, string> = {
    bekliyor: "Bekliyor",
    onaylandi: "Onaylandı",
    tamamlandi: "Tamamlandı",
    iptal: "İptal",
  };

  const handleKampanyaKaydet = () => {
    if (!kampanyaForm.baslik.trim()) return;
    saveKampanya({ id: generateId(), ...kampanyaForm });
    yenile();
    setKampanyaFormAcik(false);
    setKampanyaForm({ baslik: "", aciklama: "", tarih: "", renk: "#FFD700", aktif: true });
  };

  const renkSecenekleri = ["#FFD700", "#C084FC", "#34d399", "#f87171", "#60a5fa", "#f59e0b"];

  return (
    <div className="max-w-lg mx-auto px-5 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.3)",
              color: "#FFD700",
            }}
            className="text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase"
          >
            ⚙️ Yönetim
          </span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-black text-white">
          Yönetici Paneli
        </h1>
      </div>

      {/* Tabs */}
      <div
        style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
        className="flex p-1 mb-6"
      >
        {(["ozet", "randevular", "kampanyalar"] as const).map((tab) => {
          const labels = { ozet: "Özet", randevular: "Randevular", kampanyalar: "Kampanyalar" };
          return (
            <button
              key={tab}
              onClick={() => setAktifSekme(tab)}
              style={{
                background: aktifSekme === tab ? "linear-gradient(135deg, #FFD700, #B8960C)" : "transparent",
                color: aktifSekme === tab ? "#000" : "#666",
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {aktifSekme === "ozet" && (
        <div>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {[
              { rakam: `${istatistikler.bugunGelir.toLocaleString("tr-TR")}₺`, etiket: "Bugünkü Ciro", ikon: "📅", renk: "#FFD700" },
              { rakam: `${istatistikler.ayGelir.toLocaleString("tr-TR")}₺`, etiket: "Aylık Ciro", ikon: "📆", renk: "#34d399" },
              { rakam: `${istatistikler.toplamGelir.toLocaleString("tr-TR")}₺`, etiket: "Toplam Ciro", ikon: "💰", renk: "#60a5fa" },
              { rakam: istatistikler.toplamMusteri.toString(), etiket: "Toplam Müşteri", ikon: "👥", renk: "#f59e0b" },
              { rakam: istatistikler.toplamRandevu.toString(), etiket: "Toplam Randevu", ikon: "📋", renk: "#c084fc" },
              { rakam: istatistikler.toplamYorum.toString(), etiket: "Toplam Yorum", ikon: "⭐", renk: "#FFD700" },
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

          {/* Quick actions */}
          <h2 className="text-white font-black mb-3">Hızlı İşlemler</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { etiket: "Randevuları Gör", href: "#randevular", ikon: "📋", onclick: () => setAktifSekme("randevular") },
              { etiket: "Kampanya Ekle", href: "#kampanyalar", ikon: "📢", onclick: () => { setAktifSekme("kampanyalar"); setKampanyaFormAcik(true); } },
            ].map((item) => (
              <button
                key={item.etiket}
                onClick={item.onclick}
                style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
                className="flex items-center gap-3 p-4 text-left w-full active:scale-95 transition-all"
              >
                <span className="text-xl">{item.ikon}</span>
                <span className="text-white font-semibold text-sm">{item.etiket}</span>
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Randevular */}
      {aktifSekme === "randevular" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-black">
              Randevular ({randevular.length})
            </h2>
          </div>
          {randevular.length === 0 ? (
            <div className="text-center py-12 text-[#555]">
              <div className="text-4xl mb-3">📋</div>
              <div>Henüz randevu yok</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...randevular].reverse().map((r) => (
                <div
                  key={r.id}
                  style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
                  className="p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-white text-sm">{r.ad}</div>
                      <div className="text-[#666] text-xs">{r.telefon}</div>
                    </div>
                    <span
                      style={{
                        background: `${durumRenk[r.durum]}20`,
                        color: durumRenk[r.durum],
                        border: `1px solid ${durumRenk[r.durum]}40`,
                      }}
                      className="text-xs px-2 py-0.5 rounded-full font-bold"
                    >
                      {durumEtiket[r.durum]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                      <div className="text-[#555]">Hizmet</div>
                      <div className="text-white font-semibold truncate">{r.hizmet}</div>
                    </div>
                    <div style={{ background: "#0f0f0f", borderRadius: 8 }} className="p-2">
                      <div className="text-[#555]">Tarih & Saat</div>
                      <div className="text-white font-semibold">{r.tarih} {r.saat}</div>
                    </div>
                  </div>
                  {r.not && (
                    <div className="text-xs text-[#666] mb-3">
                      <span className="text-[#444]">Not: </span>{r.not}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {(["bekliyor", "onaylandi", "tamamlandi", "iptal"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => { updateRandevu(r.id, { durum: d }); yenile(); }}
                        style={{
                          background: r.durum === d ? `${durumRenk[d]}20` : "#0f0f0f",
                          color: r.durum === d ? durumRenk[d] : "#444",
                          border: `1px solid ${r.durum === d ? durumRenk[d] + "40" : "#1a1a1a"}`,
                          flex: 1,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "4px 2px",
                          borderRadius: 8,
                        }}
                      >
                        {durumEtiket[d].slice(0, 6)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Kampanyalar */}
      {aktifSekme === "kampanyalar" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-black">Kampanyalar</h2>
            <button
              onClick={() => setKampanyaFormAcik(true)}
              style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
              className="px-3 py-1.5 rounded-xl text-xs font-black"
            >
              + Ekle
            </button>
          </div>

          {kampanyalar.length === 0 ? (
            <div className="text-center py-12 text-[#555]">
              <div className="text-4xl mb-3">📢</div>
              <div>Kampanya yok</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {kampanyalar.map((k) => (
                <div
                  key={k.id}
                  style={{
                    background: `${k.renk}08`,
                    border: `1px solid ${k.renk}30`,
                    borderRadius: 16,
                  }}
                  className="p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div style={{ color: k.renk }} className="font-black text-sm">{k.baslik}</div>
                      <div className="text-[#aaa] text-xs mt-1 leading-relaxed">{k.aciklama}</div>
                      {k.tarih && (
                        <div className="text-[#555] text-xs mt-1">📅 {k.tarih} tarihine kadar</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 ml-3">
                      <button
                        onClick={() => { saveKampanya({ ...k, aktif: !k.aktif }); yenile(); }}
                        style={{
                          background: k.aktif ? "rgba(52,211,153,0.15)" : "#1a1a1a",
                          color: k.aktif ? "#34d399" : "#555",
                          border: `1px solid ${k.aktif ? "rgba(52,211,153,0.3)" : "#222"}`,
                        }}
                        className="text-xs px-2 py-1 rounded-lg font-bold"
                      >
                        {k.aktif ? "Aktif" : "Pasif"}
                      </button>
                      <button
                        onClick={() => { deleteKampanya(k.id); yenile(); }}
                        style={{ background: "#1a1a1a", color: "#ff4444" }}
                        className="text-xs px-2 py-1 rounded-lg"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Campaign form modal */}
      {kampanyaFormAcik && (
        <div
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setKampanyaFormAcik(false)}
        >
          <div
            style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "24px 24px 0 0" }}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto pb-8"
          >
            <div className="p-5 border-b border-[#1f1f1f] flex items-center justify-between sticky top-0 bg-[#111]">
              <h2 className="font-black text-white">Yeni Kampanya</h2>
              <button
                onClick={() => setKampanyaFormAcik(false)}
                style={{ background: "#1a1a1a", color: "#888" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                ×
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Başlık *</label>
                <input
                  value={kampanyaForm.baslik}
                  onChange={(e) => setKampanyaForm((p) => ({ ...p, baslik: e.target.value }))}
                  placeholder="Kampanya başlığı"
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Açıklama</label>
                <textarea
                  value={kampanyaForm.aciklama}
                  onChange={(e) => setKampanyaForm((p) => ({ ...p, aciklama: e.target.value }))}
                  placeholder="Kampanya detayları..."
                  rows={3}
                  className="input-dark resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={kampanyaForm.tarih}
                  onChange={(e) => setKampanyaForm((p) => ({ ...p, tarih: e.target.value }))}
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#888] mb-2 block uppercase tracking-wider">Renk</label>
                <div className="flex gap-2">
                  {renkSecenekleri.map((r) => (
                    <button
                      key={r}
                      onClick={() => setKampanyaForm((p) => ({ ...p, renk: r }))}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: r,
                        border: kampanyaForm.renk === r ? "3px solid #fff" : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setKampanyaForm((p) => ({ ...p, aktif: !p.aktif }))}
                  style={{
                    width: 48,
                    height: 28,
                    background: kampanyaForm.aktif ? "#FFD700" : "#222",
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
                      left: kampanyaForm.aktif ? 23 : 3,
                      width: 22,
                      height: 22,
                      background: "#fff",
                      borderRadius: "50%",
                      transition: "all 0.3s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>
                <span className="text-sm text-white font-semibold">Aktif</span>
              </label>

              <button
                onClick={handleKampanyaKaydet}
                disabled={!kampanyaForm.baslik.trim()}
                style={{
                  background: kampanyaForm.baslik.trim() ? "linear-gradient(135deg, #FFD700, #B8960C)" : "#1a1a1a",
                  color: kampanyaForm.baslik.trim() ? "#000" : "#444",
                }}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all"
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
