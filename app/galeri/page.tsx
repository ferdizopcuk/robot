"use client";

import { useState, useEffect } from "react";
import { getYorumlar, saveYorum, deleteYorum, generateId } from "@/lib/storage";
import type { Yorum } from "@/lib/data";

// Placeholder gallery images using CSS gradients
const GALERI_ORNEKLERI = [
  { id: 1, baslik: "Klasik Fade Kesim", tip: "onceSonra", renk1: "#1a1a2e", renk2: "#FFD700" },
  { id: 2, baslik: "Modern Sakal Şekillendirme", tip: "hizmet", renk1: "#0f3460", renk2: "#e94560" },
  { id: 3, baslik: "Pompadour Stil", tip: "onceSonra", renk1: "#16213e", renk2: "#f5a623" },
  { id: 4, baslik: "ROYAL EXPERIENCE", tip: "paket", renk1: "#2d1b69", renk2: "#c084fc" },
  { id: 5, baslik: "Saç + Sakal Combo", tip: "hizmet", renk1: "#1a3a2a", renk2: "#34d399" },
  { id: 6, baslik: "Keratin Sonuçları", tip: "onceSonra", renk1: "#3a1a1a", renk2: "#fbbf24" },
];

const YILDIZLAR = [1, 2, 3, 4, 5];

