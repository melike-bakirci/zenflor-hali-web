import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageLoader from './components/ui/PageLoader';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const KaroHali = lazy(() => import('./pages/KaroHali'));
const KaroHaliDetail = lazy(() => import('./pages/KaroHaliDetail'));
const CimHali = lazy(() => import('./pages/CimHali'));
const CimHaliDetail = lazy(() => import('./pages/CimHaliDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const References = lazy(() => import('./pages/References'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/karo-hali" element={<KaroHali />} />
            <Route path="/karo-hali/:slug" element={<KaroHaliDetail />} />
            <Route path="/cim-hali" element={<CimHali />} />
            <Route path="/cim-hali/:slug" element={<CimHaliDetail />} />
            <Route path="/referanslar" element={<References />} />
            <Route path="/referanslarimiz" element={<References />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/gizlilik" element={<Legal defaultTab="privacy" />} />
            <Route path="/kosullar" element={<Legal defaultTab="terms" />} />
            <Route path="/kvkk" element={<Legal defaultTab="kvkk" />} />
            <Route path="/cerez-politikasi" element={<Legal defaultTab="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

