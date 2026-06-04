// Application data and types

export const SALON_INFO = {
  name: "SALOON FERDİ ZOPCUK",
  phone: "05347730461",
  phoneDisplay: "0 534 773 04 61",
  address: "Belediye Evleri Mah. 8448 Sk. No:5/B, Çukurova / Adana",
  addressFull: "Adana / Çukurova / Belediye Evleri Mahallesi 8448 sk. No:5/B",
  instagram: "@saloonferdizopcuk",
  mapUrl:
    "https://www.google.com/maps/search/Belediye+Evleri+Mahallesi+8448+Sk+No+5+B+Cukurova+Adana",
  workingHours: {
    weekdays: "Pazartesi - Cumartesi: 07:00 - 22:00",
    sunday: "Pazar: 12:00 - 20:00",
  },
};

export const HIZMETLER = [
  { id: 1, ad: "Saç Kesimi", ikon: "✂️", aciklama: "Klasik & modern saç kesimleri" },
  { id: 2, ad: "Sakal Kesimi", ikon: "🪒", aciklama: "Düzgün sakal şekillendirme" },
  { id: 3, ad: "Saç + Sakal", ikon: "💈", aciklama: "Komple bakım paketi" },
  { id: 4, ad: "Saç Bakımı", ikon: "🧴", aciklama: "Besleyici saç bakımı" },
  { id: 5, ad: "Cilt Bakımı", ikon: "✨", aciklama: "Profesyonel cilt bakımı" },
  { id: 6, ad: "Ağda", ikon: "🌿", aciklama: "Yüz ve bölgesel ağda" },
  { id: 7, ad: "Fön", ikon: "💨", aciklama: "Profesyonel fön çekimi" },
  { id: 8, ad: "Saç Şekillendirme", ikon: "💫", aciklama: "İstenilen şekle göre styling" },
  { id: 9, ad: "Perma", ikon: "🌀", aciklama: "Kalıcı dalga & bukle" },
  { id: 10, ad: "Keratin Uygulaması", ikon: "⚡", aciklama: "Saç düzleştirme & parlatma" },
  { id: 11, ad: "Siyah Nokta Temizliği", ikon: "🔍", aciklama: "Derin gözenek temizliği" },
  { id: 12, ad: "Buhar Bakımı", ikon: "♨️", aciklama: "Derin nem & yenileme" },
  { id: 13, ad: "Saç Maskesi", ikon: "🌸", aciklama: "Güçlendirici saç maskesi" },
  { id: 14, ad: "Yüz Maskesi", ikon: "🎭", aciklama: "Canlandırıcı yüz maskesi" },
  { id: 15, ad: "Vitamin Bakımı", ikon: "💊", aciklama: "Vitamin kompleksi uygulaması" },
];

export const PAKETLER = [
  {
    id: 1,
    ad: "ESSENTIAL",
    fiyat: 500,
    renk: "#C0C0C0",
    renk2: "#E8E8E8",
    aciklama: "Temel bakım paketi",
    hizmetler: ["Saç Kesimi", "Yıkama", "Şekillendirme"],
    popular: false,
  },
  {
    id: 2,
    ad: "SIGNATURE",
    fiyat: 600,
    renk: "#FFD700",
    renk2: "#FFF176",
    aciklama: "En çok tercih edilen",
    hizmetler: ["Saç Kesimi", "Sakal", "Yıkama", "Şekillendirme"],
    popular: true,
  },
  {
    id: 3,
    ad: "PRESTIGE",
    fiyat: 700,
    renk: "#B8960C",
    renk2: "#FFD700",
    aciklama: "Premium bakım deneyimi",
    hizmetler: ["Saç Kesimi", "Sakal", "Saç Maskesi", "Yüz Maskesi", "Yıkama", "Şekillendirme"],
    popular: false,
  },
  {
    id: 4,
    ad: "ROYAL EXPERIENCE",
    fiyat: 950,
    renk: "#7B2D8B",
    renk2: "#C084FC",
    aciklama: "Üst düzey kraliyet deneyimi",
    hizmetler: [
      "Tam Bakım",
      "Siyah Nokta Temizliği",
      "Kore Maskesi",
      "Buhar",
      "Keratin",
      "Vitamin Bakımı",
      "Yıkama",
      "Şekillendirme",
    ],
    popular: false,
  },
];

export const KURUMSAL_DEGERLER = [
  { ikon: "🤝", baslik: "İnsan Haklarına Saygı", aciklama: "Her müşterimize eşit saygı ve değer" },
  {
    ikon: "⚖️",
    baslik: "Ayrımcılık Yapmama",
    aciklama: "Tüm müşterilere eşit ve adil hizmet",
  },
  {
    ikon: "🎯",
    baslik: "Mesleki Etik",
    aciklama: "Mesleğimize ve müşterilerimize karşı dürüstlük",
  },
  {
    ikon: "😊",
    baslik: "Müşteri Memnuniyeti",
    aciklama: "Her ziyarette mükemmel deneyim",
  },
  {
    ikon: "🧼",
    baslik: "Temizlik & Hijyen",
    aciklama: "En yüksek hijyen standartları",
  },
  {
    ikon: "⭐",
    baslik: "Kaliteli Hizmet",
    aciklama: "Her işte kalite ve özen",
  },
  {
    ikon: "📚",
    baslik: "Eğitim & Gelişim",
    aciklama: "Sürekli mesleki gelişim",
  },
  {
    ikon: "💎",
    baslik: "Güvenilirlik",
    aciklama: "Sözümüze, işimize güven",
  },
];

// Types
export interface Randevu {
  id: string;
  ad: string;
  telefon: string;
  hizmet: string;
  tarih: string;
  saat: string;
  not?: string;
  durum: "bekliyor" | "onaylandi" | "tamamlandi" | "iptal";
  olusturmaTarihi: string;
}

export interface Musteri {
  id: string;
  ad: string;
  telefon: string;
  sonGelisTarihi: string;
  alinanHizmet: string;
  odeme: number;
  notlar?: string;
  sadikMusteri: boolean;
  toplamZiyaret: number;
  toplamHarcama: number;
}

export interface GelirKayit {
  id: string;
  tarih: string;
  miktar: number;
  hizmet: string;
  musteriAdi?: string;
  efeKazanc?: number;
  efeDukkanKatkisi?: number;
  notlar?: string;
}

export interface Kampanya {
  id: string;
  baslik: string;
  aciklama: string;
  tarih: string;
  aktif: boolean;
  renk: string;
}

export interface Yorum {
  id: string;
  musteriAdi: string;
  puan: number;
  yorum: string;
  tarih: string;
  hizmet?: string;
}

// Available appointment times
export const RANDEVU_SAATLERI = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];
