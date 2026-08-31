import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  FileText,
  Lock,
  Cookie,
  Calendar,
  Mail,
  Building,
} from "lucide-react";
import Breadcrumb from "~/components/ui/Breadcrumb";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME, SITE_URL } from "~/lib/constants";
import type { MetaArgs } from "react-router";
import "./legal.css";

export type LegalTabType = "privacy" | "terms" | "kvkk" | "cookies";

const TAB_ROUTES: Record<LegalTabType, string> = {
  privacy: "/gizlilik-politikasi",
  terms: "/kullanim-kosullari",
  kvkk: "/kvkk",
  cookies: "/cerez-politikasi",
};

function tabFromPath(pathname: string): LegalTabType {
  if (pathname === "/kullanim-kosullari" || pathname === "/kosullar") return "terms";
  if (pathname === "/kvkk") return "kvkk";
  if (pathname === "/cerez-politikasi") return "cookies";
  return "privacy";
}

export function meta({ location }: MetaArgs) {
  const tab = tabFromPath(location.pathname);
  const titleMap: Record<LegalTabType, string> = {
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    kvkk: "KVKK Aydınlatma Metni",
    cookies: "Çerez Politikası",
  };
  return seoMeta({
    title: `${titleMap[tab]} | ${SITE_NAME}`,
    description: `${SITE_NAME} yasal bilgilendirme, gizlilik politikası, KVKK aydınlatma metni, mesafeli satış sözleşmesi ve çerez politikası detayları.`,
    canonicalUrl: TAB_ROUTES[tab],
    noindex: true,
  });
}

interface TabHeroInfo {
  title: string;
  subtitle: string;
}

const TAB_HERO: Record<LegalTabType, TabHeroInfo> = {
  privacy: {
    title: "Gizlilik Politikası",
    subtitle: "Kişisel verilerinizin korunması, işlenme amaçları ve gizlilik standartlarımız hakkında detaylı bilgilendirme.",
  },
  terms: {
    title: "Kullanım Koşulları",
    subtitle: "Web sitemizi ziyaret ederken geçerli olan yasal kurallar, fikri mülkiyet hakları ve kullanım şartları.",
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    subtitle: "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca veri sorumlusu aydınlatma yükümlülüğü ve haklarınız.",
  },
  cookies: {
    title: "Çerez Politikası",
    subtitle: "Web sitemizde kullanılan çerez türleri, kullanım amaçları ve çerez tercihlerinizi yönetme rehberi.",
  },
};

const Legal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<LegalTabType>(() =>
    tabFromPath(location.pathname),
  );

  // Sync state with pathname on location change
  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabChange = (tab: LegalTabType) => {
    setActiveTab(tab);
    navigate(TAB_ROUTES[tab]);
  };

  const currentHero = TAB_HERO[activeTab];

  return (
    <div className="legal-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {currentHero.title}
            </h1>
            <p className="page-hero__subtitle">
              {currentHero.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: t("nav.home"), url: "/" },
            { label: t("legal.heroTitle"), url: "/gizlilik-politikasi" },
            {
              label: currentHero.title,
            },
          ]}
        />
      </div>

      <div className="container legal__container">
        {/* Navigation Tabs */}
        <div className="legal__tabs" role="tablist" aria-label={t("legal.heroTitle")}>
          <button
            className={`legal__tab ${activeTab === "privacy" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("privacy")}
            role="tab"
            aria-selected={activeTab === "privacy"}
          >
            <span className="legal__tab-icon">
              <Lock size={18} />
            </span>
            {t("legal.privacyTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "terms" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("terms")}
            role="tab"
            aria-selected={activeTab === "terms"}
          >
            <span className="legal__tab-icon">
              <FileText size={18} />
            </span>
            {t("legal.termsTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "kvkk" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("kvkk")}
            role="tab"
            aria-selected={activeTab === "kvkk"}
          >
            <span className="legal__tab-icon">
              <ShieldCheck size={18} />
            </span>
            {t("legal.kvkkTitle")}
          </button>

          <button
            className={`legal__tab ${activeTab === "cookies" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("cookies")}
            role="tab"
            aria-selected={activeTab === "cookies"}
          >
            <span className="legal__tab-icon">
              <Cookie size={18} />
            </span>
            {t("legal.cookiesTitle")}
          </button>
        </div>

        {/* Content Box */}
        <div className="legal__document">
          {activeTab === "privacy" && <PrivacyContent />}
          {activeTab === "terms" && <TermsContent />}
          {activeTab === "kvkk" && <KvkkContent />}
          {activeTab === "cookies" && <CookiesContent />}
        </div>
      </div>
    </div>
  );
};

/* --- TAB CONTENT COMPONENTS --- */

