import { useState, useEffect } from 'react';
import { Activity, Landmark, Target, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STATS, IMAGE_ASSETS } from '../data';

const PROSPECT_SLIDES = [
  {
    id: 'office-workspace',
    label: 'WORKSPACE IN ACTION',
    title: 'Aksharam Production Suite',
    desc: 'Dynamic engineering pods with top tech stacks, focused workstations, and active developers.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=700&h=450'
  },
  {
    id: 'active-collaboration',
    label: 'STRATEGY BRIEFING',
    title: 'Interactive Client Meetings',
    desc: 'Aligning agile blueprints, strategy frameworks, and user growth charts face-to-face.',
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=700&h=450'
  },
  {
    id: 'prestige-uiux',
    label: 'PRESTIGE UI / UX',
    title: 'Award-Winning Web & App Layouts',
    desc: 'Impeccable system typography, responsive prototypes, and optimized custom interactive elements.',
    img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=700&h=450'
  }
];

interface ProcessStatsProps {
  onOpenBooking: () => void;
}

export default function ProcessStats({ onOpenBooking }: ProcessStatsProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PROSPECT_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % PROSPECT_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + PROSPECT_SLIDES.length) % PROSPECT_SLIDES.length);
  };

  const getStatIcon = (label: string) => {
    if (label.toLowerCase().includes('success')) {
      return <Award className="h-5 w-5 text-brand-primary" />;
    }
    if (label.toLowerCase().includes('campaign')) {
      return <Target className="h-5 w-5 text-brand-primary" />;
    }
    if (label.toLowerCase().includes('year')) {
      return <Activity className="h-5 w-5 text-brand-primary" />;
    }
    return <Landmark className="h-5 w-5 text-brand-primary" />;
  };

  return (
    <section id="process-section" className="py-20 md:py-28 relative overflow-hidden bg-brand-bg text-slate-900 border-b border-brand-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column Stats & Strategy Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-brand-primary font-bold">
                Why we're the right choice
              </span>
              <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
                Inside our <span className="not-italic font-bold text-slate-950">process.</span>
              </h2>
              <p className="text-sm font-light leading-relaxed text-slate-600 max-w-xl">
                We craft impactful strategies, refine brand positioning, and drive real outcomes through smart technology architecture, pristine design execution, and high-converting creative directions.
              </p>
            </div>
 
            {/* Stats Grid Layout - Premium Dark Glassmorphism Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  onClick={onOpenBooking}
                  className="group relative overflow-hidden rounded-none border border-brand-border bg-white p-6 hover:bg-brand-card-hover/20 hover:border-brand-primary hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Miniature corners on hover */}
                  <div className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t border-l border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b border-r border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center border border-brand-border bg-[#f0f6fc] group-hover:border-brand-primary group-hover:bg-brand-primary/10 transition-colors">
                      {getStatIcon(stat.label)}
                    </div>
                  </div>
 
                  <div className="space-y-1">
                    <p className="font-display text-3xl font-bold italic tracking-tight text-slate-800 group-hover:text-brand-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 font-medium group-hover:text-slate-800 transition-colors leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
 
          {/* Right Column Process Moving Image Grid Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center lg:justify-end w-full"
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-brand-primary/5 p-4 border border-brand-border group shadow-sm overflow-hidden">
              
              {/* Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t border-l border-brand-primary z-30"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b border-r border-brand-primary z-30"></div>
 
              <div className="relative h-full w-full overflow-hidden border border-brand-border bg-white select-none">
                
                {/* Dynamic Sliding Content Carousel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <img
                      src={PROSPECT_SLIDES[activeSlide].img}
                      alt={PROSPECT_SLIDES[activeSlide].title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Heavy premium overlay and shading focus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/35 pointer-events-none z-10" />

                {/* Left Top Badge: Growth Driven */}
                <div className="absolute top-4 left-4 flex items-center gap-2 border border-white/10 bg-[#0a1128]/95 px-3 py-1.5 shadow-sm z-20">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-white">
                    GROWTH DRIVEN
                  </span>
                </div>

                {/* Top Right Bullet indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0a1128]/95 border border-white/10 px-2.5 py-1.5 shadow-sm z-20">
                  {PROSPECT_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      id={`proc-dot-${idx}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-1.5 h-1.5 transition-all cursor-pointer ${idx === activeSlide ? 'bg-brand-primary w-3.5' : 'bg-white/30 hover:bg-white/60'}`}
                      aria-label={`Select section item ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Lower third Content display */}
                <div className="absolute bottom-4 left-4 right-16 z-20 space-y-1 text-left">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-brand-primary uppercase font-bold block">
                    {PROSPECT_SLIDES[activeSlide].label}
                  </span>
                  <h3 className="font-display text-base md:text-lg italic font-normal text-white leading-tight">
                    {PROSPECT_SLIDES[activeSlide].title}
                  </h3>
                  <p className="text-[10px] text-slate-300/90 font-light leading-relaxed hidden sm:block max-w-sm">
                    {PROSPECT_SLIDES[activeSlide].desc}
                  </p>
                </div>

                {/* Hand-crafted control buttons */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-1 items-center">
                  <button
                    id="proc-carousel-prev"
                    onClick={() => handlePrev()}
                    aria-label="Previous portfolio item"
                    className="p-1 border border-white/10 bg-[#0a1128]/90 text-white/70 hover:text-brand-primary hover:border-brand-primary transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={12} />
                  </button>
                  <button
                    id="proc-carousel-next"
                    onClick={() => handleNext()}
                    aria-label="Next portfolio item"
                    className="p-1 border border-white/10 bg-[#0a1128]/90 text-white/70 hover:text-brand-primary hover:border-brand-primary transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={12} />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
