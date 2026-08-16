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
import { SITE_NAME } from "~/lib/constants";
import type { MetaArgs } from "react-router";
import "./legal.css";

export type LegalTabType = "privacy" | "terms" | "kvkk" | "cookies";

const TAB_ROUTES: Record<LegalTabType, string> = {
  privacy: "/gizlilik",
  terms: "/kosullar",
  kvkk: "/kvkk",
  cookies: "/cerez-politikasi",
};

const metaTitles: Record<LegalTabType, { tr: string; en: string }> = {
  privacy: { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  terms: { tr: "Kullanım Koşulları", en: "Terms of Use" },
  kvkk: { tr: "KVKK Aydınlatma Metni", en: "KVKK Information Notice" },
  cookies: { tr: "Çerez Politikası", en: "Cookie Policy" },
};

function tabFromPath(pathname: string): LegalTabType {
  if (pathname === "/kosullar") return "terms";
  if (pathname === "/kvkk") return "kvkk";
  if (pathname === "/cerez-politikasi") return "cookies";
  return "privacy";
}

export function meta({ location }: MetaArgs) {
  const tab = tabFromPath(location.pathname);
  return seoMeta({
    title: `${metaTitles[tab].tr} | ${SITE_NAME}`,
    description: `${SITE_NAME} yasal bilgilendirme, gizlilik politikası, KVKK aydınlatma metni, mesafeli satış sözleşmesi ve çerez politikası detayları.`,
    canonicalUrl: TAB_ROUTES[tab],
    noindex: true,
  });
}

const Legal: React.FC = () => {
  const { i18n } = useTranslation();
  
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

  return (
    <div className="legal-page page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">
              {"Yasal Bilgilendirme"}
            </h1>
            <p className="page-hero__subtitle">
              {false
                ? "KVKK, privacy policies, terms of use, and cookie management guidelines"
                : "KVKK aydınlatma metni, gizlilik politikası, kullanım koşulları ve çerez yönetimi"}
            </p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", url: "/" },
            { label: "Yasal Bilgilendirme", url: "/gizlilik" },
            {
              label: metaTitles[activeTab].tr,
            },
          ]}
        />
      </div>

      <div className="container legal__container">
        {/* Navigation Tabs */}
        <div className="legal__tabs" role="tablist" aria-label="Yasal Metinler">
          <button
            className={`legal__tab ${activeTab === "privacy" ? "legal__tab--active" : ""}`}
            onClick={() => handleTabChange("privacy")}
            role="tab"
            aria-selected={activeTab === "privacy"}
          >
            <span className="legal__tab-icon">
              <Lock size={18} />
            </span>
            {"Gizlilik Politikası"}
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
            {"Kullanım Koşulları"}
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
            {"KVKK Aydınlatma Metni"}
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
            {"Çerez Politikası"}
          </button>
        </div>

        {/* Content Box */}
        <div className="legal__document">
          {activeTab === "privacy" && <PrivacyContent  />}
          {activeTab === "terms" && <TermsContent  />}
          {activeTab === "kvkk" && <KvkkContent  />}
          {activeTab === "cookies" && <CookiesContent  />}
        </div>
      </div>
    </div>
  );
};

/* --- TAB CONTENT COMPONENTS --- */

