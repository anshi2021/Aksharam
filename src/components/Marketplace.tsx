import { useState } from 'react';
import { ShoppingBag, ArrowUpRight, Sparkles, Zap, TicketPercent, Check, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MarketplaceItem {
  id: string;
  title: string;
  category: 'templates' | 'modules' | 'security';
  description: string;
  stats: string;
  tag: string;
  features: string[];
}

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'flipkart-listings',
    title: 'Flipkart services include listings',
    category: 'templates',
    description: 'Optimize your Flipkart vendor store and boost search visibility. Fully managed bulk catalog uploads, enhanced product pages, and strategic listing visibility algorithms.',
    stats: 'Flipkart Premium Tier',
    tag: 'E-COMMERCE GROWTH',
    features: ['Enhanced Catalog Pages', 'Bulk Inventory Uploads', 'Listing Keywords Audit', 'Competitor Ranking Matrix']
  },
  {
    id: 'headless-seo-package',
    title: 'Headless SEO & speed engine boilerplate',
    category: 'modules',
    description: 'A React Server Components template configured for maximum organic positioning, lightning load times, and pre-wired JSON-LD schemas.',
    stats: '100% Core Web Vitals',
    tag: 'TRENDING',
    features: ['Auto Schema.org Mapping', 'Dynamic Image Optimizer', 'Next.js 14 / Vite Ready', 'Advanced Sitemap Generator']
  },
  {
    id: 'amazon-listings-sync',
    title: 'Amazon listings India & USA product updates',
    category: 'security',
    description: 'Optimize your catalog presence and sync product inventories across Amazon India & Amazon USA stores. Comprehensive strategy covering listings updates, pricing audits, and global seller hub integration.',
    stats: 'US & IN Marketplace Sync',
    tag: 'GLOBAL SALES',
    features: ['Cross-Border Product Uploads', 'Amazon USA Keyword Optimization', 'Amazon India Buy-Box Strategy', 'Automated Pricing Updates Control']
  },
  {
    id: 'hyperlocal-marketplace-sync',
    title: 'Blinkit, Zepto, Etsy & Walmart services',
    category: 'modules',
    description: 'Enable immediate positioning on fast-commerce digital shelves and leading global artisan platform. Strategic listing management, SEO fine-tuning, and direct API enablement.',
    stats: 'Omnichannel Expansion',
    tag: 'HYPERLOCAL & GLOBAL',
    features: ['Blinkit Catalog Compliance', 'Zepto Hyperlocal Onboarding', 'Etsy Handmade SEO Audits', 'Walmart Marketplace Setup']
  }
];

interface MarketplaceProps {
  onOpenBooking: (serviceId: string) => void;
}

