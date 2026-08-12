import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types/blog';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { i18n, t } = useTranslation();
  const isEn = i18n.language === 'en';

  const title = isEn ? post.titleEn : post.title;
  const excerpt = isEn ? post.excerptEn : post.excerpt;
  const category = isEn ? post.categoryEn : post.category;

  const formattedDate = new Date(post.date).toLocaleDateString(
    isEn ? 'en-GB' : 'tr-TR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link to={`/blog/${post.slug}`} className="blog-card card" id={`blog-${post.id}`}>
      <div className="blog-card__image-wrap">
        <img
          src={post.image}
          alt={title}
          className="blog-card__image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            (e.currentTarget.nextSibling as HTMLElement)?.removeAttribute('style');
          }}
        />
        <div className="blog-card__img-placeholder" aria-hidden="true">
          <div className="blog-card__img-gradient" />
        </div>
        <span className="blog-card__category badge badge-primary">{category}</span>
      </div>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__meta-item">
            <Calendar size={13} />
            {formattedDate}
          </span>
          <span className="blog-card__meta-item">
            <Clock size={13} />
            {post.readTime} {t('blog.readTime')}
          </span>
        </div>
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__excerpt">{excerpt}</p>
        <span className="blog-card__link">
          {t('blog.readMore')} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
