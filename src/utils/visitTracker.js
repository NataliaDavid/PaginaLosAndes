import { useEffect, useRef } from 'react';

const sentRoutes = new Set();
const DEPLOYMENT_FALLBACK_ENDPOINT = 'https://api.losandes-soacha.com/api/visits';

const sanitizeBaseUrl = (value) => value.replace(/\/$/, '');

const sanitizeFullEndpoint = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const [protocol, rest] = trimmed.split('://');
  if (!rest) {
    return sanitizeBaseUrl(trimmed);
  }

  return `${protocol}://${rest.replace(/\/+/g, '/')}`.replace(/\/$/, '');
};

const resolveApiEndpoint = () => {
  const envEndpoint = (import.meta.env?.VITE_COUNTER_API_ENDPOINT ?? '').trim();
  if (envEndpoint) {
    return sanitizeFullEndpoint(envEndpoint);
  }

  const envBaseUrl = (import.meta.env?.VITE_COUNTER_API_URL ?? '').trim();
  if (envBaseUrl) {
    return `${sanitizeBaseUrl(envBaseUrl)}/api/visits`;
  }

  if (typeof window !== 'undefined') {
    const globalEndpoint = window.__LOS_ANDES_COUNTER_API__;
    if (typeof globalEndpoint === 'string' && globalEndpoint.trim()) {
      return sanitizeFullEndpoint(globalEndpoint.trim());
    }

    const isLocalhost = /^(localhost|127\.0\.0\.1|::1)$/i.test(window.location.hostname);
    if (isLocalhost) {
      return '/api/visits';
    }
  }

  return DEPLOYMENT_FALLBACK_ENDPOINT;
};

const API_ENDPOINT = resolveApiEndpoint();
const appendPathSegment = (base, segment) => {
  const safeBase = (base || '').replace(/\/+$/, '');
  const safeSegment = (segment || '').replace(/^\/+/, '');
  return `${safeBase}/${safeSegment}`;
};
const DURATIONS_ENDPOINT = appendPathSegment(API_ENDPOINT, 'durations');
const KNOWN_BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /baiduspider/i,
  /sogou/i,
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /crawler/i,
  /spider/i,
  /bot/i,
  /headless/i,
  /preview/i,
];

const isLikelyBot = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  if (window.__LOS_ANDES_DISABLE_TRACKING__) {
    return true;
  }

  const userAgent = (window.navigator && window.navigator.userAgent) || '';
  if (!userAgent) {
    return false;
  }

  return KNOWN_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
};

const normalizeRouteName = (route) => {
  if (typeof route !== 'string') {
    return '';
  }

  const trimmed = route.trim().toLowerCase();
  if (!trimmed) {
    return '';
  }

  const [path = ''] = trimmed.split(/[?#]/);
  const normalized = path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\/+/g, '/');
  return normalized;
};

const getTimestamp = () => {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
};

const getDurationSince = (start) => {
  if (typeof start !== 'number') {
    return 0;
  }
  const diff = Math.round(getTimestamp() - start);
  return diff > 0 ? diff : 0;
};

const sendDurationPayload = async (payload) => {
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const sent = navigator.sendBeacon(DURATIONS_ENDPOINT, blob);
      if (sent) {
        return true;
      }
    } catch (error) {
      console.error('[visit-tracker] Beacon de duración falló, intentando con fetch.', error);
    }
  }

  if (typeof fetch === 'function') {
    try {
      await fetch(DURATIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      return true;
    } catch (error) {
      console.error('[visit-tracker] No fue posible enviar la duración mediante fetch.', error);
    }
  }

  return false;
};

const reportDurationEvent = ({ scope, route, durationMs }) => {
  if (!scope || !durationMs || durationMs <= 0) {
    return;
  }

  if (isLikelyBot()) {
    return;
  }

  const payload = {
    scope,
    durationMs: Math.round(durationMs),
  };

  if (scope === 'route') {
    const normalizedRoute = normalizeRouteName(route);
    if (!normalizedRoute) {
      return;
    }
    payload.route = normalizedRoute;
  }

  void sendDurationPayload(payload);
};

export const reportVisit = async (route) => {
  const normalizedRoute = normalizeRouteName(route);
  if (!normalizedRoute || sentRoutes.has(normalizedRoute)) {
    return null;
  }

  sentRoutes.add(normalizedRoute);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ route: normalizedRoute }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[visit-tracker] No fue posible reportar la visita.', error);
    sentRoutes.delete(normalizedRoute);
    return null;
  }
};

export const useVisitTracker = (route) => {
  useEffect(() => {
    if (!route || isLikelyBot()) {
      return;
    }

    reportVisit(route);
  }, [route]);
};

export const useSessionDurationTracker = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (isLikelyBot()) {
      return;
    }

    let sessionStart = getTimestamp();

    const flushSession = () => {
      if (sessionStart == null) {
        return;
      }
      const duration = getDurationSince(sessionStart);
      if (duration > 0) {
        reportDurationEvent({ scope: 'session', durationMs: duration });
      }
      sessionStart = null;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSession();
      } else if (document.visibilityState === 'visible') {
        sessionStart = getTimestamp();
      }
    };

    const handlePageHide = () => {
      flushSession();
    };

    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      flushSession();
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

export const useRouteDurationTracker = (route) => {
  const startRef = useRef(null);
  const routeRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    if (!route || isLikelyBot()) {
      return undefined;
    }

    const normalizedRoute = normalizeRouteName(route);
    if (!normalizedRoute) {
      return undefined;
    }

    startRef.current = getTimestamp();
    routeRef.current = normalizedRoute;

    const flushDuration = () => {
      if (startRef.current == null || !routeRef.current) {
        return;
      }
      const duration = getDurationSince(startRef.current);
      if (duration > 0) {
        reportDurationEvent({ scope: 'route', route: routeRef.current, durationMs: duration });
      }
      startRef.current = null;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushDuration();
      } else if (document.visibilityState === 'visible') {
        startRef.current = getTimestamp();
      }
    };

    const handlePageHide = () => {
      flushDuration();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      flushDuration();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      startRef.current = null;
      routeRef.current = '';
    };
  }, [route]);
};

export const fetchVisitStats = async ({ signal } = {}) => {
  try {
    const response = await fetch(API_ENDPOINT, { signal });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!payload || typeof payload !== 'object') {
      return { total: 0, routes: {} };
    }

    const total = Number(payload.total) || 0;
    const routes = payload.routes && typeof payload.routes === 'object' ? payload.routes : {};
    return { total, routes };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('[visit-tracker] No fue posible leer las estadísticas.', error);
    throw error;
  }
};
