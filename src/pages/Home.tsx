import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import BlogCard from '../components/ui/BlogCard';
import { karoHaliProducts } from '../data/karoHaliProducts';
import { cimHaliProducts } from '../data/cimHaliProducts';
import { blogPosts } from '../data/blogPosts';
import './Home.css';

const HERO_SLIDES = [
  {
    title: 'En Uygun Karo Halı',
    subtitle: 'KARO HALI',
    image: '/images/hero-karo-hali.jpeg',
  },
  {
    title: 'Kaliteli Çim Halı Çözümleri',
    subtitle: 'ÇİM HALI',
    image: '/images/hero-cim-hali.jpeg',
  },
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

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const featuredKaro = karoHaliProducts.filter((p) => p.featured).slice(0, 3);
  const featuredCim = cimHaliProducts.filter((p) => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="home page-enter">
      {/* ===== HERO SLIDER ===== */}
      <section className="hero-slider" aria-label="Hero slider">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div
              className="hero-slide__bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slide__overlay"></div>
            </div>

            <div className="container hero-slide__content">
              <span className="hero-slide__subtitle">{slide.subtitle}</span>
              <h1 className="hero-slide__title">{slide.title}</h1>
            </div>
          </div>
        ))}

        <button className="hero-slider__nav hero-slider__nav--prev" onClick={prevSlide} aria-label="Önceki Slayt">
          <ChevronLeft size={32} />
        </button>
        <button className="hero-slider__nav hero-slider__nav--next" onClick={nextSlide} aria-label="Sonraki Slayt">
          <ChevronRight size={32} />
        </button>

        <div className="hero-slider__dots">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`hero-slider__dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slayt ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section home__categories" id="categories">
        <div className="container">
          <SectionTitle
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

      {/* ===== FEATURED CIM HALI ===== */}
      <section className="section home__featured" id="featured-cim">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
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

      {/* ===== BLOG ===== */}
      <section className="section home__blog" id="home-blog">
        <div className="container">
          <div className="home__featured-header">
            <SectionTitle
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
