import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import Seo from '../components/Seo';
import { BUSINESS_ID, OG_IMAGE_URL, SITE_URL, WEBSITE_ID } from '../utils/seo';
import { toIsoDate } from '../utils/dates';
import { scrollToHash } from '../utils/scroll';
import blogPosts from '../data/posts';
import { useVisitTracker } from '../utils/visitTracker';

const HIGHLIGHT_LIMIT = 3;
const HIGHLIGHT_CHAR_LIMIT = 160;
const DEFAULT_CATEGORY = 'Todos';
const CTA_INSERT_INTERVAL = 4;

const buildHighlights = (content = []) =>
  content
    .slice(0, HIGHLIGHT_LIMIT)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((text) => (text.length > HIGHLIGHT_CHAR_LIMIT ? `${text.slice(0, HIGHLIGHT_CHAR_LIMIT - 1)}…` : text));

const BLOGS_CANONICAL = `${SITE_URL}/blogs`;

const BLOG_STRUCTURED_DATA = [
  {
    id: 'ld-blog-collection',
    data: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BLOGS_CANONICAL}#collection`,
      url: BLOGS_CANONICAL,
      name: 'Blog Consultorio Odontológico Los Andes',
      description:
        'Artículos sobre odontología preventiva, ortodoncia, implantología, estética dental y bienestar bucal escritos por el Consultorio Odontológico Los Andes.',
      inLanguage: 'es-CO',
      isPartOf: {
        '@id': WEBSITE_ID,
      },
      mainEntity: {
        '@type': 'Blog',
        '@id': `${SITE_URL}/#blog`,
        name: 'Blog Consultorio Odontológico Los Andes',
        publisher: {
          '@id': BUSINESS_ID,
        },
        blogPost: blogPosts.map((post, index) => {
          const isoDate = toIsoDate(post.date);

          return {
            '@type': 'BlogPosting',
            '@id': `${SITE_URL}/blogs/${post.slug}`,
            url: `${SITE_URL}/blogs/${post.slug}`,
            position: index + 1,
            headline: post.title,
            description: post.excerpt,
            inLanguage: 'es-CO',
            ...(isoDate ? { datePublished: isoDate } : {}),
          };
        }),
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: BLOGS_CANONICAL,
          },
        ],
      },
      publisher: {
        '@id': BUSINESS_ID,
      },
    },
  },
];

const BlogIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useVisitTracker('blog');
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const handleContactNavigation = useCallback(() => {
    const targetHash = '#contacto';
    const rawSearch =
      (location.search && location.search !== '?' && location.search) ||
      (typeof window !== 'undefined' ? window.location.search : '');
    const search = rawSearch || '';
    const searchOptions = search ? { search } : {};

    if (location.pathname !== '/blogs') {
      navigate({ pathname: '/blogs', hash: targetHash, ...searchOptions });
      return;
    }

    if (location.hash !== targetHash) {
      navigate({ hash: targetHash, ...searchOptions });
      return;
    }

    scrollToHash(targetHash);
  }, [location.hash, location.pathname, location.search, navigate]);

  const categories = useMemo(() => {
    const unique = new Set(blogPosts.map((post) => post.category));
    return [DEFAULT_CATEGORY, ...Array.from(unique)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === DEFAULT_CATEGORY) {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const [featuredPost, ...otherPosts] = filteredPosts;
  const pageTitle = 'Blog odontológico | Consultorio Odontológico Los Andes';
  const pageDescription =
    'Recomendaciones clínicas, tendencias en odontología, casos reales y guías de autocuidado escritas por el Consultorio Odontológico Los Andes.';

  if (!featuredPost) {
    return (
      <div className="relative isolate overflow-hidden bg-white pb-24">
        <Seo
          title={pageTitle}
          description={pageDescription}
          canonical={BLOGS_CANONICAL}
          openGraph={{
            'og:title': pageTitle,
            'og:description': pageDescription,
            'og:url': BLOGS_CANONICAL,
            'og:type': 'website',
            'og:image': OG_IMAGE_URL,
          }}
          twitter={{
            'twitter:card': 'summary_large_image',
            'twitter:title': pageTitle,
            'twitter:description': pageDescription,
            'twitter:image': OG_IMAGE_URL,
          }}
          structuredData={BLOG_STRUCTURED_DATA}
        />
        <div className="absolute inset-x-0 top-0 -z-10 h-[320px] bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600" />
        <section className="max-w-4xl mx-auto px-6 pt-32 text-center text-white">
          <h1 className="text-4xl font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>
            No encontramos artículos en esta categoría
          </h1>
          <p className="mt-4 text-white/80">
            Prueba seleccionando otra especialidad o vuelve más tarde para descubrir nuevo contenido.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleContactNavigation}
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
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
        </section>
        <Contact />
      </div>
    );
  }

  const highlightItems = buildHighlights(featuredPost.content);

  return (
    <div className="relative isolate overflow-hidden bg-white pb-24">
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonical={BLOGS_CANONICAL}
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': BLOGS_CANONICAL,
          'og:type': 'website',
          'og:image': OG_IMAGE_URL,
        }}
        twitter={{
          'twitter:card': 'summary_large_image',
          'twitter:title': pageTitle,
          'twitter:description': pageDescription,
          'twitter:image': OG_IMAGE_URL,
        }}
        structuredData={BLOG_STRUCTURED_DATA}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600" />
      <section className="max-w-6xl mx-auto px-6 pt-28 text-white">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Blog Clínico
          </span>
          <h1
            className="text-4xl md:text-5xl font-semibold leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Historias que inspiran hábitos y confianza
          </h1>
          <p className="text-base md:text-lg text-white/80">
            Conecta con artículos desarrollados por nuestro equipo interdisciplinario. Encuentra guías prácticas, tendencias en tecnología odontológica y experiencias reales que te acompañan en cada decisión de bienestar bucal.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleContactNavigation}
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
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
        </div>
      </section>
      <section className="relative z-10 mt-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-slate-950/55 px-5 py-4 text-white shadow-[0_20px_45px_-30px_rgba(14,165,233,0.6)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Filtrar por especialidad</h2>
          <div className="w-full md:hidden">
            <label htmlFor="blog-category-filter" className="sr-only">
              Selecciona una categoría
            </label>
            <div className="relative">
              <select
                id="blog-category-filter"
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                className="w-full appearance-none rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition focus:border-white/70 focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {categories.map((category) => (
                  <option key={`mobile-${category}`} value={category} className="bg-slate-900 text-white">
                    {category}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/70">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m6 8 4 4 4-4" />
                </svg>
              </span>
            </div>
          </div>
          <div className="hidden flex-wrap gap-2 md:flex">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                    isActive
                      ? 'border-white bg-white/90 text-slate-900 shadow-sm'
                      : 'border-white/30 bg-white/10 text-white/80 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative z-10 mt-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-12">
          <article className="grid gap-10 overflow-hidden rounded-3xl border border-slate-100/60 bg-white/95 p-8 shadow-[0_45px_90px_-55px_rgba(15,23,42,0.45)] backdrop-blur md:grid-cols-2 md:p-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
                {featuredPost.category}
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold text-slate-950"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {featuredPost.title}
              </h2>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                {featuredPost.date} · {featuredPost.readTime}
              </p>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {featuredPost.excerpt}
              </p>
              <Link
                to={`/blogs/${featuredPost.slug}`}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Leer artículo destacado
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
              </Link>
            </div>
            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900/5 to-blue-900/10 p-6 text-slate-700">
              {highlightItems.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Ideas principales</h3>
                  <ul className="space-y-4 text-sm leading-relaxed md:text-base">
                    {highlightItems.map((highlight, index) => (
                      <li key={`${featuredPost.slug}-highlight-${index}`} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-cyan-500" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400">
                {featuredPost.readTime} · Redacción Los Andes
              </p>
            </div>
          </article>
          <div className="grid gap-8 md:grid-cols-2">
            {otherPosts.map((post, index) => (
              <Fragment key={post.slug}>
                <article
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white/95 p-8 shadow-[0_35px_80px_-60px_rgba(14,165,233,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_45px_110px_-50px_rgba(14,165,233,0.4)]"
                >
                  <div className="space-y-4">
                    <span className="inline-flex items-center rounded-full bg-cyan-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
                      {post.category}
                    </span>
                    <h3
                      className="text-2xl font-semibold text-slate-950"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                      {post.date} · {post.readTime}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" aria-hidden />
                      {post.readTime}
                    </span>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-2 text-cyan-600 transition-colors duration-200 hover:text-cyan-500"
                    >
                      Leer más
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
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  </div>
                </article>
                {(index + 1) % CTA_INSERT_INTERVAL === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-8 text-center text-slate-800 shadow-[0_40px_120px_-70px_rgba(14,165,233,0.7)] md:col-span-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">¿Listo para agendar?</p>
                    <p className="mt-3 text-base text-slate-600">
                      Nuestros especialistas pueden orientarte por WhatsApp o agendar tu valoración en minutos.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handleContactNavigation}
                        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <div className="relative z-10 mt-16 flex justify-center px-6">
        <button
          type="button"
          onClick={handleContactNavigation}
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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
      <Contact />
    </div>
  );
};

export default BlogIndex;
