export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'consulting' | 'development' | 'marketing';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
