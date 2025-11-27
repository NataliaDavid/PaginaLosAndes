import { Link } from 'react-router-dom';
import whatsappIcon from '../assets/whatsapp.webp';
import { WHATSAPP_PHONE_LINK, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

const address = 'Carrera 7 #16-92, Segundo Piso, San Luis, Soacha, Cundinamarca';

const Contact = () => (
  <section id="contacto" className="relative isolate overflow-hidden scroll-mt-8 py-8">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-slate-50" />
    <div className="absolute right-10 top-10 h-48 w-48 rounded-full bg-cyan-200/25 blur-3xl" />
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col gap-4 text-center md:text-left">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 shadow-sm ring-1 ring-cyan-100 md:mx-0">
          Agenda y contacto
        </span>
        <h2
          className="text-3xl md:text-4xl font-semibold text-slate-950"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Agenda una cita o escríbenos para resolver tus dudas
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="w-full space-y-6 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.5)] ring-1 ring-white/70">
          <Link
            to="/whatsapp"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
            <span>Agenda por WhatsApp</span>
          </Link>
          <ul className="space-y-4 text-left text-sm text-slate-600">
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Dirección</span>
              <span className="mt-1 block text-base font-medium text-slate-900">{address}</span>
            </li>
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Teléfono directo</span>
              <a className="mt-1 inline-block text-base font-medium text-cyan-600 hover:underline" href={WHATSAPP_PHONE_LINK}>
                {WHATSAPP_DISPLAY_PHONE}
              </a>
            </li>
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Correo electrónico</span>
              <a
                className="mt-1 inline-block w-full break-words text-base font-medium text-cyan-600 hover:underline"
                href="mailto:losandesodontologiasoacha@gmail.com"
              >
                losandesodontologiasoacha@gmail.com
              </a>
            </li>
          </ul>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Respuesta dentro del horario de atención.
          </p>
        </div>
        <div className="w-full space-y-6 rounded-3xl bg-white/95 p-6 sm:p-8 lg:p-10 shadow-[0_35px_90px_-45px_rgba(15,23,42,0.6)] ring-1 ring-white/70">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600">
            Horarios de atención
          </span>
          <h3 className="text-2xl font-semibold text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>
            Organiza tu visita con anticipación
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
              <span className="font-semibold text-slate-900">Lunes a viernes</span>
              <span>8:40 a.m. - 6:00 p.m.</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
              <span className="font-semibold text-slate-900">Sábados</span>
              <span>8:40 a.m. - 5:00 p.m.</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
              <span className="font-semibold text-slate-900">Domingos y festivos</span>
              <span>Cerrado</span>
            </li>
          </ul>
          <p className="text-sm text-slate-500">
            Agenda con anticipación para asignarte el turno que mejor se ajuste a tu disponibilidad. Confirmamos cada cita por WhatsApp.
          </p>
        </div>
      </div>
      
      <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_40px_100px_-60px_rgba(15,23,42,0.55)]">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-end bg-gradient-to-t from-white/5 via-transparent to-transparent p-4">
            <a
              href="https://www.waze.com/ul?ll=4.58240%2C-74.21585&navigate=yes"
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 shadow-sm transition hover:border-cyan-200 hover:text-cyan-800"
            >
              Abrir en Waze
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>
          <iframe
            title="Mapa Consultorio Odontológico Los Andes"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.909529048087!2d-74.21598!3d4.58253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9fd7b20ef891%3A0x44b95b601a2f2244!2sCra.%207%20%2316-92%2C%20San%20Luis%2C%20Soacha%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1700000000000"
            className="h-80 w-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
