import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Send, Clock, User, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceId?: string;
}

export default function BookCallModal({ isOpen, onClose, selectedServiceId = '' }: BookCallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: selectedServiceId || 'web-design',
    date: '',
    time: '10:00',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const servicesOption = [
    { value: 'web-design', label: 'Web Design & Development' },
    { value: 'app-dev', label: 'App Development' },
    { value: 'security', label: 'Website Security' },
    { value: 'marketing', label: 'Digital Marketing & SEO' },
    { value: 'consulting', label: 'Business Consulting' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xs"
          />

          {/* Modal Container - Sharp Gallery Style */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-none border border-brand-border bg-brand-card p-6 shadow-2xl md:p-8"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-brand-primary/60"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-brand-primary/60"></div>
 
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-800 transition-colors duration-200 cursor-pointer animate-pulse"
            >
              <X size={18} />
            </button>
 
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-brand-primary font-bold">Consultation Form</span>
                  <h3 className="font-display text-2xl italic font-normal text-slate-900">Request Strategy Session</h3>
                  <p className="text-xs text-slate-600 font-light">
                    Select a service and preferred date. We'll formulate a high-converting growth strategy.
                  </p>
                </div>
 
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="bookingName" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/60">
                        <User size={14} />
                      </span>
                      <input
                        type="text"
                        id="bookingName"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-none border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                      />
                    </div>
                  </div>
 
                  {/* Email field */}
                  <div>
                    <label htmlFor="bookingEmail" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/60">
                        <Mail size={14} />
                      </span>
                      <input
                        type="email"
                        id="bookingEmail"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-none border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                      />
                    </div>
                  </div>
 
                  {/* Service type selection */}
                  <div>
                    <label htmlFor="bookingService" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Service Required</label>
                    <select
                      id="bookingService"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-none border border-slate-200 bg-white py-2.5 px-3.5 text-sm text-slate-800 outline-none transition-all focus:border-brand-primary cursor-pointer focus:ring-2 focus:ring-brand-primary/20"
                    >
                      {servicesOption.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-white text-slate-800">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
 
                  {/* Date & Time selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bookingDate" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/60">
                          <Calendar size={14} />
                        </span>
                        <input
                          type="date"
                          id="bookingDate"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full rounded-none border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all focus:border-brand-primary cursor-pointer focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="bookingTime" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Preferred Time</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/60">
                          <Clock size={14} />
                        </span>
                        <input
                          type="time"
                          id="bookingTime"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full rounded-none border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition-all focus:border-brand-primary cursor-pointer focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* Message field */}
                  <div>
                    <label htmlFor="bookingMessage" className="block text-[9px] uppercase tracking-widest font-mono text-slate-500 font-semibold mb-1.5">Brief Message</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-brand-primary/60">
                        <MessageSquare size={14} />
                      </span>
                      <textarea
                        id="bookingMessage"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project/goals..."
                        rows={3}
                        className="w-full rounded-none border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                      />
                    </div>
                  </div>
                </div>
 
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-none border border-brand-primary bg-brand-primary text-slate-950 py-3.5 text-center text-[10px] font-mono uppercase tracking-[0.25em] font-semibold hover:bg-transparent hover:text-brand-primary transition-all duration-300 cursor-pointer flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send size={11} className="translate-y-[1px]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-brand-primary/50 text-brand-primary mb-6">
                  <CheckCircle2 size={24} className="stroke-[1.5]" />
                </div>
                <h3 className="font-display text-2xl italic font-normal text-slate-900 mb-2">Booking Requested!</h3>
                <p className="text-slate-600 max-w-sm text-sm mb-8 leading-relaxed font-light">
                  Thank you, <span className="text-slate-900 font-semibold">{formData.name}</span>! Our strategy experts will analyze your request and email you at <span className="text-slate-900 font-semibold">{formData.email}</span> to confirm our call.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="rounded-none border border-slate-300 bg-white px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-700 hover:border-brand-primary hover:bg-brand-primary hover:text-slate-950 transition-all duration-300 cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