// 1. Privacy Policy
const PrivacyContent: React.FC<{  }> = ({}) => (
  <article>
    <header className="legal__doc-header">
      <h2 className="legal__doc-title">
        {"Gizlilik Politikası"}
      </h2>
      <div className="legal__doc-meta">
        <span className="legal__doc-meta-item">
          <Calendar size={14} />{" "}
          {"Son Güncelleme: Ağustos 2026"}
        </span>
        <span className="legal__doc-meta-item">
          <Building size={14} /> {SITE_NAME} Karo & Çim Halı Çözümleri
        </span>
      </div>
    </header>

    <div className="legal__doc-body">
      <p className="legal__intro">
        {false
          ? `At ${SITE_NAME}, we prioritize the security and confidentiality of your personal information. This Privacy Policy explains how we collect, process, and protect your data when you visit our website.`
          : `${SITE_NAME} olarak, web sitemizi ziyaret eden kullanıcılarımızın ve müşterilerimizin kişisel verilerinin gizliliğine ve güvenliğine büyük önem vermekteyiz. İşbu Gizlilik Politikası, web sitemiz üzerinden toplanan bilgilerin nasıl işlendiğini ve korunduğunu açıklamaktadır.`}
      </p>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">1</span>
          {"Toplanan Kişisel Veriler"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "When you fill out inquiry forms, request quotes, or contact us via WhatsApp or phone, we may collect the following details:"
            : "Sitemizde yer alan iletişim formlarını doldurduğunuzda, fiyat teklifi talebinde bulunduğunuzda veya bizimle irtibata geçtiğinizde aşağıdaki bilgileriniz işlenebilir:"}
        </p>
        <ul className="legal__list">
          <li className="legal__list-item">
            {false
              ? "Name, surname, and company title"
              : "Ad, soyad ve firma unvanı bilgileri"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Contact information (Email address, phone number)"
              : "İletişim bilgileri (E-posta adresi, telefon numarası)"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Project requirements, address, and city location"
              : "Proje talepleriniz, adres ve şehir bilgisi"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Technical log data (IP address, browser type, visit timestamps)"
              : "Teknik erişim verileri (IP adresi, tarayıcı bilgisi, ziyaret saati)"}
          </li>
        </ul>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">2</span>
          {"Verilerin Kullanım Amaçları"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "The collected data is exclusively used for the following operational purposes:"
            : "Toplanan veriler yalnızca aşağıdaki amaçlar doğrultusunda kullanılmaktadır:"}
        </p>
        <ul className="legal__list">
          <li className="legal__list-item">
            {false
              ? "Preparing tailored price offers for carpet tiles and synthetic turf projects"
              : "Karo halı ve çim halı projelerinize özel fiyat tekliflerinin hazırlanması"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Responding to customer inquiries and technical consultancy requests"
              : "Müşteri taleplerinin ve teknik danışmanlık sorularının yanıtlanması"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Fulfilling orders, deliveries, and application services"
              : "Sipariş, teslimat ve zemin kaplama uygulama süreçlerinin yürütülmesi"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Enhancing user experience and site functionality"
              : "Web sitesi performansının ve kullanıcı deneyiminin iyileştirilmesi"}
          </li>
        </ul>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">3</span>
          {"Veri Güvenliği Önlemleri"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "We store your information on secure servers protected with industry-standard SSL encryption and access controls. Your data will never be sold, rented, or commercialized with third-party unauthorized entities."
            : `${SITE_NAME}, kişisel verilerinizi yetkisiz erişim, kayıp veya kötüye kullanıma karşı korumak adına SSL şifreleme ve teknik güvenlik tedbirleri uygulamaktadır. Verileriniz hiçbir koşulda üçüncü taraflara satılmaz veya ticari amaçla devredilmez.`}
        </p>
      </section>

      <div className="legal__contact-box">
        <div className="legal__contact-icon">
          <Mail size={24} />
        </div>
        <div>
          <h4 className="legal__contact-title">
            {"Gizlilik Sorularınız İçin"}
          </h4>
          <p className="legal__contact-text">
            {false
              ? "If you have any questions regarding your data privacy, feel free to contact us at:"
              : "Gizlilik politikamız veya kişisel verilerinizle ilgili her türlü soru için bizimle e-posta üzerinden iletişime geçebilirsiniz:"}
          </p>
          <a
            href="mailto:zenflormarket@gmail.com"
            className="legal__contact-email"
          >
            zenflormarket@gmail.com
          </a>
        </div>
      </div>
    </div>
  </article>
);

