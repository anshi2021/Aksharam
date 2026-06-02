import { ServiceItem, StatItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'UI/UX focused, responsive websites and custom web applications built to convert.',
    category: 'development'
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Native Android, iOS and cross platform mobile apps, engineered for performance.',
    category: 'development'
  },
  {
    id: 'security',
    title: 'Website Security',
    description: 'Audits, malware removal, SSL and full vulnerability assessments to protect your assets.',
    category: 'security'
  },
  {
    id: 'marketing',
    title: 'Digital Marketing & SEO',
    description: 'Paid campaigns, lead generation, brand growth and local/global SEO for massive reach.',
    category: 'marketing'
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Growth strategy, market positioning and sales planning designed to scale seamlessly.',
    category: 'consulting'
  }
];

export const STATS: StatItem[] = [
  {
    value: '98%',
    label: 'Client success rate'
  },
  {
    value: '200+',
    label: 'Campaigns launched'
  },
  {
    value: '$250K+',
    label: 'Revenue generated'
  }
];

export const IMAGE_ASSETS = {
  hero_woman: '/src/assets/images/hero_woman_1780332744964.png',
  process_meeting: '/src/assets/images/process_meeting_1780332764465.png'
};
