import { useEffect } from 'react';

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
