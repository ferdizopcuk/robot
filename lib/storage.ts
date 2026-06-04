"use client";

import type { Randevu, Musteri, GelirKayit, Kampanya, Yorum } from "./data";

// LocalStorage keys
const KEYS = {
  randevular: "sfz_randevular",
  musteriler: "sfz_musteriler",
  gelirler: "sfz_gelirler",
  kampanyalar: "sfz_kampanyalar",
  yorumlar: "sfz_yorumlar",
};

function getItem<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setItem<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Randevu
export const getRandevular = (): Randevu[] => getItem<Randevu>(KEYS.randevular);
export const saveRandevu = (r: Randevu) => {
  const list = getRandevular();
  list.push(r);
  setItem(KEYS.randevular, list);
};
export const updateRandevu = (id: string, updates: Partial<Randevu>) => {
  const list = getRandevular().map((r) => (r.id === id ? { ...r, ...updates } : r));
  setItem(KEYS.randevular, list);
};
export const deleteRandevu = (id: string) => {
  setItem(KEYS.randevular, getRandevular().filter((r) => r.id !== id));
};

// Musteri
export const getMusteriler = (): Musteri[] => getItem<Musteri>(KEYS.musteriler);
export const saveMusteri = (m: Musteri) => {
  const list = getMusteriler();
  const existing = list.findIndex((x) => x.id === m.id);
  if (existing >= 0) list[existing] = m;
  else list.push(m);
  setItem(KEYS.musteriler, list);
};
export const deleteMusteri = (id: string) => {
  setItem(KEYS.musteriler, getMusteriler().filter((m) => m.id !== id));
};

// Gelir
export const getGelirler = (): GelirKayit[] => getItem<GelirKayit>(KEYS.gelirler);
export const saveGelir = (g: GelirKayit) => {
  const list = getGelirler();
  list.push(g);
  setItem(KEYS.gelirler, list);
};
export const updateGelir = (id: string, updates: Partial<GelirKayit>) => {
  const list = getGelirler().map((g) => (g.id === id ? { ...g, ...updates } : g));
  setItem(KEYS.gelirler, list);
};
export const deleteGelir = (id: string) => {
  setItem(KEYS.gelirler, getGelirler().filter((g) => g.id !== id));
};

// Kampanya
export const getKampanyalar = (): Kampanya[] => getItem<Kampanya>(KEYS.kampanyalar);
export const saveKampanya = (k: Kampanya) => {
  const list = getKampanyalar();
  const existing = list.findIndex((x) => x.id === k.id);
  if (existing >= 0) list[existing] = k;
  else list.push(k);
  setItem(KEYS.kampanyalar, list);
};
export const deleteKampanya = (id: string) => {
  setItem(KEYS.kampanyalar, getKampanyalar().filter((k) => k.id !== id));
};

// Yorum
export const getYorumlar = (): Yorum[] => getItem<Yorum>(KEYS.yorumlar);
export const saveYorum = (y: Yorum) => {
  const list = getYorumlar();
  list.push(y);
  setItem(KEYS.yorumlar, list);
};
export const deleteYorum = (id: string) => {
  setItem(KEYS.yorumlar, getYorumlar().filter((y) => y.id !== id));
};

// Seed demo data if empty
export const seedDemoData = () => {
  if (typeof window === "undefined") return;

  if (getGelirler().length === 0) {
    const now = new Date();
    const demoGelirler: GelirKayit[] = [
      {
        id: "g1",
        tarih: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString().split("T")[0],
        miktar: 600,
        hizmet: "SIGNATURE Paket",
        musteriAdi: "Ahmet Yılmaz",
        efeKazanc: 150,
        efeDukkanKatkisi: 100,
      },
      {
        id: "g2",
        tarih: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString().split("T")[0],
        miktar: 500,
        hizmet: "ESSENTIAL Paket",
        musteriAdi: "Mehmet Demir",
        efeKazanc: 125,
        efeDukkanKatkisi: 80,
      },
      {
        id: "g3",
        tarih: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split("T")[0],
        miktar: 950,
        hizmet: "ROYAL EXPERIENCE Paket",
        musteriAdi: "Hasan Kaya",
        efeKazanc: 250,
        efeDukkanKatkisi: 150,
      },
    ];
    demoGelirler.forEach(saveGelir);
  }

  if (getYorumlar().length === 0) {
    const demoYorumlar: Yorum[] = [
      {
        id: "y1",
        musteriAdi: "Ahmet Y.",
        puan: 5,
        yorum: "Muhteşem bir deneyimdi. Ferdi usta gerçekten profesyonel, elinden çıkan iş mükemmel. Kesinlikle tekrar geleceğim!",
        tarih: "2025-05-20",
        hizmet: "SIGNATURE Paket",
      },
      {
        id: "y2",
        musteriAdi: "Mehmet K.",
        puan: 5,
        yorum: "Adana'nın en iyi berberi burası. Temizliği, kalitesi, müşteri ilgisi her şey çok iyi. ROYAL EXPERIENCE deneyip bağımlısı oldum.",
        tarih: "2025-05-18",
        hizmet: "ROYAL EXPERIENCE Paket",
      },
      {
        id: "y3",
        musteriAdi: "Emre T.",
        puan: 5,
        yorum: "Premium bir atmosfer, son derece kaliteli hizmet. Randevu sistemi çok pratik. Tavsiye ediyorum!",
        tarih: "2025-05-15",
        hizmet: "PRESTIGE Paket",
      },
    ];
    demoYorumlar.forEach(saveYorum);
  }

  if (getMusteriler().length === 0) {
    const demoMusteriler: Musteri[] = [
      {
        id: "m1",
        ad: "Ahmet Yılmaz",
        telefon: "0532 111 22 33",
        sonGelisTarihi: new Date().toISOString().split("T")[0],
        alinanHizmet: "SIGNATURE Paket",
        odeme: 600,
        sadikMusteri: true,
        toplamZiyaret: 12,
        toplamHarcama: 7200,
        notlar: "Her ayın ilk haftası gelir",
      },
      {
        id: "m2",
        ad: "Mehmet Demir",
        telefon: "0533 222 33 44",
        sonGelisTarihi: new Date().toISOString().split("T")[0],
        alinanHizmet: "Saç Kesimi",
        odeme: 500,
        sadikMusteri: true,
        toplamZiyaret: 8,
        toplamHarcama: 4000,
      },
    ];
    demoMusteriler.forEach(saveMusteri);
  }

  if (getKampanyalar().length === 0) {
    const demoKampanyalar: Kampanya[] = [
      {
        id: "k1",
        baslik: "🎉 Yaz Özel Kampanyası!",
        aciklama: "SIGNATURE pakette %10 indirim! Haziran ayı boyunca geçerlidir.",
        tarih: "2025-06-30",
        aktif: true,
        renk: "#FFD700",
      },
      {
        id: "k2",
        baslik: "👑 ROYAL EXPERIENCE Tanıtım Fiyatı",
        aciklama: "İlk ROYAL EXPERIENCE randevunuzda 950₺ yerine 850₺!",
        tarih: "2025-07-15",
        aktif: true,
        renk: "#C084FC",
      },
    ];
    demoKampanyalar.forEach(saveKampanya);
  }
};

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);
