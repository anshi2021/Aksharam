import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    onOpenBooking();
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex h-20 items-center justify-between">
        {/* Logo */}
        <div 
          onClick={handleHomeClick} 
          className="flex items-center gap-4 cursor-pointer group z-50"
        >
          <div className="flex h-10 w-10 items-center justify-center border border-brand-primary bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-all duration-300 relative">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-brand-primary"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-brand-primary"></div>
            <span className="font-display text-xs italic font-semibold text-brand-primary">A/S</span>
          </div>
          <span className="font-display text-xl font-bold italic tracking-tight text-white group-hover:text-white/80 transition-colors">
            Aksharam Solutions
          </span>
        </div>

        {/* Links with luxurious gallery details - Desktop */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main Desktop Navigation">
          <button
            onClick={handleHomeClick}
            aria-label="Navigate to Home section"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('services-section')}
            aria-label="Navigate to Services section"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('marketplace-section')}
            aria-label="Navigate to Product Marketplace accelerators"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Marketplace
          </button>
          <button
            onClick={() => scrollTo('enquiry-section')}
            aria-label="Navigate to Business Enquiry form"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Business Enquiry
          </button>
          <button
            onClick={() => scrollTo('testimonial-section')}
            aria-label="Navigate to Client Testimonials video gallery"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollTo('blog-section')}
            aria-label="Navigate to strategic Blog insights"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Blog
          </button>
          <button
            onClick={() => scrollTo('process-section')}
            aria-label="Navigate to About Us and our interactive process"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            About Us
          </button>
          <button
            onClick={handleContactClick}
            aria-label="Navigate to contact and consultation options"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer focus:ring-1 focus:ring-white focus:outline-none px-2 py-1"
          >
            Contact
          </button>
        </nav>

        {/* Call to action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            aria-label="Contact Us to book a strategy session"
            className="hidden sm:flex items-center gap-2 border border-brand-primary bg-brand-primary px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900 hover:bg-transparent hover:text-white hover:border-brand-primary hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer relative focus:ring-2 focus:ring-brand-primary focus:outline-none"
          >
            {/* Soft decorative visual cues */}
            <div className="absolute top-0 left-0 w-1 h-[1px] bg-slate-900"></div>
            <div className="absolute bottom-0 right-0 w-1 h-[1px] bg-slate-900"></div>
            <span>Contact Us</span>
            <ArrowUpRight size={12} />
          </button>

          {/* Hamburger toggle button for responsive nav */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-brand-primary transition-colors focus:ring-2 focus:ring-brand-primary focus:outline-none z-50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlaid with sleek transitions */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#000000] pt-28 px-8 flex flex-col gap-6 animate-fade-in-down border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-5 text-left">
            <button
              onClick={handleHomeClick}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              01 // Home
            </button>
            <button
              onClick={() => scrollTo('services-section')}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              02 // Services
            </button>
            <button
              onClick={() => scrollTo('marketplace-section')}
               className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              03 // Marketplace
            </button>
            <button
              onClick={() => scrollTo('enquiry-section')}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              04 // Business Enquiry
            </button>
            <button
              onClick={() => scrollTo('testimonial-section')}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              05 // Testimonials
            </button>
            <button
              onClick={() => scrollTo('blog-section')}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              06 // Blog
            </button>
            <button
              onClick={() => scrollTo('process-section')}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              07 // About Us
            </button>
            <button
              onClick={handleContactClick}
              className="text-xs uppercase tracking-[0.25em] font-bold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
            >
              08 // Contact
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={handleContactClick}
              className="w-full flex items-center justify-center gap-2 border border-brand-primary bg-brand-primary text-slate-900 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-transparent hover:text-white transition-all cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

