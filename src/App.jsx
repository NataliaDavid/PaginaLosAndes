import { useEffect } from 'react';
import { Route, Routes, useLocation, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BlogIndex from './pages/BlogIndex';
import BlogArticle from './pages/BlogArticle';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import AgendaPage from './pages/AgendaPage';
import ContactPage from './pages/ContactPage';
import OrtodonciaPage from './pages/OrtodonciaPage';
import WhatsappRedirectPage from './pages/WhatsappRedirectPage';
import Seo from './components/Seo';
import { OG_IMAGE_URL, SITE_URL } from './utils/seo';
import { scrollToHash } from './utils/scroll';
import { useSessionDurationTracker } from './utils/visitTracker';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const { hash } = location;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let attempts = 0;

    const scrollWithRetry = () => {
      const success = scrollToHash(hash);
      if (!success && attempts < 25) {
        attempts += 1;
        window.setTimeout(scrollWithRetry, 80);
      }
    };

    scrollWithRetry();
  }, [location]);

  return null;
};

const SessionDurationTracker = () => {
  useSessionDurationTracker();
  return null;
};

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-white text-gray-900">
    <ScrollManager />
    <SessionDurationTracker />
    <NavBar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const NotFound = () => (
  <>
    <Seo
      title="Página no encontrada | Consultorio Odontológico Los Andes"
      description="La página que buscas ya no existe o fue movida. Vuelve al inicio para explorar servicios odontológicos, testimonios y artículos especializados."
      canonical={`${SITE_URL}/404`}
      robots="noindex,follow"
      openGraph={{
        'og:title': 'Página no encontrada | Consultorio Odontológico Los Andes',
        'og:description':
          'Vuelve al inicio del Consultorio Odontológico Los Andes para conocer servicios y artículos especializados.',
        'og:url': `${SITE_URL}/404`,
        'og:type': 'website',
        'og:image': OG_IMAGE_URL,
      }}
      twitter={{
        'twitter:card': 'summary_large_image',
        'twitter:title': 'Página no encontrada | Consultorio Odontológico Los Andes',
        'twitter:description':
          'Regresa al inicio y sigue explorando servicios odontológicos y artículos especializados.',
        'twitter:image': OG_IMAGE_URL,
      }}
    />
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center text-slate-600">
      <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
        Página no encontrada
      </span>
      <h1
        className="mt-6 text-4xl font-semibold text-slate-950"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        No pudimos encontrar lo que buscas
      </h1>
      <p className="mt-3 max-w-2xl text-base text-slate-500">
        Regresa al inicio para seguir explorando servicios, testimonios y artículos diseñados para tu bienestar.
      </p>
    </div>
  </>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="servicios" element={<ServicesPage />} />
      <Route path="ortodoncia" element={<OrtodonciaPage />} />
      <Route path="casos-de-exito" element={<SuccessStoriesPage />} />
      <Route path="agenda" element={<AgendaPage />} />
      <Route path="contacto" element={<ContactPage />} />
      <Route path="whatsapp" element={<WhatsappRedirectPage />} />
      <Route path="blogs" element={<BlogIndex />} />
      <Route path="blogs/:slug" element={<BlogArticle />} />
      <Route path="inicio" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
