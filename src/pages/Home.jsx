import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';
import BlogSection from '../components/BlogSection';
import Promotions from '../components/Promotions';
import Seo from '../components/Seo';
import { BUSINESS_ID, OG_IMAGE_URL, SITE_URL, WEBSITE_ID } from '../utils/seo';
import { getCampaignContent, resolveCampaignKey } from '../utils/campaigns';
import { scrollToHash } from '../utils/scroll';
import { useRouteDurationTracker, useVisitTracker } from '../utils/visitTracker';

const SectionCta = ({ onNavigate }) => (
  <div className="flex justify-center px-6 py-6">
    <button
      type="button"
      onClick={onNavigate}
      className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      Agenda y contacto
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

const HOME_CANONICAL = `${SITE_URL}/`;

const Home = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  useVisitTracker('inicio');
  useRouteDurationTracker('inicio');
  const mergedSearchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (typeof window !== 'undefined') {
      const browserSearch = window.location.search;
      if (browserSearch) {
        const globalParams = new URLSearchParams(browserSearch);
        globalParams.forEach((value, key) => {
          params.set(key, value);
        });
      }

      const hash = window.location.hash || '';
      const hashQueryIndex = hash.indexOf('?');
      if (hashQueryIndex !== -1) {
        const hashParams = new URLSearchParams(hash.slice(hashQueryIndex + 1));
        hashParams.forEach((value, key) => {
          params.set(key, value);
        });
      }
    }

    searchParams.forEach((value, key) => {
      params.set(key, value);
    });

    return params;
  }, [searchParams]);

  const campaignKey = resolveCampaignKey(mergedSearchParams);
  const campaignContent = getCampaignContent(campaignKey);
  const [serviceModalRequest, setServiceModalRequest] = useState(null);

  useEffect(() => {
    setServiceModalRequest(null);
  }, [campaignKey]);

  const handleServiceModalRequest = useCallback((serviceKey) => {
    if (!serviceKey) {
      return;
    }
    setServiceModalRequest({ key: serviceKey, nonce: Date.now() });
  }, []);

  const handleContactNavigation = useCallback(() => {
    const targetHash = '#contacto';
    const rawSearch =
      (location.search && location.search !== '?' && location.search) ||
      (typeof window !== 'undefined' ? window.location.search : '');
    const search = rawSearch || '';
    const searchOptions = search ? { search } : {};

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: targetHash, ...searchOptions });
      return;
    }

    if (location.hash !== targetHash) {
      navigate({ hash: targetHash, ...searchOptions });
      return;
    }

    scrollToHash(targetHash);
  }, [location.hash, location.pathname, location.search, navigate]);

  const pageTitle = campaignContent.seo.title;
  const pageDescription = campaignContent.seo.description;

  const structuredData = useMemo(
    () => [
      {
        id: 'ld-home-webpage',
        data: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${HOME_CANONICAL}#webpage`,
          url: HOME_CANONICAL,
          name: 'Consultorio Odontológico Los Andes | Soacha',
          inLanguage: 'es-CO',
          isPartOf: {
            '@id': WEBSITE_ID,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: OG_IMAGE_URL,
          },
          description: pageDescription,
          about: [
            { '@type': 'MedicalSpecialty', name: 'Odontología general' },
            { '@type': 'MedicalSpecialty', name: 'Ortodoncia' },
            { '@type': 'MedicalSpecialty', name: 'Implantología dental' },
            { '@type': 'MedicalSpecialty', name: 'Estética dental' },
          ],
          mainEntity: {
            '@id': BUSINESS_ID,
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: HOME_CANONICAL,
              },
            ],
          },
          publisher: {
            '@id': BUSINESS_ID,
          },
        },
      },
    ],
    [pageDescription],
  );

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonical={HOME_CANONICAL}
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': HOME_CANONICAL,
          'og:image': campaignContent.seo.ogImage,
          'og:type': 'website',
        }}
        twitter={{
          'twitter:card': 'summary_large_image',
          'twitter:title': pageTitle,
          'twitter:description': pageDescription,
          'twitter:image': campaignContent.seo.ogImage,
        }}
        structuredData={structuredData}
      />
      <Hero campaignKey={campaignKey} onServiceModalRequest={handleServiceModalRequest} />
      <SectionCta onNavigate={handleContactNavigation} />
      <Services highlightRequest={serviceModalRequest} />
      <Promotions />
      <SectionCta onNavigate={handleContactNavigation} />
      <Gallery />
      <SectionCta onNavigate={handleContactNavigation} />
      <About />
      <SectionCta onNavigate={handleContactNavigation} />
      <Contact />
      <SectionCta onNavigate={handleContactNavigation} />
      <BlogSection />
    </>
  );
};

export default Home;
