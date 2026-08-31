export interface ReferenceProject {
  id: string;
  title: string;
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

export const referenceProjects: ReferenceProject[] = [
  {
    id: "ref-proj-1",
    title: "Kurumsal Ofis Akustik Karo Halı Uygulaması",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Maslak, İstanbul",
    area: "1.850 m²",
    productType: "Karo Halı - Akustik Modüler Seri",
    completionYear: "2024",
    mainImage: "/images/uygulama-galerisi-karo-1.jpg",
    galleryImages: ["/images/uygulama-galerisi-karo-1.jpg"],
    description:
      "Modern açık ofis ve çalışma alanlarında yüksek ses yalıtımlı ve aşınmaya dayanıklı modüler karo halı kaplaması başarıyla tamamlanmıştır.",
    featured: true,
  },
  {
    id: "ref-proj-2",
    title: "Yönetici Katı ve Toplantı Odası Karo Halı Uygulaması",
    category: "office",
    categoryLabel: "Ofis & Plaza",
    location: "Levent, İstanbul",
    area: "1.200 m²",
    productType: "Karo Halı - Ağır Trafik Desenli Seri",
    completionYear: "2024",
    mainImage: "/images/uygulama-galerisi-karo-2.jpg",
    galleryImages: ["/images/uygulama-galerisi-karo-2.jpg"],
    description:
      "Yönetim katı ve toplantı salonlarında antistatik, yangına ve aşınmaya dayanıklı karo halı uygulaması gerçekleştirilmiştir.",
    featured: true,
  },
  {
    id: "ref-proj-3",
    title: "İş Merkezi Genel Alan Karo Halı Zemin Projesi",
    category: "office",
    categoryLabel: "Ofis & Ticari",
    location: "Sarıyer, İstanbul",
    area: "2.400 m²",
    productType: "Karo Halı - Modüler Ticari Seri",
    completionYear: "2024",
    mainImage: "/images/uygulama-galerisi-karo-3.jpg",
    galleryImages: ["/images/uygulama-galerisi-karo-3.jpg"],
    description:
      "Yoğun yaya trafiğine sahip kurumsal iş merkezinde leke tutmaz, kolay temizlenebilir ve uzun ömürlü karo halı kaplaması tamamlanmıştır.",
    featured: true,
  },
  {
    id: "ref-proj-4",
    title: "Sosyal Alan ve Teras Sentetik Çim Halı Uygulaması",
    category: "landscape",
    categoryLabel: "Peyzaj & Çim Halı",
    location: "Ataşehir, İstanbul",
    area: "950 m²",
    productType: "Çim Halı - Sentetik Peyzaj Çimi",
    completionYear: "2024",
    mainImage: "/images/uygulama-galerisi-cim-1.JPG",
    galleryImages: ["/images/uygulama-galerisi-cim-1.JPG"],
    description:
      "Açık hava teras ve dinlenme alanlarında dört mevsim yeşil, UV korumalı ve drenaj delikli sentetik peyzaj çim halı uygulaması yapılmıştır.",
    featured: true,
  },
  {
    id: "ref-proj-5",
    title: "Peyzaj & Bahçe Alanı Sentetik Çim Halı Zemin Kaplaması",
    category: "landscape",
    categoryLabel: "Peyzaj & Çim Halı",
    location: "Bodrum, Muğla",
    area: "1.500 m²",
    productType: "Çim Halı - Premium Peyzaj Çimi",
    completionYear: "2024",
    mainImage: "/images/uygulama-galerisi-cim-2.JPG",
    galleryImages: ["/images/uygulama-galerisi-cim-2.JPG"],
    description:
      "Tesis bahçe ve çevre düzenleme alanlarında doğal çim dokusuna sahip, bakım gerektirmeyen dekoratif sentetik çim halı uygulaması.",
    featured: true,
  },
];
