import { Link, useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Seo from '../components/Seo';
import { BUSINESS_ID, OG_IMAGE_URL, SITE_URL, WEBSITE_ID } from '../utils/seo';
import { toIsoDate } from '../utils/dates';
import blogPosts from '../data/posts';
import { useRouteDurationTracker, useVisitTracker } from '../utils/visitTracker';

const BlogArticle = () => {
  const { slug } = useParams();
  const trackerRoute = slug ? `blog/${slug}` : null;
  useVisitTracker(trackerRoute);
  useRouteDurationTracker(trackerRoute);
  const post = blogPosts.find((entry) => entry.slug === slug);
  const relatedPosts = blogPosts.filter((entry) => entry.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="relative isolate overflow-hidden bg-white py-32">
        <Seo
          title="Artículo no encontrado | Blog Consultorio Odontológico Los Andes"
          description="Lo sentimos, el artículo que buscas ya no está disponible. Explora el blog del Consultorio Odontológico Los Andes para encontrar contenido actualizado."
          canonical={`${SITE_URL}/blogs/${slug ?? ''}`}
          robots="noindex,nofollow"
          openGraph={{
            'og:title': 'Artículo no encontrado | Blog Consultorio Odontológico Los Andes',
            'og:description':
              'El artículo solicitado ya no está disponible. Descubre más guías y casos clínicos en nuestro blog.',
            'og:url': `${SITE_URL}/blogs/${slug ?? ''}`,
            'og:type': 'website',
            'og:image': OG_IMAGE_URL,
          }}
          twitter={{
            'twitter:card': 'summary_large_image',
            'twitter:title': 'Artículo no encontrado | Blog Consultorio Odontológico Los Andes',
            'twitter:description':
              'Encuentra nuevos artículos y guías en el blog del Consultorio Odontológico Los Andes.',
            'twitter:image': OG_IMAGE_URL,
          }}
        />
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600" />
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Blog Clínico
          </span>
          <h1
            className="mt-6 text-4xl font-semibold leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            No encontramos el artículo que buscas
          </h1>
          <p className="mt-4 text-base text-white/80">
            Tal vez fue renombrado o la dirección cambió. Regresa al portal del blog para descubrir las últimas publicaciones.
          </p>
          <Link
            to="/blogs"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Ir al blog
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
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}/blogs/${post.slug}`;
  const isoDate = toIsoDate(post.date);
  const wordCount = post.content.join(' ').split(/\s+/).filter(Boolean).length;
  const articleTitle = `${post.title} | Blog Consultorio Odontológico Los Andes`;
  const articleStructuredData = [
    {
      id: `ld-blog-${post.slug}`,
      data: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': canonicalUrl,
        url: canonicalUrl,
        headline: post.title,
        description: post.excerpt,
        articleSection: post.category,
        inLanguage: 'es-CO',
        mainEntityOfPage: {
          '@id': canonicalUrl,
        },
        isPartOf: {
          '@id': WEBSITE_ID,
        },
        publisher: {
          '@id': BUSINESS_ID,
        },
        author: {
          '@type': 'Organization',
          '@id': BUSINESS_ID,
          name: 'Consultorio Odontológico Los Andes',
        },
        image: OG_IMAGE_URL,
        wordCount,
        ...(isoDate
          ? {
              datePublished: isoDate,
              dateModified: isoDate,
            }
          : {}),
      },
    },
  ];

  return (
    <article className="relative isolate overflow-hidden bg-white pb-24">
      <Seo
        title={articleTitle}
        description={post.excerpt}
        canonical={canonicalUrl}
        openGraph={{
          'og:title': articleTitle,
          'og:description': post.excerpt,
          'og:url': canonicalUrl,
          'og:type': 'article',
          ...(isoDate ? { 'article:published_time': isoDate } : {}),
          'article:section': post.category,
          'og:image': OG_IMAGE_URL,
        }}
        twitter={{
          'twitter:card': 'summary_large_image',
          'twitter:title': articleTitle,
          'twitter:description': post.excerpt,
          'twitter:image': OG_IMAGE_URL,
        }}
        structuredData={articleStructuredData}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600" />
      <header className="max-w-4xl mx-auto px-6 pt-28 text-white">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-white/80 transition-colors duration-200 hover:text-white"
          >
            Blog
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
          <span className="text-white/40">/</span>
          <span>{post.category}</span>
        </div>
        <h1
          className="mt-6 text-4xl md:text-5xl font-semibold leading-tight"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/80">{post.excerpt}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">
          {post.date} · {post.readTime} · Redacción Los Andes
        </p>
      </header>
      <div className="relative z-10 mt-16 max-w-4xl mx-auto px-6">
        <div className="rounded-3xl bg-white p-8 shadow-[0_45px_90px_-55px_rgba(15,23,42,0.45)] ring-1 ring-slate-100/70 md:p-12">
          <div className="space-y-6 text-base leading-relaxed text-slate-700 md:text-lg md:leading-[1.9]">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      {relatedPosts.length > 0 && (
        <section className="relative z-10 mt-20 max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
                También puede interesarte
              </span>
              <h2
                className="text-3xl font-semibold text-slate-950"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Continúa explorando el conocimiento clínico
              </h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 transition-colors duration-200 hover:text-cyan-600"
            >
              Ver todos los artículos
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
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <article
                key={related.slug}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-[0_35px_90px_-60px_rgba(56,189,248,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_45px_110px_-55px_rgba(14,116,144,0.5)]"
              >
                <div className="space-y-4">
                  <span className="inline-flex items-center rounded-full bg-cyan-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
                    {related.category}
                  </span>
                  <h3
                    className="text-xl font-semibold text-slate-950"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {related.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{related.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
                    {related.readTime}
                  </span>
                  <Link
                    to={`/blogs/${related.slug}`}
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
            ))}
          </div>
        </section>
      )}
      <Contact />
    </article>
  );
};

export default BlogArticle;
