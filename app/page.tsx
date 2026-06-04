"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SALON_INFO, HIZMETLER, PAKETLER, KURUMSAL_DEGERLER } from "@/lib/data";
import { getYorumlar, getKampanyalar, seedDemoData } from "@/lib/storage";
import type { Yorum, Kampanya } from "@/lib/data";

export default function AnaSayfa() {
  const [yorumlar, setYorumlar] = useState<Yorum[]>([]);
  const [kampanyalar, setKampanyalar] = useState<Kampanya[]>([]);
  const [aktifKampanya, setAktifKampanya] = useState(0);

  useEffect(() => {
    seedDemoData();
    setYorumlar(getYorumlar());
    setKampanyalar(getKampanyalar().filter((k) => k.aktif));
  }, []);

  useEffect(() => {
    if (kampanyalar.length <= 1) return;
    const t = setInterval(
      () => setAktifKampanya((p) => (p + 1) % kampanyalar.length),
      3500
    );
    return () => clearInterval(t);
  }, [kampanyalar.length]);

  const ortPuan =
    yorumlar.length > 0
      ? (yorumlar.reduce((s, y) => s + y.puan, 0) / yorumlar.length).toFixed(1)
      : "5.0";

  const whatsappUrl = `https://wa.me/${SALON_INFO.phone}?text=Merhaba%2C%20randevu%20almak%20istiyorum.`;

  return (
    <div className="max-w-lg mx-auto">
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #0f0f0f 0%, #080808 100%)",
          borderBottom: "1px solid rgba(255,215,0,0.1)",
        }}
        className="px-5 pt-8 pb-10 relative overflow-hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
          }}
        />

        <div className="flex items-center gap-2 mb-6">
          <span
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.3)",
              color: "#FFD700",
            }}
            className="text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase"
          >
            ✦ Premium Erkek Kuaförü
          </span>
        </div>

        <h1
          style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          className="text-4xl font-black mb-2"
        >
          <span
            style={{
              background: "linear-gradient(135deg, #FFD700, #FFF176, #B8960C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Adana Çukurova&apos;da
          </span>
          <br />
          <span className="text-white">Profesyonel</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #FFD700, #FFF176)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Erkek Kuaförü
          </span>
        </h1>

        <p className="text-[#aaa] text-sm leading-relaxed mt-4 mb-8">
          Adana&apos;nın kalbinde, Çukurova&apos;nın en premium erkek bakım deneyimi. Modern
          teknikler, geleneksel ustalık ve kişiye özel bakımla kendinizi en iyi hissedin.
        </p>

        <div className="flex gap-4 mb-8">
          {[
            { rakam: "4.9", etiket: "Puan", ikon: "⭐" },
            { rakam: "500+", etiket: "Müşteri", ikon: "👥" },
            { rakam: "5+", etiket: "Yıl", ikon: "🏆" },
          ].map((stat) => (
            <div key={stat.etiket} className="flex-1 text-center">
              <div className="text-xl mb-0.5">{stat.ikon}</div>
              <div style={{ color: "#FFD700" }} className="text-xl font-black">
                {stat.rakam}
              </div>
              <div className="text-[#666] text-xs">{stat.etiket}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href="/randevu"
            style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95"
          >
            📅 Randevu Al
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "2px solid rgba(37,211,102,0.4)",
              color: "#25D366",
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            💬 WhatsApp
          </a>
        </div>
      </section>

      {/* Campaigns */}
      {kampanyalar.length > 0 && (
        <section className="px-5 py-5">
          <div
            style={{
              background: `linear-gradient(135deg, ${kampanyalar[aktifKampanya]?.renk}22, ${kampanyalar[aktifKampanya]?.renk}11)`,
              border: `1px solid ${kampanyalar[aktifKampanya]?.renk}44`,
              borderRadius: "16px",
            }}
            className="p-4 transition-all duration-500"
          >
            <div className="flex items-start gap-3">
              <div
                style={{
                  background: kampanyalar[aktifKampanya]?.renk,
                  minWidth: 40,
                  height: 40,
                }}
                className="rounded-full flex items-center justify-center text-black font-black text-sm"
              >
                %
              </div>
              <div className="flex-1">
                <div
                  style={{ color: kampanyalar[aktifKampanya]?.renk }}
                  className="font-black text-sm mb-0.5"
                >
                  {kampanyalar[aktifKampanya]?.baslik}
                </div>
                <div className="text-[#aaa] text-xs leading-relaxed">
                  {kampanyalar[aktifKampanya]?.aciklama}
                </div>
              </div>
            </div>
            {kampanyalar.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {kampanyalar.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAktifKampanya(i)}
                    style={{
                      width: i === aktifKampanya ? 20 : 6,
                      height: 6,
                      background: i === aktifKampanya ? "#FFD700" : "#333",
                      borderRadius: 3,
                      transition: "all 0.3s",
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-white">Hizmetlerimiz</h2>
            <div
              style={{
                width: 40,
                height: 2,
                background: "linear-gradient(135deg, #FFD700, #B8960C)",
                marginTop: 6,
              }}
            />
          </div>
          <Link
            href="/hizmetler"
            style={{ color: "#FFD700" }}
            className="text-xs font-bold flex items-center gap-1"
          >
            Tümü →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {HIZMETLER.slice(0, 9).map((h) => (
            <div
              key={h.id}
              style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
              className="p-3 text-center card-hover cursor-pointer"
            >
              <div className="text-2xl mb-1.5">{h.ikon}</div>
              <div className="text-xs font-semibold text-white leading-tight">{h.ad}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="px-5 py-6">
        <div className="mb-5">
          <h2 className="text-xl font-black text-white">Premium Paketler</h2>
          <div
            style={{
              width: 40,
              height: 2,
              background: "linear-gradient(135deg, #FFD700, #B8960C)",
              marginTop: 6,
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          {PAKETLER.map((paket) => (
            <div
              key={paket.id}
              style={{
                background: paket.popular ? "linear-gradient(145deg, #1a1500, #1f1a00)" : "#111",
                border: `1px solid ${paket.popular ? paket.renk + "60" : "#1f1f1f"}`,
                borderRadius: 18,
              }}
              className="relative overflow-hidden"
            >
              {paket.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${paket.renk}, transparent)`,
                  }}
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    {paket.popular && (
                      <span
                        style={{
                          background: paket.renk,
                          color: "#000",
                          fontSize: 9,
                          fontWeight: 800,
                        }}
                        className="px-2 py-0.5 rounded-full tracking-widest uppercase block mb-1"
                      >
                        ★ EN POPÜLER
                      </span>
                    )}
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${paket.renk}, ${paket.renk2})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Playfair Display', serif",
                      }}
                      className="text-lg font-black"
                    >
                      {paket.ad}
                    </span>
                  </div>
                  <div className="text-right">
                    <span style={{ color: paket.renk }} className="text-2xl font-black">
                      {paket.fiyat}
                    </span>
                    <span className="text-[#666] text-sm">₺</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {paket.hizmetler.map((h) => (
                    <span
                      key={h}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#ccc",
                      }}
                      className="text-xs px-2 py-0.5 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/randevu"
          style={{ background: "linear-gradient(135deg, #FFD700, #B8960C)", color: "#000" }}
          className="w-full flex items-center justify-center py-4 rounded-2xl font-black text-sm mt-5 shadow-lg active:scale-95 transition-all"
        >
          Paket Randevusu Al →
        </Link>
      </section>

      {/* Reviews */}
      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-white">Müşteri Yorumları</h2>
            <div
              style={{
                width: 40,
                height: 2,
                background: "linear-gradient(135deg, #FFD700, #B8960C)",
                marginTop: 6,
              }}
            />
          </div>
          <div className="text-right">
            <div style={{ color: "#FFD700" }} className="text-xl font-black">
              {ortPuan} ⭐
            </div>
            <div className="text-[#666] text-xs">{yorumlar.length} yorum</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {yorumlar.slice(0, 3).map((yorum) => (
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
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: s <= yorum.puan ? "#FFD700" : "#333" }} className="text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[#aaa] text-sm leading-relaxed">&ldquo;{yorum.yorum}&rdquo;</p>
              <div className="text-[#555] text-xs mt-2">{yorum.tarih}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-6">
        <div className="mb-5">
          <h2 className="text-xl font-black text-white">Kurumsal Değerlerimiz</h2>
          <div
            style={{
              width: 40,
              height: 2,
              background: "linear-gradient(135deg, #FFD700, #B8960C)",
              marginTop: 6,
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {KURUMSAL_DEGERLER.map((d) => (
            <div
              key={d.baslik}
              style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14 }}
              className="p-3"
            >
              <div className="text-xl mb-1.5">{d.ikon}</div>
              <div className="text-xs font-bold text-white mb-0.5">{d.baslik}</div>
              <div className="text-[#666] text-xs leading-relaxed">{d.aciklama}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section
        style={{ background: "#0f0f0f", borderTop: "1px solid rgba(255,215,0,0.1)" }}
        className="px-5 py-8 text-center"
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #FFD700, #FFF176, #B8960C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="text-2xl font-black mb-1"
        >
          SALOON FERDİ ZOPCUK
        </div>
        <div className="text-[#666] text-xs mb-4">Premium Erkek Kuaförü · Adana Çukurova</div>
        <div className="text-[#aaa] text-sm mb-2">📍 {SALON_INFO.addressFull}</div>
        <a href={`tel:${SALON_INFO.phone}`} style={{ color: "#FFD700" }} className="font-bold text-sm">
          📞 {SALON_INFO.phoneDisplay}
        </a>
        <div className="mt-4 text-[#555] text-xs">
          <div>{SALON_INFO.workingHours.weekdays}</div>
          <div>{SALON_INFO.workingHours.sunday}</div>
        </div>
        <Link
          href="/iletisim"
          style={{ color: "#FFD700", borderColor: "rgba(255,215,0,0.3)" }}
          className="inline-flex items-center gap-1 mt-4 text-xs font-bold border rounded-full px-4 py-2"
        >
          Tüm İletişim Bilgileri →
        </Link>
      </section>
    </div>
  );
}
