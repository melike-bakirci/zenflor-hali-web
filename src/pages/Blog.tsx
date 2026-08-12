import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import BlogCard from '../components/ui/BlogCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { blogPosts } from '../data/blogPosts';
import usePageMeta from '../utils/usePageMeta';
import './Blog.css';

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  usePageMeta({
    title: isEn ? 'Blog & News' : 'Blog & İçerikler',
    description: isEn
      ? 'Read news, guides, and practical tips about carpet tiles, artificial grass, and interior floor design.'
      : 'Karo halı, çim halı, zemin kaplama uygulamaları ve dekorasyon dünyasından güncel haberler ve rehberler.',
  });

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === 'karo-hali') {
      return post.category === 'Karo Halı';
    }
    if (selectedCategory === 'cim-hali') {
      return post.category === 'Çim Halı';
    }
    return true;
  });

  return (
    <div className="blog page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">{t('blog.title')}</h1>
            <p className="page-hero__subtitle">{t('blog.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
            { label: t('nav.blog') },
          ]}
        />
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            title={isEn ? 'Latest Posts' : 'Son Yazılar'}
          />

          <div className="blog-category-tabs">
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              {isEn ? 'All' : 'Tümü'}
            </button>
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === 'karo-hali' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('karo-hali')}
            >
              {isEn ? 'Carpet Tiles' : 'Karo Halı'}
            </button>
            <button
              type="button"
              className={`blog-category-tab ${selectedCategory === 'cim-hali' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cim-hali')}
            >
              {isEn ? 'Artificial Grass' : 'Çim Halı'}
            </button>
          </div>

          <div className="grid-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
