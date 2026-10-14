import Contact from '../components/Contact';
import Seo from '../components/Seo';
import { OG_IMAGE_URL, SITE_URL } from '../utils/seo';

const OtherServicesPage = () => {
  const title = 'Otros servicios de salud | Consultorio Odontológico Los Andes';
  const description =
    'Conoce aliados de salud que complementan el cuidado odontológico del Consultorio Odontológico Los Andes.';
  const canonical = `${SITE_URL}/otros-servicios`;

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          'og:title': title,
          'og:description': description,
          'og:url': canonical,
          'og:image': OG_IMAGE_URL,
          'og:type': 'website',
        }}
        twitter={{
          'twitter:card': 'summary_large_image',
          'twitter:title': title,
          'twitter:description': description,
          'twitter:image': OG_IMAGE_URL,
        }}
      />
      <section className="bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-500 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Otros servicios
          </span>
          <h1 className="mt-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: '"Playfair Display", serif' }}>
            Cuidado integral, más allá de tu sonrisa
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            La salud oral hace parte del bienestar general. Por eso compartimos recursos de profesionales que pueden complementar tu cuidado.
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white py-16 md:py-20">
        <div className="absolute right-0 top-12 -z-10 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6">
          <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_35px_90px_-55px_rgba(14,116,144,0.5)] md:p-12">
            <span className="inline-flex rounded-full bg-cyan-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">
              Endocrinología
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-950 md:text-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Endomédicos
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Atención endocrinológica para personas que buscan orientación en diabetes, tiroides, obesidad, menopausia, osteoporosis y otros trastornos hormonales. Un acompañamiento oportuno puede complementar los hábitos de cuidado oral y general.
            </p>
            <a
              href="https://agenda-tu-cita.endomedicos.com"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Conoce Endomédicos
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </article>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default OtherServicesPage;
