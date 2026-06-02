import React, { useState } from 'react';
import { Mail, Briefcase, MessageSquare, Send, CheckCircle2, Star, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BusinessEnquiry() {
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    phone: '',
    annualBudget: '$10k - $25k',
    projectScope: 'Custom MVP Development',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const budgetOptions = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k+'
  ];

  const scopeOptions = [
    'Custom MVP Development',
    'Enterprise Scale Architecture',
    'E-Commerce Scaling & Funnels',
    'Hardened Infrastructure & CyberSecurity',
    'Organic Strategy / Headless SEO',
    'Specialized Digital Consulting'
  ];

  return (
    <section id="enquiry-section" className="py-20 md:py-28 relative border-b border-brand-border bg-brand-bg text-slate-900 overflow-hidden">
      {/* Background glowing particles simulation */}
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[250px] bg-brand-primary/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Informational left Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 border border-brand-border bg-white py-1.5 px-3.5 text-[9px] tracking-[0.25em] font-mono text-slate-800 uppercase font-semibold shadow-sm">
                <Building2 size={11} className="text-brand-primary animate-pulse" />
                <span>INTELLIGENT ONBOARDING</span>
              </div>
              
              <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
                Initiate a high impact <br />
                <span className="not-italic font-bold text-slate-950">Business Enquiry.</span>
              </h2>
              
              <p className="text-sm font-light text-slate-600 leading-relaxed">
                Connect directly with Aksharam Solutions leadership. Provide details about your conversion blockers, technical challenges, or growth milestones, and receive a dedicated technical blueprint review.
              </p>
            </div>

            {/* Bullet list of trust points */}
            <div className="space-y-4 font-mono text-[10px] tracking-widest text-slate-500 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3">
                <Star size={12} className="text-brand-primary fill-current" />
                <span className="font-semibold text-slate-700">NDA & COMPLIANCE STANDARD ON ALL INTAKES</span>
              </div>
              <div className="flex items-center gap-3">
                <Star size={12} className="text-brand-primary fill-current" />
                <span className="font-semibold text-slate-700">DIRECT FOUNDER ARCHITECT ENGAGEMENT</span>
              </div>
              <div className="flex items-center gap-3">
                <Star size={12} className="text-brand-primary fill-current" />
                <span className="font-semibold text-slate-700">DETAILED ESTIMATE PORTAL DELIVERED IN 24H</span>
              </div>
            </div>
          </div>

          {/* Form Container Right Column */}
          <div className="lg:col-span-7">
            <div className="relative border border-brand-border bg-white p-8 md:p-10 shadow-md overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-brand-primary"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-brand-primary"></div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Company Name */}
                      <div>
                        <label htmlFor="companyName" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">Company / Entity Name</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary">
                            <Briefcase size={13} />
                          </span>
                          <input
                            type="text"
                            id="companyName"
                            required
                            placeholder="Stripe Inc."
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3 pl-10 pr-4 text-xs font-mono tracking-wide placeholder-slate-400 text-slate-800 outline-none transition-all focus:ring-2 focus:ring-brand-primary/20"
                          />
                        </div>
                      </div>

                      {/* Work Email */}
                      <div>
                        <label htmlFor="workEmail" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">Work Email Address</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary">
                            <Mail size={13} />
                          </span>
                          <input
                            type="email"
                            id="workEmail"
                            required
                            placeholder="engineering@company.com"
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3 pl-10 pr-4 text-xs font-mono tracking-wide placeholder-slate-400 text-slate-800 outline-none transition-all focus:ring-2 focus:ring-brand-primary/20"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Target Select: Budget */}
                      <div>
                        <label htmlFor="annualBudget" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">Estimated Budget Range</label>
                        <select
                          id="annualBudget"
                          aria-label="Estimated project budget range"
                          value={formData.annualBudget}
                          onChange={(e) => setFormData({ ...formData, annualBudget: e.target.value })}
                          className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3 px-3.5 text-xs font-mono tracking-wide text-slate-800 outline-none cursor-pointer transition-all focus:ring-2 focus:ring-brand-primary/20"
                        >
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-slate-800">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Target Select: Project Scope */}
                      <div>
                        <label htmlFor="projectScope" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">Primary Scope Target</label>
                        <select
                          id="projectScope"
                          aria-label="Primary tactical scope target"
                          value={formData.projectScope}
                          onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                          className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3 px-3.5 text-xs font-mono tracking-wide text-slate-800 outline-none cursor-pointer transition-all focus:ring-2 focus:ring-brand-primary/20"
                        >
                          {scopeOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-white text-slate-800 font-mono">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Detailed Project Scope */}
                    <div>
                      <label htmlFor="enquiryDetails" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-bold mb-2">Enquiry details or conversion objectives</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-brand-primary">
                          <MessageSquare size={13} />
                        </span>
                        <textarea
                          id="enquiryDetails"
                          placeholder="Please provide initial notes about integrations or features you require to scale..."
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          required
                          className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3.5 pl-10 pr-4 text-xs font-mono tracking-wide placeholder-slate-400 text-slate-800 outline-none transition-all focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>
                    </div>

                    {/* Form Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border border-brand-primary bg-brand-primary text-white py-4 font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold hover:bg-transparent hover:text-brand-primary transition-all duration-300 cursor-pointer flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <span>Submit Intelligent Brief</span>
                          <Send size={11} className="translate-y-[0.5px]" />
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center border border-brand-primary/40 bg-brand-primary/10 text-brand-primary mb-6">
                      <CheckCircle2 size={24} className="stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-2xl italic font-normal text-slate-900 mb-2">Enquiry Registered</h3>
                    <p className="text-slate-600 max-w-sm text-xs mb-8 leading-relaxed font-light font-sans">
                      Technical brief for <span className="text-slate-900 font-medium">{formData.companyName}</span> successfully received. Our lead architect will follow up directly at <span className="text-brand-primary font-bold font-mono">{formData.workEmail}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          companyName: '',
                          workEmail: '',
                          phone: '',
                          annualBudget: '$10k - $25k',
                          projectScope: 'Custom MVP Development',
                          details: ''
                        });
                      }}
                      className="border border-brand-border bg-white px-6 py-2.5 text-[9px] font-mono uppercase tracking-[0.25em] text-slate-700 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all cursor-pointer font-bold duration-200 shadow-sm"
                    >
                      Reset Brief Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