// 2. Terms of Use
const TermsContent: React.FC<{  }> = ({}) => (
  <article>
    <header className="legal__doc-header">
      <h2 className="legal__doc-title">
        {"Kullanım Koşulları"}
      </h2>
      <div className="legal__doc-meta">
        <span className="legal__doc-meta-item">
          <Calendar size={14} />{" "}
          {"Son Güncelleme: Ağustos 2026"}
        </span>
        <span className="legal__doc-meta-item">
          <Building size={14} /> {SITE_NAME} Karo & Çim Halı Çözümleri
        </span>
      </div>
    </header>

    <div className="legal__doc-body">
      <p className="legal__intro">
        {false
          ? `Welcome to the official website of ${SITE_NAME}. By browsing or utilizing this site, you agree to comply with the terms and conditions outlined below.`
          : `${SITE_NAME} resmi web sitesine hoş geldiniz. Bu web sitesini ziyaret ederek ve kullanarak, aşağıda belirtilen kullanım koşullarını ve yasal kuralları kabul etmiş sayılırsınız.`}
      </p>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">1</span>
          {false
            ? "Intellectual Property Rights"
            : "Fikri ve Sınai Mülkiyet Hakları"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? `All product images, carpet designs, technical specifications, text, logos, and trademarks displayed on this site belong exclusively to ${SITE_NAME}. Unlawful copying, distribution, or reproduction without written authorization is strictly prohibited.`
            : `Sitede sunulan tüm ürün görselleri, karo ve çim halı katalogları, yazılar, markalar ve grafik tasarımlar ${SITE_NAME} markasına aittir. Yazılı izin alınmaksızın kopyalanması, çoğaltılması veya ticari amaçla kullanımı yasaktır.`}
        </p>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">2</span>
          {false
            ? "Product Information & Pricing Notice"
            : "Ürün Bilgileri ve Fiyat Sorumluluğu"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "The technical specifications and unit prices displayed on our website are for informational and offer calculation purposes. Final offer conditions, stock availability, and application costs are confirmed during project evaluation."
            : "Web sitemizde yer alan ürün teknik detayları ve m² birim fiyat hesaplayıcıları bilgilendirme amaçlıdır. Stok durumu, metraj indirimi ve uygulama bedelleri nihai teklif çalışmasında netleştirilir."}
        </p>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">3</span>
          {"Hizmet Değişiklikleri"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? `${SITE_NAME} reserves the right to modify site content, update product catalogues, or amend terms of use at any time without prior notice.`
            : `${SITE_NAME}, web sitesinin içeriğini, ürün kataloğunu ve kullanım şartlarını önceden bildirmeksizin değiştirme veya güncelleme hakkını saklı tutar.`}
        </p>
      </section>

      <div className="legal__contact-box">
        <div className="legal__contact-icon">
          <Mail size={24} />
        </div>
        <div>
          <h4 className="legal__contact-title">
            {"Kullanım Şartları İletişim"}
          </h4>
          <p className="legal__contact-text">
            {false
              ? "For questions regarding corporate collaboration and site usage terms:"
              : "Kurumsal işbirlikleri ve kullanım şartlarıyla ilgili sorularınız için bizimle iletişime geçin:"}
          </p>
          <a
            href="mailto:zenflormarket@gmail.com"
            className="legal__contact-email"
          >
            zenflormarket@gmail.com
          </a>
        </div>
      </div>
    </div>
  </article>
);

// 3. KVKK Content
const KvkkContent: React.FC<{  }> = ({}) => (
  <article>
    <header className="legal__doc-header">
      <h2 className="legal__doc-title">
        {"KVKK Aydınlatma Metni"}
      </h2>
      <div className="legal__doc-meta">
        <span className="legal__doc-meta-item">
          <Calendar size={14} />{" "}
          {"Son Güncelleme: Ağustos 2026"}
        </span>
        <span className="legal__doc-meta-item">
          <Building size={14} /> 6698 Sayılı KVKK Kapsamında
        </span>
      </div>
    </header>

    <div className="legal__doc-body">
      <p className="legal__intro">
        {false
          ? `This text clarifies the processing of personal data by ${SITE_NAME} in accordance with the Turkish Personal Data Protection Law No. 6698 (KVKK).`
          : `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, ${SITE_NAME} olarak Veri Sorumlusu sıfatıyla kişisel verilerinizin işlenme amaçları, aktarıldığı kişiler ve haklarınız konusunda sizi bilgilendiriyoruz.`}
      </p>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">1</span>
          {"Veri Sorumlusunun Kimliği"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? `Data Controller: ${SITE_NAME} (Address: Leman Sk. No:4, Sancaktepe / İstanbul, Phone: +90 530 270 84 87).`
            : `Veri Sorumlusu: ${SITE_NAME} (Adres: Leman Sk. No:4, Sancaktepe / İstanbul, Telefon: +90 (530) 270 84 87, E-posta: zenflormarket@gmail.com).`}
        </p>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">2</span>
          {false
            ? "Purposes of Data Processing"
            : "Kişisel Verilerin İşlenme Amaçları"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "Your personal data (name, phone, email, project address) is processed for:"
            : "Kişisel verileriniz aşağıdaki hukuki sebepler ve amaçlar doğrultusunda işlenmektedir:"}
        </p>
        <ul className="legal__list">
          <li className="legal__list-item">
            {false
              ? "Providing quote estimates for flooring applications"
              : "Zemin kaplama ve halı satış-uygulama tekliflerinin oluşturulması"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Executing communication activities and logistics scheduling"
              : "Müşteri iletişim süreçlerinin ve nakliye/montaj organizasyonunun yürütülmesi"}
          </li>
          <li className="legal__list-item">
            {false
              ? "Fulfilling legal and administrative obligations"
              : "Yasal ve idari yükümlülüklerin yerine getirilmesi"}
          </li>
        </ul>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">3</span>
          {false
            ? "Your Rights Under KVKK Article 11"
            : "KVKK 11. Madde Kapsamındaki Haklarınız"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "Pursuant to Article 11 of KVKK, data subjects have the right to request access, correction, deletion, or restriction of their personal data by contacting us."
            : "KVKK m. 11 uyarınca tarafımıza başvurarak kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz."}
        </p>
      </section>

      <div className="legal__contact-box">
        <div className="legal__contact-icon">
          <Mail size={24} />
        </div>
        <div>
          <h4 className="legal__contact-title">
            {"KVKK Başvuru Hattı"}
          </h4>
          <p className="legal__contact-text">
            {false
              ? "To submit a KVKK request, send an email to:"
              : "KVKK kapsamındaki taleplerinizi e-posta adresimiz üzerinden iletebilirsiniz:"}
          </p>
          <a
            href="mailto:zenflormarket@gmail.com"
            className="legal__contact-email"
          >
            zenflormarket@gmail.com
          </a>
        </div>
      </div>
    </div>
  </article>
);

