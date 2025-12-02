import Contact from '../components/Contact';
import Seo from '../components/Seo';
import { OG_IMAGE_URL, SITE_URL } from '../utils/seo';
import { useVisitTracker } from '../utils/visitTracker';
import placeholder43 from '../assets/placeholder-4x3.svg';
import plan1Img from '../assets/ortodoncia/plan1.JPG';
import plan2Img from '../assets/ortodoncia/plan2.JPG';
import plan3Img from '../assets/ortodoncia/plan3.JPG';
import plan4Img from '../assets/ortodoncia/plan4.JPG';
import plan5Img from '../assets/ortodoncia/plan5.PNG';

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

const plans = [
  {
    title: 'Plan 1. Clásico y Efectivo (Mini Roth)',
    controls: ['18 controles aprox.', '21 controles aprox.'],
    desc:
      'Sistema de brackets metálicos Mini Roth, ideal para correcciones confiables y progresivas con alta eficiencia clínica.',
    image: plan1Img,
  },
  {
    title: 'Plan 2. Precisión y Confort (MBT)',
    controls: ['18 controles aprox.'],
    desc:
      'Técnica MBT enfocada en precisión del posicionamiento dental y confort durante el tratamiento con fuerzas controladas.',
    image: plan2Img,
  },
  {
    title: 'Plan 3. Promoción Especial (2x1 Mini Roth)',
    controls: ['18 controles aprox.'],
    desc:
      'Aprovecha una promoción pensada para familias o parejas con brackets Mini Roth: resultados consistentes y económicos.',
    image: plan3Img,
  },
  {
    title: 'Plan 4. Alta Tecnología (Autoligado)',
    controls: ['16 controles aprox.'],
    desc:
      'Brackets de autoligado que reducen fricción, facilitan la higiene y pueden requerir menos ajustes durante el proceso.',
    image: plan4Img,
  },
  {
    title: 'Plan 5. Ortodoncia Avanzada (MBT Integral)',
    controls: ['18 controles aprox.'],
    desc:
      'Enfoque integral con técnica MBT, orientado a casos complejos que requieren mayor control tridimensional de las piezas.',
    image: plan5Img,
  },
];

const OrtodonciaPage = () => {
  const title = 'Ortodoncia en Soacha: planes y tipos de brackets | Consultorio Los Andes';
  const description =
    'Conoce nuestros planes de ortodoncia (Mini Roth, MBT y Autoligado) con explicaciones breves, número de controles aproximados y opciones promocionales.';
  const canonical = `${SITE_URL}/ortodoncia`;
  useVisitTracker('ortodoncia');

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

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-500 py-16 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Ortodoncia
          </span>
          <h1
            className="mt-6 text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Planes de ortodoncia y tipos de brackets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-cyan-100/90">
            Diseñados para diferentes necesidades: desde opciones clásicas y efectivas hasta sistemas de autoligado con mayor confort.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* Plans */}
      <section className="bg-white py-12 text-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-semibold text-slate-950"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Nuestros planes de tratamiento
          </h2>
          <p className="mt-3 max-w-3xl text-sm">
            A continuación encontrarás una descripción breve de cada plan, el tipo de bracket, y el número de controles aproximados.
            Las imágenes son referenciales y podrás reemplazarlas por fotografías reales de tus tratamientos.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.6)] ring-1 ring-slate-100 transition hover:shadow-[0_45px_100px_-45px_rgba(6,182,212,0.45)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  <img
                    src={plan.image || placeholder43}
                    alt={`Imagen referencial de ${plan.title}`}
                    className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3
                    className="text-lg font-semibold text-slate-950"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {plan.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{plan.desc}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-700">
                    {plan.controls.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-cyan-500" aria-hidden />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 transition hover:border-cyan-300 hover:text-cyan-800"
                    >
                      Consultar disponibilidad
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Promociones y beneficios */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600 py-12 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
              Promociones
            </p>
            <h2
              className="mt-3 text-3xl font-semibold text-white md:text-4xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Descuentos y beneficios en ortodoncia
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-cyan-100/90">
              Aplica para tratamientos en Soacha. La primera consulta es gratuita y los valores de radiografías, retenedores y limpieza
              final se reconocen o se obsequian según tu plan y puntualidad.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-3xl bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Valoración inicial</span>
              <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Primera consulta gratuita
              </h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                Evaluación diagnóstica sin costo. Revisamos tus exámenes, explicamos opciones y armamos tu plan de ortodoncia.
              </p>
            </article>

            <article className="rounded-3xl bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Diagnóstico</span>
              <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Radiografía $25.000 descontable
              </h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                La radiografía tiene un valor de $25.000. Si continúas con ortodoncia u otros servicios, se descuenta de tu tratamiento.
              </p>
            </article>

            <article className="rounded-3xl bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Plan Mini Roth</span>
              <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                2x1 en brackets Mini Roth
              </h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                Promoción del plan Mini Roth: paga un tratamiento y el segundo es sin costo para un familiar o pareja, según disponibilidad.
              </p>
            </article>

            <article className="rounded-3xl bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Retención</span>
              <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Retenedor sin costo por puntualidad ($350.000)
              </h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                Asiste puntualmente a cada control y el retenedor final (valor aprox. $350.000) se entrega sin costo al culminar tu
                tratamiento.
              </p>
            </article>

            <article className="rounded-3xl bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Higiene con brackets</span>
              <h3 className="mt-3 text-lg font-semibold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Primera limpieza de ortodoncia al 50% ($100.000)
              </h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                En ortodoncia pueden requerirse varias profilaxis. La primera se realiza con 50% de descuento (valor base $100.000) y se
                programa según tu evolución.
              </p>
            </article>
          </div>

          <div className="mt-8">
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 shadow-lg transition hover:-translate-y-0.5"
            >
              Agendar valoración sin costo
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
        </div>
      </section>

      {/* Agenda breve */}
      <section className="bg-white py-6 text-slate-700">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: '"Playfair Display", serif' }}>
            ¿Cómo agendar tu Ortodoncia?
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-cyan-500" aria-hidden />
              <span>Escríbenos por WhatsApp, cuéntanos tu caso y envíanos fotos si las tienes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-cyan-500" aria-hidden />
              <span>Te orientamos y coordinamos fecha y hora de tu valoración o control.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-cyan-500" aria-hidden />
              <span>Trae tus exámenes o radiografías recientes para agilizar el diagnóstico.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Agenda y contacto */}
      <Contact />
    </>
  );
};

export default OrtodonciaPage;
