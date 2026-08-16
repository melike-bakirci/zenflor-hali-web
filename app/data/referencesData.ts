export interface ReferenceClient {
  id: string;
  name: string;
  industry: string;
  logoText: string;
  accentColor: string;
  location: string;
}

export interface ReferenceProject {
  id: string;
  title: string;
  clientName: string;
  category: "office" | "hotel" | "architecture" | "landscape";
  categoryLabel: string;
  location: string;
  area: string;
  productType: string;
  completionYear: string;
  mainImage: string;
  galleryImages: string[];
  description: string;
  featured: boolean;
}

export const referenceClients: ReferenceClient[] = [
  {
    id: "client-1",
    name: "Zorlu Holding Plaza",
    industry: "Finans & İş Merkezi",
    logoText: "ZORLU",
    accentColor: "#1E3A8A",
    location: "İstanbul",
  },
  {
    id: "client-2",
    name: "Hilton Hotels & Resorts",
    industry: "Otelcilik & Turizm",
    logoText: "HILTON",
    accentColor: "#0284C7",
    location: "Antalya",
  },
  {
    id: "client-3",
    name: "Zen Holding",
    industry: "İnşaat & Taahhüt",
    logoText: "ZEN",
    accentColor: "#B91C1C",
    location: "İstanbul",
  },
  {
    id: "client-4",
    name: "Nurol Gayrimenkul",
    industry: "Gayrimenkul & Proje",
    logoText: "NUROL",
    accentColor: "#047857",
    location: "Muğla",
  },
  {
    id: "client-5",
    name: "Skylight Mimarlık",
    industry: "Mimarlık & İç Tasarım",
    logoText: "SKYLIGHT",
    accentColor: "#6D28D9",
    location: "İzmir",
  },
  {
    id: "client-6",
    name: "Vadistanbul Ofisleri",
    industry: "Kurumsal Plaza",
    logoText: "VADİSTANBUL",
    accentColor: "#C05621",
    location: "İstanbul",
  },
  {
    id: "client-7",
    name: "Garanti BBVA Teknoloji",
    industry: "Teknoloji Kampüsü",
    logoText: "GARANTİ",
    accentColor: "#15803D",
    location: "İstanbul",
  },
  {
    id: "client-8",
    name: "Acıbadem Sağlık Grubu",
    industry: "Sağlık Binaları",
    logoText: "ACIBADEM",
    accentColor: "#0369A1",
    location: "İstanbul",
  },
];

