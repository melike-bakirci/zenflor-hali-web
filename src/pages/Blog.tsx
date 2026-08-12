import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import BlogCard from '../components/ui/BlogCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="blog page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <Breadcrumb
              items={[
                { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
                { label: t('nav.blog') },
              ]}
            />
            <h1 className="page-hero__title font-display">{t('blog.title')}</h1>
            <p className="page-hero__subtitle">{t('blog.subtitle')}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            title={isEn ? 'Latest Posts' : 'Son Yazılar'}
          />
          <div className="grid-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
