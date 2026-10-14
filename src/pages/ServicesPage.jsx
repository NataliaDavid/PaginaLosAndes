import Contact from '../components/Contact';
import Services from '../components/Services';
import Seo from '../components/Seo';
import { OG_IMAGE_URL, SITE_URL } from '../utils/seo';
import { Link } from 'react-router-dom';

const CTAButton = () => (
  <div className="mt-8 flex justify-center">
    <a
      href="#contacto"
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
    </a>
  </div>
);

const ServicesPage = () => {
  const title = 'Servicios odontológicos integrales en Soacha | Consultorio Los Andes';
  const description =
    'Explora nuestros tratamientos en odontología general, ortodoncia, implantología y estética dental con acompañamiento especializado en Soacha.';
  const canonical = `${SITE_URL}/servicios`;

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
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Servicios
          </span>
          <h1
            className="mt-6 text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Tratamientos integrales para cada etapa de tu sonrisa
          </h1>
          <CTAButton />
        </div>
      </section>
      <Services />
      <section className="bg-slate-50 px-6 py-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 rounded-3xl border border-slate-100 bg-white p-7 shadow-sm md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">Cuidado integral</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Conoce otros servicios de salud</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Encuentra recursos que complementan el cuidado de tu sonrisa y tu bienestar general.</p>
          </div>
          <Link to="/otros-servicios" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 transition hover:text-cyan-600">
            Ver otros servicios <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default ServicesPage;