export const referenceProjects: ReferenceProject[] = [
  {
    id: "ref-proj-1",
    title: "Maslak Plaza Yönetici Katı Karo Halı Uygulaması",
    clientName: "Zorlu Holding Plaza",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Maslak, İstanbul",
    area: "1.850 m²",
    productType: "Karo Halı - Akustik Modüler Seri",
    completionYear: "2024",
    mainImage: "/images/cat-karo-office.png",
    galleryImages: [
      "/images/cat-karo-office.png",
      "/images/hero-karo-hali.jpeg",
      "/images/blog-karo-detail.png",
    ],
    description:
      "34 katlı plazanın yönetim ve operasyon katlarında yüksek akustik ses yalıtımlı modüler karo halı kaplaması başarıyla tamamlanmıştır. Çalışma ortamında %32 ses yutuculuk artışı ve konfor sağlanmıştır.",
    featured: true,
  },
  {
    id: "ref-proj-2",
    title: "Antalya Resort & Spa Otel Koridor ve Balo Salonu",
    clientName: "Hilton Hotels & Resorts",
    category: "hotel",
    categoryLabel: "Otel & Turizm",
    location: "Belek, Antalya",
    area: "3.200 m²",
    productType: "Karo Halı - Ağır Trafik Desenli Seri",
    completionYear: "2024",
    mainImage: "/images/blog-karo-detail.png",
    galleryImages: [
      "/images/blog-karo-detail.png",
      "/images/cat-karo-pattern.png",
      "/images/hero-karo-hali.jpeg",
    ],
    description:
      "Otel koridorları, balo salonu ve suit odalarda aşınmaya dayanıklı, leke tutmaz ve ultra ses yutucu karo halı uygulaması yapılmıştır. Lüks konsept ile tam uyum sağlanmıştır.",
    featured: true,
  },
  {
    id: "ref-proj-3",
    title: "Vadistanbul Ofis Kompleksi Akustik Zemin Projesi",
    clientName: "Vadistanbul Ofisleri",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Sarıyer, İstanbul",
    area: "2.400 m²",
    productType: "Karo Halı - İlke & Delta Kombinasyonu",
    completionYear: "2023",
    mainImage: "/images/hero-karo-hali.jpeg",
    galleryImages: [
      "/images/hero-karo-hali.jpeg",
      "/images/cat-karo-office.png",
      "/images/blog-1.png",
    ],
    description:
      "Açık ofis ve toplantı alanlarında modüler renk kombinasyonları ile modern ve dinamik bir çalışma ortamı kurgulandı. Antistatik ve A sınıfı yangın dayanımlı ürünler tercih edilmiştir.",
    featured: true,
  },
  {
    id: "ref-proj-4",
    title: "Skylight Mimarlık Stüdyosu Özel Tasarım Karo Halı",
    clientName: "Skylight Mimarlık",
    category: "architecture",
    categoryLabel: "Mimarlık & Tasarım",
    location: "Alsancak, İzmir",
    area: "650 m²",
    productType: "Karo Halı - Geometrik Modüler Seri",
    completionYear: "2024",
    mainImage: "/images/cat-karo-pattern.png",
    galleryImages: [
      "/images/cat-karo-pattern.png",
      "/images/cat-karo-office.png",
      "/images/blog-karo-detail.png",
    ],
    description:
      "Mimarlık stüdyosunun kreatif çalışma ve sunum alanları için özel geometrik desen geçişli premium karo halı konsepti uygulandı. Mimari estetik ön planda tutulmuştur.",
    featured: true,
  },
  {
    id: "ref-proj-5",
    title: "Bodrum Luxury Villa & Sosyal Tesis Sentetik Çim Peyzajı",
    clientName: "Nurol Gayrimenkul",
    category: "landscape",
    categoryLabel: "Peyzaj & Çim Halı",
    location: "Yalıkavak, Bodrum",
    area: "1.250 m²",
    productType: "Çim Halı - Tuana 40 mm Peyzaj Çimi",
    completionYear: "2024",
    mainImage: "/images/cat-cim-landscape.png",
    galleryImages: [
      "/images/cat-cim-landscape.png",
      "/images/hero-cim-hali.jpeg",
      "/images/cat-cim-balcony.png",
    ],
    description:
      "Dört mevsim yeşil kalan, UV korumalı ve doğal çim dokusuna sahip 40 mm premium sentetik peyzaj çim halı uygulaması. Havuz çevresi ve sosyal tesis alanlarında uygulandı.",
    featured: true,
  },
  {
    id: "ref-proj-6",
    title: "Garanti BBVA Teknoloji Kampüsü Akustik Karo Halı",
    clientName: "Garanti BBVA Teknoloji",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Pendik, İstanbul",
    area: "4.100 m²",
    productType: "Karo Halı - Akustik Tabanlı Ağır Trafik",
    completionYear: "2023",
    mainImage: "/images/blog-1.png",
    galleryImages: [
      "/images/blog-1.png",
      "/images/cat-karo-office.png",
      "/images/hero-karo-hali.jpeg",
    ],
    description:
      "Yüksek insan trafiğine dayanıklı, tekerlekli sandalye aşınma testlerinden geçen, A sınıfı yangın dayanımlı ve ses yutma özellikli karo halı zemin kaplaması.",
    featured: true,
  },
  {
    id: "ref-proj-7",
    title: "Rönesans Tower Teras & Dinlenme Alanı Çim Halı Projesi",
    clientName: "Rönesans Holding",
    category: "landscape",
    categoryLabel: "Peyzaj & Çim Halı",
    location: "Ataşehir, İstanbul",
    area: "950 m²",
    productType: "Çim Halı - Doğa 30 mm Sentetik Çim",
    completionYear: "2024",
    mainImage: "/images/cat-cim-balcony.png",
    galleryImages: [
      "/images/cat-cim-balcony.png",
      "/images/hero-cim-hali.jpeg",
      "/images/cat-cim-landscape.png",
    ],
    description:
      "Kule teras katı çalışan dinlenme alanında konforlu, su tahliyeli ve estetik bir yeşil yaşam alanı oluşturan profesyonel sentetik çim halı uygulaması.",
    featured: false,
  },
  {
    id: "ref-proj-8",
    title: "Acıbadem Genel Merkez İdari Binalar Modüler Zemin",
    clientName: "Acıbadem Sağlık Grubu",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Kadıköy, İstanbul",
    area: "2.100 m²",
    productType: "Karo Halı - Antibakteriyel Polipropilen",
    completionYear: "2023",
    mainImage: "/images/blog-3.png",
    galleryImages: [
      "/images/blog-3.png",
      "/images/cat-karo-office.png",
      "/images/blog-karo-detail.png",
    ],
    description:
      "Antibakteriyel, anti-alerjik ve kolay temizlenebilir bitüm tabanlı modüler zemin kaplama çözümü ile modern idari ve doktor çalışma alanları yenilendi.",
    featured: false,
  },
];