export default function Marketplace({ onOpenBooking }: MarketplaceProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'templates' | 'modules' | 'security'>('all');
  const [pendingEnquiry, setPendingEnquiry] = useState<string | null>(null);

  const filteredItems = MARKETPLACE_ITEMS.filter(
    item => activeTab === 'all' || item.category === activeTab
  );

  const handleEnquiry = (title: string) => {
    setPendingEnquiry(title);
    setTimeout(() => {
      setPendingEnquiry(null);
      onOpenBooking(`Marketplace: ${title}`);
    }, 1500);
  };

  return (
    <section id="marketplace-section" className="py-20 md:py-28 relative border-b border-brand-border bg-brand-bg text-slate-900 overflow-hidden">
      {/* Background visual halo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            {/* Small badge */}
            <div className="inline-flex items-center gap-1.5 border border-brand-border bg-white py-1.5 px-3.5 text-[9px] tracking-[0.25em] font-mono text-slate-800 uppercase font-semibold shadow-sm">
              <ShoppingBag size={11} className="text-brand-primary" />
              <span>VALUE DEPLOYMENTS // ACCELERATORS</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
              Pre-built accelerators in our <br />
              <span className="not-italic font-bold text-slate-950">Value Marketplace.</span>
            </h2>
            <p className="text-sm font-light text-slate-600 max-w-xl">
              Access verified architectural patterns, pre-hardened scripts, and stellar modules tailored by Aksharam to bypass weeks of planning and deployment effort.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('marketplace-special')}
            className="group inline-flex items-center gap-1.5 text-slate-700 hover:text-brand-primary text-[10px] tracking-[0.2em] font-bold uppercase transition-colors duration-200 cursor-pointer self-start md:self-end border-b border-slate-300 pb-1"
          >
            <span>Custom configurations</span>
            <ArrowUpRight size={12} className="translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-brand-border pb-4" role="tablist" aria-label="Marketplace categories filter">
          <button
            onClick={() => setActiveTab('all')}
            role="tab"
            aria-selected={activeTab === 'all'}
            aria-pressed={activeTab === 'all'}
            aria-label="Show all digital assets"
            className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none ${
              activeTab === 'all'
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                : 'border border-brand-border bg-white text-slate-700 hover:text-slate-950 hover:border-slate-400'
            }`}
          >
            All assets
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            role="tab"
            aria-selected={activeTab === 'templates'}
            aria-pressed={activeTab === 'templates'}
            aria-label="Filter by Funnels and Templates"
            className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none ${
              activeTab === 'templates'
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                : 'border border-brand-border bg-white text-slate-700 hover:text-slate-950 hover:border-slate-400'
            }`}
          >
            Funnels & Templates
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            role="tab"
            aria-selected={activeTab === 'modules'}
            aria-pressed={activeTab === 'modules'}
            aria-label="Filter by Functional Modules"
            className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none ${
              activeTab === 'modules'
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                : 'border border-brand-border bg-white text-slate-700 hover:text-slate-950 hover:border-slate-400'
            }`}
          >
            Functional Modules
          </button>
          <button
            onClick={() => setActiveTab('security')}
            role="tab"
            aria-selected={activeTab === 'security'}
            aria-pressed={activeTab === 'security'}
            aria-label="Filter by Security Packages"
            className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none ${
              activeTab === 'security'
                ? 'bg-brand-primary text-white font-bold shadow-sm'
                : 'border border-brand-border bg-white text-slate-700 hover:text-slate-950 hover:border-slate-400'
            }`}
          >
            Security Packages
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group border border-brand-border bg-white p-7 md:p-8 hover:shadow-md hover:border-brand-primary/60 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Subtle design guides */}
              <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Meta line */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-brand-primary/10 text-brand-primary border border-brand-primary/25 font-bold">
                    {item.tag}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-slate-500 font-semibold">
                    {item.stats}
                  </span>
                </div>

                {/* Header item */}
                <h3 className="font-display text-2xl italic font-normal text-slate-800 group-hover:text-brand-primary transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Features list */}
                <div className="border-t border-slate-100 pt-5 mb-8">
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase mb-3 font-bold">Core Inclusions</span>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-light text-slate-600">
                        <Check size={11} className="text-brand-primary shrink-0" />
                        <span className="truncate text-slate-700 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inquiry & Call-to-action line */}
              <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[8px] font-mono text-brand-primary/80 uppercase tracking-widest font-bold">Aksharam Service</span>
                  <span className="font-display text-xs font-semibold text-slate-700">Custom Setup Included</span>
                </div>

                <button
                  onClick={() => handleEnquiry(item.title)}
                  aria-label={`Enquire about ${item.title}`}
                  className="px-5 py-3 border border-brand-primary/35 hover:border-brand-primary bg-brand-primary/10 text-brand-primary hover:text-white hover:bg-brand-primary font-mono text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                >
                  <ArrowUpRight size={11} />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Notice */}
        <div className="mt-12 p-6 border border-brand-border bg-[#efeef0]/20 bg-gradient-to-r from-brand-primary/5 to-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <TicketPercent className="text-brand-primary h-6 w-6 stroke-[1.5]" />
            <div className="space-y-0.5">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-primary/80 font-bold">Limited discount campaign</span>
              <p className="text-xs font-light text-slate-600">Need a custom deployment package? Get in touch with us to receive a custom bundle proposal.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking('marketplace-bundle')}
            className="px-4 py-2 border border-brand-primary/55 hover:border-brand-primary text-brand-primary font-mono text-[9px] uppercase tracking-widest font-semibold hover:bg-brand-primary/10 transition-colors cursor-pointer shrink-0"
          >
            Claim discount
          </button>
        </div>
      </div>

      {/* Inquiry Processing Overlay Notification */}
      <AnimatePresence>
        {pendingEnquiry && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full border border-brand-primary bg-[#0a1128] p-5 shadow-2xl text-white text-left"
          >
            <div className="flex gap-4 animate-bounce">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-primary/40 bg-brand-primary/10 text-brand-primary">
                <Zap size={16} />
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-brand-primary uppercase tracking-widest font-bold">INQUIRY TUNNEL</span>
                <h4 className="font-display text-sm font-semibold italic text-white font-serif">Opening briefing channel...</h4>
                <p className="text-[10px] text-white/70 font-light leading-relaxed">
                  Initializing allocation for <span className="text-white font-semibold">{pendingEnquiry}</span>. Preparing consultancy intake details.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