// 4. Cookies Content
const CookiesContent: React.FC<{  }> = ({}) => (
  <article>
    <header className="legal__doc-header">
      <h2 className="legal__doc-title">
        {"Çerez Politikası"}
      </h2>
      <div className="legal__doc-meta">
        <span className="legal__doc-meta-item">
          <Calendar size={14} />{" "}
          {"Son Güncelleme: Ağustos 2026"}
        </span>
        <span className="legal__doc-meta-item">
          <Building size={14} /> {SITE_NAME} Web Site Çerezleri
        </span>
      </div>
    </header>

    <div className="legal__doc-body">
      <p className="legal__intro">
        {false
          ? `${SITE_NAME} uses cookies to improve website performance, personalize user experience, and analyze site usage statistics.`
          : `${SITE_NAME} web sitesinde, kullanıcı deneyimini iyileştirmek, site performansını analiz etmek ve tercihlerinizi hatırlamak amacıyla çerezler (cookies) kullanılmaktadır.`}
      </p>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">1</span>
          {"Çerez (Cookie) Nedir?"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "Cookies are small text files stored on your browser or device when visiting web pages. They enable the website to recognize your browser and remember settings."
            : "Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır."}
        </p>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">2</span>
          {"Kullanılan Çerez Türleri"}
        </h3>
        <ul className="legal__list">
          <li className="legal__list-item">
            <strong>{"Zorunlu Çerezler:"}</strong>{" "}
            {false
              ? "Necessary for navigation and core website functions."
              : "Sitenin güvenli ve doğru bir şekilde çalışabilmesi için zorunludur."}
          </li>
          <li className="legal__list-item">
            <strong>
              {false
                ? "Performance & Analytics:"
                : "Performans ve Analiz Çerezleri:"}
            </strong>{" "}
            {false
              ? "Helps us understand visitor traffic and popular product categories."
              : "Ziyaretçi trafiğini ve en çok incelenen karo halı kategorilerini anonim olarak analiz eder."}
          </li>
          <li className="legal__list-item">
            <strong>
              {"İşlevsellik Çerezleri:"}
            </strong>{" "}
            {false
              ? "Remembers language preferences (TR/EN)."
              : "Dil tercihi (Türkçe / İngilizce) gibi kişisel seçimlerinizi hatırlar."}
          </li>
        </ul>
      </section>

      <section className="legal__section">
        <h3 className="legal__section-title">
          <span className="legal__section-title-num">3</span>
          {"Çerez Tercihlerini Yönetme"}
        </h3>
        <p className="legal__paragraph">
          {false
            ? "You can block or remove cookies through your web browser preferences (Chrome, Safari, Firefox, Edge). Note that disabling essential cookies may impact site navigation."
            : "Tarayıcınızın (Chrome, Firefox, Safari vb.) ayarlar bölümünden dilediğiniz zaman çerezleri engelleyebilir veya silebilirsiniz. Ancak zorunlu çerezlerin kapatılması site işlevselliğini etkileyebilir."}
        </p>
      </section>

      <div className="legal__contact-box">
        <div className="legal__contact-icon">
          <Mail size={24} />
        </div>
        <div>
          <h4 className="legal__contact-title">
            {"Çerez Destek Hattı"}
          </h4>
          <p className="legal__contact-text">
            {false
              ? "For details on cookie management:"
              : "Çerez yönetimi ve veri tercihleri hakkında detaylı bilgi almak için:"}
          </p>
          <a
            href="mailto:zenflormarket@gmail.com"
            className="legal__contact-email"
          >
            zenflormarket@gmail.com
          </a>
        </div>
      </div>
    </div>
  </article>
);

export default Legal;
