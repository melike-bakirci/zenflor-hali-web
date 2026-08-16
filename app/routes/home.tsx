import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import SectionTitle from "~/components/ui/SectionTitle";
import ProductCard from "~/components/ui/ProductCard";
import BlogCard from "~/components/ui/BlogCard";
import ClientLogos from "~/components/ui/ClientLogos";
import ReferenceCard from "~/components/ui/ReferenceCard";
import ReferenceModal from "~/components/ui/ReferenceModal";
import { karoHaliProducts } from "~/data/karoHaliProducts";
import { cimHaliProducts } from "~/data/cimHaliProducts";
import { blogPosts } from "~/data/blogPosts";
import {
  referenceProjects,
  type ReferenceProject,
} from "~/data/referencesData";
import QuoteCtaBanner from "~/components/ui/QuoteCtaBanner";
import { seoMeta } from "~/lib/seo";
import { SITE_NAME, SITE_URL } from "~/lib/constants";
import "./home.css";

const SLIDE_IMAGES = [
  "/images/hero-karo-hali.jpeg",
  "/images/hero-cim-hali.jpeg",
];

export function meta() {
  return seoMeta({
    title: `Karo Halı ve Çim Halı Zemin Kaplama Çözümleri | ${SITE_NAME}`,
    description: `${SITE_NAME}; ofis, otel ve ticari alanlar için yüksek performanslı akustik karo halı ve uzun ömürlü peyzaj çim halı modelleri sunar. Merkezimiz Sancaktepe Sarıgazi'de olup tüm Türkiye'ye uygun fiyatlı toptan ve perakende satışımız mevcuttur.`,
    keywords:
      "karo halı, çim halı, karo halı fiyatları, ofis halısı, istanbul karo halı firmaları, sarıgazi karo halı, sancaktepe çim halı, ucuz çim halı, akustik zemin kaplama",
    canonicalUrl: "/",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-nobg.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-530-270-84-87",
          contactType: "customer service",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/arama?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Karo Halı",
            url: `${SITE_URL}/karo-hali`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Çim Halı",
            url: `${SITE_URL}/cim-hali`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Referanslarımız",
            url: `${SITE_URL}/referanslarimiz`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "İletişim",
            url: `${SITE_URL}/iletisim`,
          },
        ],
      },
    ],
  });
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      hero.style.setProperty("--scroll", `${window.scrollY * 0.4}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRefProject, setSelectedRefProject] =
    useState<ReferenceProject | null>(null);

  const heroSlides = [
    {
      title: t("home.heroSlides.0.title"),
      subtitle: t("home.heroSlides.0.subtitle"),
      image: SLIDE_IMAGES[0],
    },
    {
      title: t("home.heroSlides.1.title"),
      subtitle: t("home.heroSlides.1.subtitle"),
      image: SLIDE_IMAGES[1],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1,
      );
    }, 7000);

    return () => clearInterval(timer);
  }, [currentSlide, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const featuredKaro = karoHaliProducts.filter((p) => p.featured).slice(0, 4);
  const featuredCim = cimHaliProducts.filter((p) => p.featured).slice(0, 4);
  const featuredReferences = referenceProjects
    .filter((r) => r.featured)
    .slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="home page-enter">
      {/* ===== HERO SLIDER ===== */}
      <section
        className="hero-slider"
        aria-label="Hero slider"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <div
              key={`bg-${index}-${index === currentSlide ? "active" : "idle"}`}
              className="hero-slide__bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slide__overlay"></div>
            </div>

            <div className="container hero-slide__content">
              <span className="hero-slide__subtitle">{slide.subtitle}</span>
              <h1 className="hero-slide__title">{slide.title}</h1>
              <div className="hero-slide__actions">
                <Link to="/iletisim" className="hero-btn hero-btn--primary">
                  <span>{t("home.heroCtaContact")}</span>
                </Link>
                <a
                  href="tel:+905302708487"
                  className="hero-btn hero-btn--outline"
                >
                  <Phone size={18} />
                  <span>{t("home.heroCtaQuote")}</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        <button
          className="hero-slider__nav hero-slider__nav--prev"
          onClick={prevSlide}
          aria-label={t("home.prevSlide")}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="hero-slider__nav hero-slider__nav--next"
          onClick={nextSlide}
          aria-label={t("home.nextSlide")}
        >
          <ChevronRight size={32} />
        </button>

        <div className="hero-slider__dots">
          {heroSlides.map((_, index) => (
            <button
              key={`dot-${index}-${index === currentSlide ? "active" : "idle"}`}
              className={`hero-slider__dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={t("home.slideDot", { index: index + 1 })}
            />
          ))}
        </div>
      </section>

      {/* ===== BİZ KİMİZ ===== */}
      <section className="section home__about" id="biz-kimiz">
        <div className="container">
          <div className="home__about-inner">
            <div className="home__about-text">
              <span className="home__about-badge">{t("home.aboutBadge")}</span>
              <h2 className="home__about-heading">
                {t("home.aboutHeading")}
              </h2>
              <p className="home__about-desc">
                {t("home.aboutDesc", { siteName: SITE_NAME })}
              </p>
              <Link
                to="/hakkimizda"
                className="btn btn-primary home__about-cta"
              >
                {t("home.aboutCta")} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="home__about-stats">
              <div className="home__about-stat">
                <span className="home__about-stat-number">20</span>
                <span className="home__about-stat-label">{t("home.statsYears")}</span>
              </div>
              <div className="home__about-stat">
                <span className="home__about-stat-number">20.000+</span>
                <span className="home__about-stat-label">{t("home.statsProjects")}</span>
              </div>
              <div className="home__about-stat">
                <span className="home__about-stat-number">500+</span>
                <span className="home__about-stat-label">{t("home.statsProducts")}</span>
              </div>
              <div className="home__about-stat">
                <span className="home__about-stat-number">1000+</span>
                <span className="home__about-stat-label">
                  {t("home.statsReferences")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section home__categories" id="categories">
        <div className="container">
          <SectionTitle
            title={t("home.categoriesTitle")}
            subtitle={t("home.categoriesSubtitle")}
            center
          />
          <div className="home__cat-grid">
            {/* Karo Halı */}
            <div
              className="home__cat-card"
              onClick={() => navigate("/karo-hali")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/karo-hali");
              }}
            >
              <div className="home__cat-img-wrapper">
                <img
                  src="/images/cat-karo-office.png"
                  alt="Ofis ve Ticari Akustik Karo Halı Modelleri ve Uygulamaları"
                  className="home__cat-img"
                />
              </div>
              <div className="home__cat-content">
                <h3 className="home__cat-title">{t("home.karoHaliCat")}</h3>
                <p className="home__cat-subtitle">
                  {t("home.karoHaliCatSubtitle")}
                </p>
                <div className="home__cat-desc">
                  <p>{t("home.karoHaliCatDesc")}</p>
                </div>
                <div className="home__cat-footer">
                  <span className="btn btn-primary home__cat-btn">
                    {t("home.viewProducts")}{" "}
                    <ChevronRight size={16} />
                  </span>
                  <a
                    href="tel:+905302708487"
                    className="home__cat-phone"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={14} /> +90 530 270 84 87
                  </a>
                </div>
              </div>
            </div>

            {/* Çim Halı */}
            <div
              className="home__cat-card"
              onClick={() => navigate("/cim-hali")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/cim-hali");
              }}
            >
              <div className="home__cat-img-wrapper">
                <img
                  src="/images/cat-cim-landscape.png"
                  alt="Bahçe ve Balkon İçin Dekoratif Suni Çim Halı Modelleri"
                  className="home__cat-img"
                />
              </div>
              <div className="home__cat-content">
                <h3 className="home__cat-title">{t("home.cimHaliCat")}</h3>
                <p className="home__cat-subtitle">
                  {t("home.cimHaliCatSubtitle")}
                </p>
                <div className="home__cat-desc">
                  <p>{t("home.cimHaliCatDesc")}</p>
                </div>
                <div className="home__cat-footer">
                  <span className="btn btn-primary home__cat-btn">
                    {t("home.viewProducts")}{" "}
                    <ChevronRight size={16} />
                  </span>
                  <a
                    href="tel:+905302708487"
                    className="home__cat-phone"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={14} /> +90 530 270 84 87
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED KARO HALI ===== */}
      <section className="section home__featured" id="featured-karo">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              title={t("home.karoSectionTitle")}
              subtitle={t("home.karoSectionSubtitle")}
            />
            <Link to="/karo-hali" className="btn btn-outline home__view-all">
              {t("common.viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-4">
            {featuredKaro.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/karo-hali" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CIM HALI ===== */}
      <section className="section home__featured" id="featured-cim">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              title={t("home.cimSectionTitle")}
              subtitle={t("home.cimSectionSubtitle")}
            />
            <Link to="/cim-hali" className="btn btn-outline home__view-all">
              {t("common.viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-4">
            {featuredCim.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/cim-hali" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== REFERANSLARIMIZ SECTION ===== */}
      <section className="section home__references" id="home-references">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              title={t("home.referencesSectionTitle")}
              subtitle={t("home.referencesSectionSubtitle")}
            />
            <Link
              to="/referanslarimiz"
              className="btn btn-outline home__view-all"
            >
              {t("home.viewAllReferences")}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Client Logos Carousel/Grid */}
          <div className="home__client-logos-wrapper">
            <ClientLogos limit={4} />
          </div>

          {/* Finished Application Projects Cards */}
          <div className="grid-4 home__ref-grid">
            {featuredReferences.map((project) => (
              <ReferenceCard
                key={project.id}
                project={project}
                onSelect={setSelectedRefProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section home__blog" id="home-blog">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              title={t("blog.title")}
              subtitle={t("blog.subtitle")}
            />
            <Link to="/blog" className="btn btn-outline home__view-all">
              {t("common.viewAll")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3 home__blog-grid">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <QuoteCtaBanner
        title={t("home.quoteBannerTitle")}
        subtitle={t("home.quoteBannerSubtitle")}
      />

      {/* Modal */}
      <ReferenceModal
        project={selectedRefProject}
        onClose={() => setSelectedRefProject(null)}
      />
    </div>
  );
};

export default Home;
