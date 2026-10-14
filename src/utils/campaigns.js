import { OG_IMAGE_URL, SITE_URL } from './seo';

export const DEFAULT_CAMPAIGN_KEY = 'general';

const CTA_TARGET_CONTACT = '#contacto';
const CTA_TARGET_SERVICES = '#servicios';

export const CAMPAIGN_CONTENT = {
  [DEFAULT_CAMPAIGN_KEY]: {
    highlightedServiceKey: null,
    hero: {
      eyebrow: 'Confianza y tecnología de punta',
      title: 'Sonríe con el cuidado integral que merece tu familia',
      description:
        'Con más de 12 años acompañando sonrisas en Soacha, creamos planes odontológicos personalizados que combinan calidez humana con equipos de última generación.',
      primaryCta: {
        label: 'Agenda tu cita',
        href: CTA_TARGET_CONTACT,
      },
      secondaryCta: {
        label: 'Conoce los servicios',
        href: CTA_TARGET_SERVICES,
      },
      noteTitle: 'Metodología preventiva y estética',
      noteDescription:
        'Revisiones periódicas, ortodoncia, implantes y estética dental en un solo lugar.',
    },
    seo: {
      title: 'Odontología integral en Soacha | Consultorio Los Andes',
      description:
        'Odontología general, ortodoncia, implantes, periodoncia y diseño de sonrisa en Soacha. Agenda tu cita.',
      ogImage: OG_IMAGE_URL,
      url: `${SITE_URL}/`,
    },
  },
  endodoncia: {
    highlightedServiceKey: 'Endodoncia',
    hero: {
      eyebrow: 'Especialistas en endodoncia',
      title: 'Tratamiento de endodoncia | Conductos en Soacha',
      description:
        'Salvamos tus piezas dentales con terapia de conductos rotatoria, magnificación clínica y seguimiento postoperatorio para controlar el dolor desde la primera cita.',
      primaryCta: {
        label: 'Agendar endodoncia',
        href: CTA_TARGET_CONTACT,
      },
      secondaryCta: {
        label: 'Ver protocolo de endodoncia',
        href: CTA_TARGET_SERVICES,
        serviceKey: 'Endodoncia',
      },
      noteTitle: 'Conductos indoloros y monitoreados',
      noteDescription:
        'Planificación radiográfica, obturación tridimensional y controles de cicatrización para preservar cada pieza dental.',
    },
    seo: {
      title: 'Endodoncia en Soacha | Conductos indoloros - Consultorio Los Andes',
      description:
        'Programa tu tratamiento de endodoncia con especialistas en conductos radiculares, tecnología rotatoria y sedación asistida en el Consultorio Odontológico Los Andes.',
      ogImage: OG_IMAGE_URL,
      url: `${SITE_URL}/?campaign=endodoncia`,
    },
  },
  ortodoncia: {
    highlightedServiceKey: 'Ortodoncia',
    hero: {
      eyebrow: 'Ortodoncia personalizada',
      title: 'Ortodoncia moderna | Brackets y alineadores en Soacha',
      description:
        'Corrige tu mordida con brackets estéticos, metálicos o alineadores transparentes respaldados por diagnóstico digital, controles mensuales y programas de retención.',
      primaryCta: {
        label: 'Agendar valoración de ortodoncia',
        href: CTA_TARGET_CONTACT,
      },
      secondaryCta: {
        label: 'Revisa planes de ortodoncia',
        href: CTA_TARGET_SERVICES,
        serviceKey: 'Ortodoncia',
      },
      noteTitle: 'Planificación cefalométrica y 3D',
      noteDescription:
        'Estudios radiográficos y seguimiento digital para asegurar movimientos precisos y resultados estables.',
    },
    seo: {
      title: 'Ortodoncia en Soacha | Brackets y alineadores - Consultorio Los Andes',
      description:
        'Agenda tu tratamiento de ortodoncia con especialistas en brackets estéticos, metálicos y alineadores transparentes. Diagnóstico digital y seguimiento cercano.',
      ogImage: OG_IMAGE_URL,
      url: `${SITE_URL}/?campaign=ortodoncia`,
    },
  },
};

const normalize = (value) => (value ? value.toLowerCase() : '');

export const getCampaignContent = (campaignKey) =>
  CAMPAIGN_CONTENT[campaignKey] ?? CAMPAIGN_CONTENT[DEFAULT_CAMPAIGN_KEY];

export const resolveCampaignKey = (searchParams) => {
  if (!searchParams) {
    return DEFAULT_CAMPAIGN_KEY;
  }

  const explicitCampaign = normalize(searchParams.get('campaign'));
  if (explicitCampaign && CAMPAIGN_CONTENT[explicitCampaign]) {
    return explicitCampaign;
  }

  for (const key of searchParams.keys()) {
    const normalizedKey = normalize(key);
    if (CAMPAIGN_CONTENT[normalizedKey]) {
      return normalizedKey;
    }
    const normalizedValue = normalize(searchParams.get(key));
    if (normalizedValue && CAMPAIGN_CONTENT[normalizedValue]) {
      return normalizedValue;
    }
  }

  return DEFAULT_CAMPAIGN_KEY;
};
