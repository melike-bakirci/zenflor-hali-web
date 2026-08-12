import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { blogPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import ShareButtons from '../components/ui/ShareButtons';
import usePageMeta from '../utils/usePageMeta';
import './BlogDetail.css';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const post = blogPosts.find((p) => p.slug === slug);
  const title = post ? (isEn ? post.titleEn : post.title) : '';
  const excerpt = post ? (isEn ? post.excerptEn || post.excerpt : post.excerpt) : '';

  usePageMeta({
    title: post ? `${title} | Blog` : 'Blog',
    description: excerpt,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const content = isEn ? post.contentEn : post.content;
  const category = isEn ? post.categoryEn : post.category;

  const formattedDate = new Date(post.date).toLocaleDateString(
    isEn ? 'en-GB' : 'tr-TR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="blog-detail page-enter">
      <div className="container blog-detail__container">
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

          <div className="blog-detail__image-wrap">
            <img
              src={post.image}
              alt={title}
              className="blog-detail__image"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div className="blog-detail__content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="blog-detail__tags">
              <span className="blog-detail__tags-label">{isEn ? 'Tags:' : 'Etiketler:'}</span>
              <div className="blog-detail__tags-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-detail__tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <ShareButtons title={title} type="blog" />

          <div className="blog-detail__footer">
            <Link to="/blog" className="btn btn-outline">
              <ArrowLeft size={16} /> {t('blog.backToBlog')}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
