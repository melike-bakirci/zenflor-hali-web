import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Search,
  ZoomIn,
  ZoomOut,
  Volume2,
  Pause,
  Play,
  Square,
  Tag,
  ChevronRight,
  Share2,
  Copy,
  Check,
  Printer,
} from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { blogPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import { normalizeSearchText } from '../utils/productUtils';
import QuoteCtaBanner from '../components/ui/QuoteCtaBanner';
import SEO from '../components/seo/SEO';
import './BlogDetail.css';

type FontSize = 'sm' | 'md' | 'lg';

const FONT_SIZES: Record<FontSize, string> = {
  sm: '0.9rem',
  md: '1.05rem',
  lg: '1.2rem',
};

const WhatsAppIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  const post = blogPosts.find((p) => p.slug === slug);
  const title = post ? (isEn ? post.titleEn : post.title) : '';
  const excerpt = post ? (isEn ? post.excerptEn || post.excerpt : post.excerpt) : '';

  // Font size
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('blog-font-size') as FontSize) || 'md';
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Copy link
  const [copied, setCopied] = useState(false);

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setTtsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Reset TTS when navigating
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [slug]);

  const handleFontSize = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem('blog-font-size', size);
  };

  const decreaseFontSize = () => {
    const order: FontSize[] = ['sm', 'md', 'lg'];
    const idx = order.indexOf(fontSize);
    if (idx > 0) handleFontSize(order[idx - 1]);
  };

  const increaseFontSize = () => {
    const order: FontSize[] = ['sm', 'md', 'lg'];
    const idx = order.indexOf(fontSize);
    if (idx < order.length - 1) handleFontSize(order[idx + 1]);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {/* ignore */}
  };

  const handlePrint = () => {
    window.print();
  };

  const getPlainText = useCallback(() => {
    if (!post) return '';
    const raw = isEn ? post.contentEn : post.content;
    // Strip markdown
    return raw
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/#{1,6}\s*/g, '')
      .replace(/[*_`~]/g, '')
      .replace(/\n{2,}/g, ' ')
      .trim();
  }, [post, isEn]);

  const startTTS = useCallback(() => {
    if (!ttsSupported) return;
    window.speechSynthesis.cancel();

    const text = getPlainText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isEn ? 'en-GB' : 'tr-TR';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Try to pick a matching voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith(isEn ? 'en' : 'tr'));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => { setIsSpeaking(false); setIsPaused(false); };
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };
    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [ttsSupported, getPlainText, isEn]);

  const pauseTTS = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeTTS = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!post) return <Navigate to="/blog" replace />;

  const content = isEn ? post.contentEn : post.content;
  const category = isEn ? post.categoryEn : post.category;

  const formattedDate = new Date(post.date).toLocaleDateString(
    isEn ? 'en-GB' : 'tr-TR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  // Related / other posts (exclude current)
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const filteredSearch = searchQuery.trim().length > 1
    ? blogPosts.filter((p) => {
        const q = normalizeSearchText(searchQuery);
        return (
          normalizeSearchText(p.title).includes(q) ||
          normalizeSearchText(p.titleEn).includes(q) ||
          normalizeSearchText(p.excerpt).includes(q) ||
          (p.tags || []).some((tag) => normalizeSearchText(tag).includes(q))
        );
      })
    : [];

  const categories = [
    { key: 'karo-hali', label: isEn ? 'Carpet Tiles' : 'Karo Halı', color: '#66101F' },
    { key: 'cim-hali', label: isEn ? 'Artificial Grass' : 'Çim Halı', color: '#2d6a4f' },
  ];

  return (
    <div className="blog-detail page-enter">
      <SEO 
        title={post ? `${title} | Blog` : 'Blog'}
        description={excerpt}
        canonicalUrl={`/blog/${slug}`}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "image": post?.image ? `https://zenflor.com${post.image}` : "https://zenflor.com/logo-nobg.png",
          "author": {
            "@type": "Person",
            "name": post?.author || "Zenflor"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Zenflor",
            "logo": {
              "@type": "ImageObject",
              "url": "https://zenflor.com/logo-nobg.png"
            }
          },
          "datePublished": post?.date
        }}
      />
      <div className="blog-detail__wrapper container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Ana Sayfa', url: '/' },
            { label: t('nav.blog'), url: '/blog' },
            { label: title },
          ]}
        />

        <nav className="blog-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/blog" className="blog-detail__back">
            <ArrowLeft size={16} /> {t('blog.backToBlog')}
          </Link>
        </nav>

        <div className="blog-detail__layout">
          {/* ── LEFT READING BAR (sticky, grid col 1) ── */}
          <div className="blog-reading-bar" role="toolbar" aria-label={isEn ? 'Reading options' : 'Okuma araçları'}>
            <span className="blog-reading-bar__label">Aa</span>

            <button
              type="button"
              className={`blog-reading-bar__btn ${fontSize === 'sm' ? 'active' : ''}`}
              onClick={decreaseFontSize}
              disabled={fontSize === 'sm'}
              title={isEn ? 'Smaller text' : 'Yazıyı Küçült'}
              aria-label={isEn ? 'Decrease font size' : 'Yazı boyutunu küçült'}
            >
              <ZoomOut size={17} />
            </button>

            <button
              type="button"
              className={`blog-reading-bar__btn ${fontSize === 'lg' ? 'active' : ''}`}
              onClick={increaseFontSize}
              disabled={fontSize === 'lg'}
              title={isEn ? 'Larger text' : 'Yazıyı Büyüt'}
              aria-label={isEn ? 'Increase font size' : 'Yazı boyutunu büyüt'}
            >
              <ZoomIn size={17} />
            </button>

            <span className="blog-reading-bar__divider" />

            {ttsSupported && (
              <>
                {!isSpeaking && !isPaused && (
                  <button
                    type="button"
                    className="blog-reading-bar__btn blog-reading-bar__btn--tts"
                    onClick={startTTS}
                    title={isEn ? 'Listen to article' : 'Sesli Dinle'}
                    aria-label={isEn ? 'Start reading aloud' : 'Sesli okumayı başlat'}
                  >
                    <Volume2 size={17} />
                  </button>
                )}
                {isSpeaking && !isPaused && (
                  <button
                    type="button"
                    className="blog-reading-bar__btn blog-reading-bar__btn--tts speaking"
                    onClick={pauseTTS}
                    title={isEn ? 'Pause' : 'Duraklat'}
                    aria-label={isEn ? 'Pause reading' : 'Okumayı duraklat'}
                  >
                    <Pause size={17} />
                  </button>
                )}
                {isPaused && (
                  <button
                    type="button"
                    className="blog-reading-bar__btn blog-reading-bar__btn--tts paused"
                    onClick={resumeTTS}
                    title={isEn ? 'Resume' : 'Devam Et'}
                    aria-label={isEn ? 'Resume reading' : 'Okumaya devam et'}
                  >
                    <Play size={17} />
                  </button>
                )}
                {(isSpeaking || isPaused) && (
                  <button
                    type="button"
                    className="blog-reading-bar__btn blog-reading-bar__btn--stop"
                    onClick={stopTTS}
                    title={isEn ? 'Stop' : 'Durdur'}
                    aria-label={isEn ? 'Stop reading' : 'Okumayı durdur'}
                  >
                    <Square size={15} />
                  </button>
                )}
              </>
            )}

            <span className="blog-reading-bar__divider" />

            <button
              type="button"
              className="blog-reading-bar__btn"
              onClick={handlePrint}
              title={isEn ? 'Print article' : 'Yazdır'}
              aria-label={isEn ? 'Print article' : 'Makaleyi yazdır'}
            >
              <Printer size={17} />
            </button>
          </div>

          {/* ── MAIN ARTICLE ── */}
          <main className="blog-detail__main">
            <article className="blog-detail__article">
              <header className="blog-detail__header">
                <span className="badge badge-primary blog-detail__category">{category}</span>
                <h1 className="blog-detail__title font-display">{title}</h1>

                <div className="blog-detail__meta">
                  <span className="blog-detail__meta-item">
                    <User size={14} /> {post.author}
                  </span>
                  <span className="blog-detail__meta-item">
                    <Calendar size={14} /> {formattedDate}
                  </span>
                  <span className="blog-detail__meta-item">
                    <Clock size={14} /> {post.readTime} {t('blog.readTime')}
                  </span>
                </div>
              </header>

              {/* Hero Image */}
              <div className="blog-detail__image-wrap">
                <img
                  src={post.image}
                  alt={isEn ? title : `Zemin Kaplama Blog Dekorasyon Görseli: ${title}`}
                  className="blog-detail__image"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Article Content */}
              <div
                className="blog-detail__content"
                style={{ fontSize: FONT_SIZES[fontSize] }}
              >
                <ReactMarkdown
                  components={{
                    table: ({ children }) => (
                      <div className="blog-table-wrap">
                        <table className="blog-table">{children}</table>
                      </div>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="blog-blockquote">{children}</blockquote>
                    ),
                    h2: ({ children }) => <h2 className="blog-h2">{children}</h2>,
                    h3: ({ children }) => <h3 className="blog-h3">{children}</h3>,
                    p: ({ children }) => <p className="blog-p">{children}</p>,
                    ul: ({ children }) => <ul className="blog-ul">{children}</ul>,
                    ol: ({ children }) => <ol className="blog-ol">{children}</ol>,
                    li: ({ children }) => <li className="blog-li">{children}</li>,
                    code: ({ children, className }) => {
                      const isBlock = className?.includes('language-');
                      return isBlock
                        ? <code className="blog-code-block">{children}</code>
                        : <code className="blog-code-inline">{children}</code>;
                    },
                    pre: ({ children }) => <pre className="blog-pre">{children}</pre>,
                    img: ({ src, alt }) => (
                      <figure className="blog-figure">
                        <img src={src} alt={isEn ? alt : `Blog İçerik Görseli: ${alt || title}`} className="blog-figure__img" />
                        {alt && <figcaption className="blog-figure__caption">{alt}</figcaption>}
                      </figure>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-detail__tags">
                  <span className="blog-detail__tags-label">
                    <Tag size={14} />
                    {isEn ? 'Tags:' : 'Etiketler:'}
                  </span>
                  <div className="blog-detail__tags-list">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-detail__tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Strip */}
              <div className="blog-detail__share-strip">
                <span className="blog-detail__share-label">
                  <Share2 size={15} />
                  {isEn ? 'Share this article' : 'Bu yazıyı paylaş'}
                </span>
                <div className="blog-detail__share-btns">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent((isEn ? `Read: ${title}` : `Oku: ${title}`) + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-icon-btn"
                    title={isEn ? 'Share on WhatsApp' : "WhatsApp'ta Paylaş"}
                    aria-label={isEn ? 'Share on WhatsApp' : "WhatsApp'ta Paylaş"}
                  >
                    <WhatsAppIcon />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-icon-btn"
                    title={isEn ? 'Share on LinkedIn' : "LinkedIn'de Paylaş"}
                    aria-label={isEn ? 'Share on LinkedIn' : "LinkedIn'de Paylaş"}
                  >
                    <LinkedInIcon />
                  </a>
                  {/* Copy link */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`sb-icon-btn ${copied ? 'copied' : ''}`}
                    title={copied ? (isEn ? 'Copied!' : 'Kopyalandı!') : (isEn ? 'Copy Link' : 'Bağlantıyı Kopyala')}
                    aria-label={isEn ? 'Copy Link' : 'Bağlantıyı Kopyala'}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  {copied && (
                    <span className="sb-copied-toast">
                      {isEn ? 'Link Copied!' : 'Kopyalandı!'}
                    </span>
                  )}
                </div>
              </div>

              <div className="blog-detail__footer">
                <Link to="/blog" className="btn btn-outline">
                  <ArrowLeft size={16} /> {t('blog.backToBlog')}
                </Link>
              </div>
            </article>
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="blog-detail__sidebar">
            {/* Search */}
            <div className="blog-sidebar__card blog-sidebar__search-card">
              <div className="blog-sidebar__card-header">
                <span className="blog-sidebar__card-icon"><Search size={15} /></span>
                <h3 className="blog-sidebar__title">{isEn ? 'Search Articles' : 'Yazılarda Ara'}</h3>
              </div>
              <div className="blog-sidebar__search-wrap">
                <input
                  type="search"
                  className="blog-sidebar__search-input"
                  placeholder={isEn ? 'Search…' : 'Ara…'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={isEn ? 'Search blog posts' : 'Blog yazılarında ara'}
                />
                <Search size={16} className="blog-sidebar__search-icon" />
              </div>

              {searchQuery.trim().length > 1 && (
                <div className="blog-sidebar__search-results">
                  {filteredSearch.length === 0 ? (
                    <p className="blog-sidebar__no-results">
                      {isEn ? 'No results found.' : 'Sonuç bulunamadı.'}
                    </p>
                  ) : (
                    filteredSearch.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="blog-sidebar__search-item"
                        onClick={() => { navigate(`/blog/${p.slug}`); setSearchQuery(''); }}
                      >
                        <span className="blog-sidebar__search-item-title">
                          {isEn ? p.titleEn : p.title}
                        </span>
                        <ChevronRight size={13} />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="blog-sidebar__card">
              <div className="blog-sidebar__card-header">
                <span className="blog-sidebar__card-icon"><Tag size={15} /></span>
                <h3 className="blog-sidebar__title">{isEn ? 'Categories' : 'Kategoriler'}</h3>
              </div>
              <div className="blog-sidebar__categories">
                {categories.map((cat) => {
                  const count = blogPosts.filter((p) =>
                    cat.key === 'karo-hali'
                      ? p.category === 'Karo Halı'
                      : p.category === 'Çim Halı'
                  ).length;
                  return (
                    <Link
                      key={cat.key}
                      to={`/blog?kategori=${cat.key}`}
                      className="blog-sidebar__category-item"
                      style={{ '--cat-color': cat.color } as React.CSSProperties}
                    >
                      <span className="blog-sidebar__cat-dot" />
                      <span className="blog-sidebar__cat-label">{cat.label}</span>
                      <span className="blog-sidebar__cat-count">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other Posts */}
            <div className="blog-sidebar__card">
              <div className="blog-sidebar__card-header">
                <span className="blog-sidebar__card-icon"><ChevronRight size={15} /></span>
                <h3 className="blog-sidebar__title">{isEn ? 'Other Articles' : 'Diğer Yazılarımız'}</h3>
              </div>
              <div className="blog-sidebar__posts">
                {otherPosts.map((p) => {
                  const pTitle = isEn ? p.titleEn : p.title;
                  const pCat = isEn ? p.categoryEn : p.category;
                  const pDate = new Date(p.date).toLocaleDateString(isEn ? 'en-GB' : 'tr-TR', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  });
                  return (
                    <Link key={p.id} to={`/blog/${p.slug}`} className="blog-sidebar__post-item">
                      <div className="blog-sidebar__post-img-wrap">
                        <img
                          src={p.image}
                          alt={pTitle}
                          className="blog-sidebar__post-img"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div className="blog-sidebar__post-body">
                        <span className="blog-sidebar__post-cat">{pCat}</span>
                        <p className="blog-sidebar__post-title">{pTitle}</p>
                        <span className="blog-sidebar__post-date">
                          <Calendar size={11} /> {pDate}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Quote CTA Banner */}
      <QuoteCtaBanner
        title={isEn ? 'Get a Quote for Your Project Related to This Topic!' : 'Okuduğunuz Konuyla İlgili Projeniz İçin Teklif Alın!'}
        subtitle={
          isEn
            ? 'Request project-specific discounted price quotes for carpet tiles, acoustic flooring, and artificial grass models mentioned in our guide.'
            : 'Rehberimizde incelediğiniz ürünler, akustik karo halılar ve çim halı modelleri için projenize özel indirimli fiyat teklifi isteyin.'
        }
      />
    </div>
  );
};

export default BlogDetail;
