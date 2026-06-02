import { useState, useEffect } from 'react';
import { ArrowUpRight, Award, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGE_ASSETS } from '../data';

interface HeroProps {
  onOpenBooking: (subject?: string) => void;
}

const SLIDES = [
  {
    id: 'services',
    watermark: '001',
    label: 'INTEGRATED SERVICES',
    title: 'Custom Tech Solutions',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=650&h=800',
    caseCount: '24+ CASES',
    roiBoost: 'STRATEGY FIRST',
  },
  {
    id: 'web-design',
    watermark: '002',
    label: 'WEB DESIGN & UX',
    title: 'Interactive Web Interfaces',
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=650&h=800',
    caseCount: '50+ DESIGNS',
    roiBoost: '100% CORE WEBS',
  },
  {
    id: 'app-design',
    watermark: '003',
    label: 'APP ENGINEERING',
    title: 'iOS & Android Systems',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=650&h=800',
    caseCount: '18+ APPS BUILT',
    roiBoost: 'ULTRA PERFORMANCE',
  }
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5 bg-[#000000] text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column Text details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-6">
              {/* Breadcrumb Spec */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white uppercase">Growth & Development Partnership</span>
                <span className="h-1 w-8 bg-white/30" />
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-normal italic leading-[1.05] tracking-tight text-white">
                Grow your business,<br />
                <span className="font-serif not-italic font-bold text-white underline underline-offset-12 decoration-white/30">
                  master every move.
                </span>
              </h1>
              
              <p className="max-w-xl text-sm font-light leading-relaxed text-slate-300 font-sans">
                Aksharam Solutions helps high-growth businesses thrive through innovative digital strategies, custom technology execution, and high-impact art direction.
              </p>
            </div>

            {/* Sharp Architectural Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking('consultation')}
                aria-label="Book a consulting strategy call"
                className="group relative flex items-center justify-center gap-2 border border-brand-primary bg-brand-primary hover:border-brand-primary hover:bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-950 hover:text-brand-primary transition-all duration-300 hover:shadow-[0_4px_25px_rgba(74,222,128,0.25)] focus:ring-2 focus:ring-brand-primary focus:outline-none cursor-pointer"
              >
                <span>Book a call</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToServices}
                aria-label="Learn more about Aksharam solutions and services"
                className="relative border border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary/10 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-white transition-all duration-300 focus:ring-2 focus:ring-brand-primary focus:outline-none cursor-pointer"
              >
                <span>Learn more</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column Portrait Carousel with corner frame bounds */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            {/* Gallery Frame with Corner Accents */}
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#0a0a0a] p-4 border border-white/10 group shadow-lg">
              
              {/* Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t border-l border-brand-primary"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b border-r border-brand-primary"></div>
              
              {/* Floating Large watermark */}
              <div className="absolute -left-12 bottom-12 text-[140px] font-bold text-brand-primary/5 font-mono leading-none pointer-events-none select-none z-0">
                {SLIDES[currentSlide].watermark}
              </div>

              {/* Progress notched controls */}
              <div className="absolute top-8 right-8 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-brand-border px-2.5 py-1.5 font-mono text-[8px] tracking-widest text-[#94A3B8]">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-1.5 h-1.5 transition-all rounded-none cursor-pointer ${idx === currentSlide ? 'bg-brand-primary w-3.5' : 'bg-white/30 hover:bg-white/60'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                <span className="ml-1 text-[8px] text-white/50">{currentSlide + 1}/{SLIDES.length}</span>
              </div>

              {/* Image Frame */}
              <div className="relative h-full w-full overflow-hidden bg-black z-10 border border-white/10 flex items-center justify-center">
                
                {/* Image Transition View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <img
                      src={SLIDES[currentSlide].img}
                      alt={SLIDES[currentSlide].title}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="h-full w-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Custom Overlay Vignette and Gradient Backdrop for text focus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

                {/* Manual Navigation Chevrons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 z-30 flex justify-between pointer-events-none">
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    aria-label="Previous Slide"
                    className="p-1.5 border border-white/10 bg-brand-card/90 text-white/70 hover:text-brand-primary hover:border-brand-primary transition-all pointer-events-auto focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    aria-label="Next Slide"
                    className="p-1.5 border border-white/10 bg-brand-card/90 text-white/70 hover:text-brand-primary hover:border-brand-primary transition-all pointer-events-auto focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Center Content over lower third */}
                <div className="absolute bottom-16 left-6 right-6 z-20 space-y-1 text-left pointer-events-none">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-brand-primary uppercase font-bold block">
                    {SLIDES[currentSlide].label}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl italic font-normal text-white tracking-tight">
                    {SLIDES[currentSlide].title}
                  </h3>
                </div>

                {/* Left Bottom Label: Dynamic Case count */}
                <motion.div
                  key={`case-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onOpenBooking(SLIDES[currentSlide].title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenBooking(SLIDES[currentSlide].title); } }}
                  aria-label="View slide case stats"
                  className="absolute bottom-5 left-5 z-20 flex items-center gap-2 border border-white/10 bg-black/80 px-3.5 py-2 hover:border-brand-primary transition-all cursor-pointer group focus:ring-2 focus:ring-brand-primary focus:outline-none"
                >
                  <Award size={12} className="text-brand-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-white">
                    {SLIDES[currentSlide].caseCount}
                  </span>
                </motion.div>

                {/* Right Bottom Label: Dynamic ROI stats */}
                <motion.div
                  key={`roi-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => onOpenBooking(SLIDES[currentSlide].title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenBooking(SLIDES[currentSlide].title); } }}
                  aria-label="View slide ROI stats"
                  className="absolute bottom-5 right-5 z-20 flex items-center gap-2 border border-white/10 bg-black/80 px-3.5 py-2 hover:border-brand-primary transition-all cursor-pointer group focus:ring-2 focus:ring-brand-primary focus:outline-none"
                >
                  <Zap size={11} className="text-brand-primary shrink-0 fill-brand-accent/10" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-white">
                    {SLIDES[currentSlide].roiBoost}
                  </span>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

