import { useEffect } from 'react';
import Seo from '../components/Seo';
import { OG_IMAGE_URL, SITE_URL } from '../utils/seo';
import { WHATSAPP_URL } from '../utils/whatsapp';

const WhatsappRedirectPage = () => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.replace(WHATSAPP_URL);
    }, 15000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const pageTitle = 'Estamos redirigiendo tu solicitud a WhatsApp';
  const pageDescription = 'Un momento por favor, estamos dirigiéndote al chat de WhatsApp de Consultorio Odontológico Los Andes.';
  const canonical = `${SITE_URL}/whatsapp`;

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        robots="noindex,follow"
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': canonical,
          'og:image': OG_IMAGE_URL,
          'og:type': 'website',
        }}
        twitter={{
          'twitter:card': 'summary_large_image',
          'twitter:title': pageTitle,
          'twitter:description': pageDescription,
          'twitter:image': OG_IMAGE_URL,
        }}
      />
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-white to-cyan-50 px-6 text-center text-slate-600">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white/90 p-8 shadow-[0_45px_90px_-55px_rgba(15,23,42,0.3)] ring-1 ring-white/60">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
            WhatsApp
          </span>
          <h1
            className="mt-6 text-3xl font-semibold text-slate-950"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Estamos abriendo tu chat
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Espera unos segundos mientras te redirigimos al WhatsApp oficial del consultorio. Si no ocurre automáticamente, usa el botón para continuar.
          </p>
          <a
            href={WHATSAPP_URL}
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Abrir WhatsApp ahora
          </a>
        </div>
      </section>
    </>
  );
};

export default WhatsappRedirectPage;
