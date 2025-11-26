import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logoblanco.png';
import { scrollToHash } from '../utils/scroll';

const sectionLinks = [
  { label: 'Promociones', hash: '#promociones' },
  { label: 'Servicios', hash: '#servicios' },
  { label: 'Galería', hash: '#galeria' },
  { label: 'Nosotros', hash: '#nosotros' },
  { label: 'Contacto', hash: '#contacto' },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHash = (hash) => {
    const formattedHash = hash.startsWith('#') ? hash : `#${hash}`;
    setIsMenuOpen(false);
    const rawSearch =
      (location.search && location.search !== '?' && location.search) ||
      (typeof window !== 'undefined' ? window.location.search : '');
    const search = rawSearch || '';
    const searchOptions = search ? { search } : {};

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: formattedHash, ...searchOptions });
      return;
    }

    if (location.hash !== formattedHash) {
      navigate({ hash: formattedHash, ...searchOptions });
    } else {
      scrollToHash(formattedHash);
    }
  };

  const navigateToPath = (path) => {
    setIsMenuOpen(false);
    const rawSearch =
      (location.search && location.search !== '?' && location.search) ||
      (typeof window !== 'undefined' ? window.location.search : '');
    const search = rawSearch || '';
    const searchOptions = search ? { search } : {};
    navigate({ pathname: path, ...searchOptions });
  };

  return (
    <header className="sticky top-0 z-[60] bg-gradient-to-l from-slate-950 via-blue-900 to-cyan-500 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={() => navigateToPath('/')}
          className="flex items-center gap-4 text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          <img
            src={logo}
            alt="Logo Consultorio Los Andes"
            className="w-36 md:w-44 drop-shadow-[0_15px_25px_rgba(6,11,40,0.55)]"
          />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          <button
            type="button"
            onClick={() => navigateToPath('/ortodoncia')}
            className="transition-all duration-200 hover:text-white hover:drop-shadow-[0_2px_6px_rgba(6,182,212,0.5)]"
          >
            Ortodoncia
          </button>

          {sectionLinks.map((item) => (
            <button
              key={item.hash}
              type="button"
              onClick={() => navigateToHash(item.hash)}
              className="transition-all duration-200 hover:text-white hover:drop-shadow-[0_2px_6px_rgba(6,182,212,0.5)]"
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => navigateToPath('/blogs')}
            className="transition-all duration-200 hover:text-white hover:drop-shadow-[0_2px_6px_rgba(6,182,212,0.5)]"
          >
            Blog
          </button>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateToHash('#contacto')}
            className="hidden md:inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
          >
            Reservar cita
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
            aria-label="Abrir menú"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-[55] bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-0 z-[60] flex h-full w-72 flex-col bg-white px-6 py-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Menú</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-600"
                aria-label="Cerrar menú"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-3 text-slate-700">
              <button
                type="button"
                onClick={() => navigateToPath('/ortodoncia')}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition hover:border-cyan-300 hover:text-cyan-600"
              >
                Ortodoncia
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {sectionLinks.map((item) => (
                <button
                  key={item.hash}
                  type="button"
                  onClick={() => navigateToHash(item.hash)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition hover:border-cyan-300 hover:text-cyan-600"
                >
                  {item.label}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}

              <button
                type="button"
                onClick={() => navigateToPath('/blogs')}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition hover:border-cyan-300 hover:text-cyan-600"
              >
                Blog
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </nav>
            <button
              type="button"
              onClick={() => navigateToHash('#contacto')}
              className="mt-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:shadow-xl"
            >
              Reservar cita
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
