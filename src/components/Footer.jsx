import { useEffect, useMemo, useState } from 'react';
import { fetchVisitStats } from '../utils/visitTracker';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const controller = new AbortController();

    const loadStats = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const data = await fetchVisitStats({ signal: controller.signal });
        setStats(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        setErrorMessage('No fue posible cargar las estadísticas. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadStats();

    return () => controller.abort();
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const formattedRoutes = useMemo(() => {
    if (!stats?.routes) {
      return [];
    }

    return Object.entries(stats.routes)
      .map(([route, value]) => ({
        route,
        value: Number(value) || 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [stats]);

  const numberFormatter = useMemo(() => new Intl.NumberFormat('es-CO'), []);

  const formatRouteLabel = (route) =>
    route
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');

  const expandedStyles = isExpanded ? 'max-h-[640px] mt-4' : 'max-h-0';

  return (
    <footer className="border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Consultorio Odontológico Los Andes - Cuidando sonrisas en Soacha
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <a
              href="#inicio"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 font-semibold uppercase tracking-[0.3em] text-cyan-600 shadow-sm transition hover:border-cyan-200 hover:text-cyan-700"
            >
              Volver arriba
            </a>
            <button
              type="button"
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50/70 px-4 py-2 font-semibold uppercase tracking-[0.3em] text-cyan-700 shadow-sm transition hover:border-cyan-200 hover:text-cyan-800"
            >
              {isExpanded ? 'Ocultar estadísticas' : 'Ver estadísticas'}
            </button>
          </div>
        </div>
        <div className={`overflow-hidden transition-[max-height] duration-500 ease-out ${expandedStyles}`}>
          <div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-6 text-slate-600 shadow-inner">
            {loading ? (
              <p className="text-center text-sm text-slate-500">Cargando estadísticas...</p>
            ) : errorMessage ? (
              <p className="text-center text-sm text-rose-500">{errorMessage}</p>
            ) : stats ? (
              <>
                <div className="flex flex-col gap-4 text-slate-700 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Visitas totales</p>
                    <p className="text-4xl font-semibold text-slate-900">
                      {numberFormatter.format(Number(stats.total) || 0)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    El conteo se actualiza automáticamente cada vez que se abre el inicio o el blog.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {formattedRoutes.length === 0 ? (
                    <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-3">
                      Aún no hay registros por ruta para mostrar.
                    </p>
                  ) : (
                    formattedRoutes.map(({ route, value }) => (
                      <div
                        key={route}
                        className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{formatRouteLabel(route)}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900">
                          {numberFormatter.format(value)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-slate-500">Activa el panel para ver las estadísticas.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
