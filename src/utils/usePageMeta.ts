import { useEffect } from 'react';

interface PageMetaOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

const DEFAULT_TITLE = 'Zenflor - Karo Halı ve Çim Halı Çözümleri';
const DEFAULT_DESC = 'Karo halı ve çim halı alanında kaliteli, estetik ve kurumsal zemin kaplama çözümleri.';

export const usePageMeta = ({ title, description, canonicalUrl }: PageMetaOptions = {}) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title ? `${title} | Zenflor` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to set meta content
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Meta Description
    const metaDesc = description || DEFAULT_DESC;
    setMetaTag('meta[name="description"]', 'name', 'description', metaDesc);

    // 3. Update OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDesc);

    // 4. Update Canonical Link
    const currentUrl = canonicalUrl || (window.location.origin + window.location.pathname);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 5. Update OpenGraph URL
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
  }, [title, description, canonicalUrl]);
};

export default usePageMeta;
