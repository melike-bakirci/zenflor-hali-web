import type { BlogPost } from "~/types/blog";
import { SITE_NAME } from "../lib/constants.ts";

export const blogPosts: BlogPost[] = [
  {
    id: "bp-001",
    slug: "karo-hali-secimi-rehberi",
    title: "Ofisiniz için Doğru Karo Halı Nasıl Seçilir?",
    excerpt:
      "Karo halı seçerken dikkat edilmesi gereken teknik ve estetik faktörler hakkında kapsamlı bir rehber.",
    content: `
Karo halı, ofis zemin kaplaması söz konusu olduğunda en esnek ve pratik çözümlerden biridir. Ancak doğru ürünü seçmek için birkaç temel faktörü göz önünde bulundurmak gerekir.

![Karo Halı Uygulaması](/images/blog-karo-detail.png)

## 1. Trafik Yoğunluğunu Belirleyin

Ofisinizdeki koridorlar, toplantı odaları ve giriş alanları farklı trafik yüklerine maruz kalır. Yoğun trafik alanları için twisted pile veya loop pile ürünler tercih edilmelidir.

## 2. Malzeme Seçimi

Naylon (PA) halılar dayanıklılık açısından en üst sırada yer alır. Polyester (PET) ise geri dönüştürülmüş içerik ve leke direnci konusunda avantajlıdır.

## 3. Yangın ve Güvenlik Sertifikaları

Ticari mekanlarda Cfl-s1 veya Bfl-s1 yangın sınıfına sahip ürünlerin kullanılması zorunludur. Teknik veri sayfasını mutlaka inceleyin.

## 4. Renk ve Desen Koordinasyonu

Açık renkler mekanı büyük gösterirken koyu tonlar konforu artırır. Kurumsal kimliğinizle uyumlu renk ve desen seçimi marka imajınıza katkı sağlar.

## 5. Alt Taban Seçimi

Karo halının altına uygulanacak alt taban (underlayment), akustik ve termal konfor açısından kritik öneme sahiptir.
    `,
    author: SITE_NAME,
    date: "2026-03-15",
    category: "Karo Halı",
    image: "/images/blog-1.png",
    readTime: 5,
    tags: ["Karo Halı", "Ofis", "Seçim Rehberi"],
  },
  {
    id: "bp-002",
    slug: "sentetik-cim-bakim-rehberi",
    title: "Sentetik Çim Bakımı: Mevsimden Mevsime Yapmanız Gerekenler",
    excerpt:
      "Sentetik çim halınızı yıllarca ilk günkü görünümünde tutmak için mevsimsel bakım önerileri.",
    content: `
Sentetik çim, gerçek çime göre çok daha az bakım gerektirir. Ancak uzun ömürlü ve estetik görünümünü korumak için bazı rutin işlemler şarttır.

![Sentetik Çim Detayı](/images/blog-cim-detail.png)

## İlkbahar Bakımı

Kışın biriken yaprak ve organik artıkları yumuşak bir tırmıkla temizleyin. Lif yatmışsa yüzeyi fırçalayarak dikleştirin.

## Yaz Bakımı

Yoğun güneş altındaki zeminler ısınabilir. Hafif sulama ile yüzey sıcaklığını düşürebilirsiniz. Evcil hayvan artıklarını hemen temizleyin ve su ile yıkayın.

## Sonbahar Bakımı

Düşen yaprakları düzenli olarak toplayın. Yaprakların birikip çürümesi sentetik çimin altında nem oluşturabilir.

## Kış Bakımı

Kar birikintilerini plastik kürekle temizleyin; metal kürek liflere zarar verebilir. Buz çözücü tuzlardan uzak tutun.

## Genel Öneriler

- Ağır mobilya veya araç üzerinde uzun süre bekletmeyin
- Yılda bir kez profesyonel bakım hizmetinden yararlanın
- Sigarayı doğrudan çim üzerinde söndürmeyin
    `,
    author: SITE_NAME,
    date: "2026-04-22",
    category: "Çim Halı",
    image: "/images/blog-2.png",
    readTime: 6,
    tags: ["Çim Halı", "Bakım", "Mevsimsel"],
  },
  {
    id: "bp-003",
    slug: "zemin-kaplama-trendleri-2024",
    title: "2026 Zemin Kaplama Trendleri: Kurumsal Mekanlarda Yeni Dalga",
    excerpt:
      "Bu yıl kurumsal mekanlarda öne çıkan zemin kaplama trendlerini ve renk paletlerini inceliyoruz.",
    content: `
Zemin kaplama sektörü 2024 yılında sürdürülebilirlik, biyofilik tasarım ve hibrit çalışma ortamlarına uyum temaları etrafında şekillenmektedir.

## Biyofilik Tasarım

Çalışanların doğayla bağlantısını güçlendiren biyofilik ofis konsepti, doğal tonlarda karo halı ve dekoratif çim halı kullanımını artırmaktadır.

## Sürdürülebilir Malzemeler

LEED ve BREEAM sertifikalı projeler için geri dönüştürülmüş içerikli karo halılar tercih sebebi olmaktadır. Bu ürünler hem çevreye katkı sağlar hem de yönetmelik gereksinimlerini karşılar.

## Renk Paletleri

2024'te nötr ve toprak tonları (bej, sıcak gri, terracotta) öne çıkmaktadır. Tek tip renk yerine 2-3 koordineli renk kullanan "zoning" uygulamaları popüler olmaya devam etmektedir.

## Akustik Çözümler

Açık plan ofislerde ses yönetimi kritik bir tasarım girdisi haline gelmiştir. Yüksek ağırlıklı karo halılar akustik konfor sağlamada önemli rol oynamaktadır.

## Modüler Esneklik

Karo halıların değiştirilebilirliği, ofis düzenlemelerinin sık sık güncellenmesi gereken hibrit çalışma modellerinde büyük avantaj sağlamaktadır.
    `,
    author: SITE_NAME,
    date: "2026-05-10",
    category: "Karo Halı",
    image: "/images/blog-3.png",
    readTime: 7,
    tags: ["Trend", "2024", "Kurumsal", "Tasarım"],
  },
];
