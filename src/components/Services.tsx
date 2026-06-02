import { useState, useMemo } from 'react';
import { ArrowUpRight, ShieldCheck, Briefcase, MonitorSmartphone, Smartphone, LineChart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';

interface ServicesProps {
  onOpenBookingWithService: (serviceId: string) => void;
}

export default function Services({ onOpenBookingWithService }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'development' | 'security' | 'marketing' | 'consulting'>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'security', label: 'Security' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'consulting', label: 'Consulting' }
  ] as const;

  const filteredServices = SERVICES.filter(
    (service) => activeFilter === 'all' || service.category === activeFilter
  );

  const repeatedServices = useMemo(() => {
    let list = [...filteredServices];
    if (list.length === 0) return [];
    while (list.length < 6) {
      list = [...list, ...filteredServices];
    }
    return [...list, ...list];
  }, [filteredServices]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'web-design':
        return <MonitorSmartphone className="h-5 w-5 text-brand-primary scale-110" />;
      case 'app-dev':
        return <Smartphone className="h-5 w-5 text-brand-primary scale-110" />;
      case 'security':
        return <ShieldCheck className="h-5 w-5 text-brand-primary scale-110" />;
      case 'marketing':
        return <LineChart className="h-5 w-5 text-brand-primary scale-110" />;
      case 'consulting':
        return <Briefcase className="h-5 w-5 text-brand-primary scale-110" />;
      default:
        return <Sparkles className="h-5 w-5 text-brand-primary scale-110" />;
    }
  };

  return (
    <section id="services-section" className="py-20 md:py-28 relative border-b border-brand-border overflow-hidden bg-brand-bg text-slate-900">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Top Badges & Heading Line */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            {/* Small Spark Indicator */}
            <div className="inline-flex items-center gap-1.5 border border-brand-border bg-white py-1.5 px-3.5 text-[9px] tracking-[0.25em] font-mono text-slate-800 uppercase font-semibold shadow-sm">
              <Sparkles size={11} className="text-brand-primary animate-pulse" />
              <span>What we offer</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
              Moving Solutions for <br />
              <span className="not-italic font-bold text-slate-950">E-Commerce & Digital Success.</span>
            </h2>
          </div>

          {/* Quick link button to book all */}
          <button
            onClick={() => onOpenBookingWithService('web-design')}
            className="group inline-flex items-center gap-1.5 text-slate-700 hover:text-brand-primary text-[10px] tracking-[0.2em] font-bold uppercase transition-colors duration-200 cursor-pointer self-start md:self-end border-b border-slate-300 pb-1"
          >
            <span>All services</span>
            <ArrowUpRight size={12} className="translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Filter Tab Slats */}
        <div className="flex flex-wrap items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Services categories filter filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeFilter === cat.id}
              aria-pressed={activeFilter === cat.id}
              aria-label={`Filter by ${cat.label}`}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none ${
                activeFilter === cat.id
                  ? 'bg-brand-primary text-white font-bold shadow-md'
                  : 'border border-brand-border hover:border-slate-400 bg-white text-slate-700 hover:text-slate-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Infinite Moving Grid */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Soft edge blur transitions to fade cards in/out at edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 md:w-32 bg-gradient-to-r from-brand-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 md:w-32 bg-gradient-to-l from-brand-bg to-transparent" />

        <div className="animate-marquee-scroll flex gap-6 hover:[animation-play-state:paused]" aria-label="Interactive services catalog marquee">
          {repeatedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              onClick={() => onOpenBookingWithService(service.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenBookingWithService(service.id); } }}
              aria-label={`${service.title} service. Description: ${service.description}. Click to select and book.`}
              className="w-[280px] md:w-[350px] shrink-0 group relative flex flex-col justify-between overflow-hidden rounded-none border border-brand-border bg-white hover:bg-brand-card-hover/30 p-7 md:p-8 hover:border-brand-primary/60 hover:shadow-[0_8px_32px_rgba(56,189,248,0.1)] shadow-sm transition-all duration-500 cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none"
            >
              {/* Dynamic hover corner highlight markers */}
              <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t border-l border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b border-r border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="space-y-6 z-10">
                {/* Custom Highlight Square Icon */}
                <div className="flex h-10 w-10 items-center justify-center border border-brand-border bg-[#f0f6fc] group-hover:border-brand-primary group-hover:bg-brand-primary/10 transition-all duration-300">
                  {getIcon(service.id)}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-xl italic font-normal text-slate-800 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Interaction arrow */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] font-mono text-slate-500 group-hover:text-brand-primary transition-colors z-10">
                <span>Configure details</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-brand-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mt-6 flex justify-end">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 animate-pulse">
          ◆ Hover cards to halt scrolling
        </span>
      </div>
    </section>
  );
}