export default function GaleriSayfasi() {
  const [yorumlar, setYorumlar] = useState<Yorum[]>([]);
  const [yorumFormAcik, setYorumFormAcik] = useState(false);
  const [yorumForm, setYorumForm] = useState({
    musteriAdi: "",
    puan: 5,
    yorum: "",
    hizmet: "",
  });
  const [aktifKategori, setAktifKategori] = useState<"hepsi" | "onceSonra" | "hizmet" | "paket">("hepsi");

  useEffect(() => {
    setYorumlar(getYorumlar());
  }, []);

  const yenile = () => setYorumlar(getYorumlar());

  const filtreliGaleri =
    aktifKategori === "hepsi"
      ? GALERI_ORNEKLERI
      : GALERI_ORNEKLERI.filter((g) => g.tip === aktifKategori);

  const handleYorumKaydet = () => {
    if (!yorumForm.musteriAdi.trim() || !yorumForm.yorum.trim()) return;
    saveYorum({
      id: generateId(),
      musteriAdi: yorumForm.musteriAdi,
      puan: yorumForm.puan,
      yorum: yorumForm.yorum,
      hizmet: yorumForm.hizmet,
      tarih: new Date().toLocaleDateString("tr-TR"),
    });
    yenile();
    setYorumFormAcik(false);
    setYorumForm({ musteriAdi: "", puan: 5, yorum: "", hizmet: "" });
  };

  const ortPuan =
    yorumlar.length > 0
      ? yorumlar.reduce((s, y) => s + y.puan, 0) / yorumlar.length
      : 5;

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
          ✦ Galeri & Yorumlar
        </span>
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl font-black text-white mt-3 mb-1"
        >
          Galeri
        </h1>
        <p className="text-[#888] text-sm">Çalışmalarımız ve müşteri deneyimleri</p>
        <div
          style={{
            width: 40,
            height: 2,
            background: "linear-gradient(135deg, #FFD700, #B8960C)",
            marginTop: 10,
          }}
        />
      </div>

      {/* Gallery filter */}
      <div
        style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
        className="flex p-1 mb-5"
      >
        {(["hepsi", "onceSonra", "hizmet", "paket"] as const).map((f) => {
          const labels = { hepsi: "Tümü", onceSonra: "Önce/Sonra", hizmet: "Hizmet", paket: "Paket" };
          return (
            <button
              key={f}
              onClick={() => setAktifKategori(f)}
              style={{
                background: aktifKategori === f ? "linear-gradient(135deg, #FFD700, #B8960C)" : "transparent",
                color: aktifKategori === f ? "#000" : "#666",
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {filtreliGaleri.map((item) => (
          <div
            key={item.id}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              height: 160,
              position: "relative",
              background: `linear-gradient(135deg, ${item.renk1}, ${item.renk2})`,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            className="card-hover cursor-pointer"
          >
            {/* Decorative pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 80% 20%, ${item.renk2}40, transparent 60%)`,
              }}
            />
            {/* Barber pole decoration */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 28,
                height: 28,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              {item.tip === "onceSonra" ? "↔️" : item.tip === "paket" ? "👑" : "✂️"}
            </div>
            {/* Label */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "24px 12px 12px",
              }}
            >
              <div className="text-white text-xs font-bold">{item.baslik}</div>
              <div
                style={{ color: item.renk2, opacity: 0.8 }}
                className="text-xs capitalize mt-0.5"
              >
                {item.tip === "onceSonra" ? "Önce / Sonra" : item.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add photo placeholder */}
      <div
        style={{
          background: "#0f0f0f",
          border: "2px dashed #2a2a2a",
          borderRadius: 16,
          padding: "24px",
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <div className="text-3xl mb-2">📸</div>
        <div className="text-[#555] text-sm font-semibold">Yeni fotoğraf ekle</div>
        <div className="text-[#444] text-xs mt-1">Yakında aktif olacak</div>
      </div>

      {/* Reviews section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-white">Yorumlar</h2>
            <div
              style={{
                width: 40,
                height: 2,
                background: "linear-gradient(135deg, #FFD700, #B8960C)",
                marginTop: 6,
              }}
            />
          </div>
          <button
            onClick={() => setYorumFormAcik(true)}
            style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
          >
            + Yorum Yap
          </button>
        </div>

        {/* Rating summary */}
        <div
          style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
          className="p-4 flex items-center gap-4 mb-4"
        >
          <div className="text-center">
            <div style={{ color: "#FFD700" }} className="text-4xl font-black">
              {ortPuan.toFixed(1)}
            </div>
            <div className="flex gap-0.5 justify-center mt-1">
              {YILDIZLAR.map((s) => (
                <span
                  key={s}
                  style={{ color: s <= Math.round(ortPuan) ? "#FFD700" : "#333" }}
                  className="text-base"
                >
                  ★
                </span>
              ))}
            </div>
            <div className="text-[#666] text-xs mt-1">{yorumlar.length} yorum</div>
          </div>
          <div className="flex-1">
            {YILDIZLAR.reverse().map((s) => {
              const sayi = yorumlar.filter((y) => y.puan === s).length;
              const yuzde = yorumlar.length > 0 ? (sayi / yorumlar.length) * 100 : 0;
              return (
                <div key={s} className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#666] w-3">{s}</span>
                  <span className="text-[#FFD700] text-xs">★</span>
                  <div
                    style={{ background: "#1a1a1a", borderRadius: 4, flex: 1, height: 6 }}
                  >
                    <div
                      style={{
                        width: `${yuzde}%`,
                        height: "100%",
                        background: "linear-gradient(135deg, #FFD700, #B8960C)",
                        borderRadius: 4,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#555] w-4">{sayi}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review list */}
        <div className="flex flex-col gap-3">
          {yorumlar.length === 0 ? (
            <div className="text-center py-8 text-[#555]">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-sm">Henüz yorum yok</div>
              <div className="text-xs mt-1">İlk yorumu siz yapın!</div>
            </div>
          ) : (
            yorumlar.map((yorum) => (
              <div
                key={yorum.id}
                style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16 }}
                className="p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        background: "linear-gradient(135deg, #FFD700, #B8960C)",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                      className="flex items-center justify-center text-black font-black text-sm"
                    >
                      {yorum.musteriAdi[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{yorum.musteriAdi}</div>
                      {yorum.hizmet && <div className="text-[#666] text-xs">{yorum.hizmet}</div>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {YILDIZLAR.map((s) => (
                        <span key={s} style={{ color: s <= yorum.puan ? "#FFD700" : "#333" }} className="text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="text-[#555] text-xs mt-0.5">{yorum.tarih}</div>
                  </div>
                </div>
                <p className="text-[#aaa] text-sm leading-relaxed">&ldquo;{yorum.yorum}&rdquo;</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review form modal */}
      {yorumFormAcik && (
        <div
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setYorumFormAcik(false)}
        >
          <div
            style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "24px 24px 0 0" }}
            className="w-full max-w-lg pb-8"
          >
            <div className="p-5 border-b border-[#1f1f1f] flex items-center justify-between">
              <h2 className="font-black text-white">Yorum Yap</h2>
              <button
                onClick={() => setYorumFormAcik(false)}
                style={{ background: "#1a1a1a", color: "#888" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                ×
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Adınız</label>
                <input
                  value={yorumForm.musteriAdi}
                  onChange={(e) => setYorumForm((p) => ({ ...p, musteriAdi: e.target.value }))}
                  placeholder="Ad Soyad"
                  className="input-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#888] mb-2 block uppercase tracking-wider">Puanınız</label>
                <div className="flex gap-2">
                  {YILDIZLAR.map((s) => (
                    <button
                      key={s}
                      onClick={() => setYorumForm((p) => ({ ...p, puan: s }))}
                      style={{
                        fontSize: 32,
                        color: s <= yorumForm.puan ? "#FFD700" : "#333",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        transform: s <= yorumForm.puan ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Aldığınız Hizmet</label>
                <input
                  value={yorumForm.hizmet}
                  onChange={(e) => setYorumForm((p) => ({ ...p, hizmet: e.target.value }))}
                  placeholder="Örn: SIGNATURE Paket"
                  className="input-dark"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#888] mb-1.5 block uppercase tracking-wider">Yorumunuz</label>
                <textarea
                  value={yorumForm.yorum}
                  onChange={(e) => setYorumForm((p) => ({ ...p, yorum: e.target.value }))}
                  placeholder="Deneyiminizi paylaşın..."
                  rows={3}
                  className="input-dark resize-none"
                />
              </div>

              <button
                onClick={handleYorumKaydet}
                disabled={!yorumForm.musteriAdi.trim() || !yorumForm.yorum.trim()}
                style={{
                  background: yorumForm.musteriAdi.trim() && yorumForm.yorum.trim()
                    ? "linear-gradient(135deg, #FFD700, #B8960C)"
                    : "#1a1a1a",
                  color: yorumForm.musteriAdi.trim() && yorumForm.yorum.trim() ? "#000" : "#444",
                }}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all"
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
