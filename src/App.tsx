import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Services from './components/Services';
import Marketplace from './components/Marketplace';
import BusinessEnquiry from './components/BusinessEnquiry';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import ProcessStats from './components/ProcessStats';
import BookCallModal from './components/BookCallModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const openBooking = (serviceId: string = '') => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between selection:bg-brand-primary selection:text-white">
      <div>
        {/* Header Navigation */}
        <Header onOpenBooking={() => openBooking('')} />

        {/* Hero Section */}
        <Hero onOpenBooking={() => openBooking('')} />

        {/* Philosophy / Statement Section */}
        <Statement />

        {/* Services Grid with filtering */}
        <Services onOpenBookingWithService={openBooking} />

        {/* Value Marketplace Section with ready prepackaged accelerators */}
        <Marketplace onOpenBooking={openBooking} />

        {/* Dedicated Business Enquiry form and brief intake system */}
        <BusinessEnquiry />

        {/* Client Testimonials Section */}
        <Testimonials />

        {/* Tactical Blog Section */}
        <Blog />

        {/* Process & Stats Section with image presentation */}
        <ProcessStats onOpenBooking={() => openBooking('')} />
      </div>

      {/* Styled Brand Footer */}
      <footer className="border-t border-brand-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-100 items-start">
            
            {/* Left Col: Brand & Tagline */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 select-none font-bold">AKS</span>
                <span className="font-display text-[15px] italic font-normal text-slate-800 group-hover:text-brand-primary transition-colors">
                  Aksharam Solutions
                </span>
              </div>
              <p className="text-xs text-slate-600 font-light leading-relaxed max-w-xs">
                Helping businesses dominate through high-converting web applications, resilient cyber security, and elite organic search strategies.
              </p>
            </div>

            {/* Middle Col: Corporate Address & Contact */}
            <div className="md:col-span-4 space-y-4 text-left">
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-primary uppercase block font-bold">Corporate Office</span>
              <div className="text-xs text-slate-600 font-light leading-relaxed space-y-1.5 pt-1">
                <p className="text-slate-800 font-semibold">Aksharam Solutions</p>
                <p>Near Hare Krishna Marg,</p>
                <p>Jaipur, Rajasthan 302017</p>
                <p className="pt-1.5">
                  <span className="font-mono text-brand-primary mr-1 bg-brand-primary/10 border border-brand-primary/25 px-1 py-0.5 text-[8px] font-bold">MOB</span>
                  <a href="tel:+918207711897" className="font-mono text-slate-800 hover:text-brand-primary font-bold transition-colors">+91 82077 11897</a>
                </p>
              </div>
            </div>

            {/* Right Col: Navigation Header Items in Absolute Required Sequence */}
            <div className="md:col-span-4 flex flex-col space-y-4">
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-primary uppercase text-left font-bold block">Navigation Hub</span>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-2 text-left" aria-label="Footer Nav Hub">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('marketplace-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Marketplace
                </button>
                <button
                  onClick={() => scrollToSection('enquiry-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Brief
                </button>
                <button
                  onClick={() => scrollToSection('testimonial-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection('blog-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  Blog
                </button>
                <button
                  onClick={() => scrollToSection('process-section')}
                  className="text-[10px] uppercase font-mono tracking-widest text-slate-600 hover:text-brand-primary transition-colors cursor-pointer text-left font-semibold"
                >
                  About Us
                </button>
                <button
                  onClick={() => openBooking('')}
                  className="text-[10px] uppercase font-mono tracking-widest text-brand-primary hover:text-slate-800 transition-colors cursor-pointer font-bold text-left"
                >
                  Contact
                </button>
              </nav>
            </div>

          </div>

          {/* Bottom attribution copyright line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-[9px] font-mono tracking-wider text-slate-500">
            <span className="uppercase">&copy; {new Date().getFullYear()} Aksharam Solutions. All rights reserved.</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-brand-primary transition-colors duration-200 cursor-pointer uppercase pb-0.5 border-b border-transparent hover:border-brand-primary"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Booking Drawer Modal */}
      <BookCallModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServiceId={selectedServiceId}
      />
    </div>
  );
}
