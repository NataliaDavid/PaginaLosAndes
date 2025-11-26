const promos = [
  {
    title: 'Primera consulta gratuita',
    highlight: 'Valoración inicial',
    description:
      'La primera evaluación no tiene costo. Revisamos tu caso, solicitamos los exámenes necesarios y te damos un plan claro.',
  },
  {
    title: 'Radiografía $25.000 descontable',
    highlight: 'Diagnóstico',
    description:
      'La radiografía inicial tiene un valor de $25.000. Si inicias ortodoncia, ese valor se descuenta de tu plan.',
  },
  {
    title: '2x1 en brackets Mini Roth',
    highlight: 'Ortodoncia',
    description:
      'Promoción del plan Mini Roth: paga un tratamiento y el segundo es sin costo en la misma familia o pareja, según lo indicado en la página de Ortodoncia.',
  },
  {
    title: 'Retenedor sin costo por puntualidad ($350.000)',
    highlight: 'Seguimiento',
    description:
      'Asiste puntualmente a cada control de ortodoncia y el retenedor final (valor aprox. $350.000) se entrega sin costo al culminar tu tratamiento.',
  },
  {
    title: 'Limpieza dental gratis en odontología general',
    highlight: 'Higiene general',
    description: 'Si tu plan de odontología general suma más de $600.000, se obsequia la limpieza (valor aprox. $100.000).',
  },
  {
    title: 'Primera limpieza en ortodoncia al 50% ($100.000)',
    highlight: 'Higiene en brackets',
    description:
      'En ortodoncia puede requerirse más de una profilaxis. La primera tiene 50% de descuento (valor base $100.000) y se programa según tu caso.',
  },
];

const Promotions = () => (
  <section id="promociones" className="relative isolate overflow-hidden scroll-mt-8 bg-white py-12 md:py-16">
    <div id="descuentos" className="absolute -top-24 h-24 w-px" aria-hidden />
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
          Promociones
        </p>
        <h2
          className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Descuentos y beneficios activos
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Aprovecha las promociones vigentes en ortodoncia y diagnóstico. Agenda tu valoración para conocer el plan que mejor se adapte a
          tu caso.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {promos.map((promo) => (
          <article
            key={promo.title}
            className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-cyan-50/60 p-6 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_45px_110px_-50px_rgba(6,182,212,0.5)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-800">
                {promo.highlight}
              </span>
              <span className="text-xs font-semibold text-cyan-600 opacity-0 transition group-hover:opacity-100">Vigente</span>
            </div>
            <h3
              className="mt-4 text-lg font-semibold text-slate-950"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {promo.title}
            </h3>
            <p className="mt-2 text-sm text-slate-700">{promo.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">
          Agenda fácil por WhatsApp
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">
          Cupos sujetos a valoración
        </span>
      </div>
    </div>
  </section>
);

export default Promotions;