// 1. Privacy Policy (Gizlilik Politikası)
const PrivacyContent: React.FC = () => {
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">Gizlilik Politikası</h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} /> Son Güncelleme: 1 Eylül 2026
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {SITE_NAME} Zemin Kaplama Çözümleri
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <div className="legal__intro">
          <strong>{SITE_NAME}</strong> olarak, web sitemizi (
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="legal__link"
          >
            {SITE_URL.replace("https://", "")}
          </a>
          ) ziyaret eden tüm kullanıcılarımızın, müşterilerimizin, bayilerimizin ve iş ortaklarımızın kişisel verilerinin güvenliğine, gizliliğine ve korunmasına azami hassasiyet göstermekteyiz. İşbu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) ve ilgili yasal mevzuat uyarınca, web sitemiz aracılığıyla toplanan verilerin niteliğini, işlenme amaçlarını, saklanma koşullarını ve veri sahiplerinin haklarını ayrıntılı şekilde açıklamaktadır.
        </div>

        {/* Bölüm 1 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            Veri Sorumlusu ve Genel Prensipler
          </h3>
          <p className="legal__paragraph">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Veri Sorumlusu sıfatını haiz olan <strong>{SITE_NAME}</strong> (Adres:{" "}
            <a
              href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="legal__link"
            >
              Leman Sk. No:4, Sancaktepe / İstanbul
            </a>
            ), kişisel verilerinizi hukuka, ahlaka ve dürüstlük kurallarına uygun, doğru ve gerektiğinde güncel, belirli, açık ve meşru amaçlar doğrultusunda, işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olarak işlemektedir.
          </p>
          <p className="legal__paragraph">
            Faaliyetlerimiz kapsamında kişisel verileriniz; karo halı, çim halı, PVC zemin kaplama, mineflo, laminat parke satışları, yerinde ücretsiz keşif hizmetleri, numune gönderimleri, metraj hesaplama, zemin uygulama ve satış sonrası müşteri destek süreçlerinin eksiksiz yürütülmesi amacıyla işlenmektedir.
          </p>
        </section>

        {/* Bölüm 2 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            Toplanan Kişisel Veriler ve Veri Kategorileri
          </h3>
          <p className="legal__paragraph">
            Sitemizi ziyaret ettiğinizde, teklif formlarını kullandığınızda veya müşteri temsilcilerimizle iletişime geçtiğinizde aşağıdaki veri kategorileri toplanabilmektedir:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>Kimlik Bilgileri:</strong> Ad, soyad, firma veya kurum unvanı, görev/pozisyon bilgisi.
            </li>
            <li className="legal__list-item">
              <strong>İletişim Bilgileri:</strong> E-posta adresi, cep telefonu ve sabit telefon numaraları, şirket adresi, keşif ve montaj yapılması talep edilen proje açık adresi, şehir ve ilçe bilgileri.
            </li>
            <li className="legal__list-item">
              <strong>Talep ve Müşteri İşlem Bilgileri:</strong> İlgilenilen ürün türü (akustik karo halı, suni çim halı, PVC vb.), talep edilen metrekare (m²), renk/desen tercihleri, numune talepleri, teklif içerikleri, proje takvimi, sipariş geçmişi ve fatura detayları.
            </li>
            <li className="legal__list-item">
              <strong>Dijital ve İşlem Güvenliği Verileri:</strong> Web sitemize erişim sağlanan IP adresi, tarayıcı türü ve sürümü, işletim sistemi bilgisi, ziyaret edilen sayfalar, sitede geçirilen süre, yönlendirici web sitesi bağlantıları ve çerez (cookie) log kayıtları.
            </li>
            <li className="legal__list-item">
              <strong>İletişim Trafiği ve Mesaj Kayıtları:</strong> İletişim formları aracılığıyla iletilen mesajlar, resmi WhatsApp kurumsal destek hattımızdaki görüşmeler ve e-posta yazışmaları.
            </li>
          </ul>
        </section>

        {/* Bölüm 3 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            Kişisel Verilerin İşlenme Amaçları ve Hukuki Dayanaklar
          </h3>
          <p className="legal__paragraph">
            Toplanan kişisel verileriniz, KVKK&rsquo;nın 5. ve 6. maddelerinde düzenlenen hukuki sebeplere dayalı olarak aşağıdaki amaçlarla işlenmektedir:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              Karo halı ve çim halı projeleriniz için özel metraj hesaplamalarının yapılması, fiyat tekliflerinin hazırlanması ve tarafınıza iletilmesi,
            </li>
            <li className="legal__list-item">
              Talep ettiğiniz ürün numunelerinin ve katalogların adresinize kargo yoluyla ulaştırılması,
            </li>
            <li className="legal__list-item">
              Zemin kaplama, nakliye, montaj ve uygulama süreçlerinin sahada planlanması ve icrası,
            </li>
            <li className="legal__list-item">
              Satış sözleşmelerinin düzenlenmesi, faturalandırma, tahsilat ve muhasebe kayıtlarının yasal mevzuata uygun tutulması,
            </li>
            <li className="legal__list-item">
              Müşteri memnuniyeti, satış sonrası destek, garanti takibi ve teknik danışmanlık hizmetlerinin sunulması,
            </li>
            <li className="legal__list-item">
              Web sitesinin teknik güvenliğinin temini, sunucu performansının artırılması ve kullanıcı deneyiminin geliştirilmesi,
            </li>
            <li className="legal__list-item">
              Yetkili resmi kurum ve kuruluşlara mevzuattan doğan yasal bildirim ve bilgi verme yükümlülüklerinin yerine getirilmesi.
            </li>
          </ul>

          <div className="legal__note-box">
            <strong>Önemli Güvence:</strong> Kişisel verileriniz hiçbir surette ticari amaçlarla üçüncü kişilere satılmaz, kiralanmaz veya izin dışı reklam/pazarlama amacıyla üçüncü kuruluşlarla paylaşılmaz.
          </div>
        </section>

        {/* Bölüm 4 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">4</span>
            Kişisel Verilerin Saklanma Süresi ve İmhası
          </h3>
          <p className="legal__paragraph">
            Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve Türk Ticaret Kanunu, Vergi Usul Kanunu, Türk Borçlar Kanunu ile ilgili diğer mevzuatlarda öngörülen yasal zamanaşımı ve saklama süreleri boyunca güvenli sunucularda saklanmaktadır.
          </p>
          <p className="legal__paragraph">
            Saklama süresinin sona ermesi veya verinin işlenmesini gerektiren hukuki sebeplerin ortadan kalkması durumunda kişisel verileriniz, {SITE_NAME} Veri Saklama ve İmha Politikası doğrultusunda periyodik imha dönemlerinde re&rsquo;sen veya veri sahibinin başvurusu üzerine güvenli şekilde silinir, yok edilir veya anonim hale getirilir.
          </p>
        </section>

        {/* Bölüm 5 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">5</span>
            Kişisel Verilerin Aktarımı ve Paylaşım Esasları
          </h3>
          <p className="legal__paragraph">
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda ve KVKK&rsquo;nın 8. ve 9. maddelerine uygun olarak yalnızca aşağıdaki taraflara aktarılabilir:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>Kargo ve Lojistik Ortakları:</strong> Sipariş edilen zemin kaplama ürünleri veya numune kataloglarının teslimatı için anlaşmalı nakliye ve kargo firmalarına,
            </li>
            <li className="legal__list-item">
              <strong>Uygulama ve Montaj Ekipleri:</strong> Zemin hazırlığı, keşif ve karo halı montajı işlemlerinin yürütülmesi için yetkili saha uygulama personellerine,
            </li>
            <li className="legal__list-item">
              <strong>Mali ve Hukuki Danışmanlar:</strong> Fatura, vergi denetimi, muhasebe ve yasal uyuşmazlık süreçlerinin yürütülmesi amacıyla mali müşavirlerimize ve hukuk danışmanlarımıza,
            </li>
            <li className="legal__list-item">
              <strong>Yetkili Kamu Kurumları:</strong> Kanunen yetkili kılınmış adli makamlar, vergi daireleri ve kamu otoritelerine yasal zorunluluklar çerçevesinde.
            </li>
          </ul>
        </section>

        {/* Bölüm 6 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">6</span>
            Veri Güvenliği ve Alınan Teknik / İdari Tedbirler
          </h3>
          <p className="legal__paragraph">
            {SITE_NAME}, kişisel verilerinizin hukuka aykırı olarak işlenmesini, yetkisiz kişilerce erişilmesini veya sızdırılmasını önlemek amacıyla güncel teknolojik standartlara uygun güvenlik tedbirlerini almaktadır:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              Web sitemiz üzerinden yapılan tüm veri trafiği <strong>256-Bit SSL/TLS şifreleme</strong> sertifikası ile korunmaktadır.
            </li>
            <li className="legal__list-item">
              Sunucularımızda güvenlik duvarları (WAF), saldırı tespit ve önleme sistemleri devrededir.
            </li>
            <li className="legal__list-item">
              Verilere erişim, yalnızca görev tanımı gereği yetkilendirilmiş personelle sınırlandırılmıştır ve tüm erişimler loglanmaktadır.
            </li>
            <li className="legal__list-item">
              Tüm personelimizle gizlilik ve kişisel verilerin korunması taahhütnameleri imzalanmıştır.
            </li>
          </ul>
        </section>

        {/* Bölüm 7 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">7</span>
            Veri Sahibi Olarak Haklarınız
          </h3>
          <p className="legal__paragraph">
            KVKK&rsquo;nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, eksik/yanlış işlenmişse düzeltilmesini isteme ve silinmesini talep etme hakkına sahipsiniz. Ayrıntılı bilgi için &ldquo;KVKK Aydınlatma Metni&rdquo; sekmemizi inceleyebilirsiniz.
          </p>
        </section>

        {/* İletişim Kutusu */}
        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">Gizlilik Sorularınız ve Başvurularınız İçin</h4>
            <p className="legal__contact-text">
              Gizlilik politikamız, kişisel verilerinizin işlenmesi veya veri güvenliğiyle ilgili her türlü soru, görüş ve talebiniz için bizimle doğrudan iletişime geçebilirsiniz:
            </p>
            <a href="mailto:zenflormarket@gmail.com" className="legal__contact-email">
              zenflormarket@gmail.com
            </a>
            <p className="legal__contact-text" style={{ marginTop: "0.25rem" }}>
              Adres:{" "}
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="legal__contact-link"
              >
                Leman Sk. No:4, Sancaktepe / İstanbul
              </a>{" "}
              &bull; Tel:{" "}
              <a href="tel:+905302708487" className="legal__contact-link">
                +90 (530) 270 84 87
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// 2. Terms of Use (Kullanım Koşulları)
const TermsContent: React.FC = () => {
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">Kullanım Koşulları</h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} /> Son Güncelleme: 1 Eylül 2026
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {SITE_NAME} Zemin Kaplama Çözümleri
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <div className="legal__intro">
          <strong>{SITE_NAME}</strong> resmi web sitesine (
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="legal__link"
          >
            {SITE_URL.replace("https://", "")}
          </a>
          ) hoş geldiniz. Web sitemizi ziyaret ederek, sayfalarımızda gezinerek, hesaplama araçlarımızı kullanarak veya iletişim/teklif formlarını doldurarak işbu <strong>Kullanım Koşulları</strong> ve yasal şartları peşinen kabul etmiş sayılırsınız. Şartları kabul etmemeniz halinde sitemizi kullanmamanızı rica ederiz.
        </div>

        {/* Bölüm 1 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            Fikri ve Sınai Mülkiyet Hakları
          </h3>
          <p className="legal__paragraph">
            Web sitemizde yer alan tüm metinler, makaleler, karo ve çim halı desen tasarımları, ürün fotoğrafları, teknik kataloglar, logolar, grafikler, hesaplama araçları, arayüz tasarımları ve yazılım kodları 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile 6769 sayılı Sınai Mülkiyet Kanunu kapsamında <strong>{SITE_NAME}</strong> mülkiyetindedir ve yasal koruma altındadır.
          </p>
          <p className="legal__paragraph">
            {SITE_NAME}&rsquo;ın önceden verilmiş açık ve yazılı izni olmaksızın site içeriğinin kısmen veya tamamen kopyalanması, çoğaltılması, başka bir web sitesinde yayınlanması, ticari amaçla dağıtılması veya tersine mühendislik uygulanması kesinlikle yasaktır. İzinsiz kullanımlarda doğacak her türlü maddi ve manevi tazminat ile cezai haklarımız saklıdır.
          </p>
        </section>

        {/* Bölüm 2 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            Site Kullanım Kuralları ve Ziyaretçi Yükümlülükleri
          </h3>
          <p className="legal__paragraph">
            Ziyaretçilerimiz web sitemizi kullanırken aşağıdaki kurallara riayet etmekle yükümlüdür:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              Web sitesinin çalışmasını engelleyecek, sunucuları aşırı yükleyecek veya güvenlik protokollerini ihlal edecek bot, crawler, scraping veya otomatik komut dosyaları çalıştırmamak,
            </li>
            <li className="legal__list-item">
              Teklif alma veya iletişim formlarında kasıtlı olarak yanıltıcı, gerçek dışı veya üçüncü şahısların haklarını ihlal eden bilgiler beyan etmemek,
            </li>
            <li className="legal__list-item">
              Sitenin herhangi bir bölümüne zararlı yazılım, virüs, trojan veya Truva atı gibi tahrip edici unsurlar bulaştırmamak,
            </li>
            <li className="legal__list-item">
              Web sitesi içeriklerini haksız rekabet oluşturacak şekilde ticari emellerle toplamamak ve derlememek.
            </li>
          </ul>
        </section>

        {/* Bölüm 3 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            Ürün Bilgileri, Renk/Doku Görünümleri ve Numune Önerisi
          </h3>
          <p className="legal__paragraph">
            Web sitemizde sunulan karo halı ve çim halı zemin kaplama ürünlerine ait teknik özellikler, iplik kompozisyonları, akustik ses yalıtım değerleri ve kullanım sınıfı bilgileri üretici fabrika standartlarına dayanmaktadır.
          </p>
          <div className="legal__note-box">
            <strong>Renk & Doku Uyarı Notu:</strong> Dijital ekranların parlaklık, kontrast ve renk kalibrasyonu farklılıkları nedeniyle web sitesinde görüntülenen ürün renk ve tonları, gerçek ürün ipliği veya halı yüzeyi ile küçük ton farklılıkları (nüans) gösterebilir. Projenizde nihai renk ve doku teyidi sağlamak için mutlaka fiziksel numune talep etmeniz önerilir.
          </div>
        </section>

        {/* Bölüm 4 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">4</span>
            Metraj Hesaplama Aracı ve Fiyat Teklifi Şartları
          </h3>
          <p className="legal__paragraph">
            Web sitemizdeki metrekare (m²) maliyet hesaplayıcısı ve ürün liste fiyatları bilgilendirme amaçlı tahmini göstergelerdir.
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              Projelerdeki alan geometrisi (girintiler, çıkıntılar, oda bölmeleri) gereği %5 ila %10 arasında fire payı oluşabilmektedir.
            </li>
            <li className="legal__list-item">
              Zemin hazırlığı (şap tamiri, tesviye, astar uygulaması), süpürgelik, yapıştırıcı malzemesi, nakliye ve profesyonel montaj işçiliği gibi operasyonel bedeller yerinde keşif veya teknik inceleme sonrası hazırlanan <strong>resmi yazılı teklifimizde</strong> kesinleşir.
            </li>
            <li className="legal__list-item">
              {SITE_NAME}, hammadde maliyetleri, döviz kuru hareketleri ve fabrika stok durumlarına bağlı olarak ürün fiyatlarında önceden bildirmeksizin güncelleme yapma hakkını saklı tutar.
            </li>
          </ul>
        </section>

        {/* Bölüm 5 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">5</span>
            Harici Bağlantılar (Dış Linkler)
          </h3>
          <p className="legal__paragraph">
            Sitemiz üzerinden üçüncü taraf web sitelerine (
            <a
              href="https://zenflor.sahibinden.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="legal__link"
            >
              Sahibinden mağazamız
            </a>
            ,{" "}
            <a
              href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="legal__link"
            >
              Google Haritalar
            </a>
            , Instagram, YouTube, LinkedIn gibi sosyal medya platformları) bağlantılar (linkler) verilebilir. {SITE_NAME}, üçüncü şahıslara ait bu web sitelerinin gizlilik politikaları, içerik doğruluğu ve güvenlik uygulamalarından ötürü hukuki sorumluluk kabul etmemektedir.
          </p>
        </section>

        {/* Bölüm 6 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">6</span>
            Sorumluluğun Sınırlandırılması
          </h3>
          <p className="legal__paragraph">
            {SITE_NAME}, web sitesinin kesintisiz, hatasız ve 7/24 erişilebilir kalması için gereken teknik özeni göstermektedir. Ancak internet servis sağlayıcılarından, siber saldırılardan, doğal afetlerden veya mücbir sebeplerden kaynaklanan geçici erişim aksaklıklarından doğabilecek dolaylı zararlardan sorumlu tutulamaz.
          </p>
        </section>

        {/* Bölüm 7 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">7</span>
            Uygulanacak Hukuk ve Yetkili Yargı Mercii
          </h3>
          <p className="legal__paragraph">
            İşbu Kullanım Koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Web sitesinin kullanımından doğabilecek her türlü uyuşmazlığın çözümünde <strong>İstanbul (Anadolu) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
          </p>
        </section>

        {/* İletişim Kutusu */}
        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">Kullanım Şartları ve Kurumsal İletişim</h4>
            <p className="legal__contact-text">
              Kullanım koşullarımız, kurumsal işbirlikleri veya telif hakları ile ilgili her türlü soru için bizimle iletişime geçebilirsiniz:
            </p>
            <a href="mailto:zenflormarket@gmail.com" className="legal__contact-email">
              zenflormarket@gmail.com
            </a>
            <p className="legal__contact-text" style={{ marginTop: "0.25rem" }}>
              {SITE_NAME} Karo & Çim Halı Çözümleri &bull;{" "}
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="legal__contact-link"
              >
                Leman Sk. No:4, Sancaktepe / İstanbul
              </a>{" "}
              &bull; Tel:{" "}
              <a href="tel:+905302708487" className="legal__contact-link">
                +90 (530) 270 84 87
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// 3. KVKK Content (KVKK Aydınlatma Metni)
const KvkkContent: React.FC = () => {
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">KVKK Aydınlatma Metni</h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} /> Son Güncelleme: 1 Eylül 2026
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> 6698 Sayılı KVKK Uyarınca
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <div className="legal__intro">
          <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)</strong> uyarınca, <strong>{SITE_NAME}</strong> olarak &ldquo;Veri Sorumlusu&rdquo; sıfatıyla, tarafımıza iletmiş olduğunuz veya web sitemiz (
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="legal__link"
          >
            {SITE_URL.replace("https://", "")}
          </a>
          ) aracılığıyla elde ettiğimiz kişisel verilerinizin işlenme amaçları, hukuki sebepleri, toplanma yöntemleri, aktarıldığı taraflar ve Kanun kapsamındaki haklarınız hususunda sizleri aydınlatıyoruz.
        </div>

        {/* Bölüm 1 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            Veri Sorumlusunun Kimliği
          </h3>
          <p className="legal__paragraph">
            KVKK&rsquo;nın 10. maddesi kapsamında Veri Sorumlusu:
          </p>
          <div className="legal__table-wrapper">
            <table className="legal__table">
              <tbody>
                <tr>
                  <th style={{ width: "30%" }}>Fiziki Adres</th>
                  <td>
                    <a
                      href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="legal__table-link"
                    >
                      Leman Sk. No:4, Sancaktepe / İstanbul / Türkiye
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Telefon</th>
                  <td>
                    <a href="tel:+905302708487" className="legal__table-link">
                      +90 (530) 270 84 87
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>E-Posta</th>
                  <td>
                    <a href="mailto:zenflormarket@gmail.com" className="legal__table-link">
                      zenflormarket@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Web Sitesi</th>
                  <td>
                    <a
                      href={SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="legal__table-link"
                    >
                      {SITE_URL}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bölüm 2 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            İşlenen Kişisel Veri Kategorileri ve Örnekleri
          </h3>
          <p className="legal__paragraph">
            {SITE_NAME} tarafından işlenen kişisel veri kategorileri şunlardır:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>Kimlik Verisi:</strong> Ad, soyad, firma yetkilisi unvanı.
            </li>
            <li className="legal__list-item">
              <strong>İletişim Verisi:</strong> Telefon numarası, kurumsal/bireysel e-posta adresi, fatura adresi, proje uygulama/keşif adresi, şehir ve posta kodu.
            </li>
            <li className="legal__list-item">
              <strong>Müşteri İşlem Verisi:</strong> Fiyat teklifi talepleri, metraj ve keşif kayıtları, tercih edilen halı modelleri, numune gönderi bilgileri, sipariş ve sözleşme detayları.
            </li>
            <li className="legal__list-item">
              <strong>Finansal Veriler:</strong> Fatura bilgileri, ödeme/havale dekontları, vergi dairesi ve vergi kimlik numarası (kurumsal faturalandırma durumunda).
            </li>
            <li className="legal__list-item">
              <strong>İşlem Güvenliği Verisi:</strong> IP adresleri, web sitesi log kayıtları, çerez kimlikleri, tarayıcı ve oturum bilgileri.
            </li>
          </ul>
        </section>

        {/* Bölüm 3 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            Kişisel Verilerin İşlenme Amaçları
          </h3>
          <p className="legal__paragraph">
            Kişisel verileriniz aşağıdaki amaçlarla sınırlı ve ölçülü şekilde işlenmektedir:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              Zemin kaplama, karo halı ve çim halı satış ve uygulama sözleşmelerinin kurulması, ifası ve teslimatı,
            </li>
            <li className="legal__list-item">
              Talep ettiğiniz ürünler için metrekare fiyat tekliflerinin hazırlanması ve tarafınıza sunulması,
            </li>
            <li className="legal__list-item">
              Ücretsiz yerinde keşif organizasyonu ve numune kataloglarının adresinize ulaştırılması,
            </li>
            <li className="legal__list-item">
              Muhasebe, finans ve faturalandırma işlemlerinin 213 sayılı Vergi Usul Kanunu uyarınca icrası,
            </li>
            <li className="legal__list-item">
              Müşteri memnuniyeti, talep ve şikayet yönetim süreçlerinin yürütülmesi,
            </li>
            <li className="legal__list-item">
              Yasal ve idari mercilerden gelen bilgi taleplerinin karşılanması ve adli süreçlerin takibi.
            </li>
          </ul>
        </section>

        {/* Bölüm 4 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">4</span>
            Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebepleri
          </h3>
          <p className="legal__paragraph">
            Kişisel verileriniz; web sitemiz üzerindeki teklif ve iletişim formları, WhatsApp destek hattımız, e-posta trafiğimiz, telefon görüşmeleri, fiziki keşif formları ve şantiye görüşmeleri aracılığıyla otomatik veya kısmen otomatik yöntemlerle toplanmaktadır.
          </p>
          <p className="legal__paragraph">
            Bu veriler, KVKK&rsquo;nın 5. maddesinin 2. fıkrasında yer alan şu hukuki sebeplere dayanılarak işlenmektedir:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>c bendi:</strong> Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması (satış, montaj ve teslimat süreçleri),
            </li>
            <li className="legal__list-item">
              <strong>ç bendi:</strong> Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (vergi, fatura ve ticaret mevzuatı yükümlülükleri),
            </li>
            <li className="legal__list-item">
              <strong>e bendi:</strong> Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması (garanti ve sözleşme hakları),
            </li>
            <li className="legal__list-item">
              <strong>f bendi:</strong> İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (müşteri ilişkileri ve hizmet kalitesi).
            </li>
          </ul>
        </section>

        {/* Bölüm 5 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">5</span>
            Kişisel Verilerin Aktarımı
          </h3>
          <p className="legal__paragraph">
            Kişisel verileriniz, yukarıda açıklanan amaçların gerektirdiği ölçüde; siparişlerinizin teslimatı için <strong>kargo ve nakliye iş ortaklarımıza</strong>, montaj ve keşif işlemleri için <strong>yetkili uygulama ekiplerimize</strong>, mali yükümlülükler için <strong>mali müşavirlerimize</strong> ve yasal zorunluluk halinde <strong>yetkili kamu kurum ve adli mercilere</strong> KVKK&rsquo;nın 8. ve 9. maddeleri uyarınca aktarılabilmektedir.
          </p>
        </section>

        {/* Bölüm 6 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">6</span>
            KVKK Madde 11 Kapsamındaki Haklarınız
          </h3>
          <p className="legal__paragraph">
            Kişisel veri sahibi olarak KVKK&rsquo;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
            <li className="legal__list-item">Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
            <li className="legal__list-item">Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li className="legal__list-item">Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li className="legal__list-item">Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
            <li className="legal__list-item">KVKK&rsquo;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
            <li className="legal__list-item">Düzeltme ve silme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li className="legal__list-item">İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
            <li className="legal__list-item">Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
          </ul>
        </section>

        {/* Bölüm 7 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">7</span>
            Başvuru Usulü ve Süresi
          </h3>
          <p className="legal__paragraph">
            Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca, haklarınıza ilişkin taleplerinizi; kimliğinizi tevsik edici belgeler ile birlikte{" "}
            <a
              href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
              target="_blank"
              rel="noopener noreferrer"
              className="legal__link"
            >
              <strong>Leman Sk. No:4, Sancaktepe / İstanbul</strong>
            </a>{" "}
            adresimize ıslak imzalı yazılı dilekçe ile veya sistemlerimizde kayıtlı e-posta adresiniz üzerinden{" "}
            <a href="mailto:zenflormarket@gmail.com" className="legal__link">
              <strong>zenflormarket@gmail.com</strong>
            </a>{" "}
            adresine iletebilirsiniz.
          </p>
          <p className="legal__paragraph">
            Talepleriniz, niteliğine göre en kısa sürede ve en geç <strong>30 (otuz) gün içinde</strong> ücretsiz olarak sonuçlandırılacaktır.
          </p>
        </section>

        {/* İletişim Kutusu */}
        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">KVKK Başvuru ve Danışma Hattı</h4>
            <p className="legal__contact-text">
              6698 sayılı Kanun kapsamındaki haklarınız ve veri işleme süreçlerimizle ilgili başvurularınız için:
            </p>
            <a href="mailto:zenflormarket@gmail.com" className="legal__contact-email">
              zenflormarket@gmail.com
            </a>
            <p className="legal__contact-text" style={{ marginTop: "0.25rem" }}>
              Veri Sorumlusu: {SITE_NAME} &bull;{" "}
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="legal__contact-link"
              >
                Leman Sk. No:4, Sancaktepe / İstanbul
              </a>{" "}
              &bull; Tel:{" "}
              <a href="tel:+905302708487" className="legal__contact-link">
                +90 (530) 270 84 87
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// 4. Cookies Content (Çerez Politikası)
const CookiesContent: React.FC = () => {
  return (
    <article>
      <header className="legal__doc-header">
        <h2 className="legal__doc-title">Çerez Politikası</h2>
        <div className="legal__doc-meta">
          <span className="legal__doc-meta-item">
            <Calendar size={14} /> Son Güncelleme: 1 Eylül 2026
          </span>
          <span className="legal__doc-meta-item">
            <Building size={14} /> {SITE_NAME} Web Sitesi Çerezleri
          </span>
        </div>
      </header>

      <div className="legal__doc-body">
        <div className="legal__intro">
          <strong>{SITE_NAME}</strong> web sitesinde (
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="legal__link"
          >
            {SITE_URL.replace("https://", "")}
          </a>
          ), ziyaretçilerimizin kullanıcı deneyimini zenginleştirmek, sitemizin teknik performansını ve güvenliğini sağlamak, kullanım istatistiklerini analiz etmek ve tercihlerini hatırlamak amacıyla <strong>çerezler (cookies)</strong> ve benzeri izleme teknolojileri kullanılmaktadır.
        </div>

        {/* Bölüm 1 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">1</span>
            Çerez (Cookie) Nedir ve Nasıl Çalışır?
          </h3>
          <p className="legal__paragraph">
            Çerezler, bir web sitesini ziyaret ettiğinizde internet tarayıcınız (Chrome, Safari, Firefox, Edge vb.) aracılığıyla bilgisayarınız, tabletiniz veya akıllı telefonunuza kaydedilen küçük boyutlu metin dosyalarıdır. Çerezler sayesinde web sitesi, cihazınızı tanır ve ziyaretiniz boyunca veya bir sonraki ziyaretinizde tercihlerinizi (örneğin dil seçimi, sayfa filtreleri veya sepet/teklif listeleri) hatırlar.
          </p>
          <p className="legal__paragraph">
            Çerezler kesinlikle cihazınızda depolanan kişisel dosyalara erişemez, virüs veya kötü amaçlı kod barındıramaz.
          </p>
        </section>

        {/* Bölüm 2 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">2</span>
            Kullanılan Çerez Türleri ve Kullanım Amaçları
          </h3>
          <p className="legal__paragraph">
            Sitemizde kullanılan çerezler işlev ve amaçlarına göre aşağıdaki kategorilere ayrılmaktadır:
          </p>

          <div className="legal__table-wrapper">
            <table className="legal__table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Çerez Kategorisi</th>
                  <th style={{ width: "50%" }}>Kullanım Amacı</th>
                  <th style={{ width: "25%" }}>Zorunluluk Durumu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zorunlu / Temel Çerezler</strong></td>
                  <td>Web sitesinin temel fonksiyonlarının çalışması, güvenli sayfa geçişleri ve form güvenliğinin (CSRF koruması) temini için şarttır.</td>
                  <td>Zorunlu (Kapatılamaz)</td>
                </tr>
                <tr>
                  <td><strong>İşlevsel Çerezler</strong></td>
                  <td>Kullanıcının dil tercihi (Türkçe / İngilizce), ürün filtreleme tercihleri ve metraj hesaplama ayarlarını hatırlar.</td>
                  <td>İsteğe Bağlı</td>
                </tr>
                <tr>
                  <td><strong>Performans ve Analitik Çerezleri</strong></td>
                  <td>Hangi karo halı veya çim halı modellerinin daha sık görüntülendiğini, sayfa yüklenme sürelerini ve ziyaretçi akışını anonim olarak analiz eder.</td>
                  <td>İsteğe Bağlı</td>
                </tr>
                <tr>
                  <td><strong>Pazarlama ve Hedefleme Çerezleri</strong></td>
                  <td>Ziyaretçilerin ilgi alanlarına yönelik alakalı ürünlerin ve kurumsal kampanyaların sunulmasını destekler.</td>
                  <td>İsteğe Bağlı</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bölüm 3 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">3</span>
            Çerezlerin Saklama Süreleri
          </h3>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>Oturum Çerezleri (Session Cookies):</strong> Ziyaretiniz süresince geçerli olan geçici çerezlerdir. Tarayıcınızı kapattığınız anda otomatik olarak silinirler.
            </li>
            <li className="legal__list-item">
              <strong>Kalıcı Çerezler (Persistent Cookies):</strong> Tarayıcınızı kapattıktan sonra da cihazınızda belirli bir son kullanma tarihine veya siz manuel olarak silene kadar saklanan çerezlerdir (örneğin dil tercihinizin hatırlanması).
            </li>
          </ul>
        </section>

        {/* Bölüm 4 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">4</span>
            Çerez Tercihlerini Yönetme, Engelleme ve Silme
          </h3>
          <p className="legal__paragraph">
            İnternet tarayıcınızın ayarlarını değiştirerek çerez tercihlerinizi dilediğiniz an kişiselleştirebilir, mevcut çerezleri silebilir veya yeni çerezlerin kaydedilmesini engelleyebilirsiniz:
          </p>
          <ul className="legal__list">
            <li className="legal__list-item">
              <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Üçüncü Taraf Çerezleri adımlarını izleyebilirsiniz.
            </li>
            <li className="legal__list-item">
              <strong>Mozilla Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri menüsünü kullanabilirsiniz.
            </li>
            <li className="legal__list-item">
              <strong>Apple Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle seçeneğini yönetebilirsiniz.
            </li>
            <li className="legal__list-item">
              <strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri bölümünden çerezleri yönetebilirsiniz.
            </li>
          </ul>
          <div className="legal__note-box">
            <strong>Bilgilendirme:</strong> Zorunlu çerezlerin tarayıcı üzerinden tamamen engellenmesi durumunda web sitemizin bazı özellikleri (iletişim formları, sayfa geçişleri) düzgün çalışmayabilir.
          </div>
        </section>

        {/* Bölüm 5 */}
        <section className="legal__section">
          <h3 className="legal__section-title">
            <span className="legal__section-title-num">5</span>
            Çerez Politikasında Yapılacak Değişiklikler
          </h3>
          <p className="legal__paragraph">
            {SITE_NAME}, yasal mevzuattaki değişiklikler veya web sitesi işlevlerindeki yenilikler doğrultusunda işbu Çerez Politikasını güncelleme hakkını saklı tutar. Güncel metin web sitemizde yayınlandığı tarihten itibaren geçerlilik kazanır.
          </p>
        </section>

        {/* İletişim Kutusu */}
        <div className="legal__contact-box">
          <div className="legal__contact-icon">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="legal__contact-title">Çerez Yönetimi ve Gizlilik İletişim</h4>
            <p className="legal__contact-text">
              Çerez politikamız ve veri tercihlerinizle ilgili sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <a href="mailto:zenflormarket@gmail.com" className="legal__contact-email">
              zenflormarket@gmail.com
            </a>
            <p className="legal__contact-text" style={{ marginTop: "0.25rem" }}>
              {SITE_NAME} Karo & Çim Halı &bull;{" "}
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="legal__contact-link"
              >
                Leman Sk. No:4, Sancaktepe / İstanbul
              </a>{" "}
              &bull; Tel:{" "}
              <a href="tel:+905302708487" className="legal__contact-link">
                +90 (530) 270 84 87
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Legal;
