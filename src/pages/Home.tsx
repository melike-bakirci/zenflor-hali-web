import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Shield, Headphones, Layers, Star } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import BlogCard from '../components/ui/BlogCard';
import { karoHaliProducts } from '../data/karoHaliProducts';
import { cimHaliProducts } from '../data/cimHaliProducts';
import { blogPosts } from '../data/blogPosts';
import './Home.css';

const STATS = [
  { value: '20+', labelKey: 'home.statsYears' },
  { value: '2.500+', labelKey: 'home.statsProjects' },
  { value: '80+', labelKey: 'home.statsProducts' },
  { value: '4.200+', labelKey: 'home.statsClients' },
];

const FEATURES = [
  { icon: <Shield size={28} />, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc' },
  { icon: <Headphones size={28} />, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc' },
  { icon: <Layers size={28} />, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc' },
  { icon: <Star size={28} />, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc' },
];

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      hero.style.setProperty('--scroll', `${window.scrollY * 0.4}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredKaro = karoHaliProducts.filter((p) => p.featured).slice(0, 3);
  const featuredCim = cimHaliProducts.filter((p) => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="home page-enter">
      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef} aria-label="Hero bölümü">
        <div className="hero__bg">
          <div className="hero__bg-grid" aria-hidden="true" />
          <div className="hero__bg-radial" aria-hidden="true" />
        </div>

        <div className="container hero__content">
          <div className="hero__badge">
            <span className="badge badge-primary">✦ Premium Zemin Çözümleri</span>
          </div>
          <h1 className="hero__title">
            <span className="hero__title-line">{t('home.heroTitle')}</span>
            <br />
            <span className="hero__title-accent text-gradient font-display">
              {t('home.heroTitleAccent')}
            </span>
          </h1>
          <p className="hero__subtitle">{t('home.heroSubtitle')}</p>

          <div className="hero__actions">
            <Link to="/karo-hali" className="btn btn-primary btn-lg" id="hero-cta-primary">
              {t('home.heroCtaPrimary')} <ArrowRight size={18} />
            </Link>
            <Link to="/hakkimizda" className="btn btn-outline btn-lg" id="hero-cta-secondary">
              {t('home.heroCtaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {STATS.map((s) => (
              <div key={s.labelKey} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{t(s.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section home__categories" id="categories">
        <div className="container">
          <SectionTitle
            tag="Koleksiyonlar"
            title={t('home.categoriesTitle')}
            subtitle={t('home.categoriesSubtitle')}
            center
          />
          <div className="home__cat-grid">
            <Link to="/karo-hali" className="home__cat-card home__cat-card--karo" id="cat-karo-hali">
              <div className="home__cat-card-bg" aria-hidden="true" />
              <div className="home__cat-pattern" aria-hidden="true" />
              <div className="home__cat-content">
                <span className="home__cat-icon">▦</span>
                <h2 className="home__cat-title">{t('home.karoHaliCat')}</h2>
                <p className="home__cat-desc">{t('home.karoHaliDesc')}</p>
                <span className="btn btn-outline">
                  {t('home.exploreBtn')} <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            <Link to="/cim-hali" className="home__cat-card home__cat-card--cim" id="cat-cim-hali">
              <div className="home__cat-card-bg" aria-hidden="true" />
              <div className="home__cat-pattern home__cat-pattern--cim" aria-hidden="true" />
              <div className="home__cat-content">
                <span className="home__cat-icon">🌿</span>
                <h2 className="home__cat-title">{t('home.cimHaliCat')}</h2>
                <p className="home__cat-desc">{t('home.cimHaliDesc')}</p>
                <span className="btn btn-outline">
                  {t('home.exploreBtn')} <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED KARO HALI ===== */}
      <section className="section home__featured" id="featured-karo">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              tag={isEn ? 'Carpet Tiles' : 'Karo Halı'}
              title={t('home.featuredTitle')}
              subtitle={t('home.featuredSubtitle')}
            />
            <Link to="/karo-hali" className="btn btn-outline home__view-all">
              {t('common.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3">
            {featuredKaro.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/karo-hali" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER BANNER ===== */}
      <div className="home__banner" aria-hidden="true">
        <div className="container home__banner-inner">
          <p className="home__banner-text">
            {isEn
              ? 'Professional flooring solutions for your corporate projects'
              : 'Kurumsal projeleriniz için profesyonel zemin çözümleri'}
          </p>
          <Link to="/iletisim" className="btn btn-primary">
            {t('products.infoRequest')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ===== FEATURED CIM HALI ===== */}
      <section className="section home__featured" id="featured-cim">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              tag={isEn ? 'Artificial Grass' : 'Çim Halı'}
              title={isEn ? 'Artificial Grass Collection' : 'Çim Halı Koleksiyonu'}
              subtitle={isEn ? 'Premium synthetic grass solutions' : 'Premium sentetik çim çözümleri'}
            />
            <Link to="/cim-hali" className="btn btn-outline home__view-all">
              {t('common.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3">
            {featuredCim.map((p) => (
              <ProductCard key={p.id} product={p} basePath="/cim-hali" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section home__why" id="why-us">
        <div className="container">
          <SectionTitle
            tag={isEn ? 'Why Us' : 'Neden Biz'}
            title={t('home.whyUsTitle')}
            subtitle={t('home.whyUsSubtitle')}
            center
          />
          <div className="home__features">
            {FEATURES.map((f, i) => (
              <div key={i} className="home__feature-card" id={`feature-${i + 1}`}>
                <div className="home__feature-icon">{f.icon}</div>
                <h3 className="home__feature-title">{t(f.titleKey)}</h3>
                <p className="home__feature-desc">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section home__blog" id="home-blog">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
              tag="Blog"
              title={t('blog.title')}
              subtitle={t('blog.subtitle')}
            />
            <Link to="/blog" className="btn btn-outline home__view-all">
              {t('common.viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="home__cta" id="home-cta">
        <div className="container home__cta-inner">
          <h2 className="home__cta-title font-display">
            {isEn ? 'Get a Quote for Your Project' : 'Projeniz için Teklif Alın'}
          </h2>
          <p className="home__cta-subtitle">
            {isEn
              ? 'Contact us with your project details and get an expert consultation.'
              : 'Proje detaylarınızla birlikte iletişime geçin, uzman danışmanlık alın.'}
          </p>
          <Link to="/iletisim" className="btn btn-primary btn-lg" id="bottom-cta">
            {t('nav.contact')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
