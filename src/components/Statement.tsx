import { motion } from 'motion/react';

export default function Statement() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-b border-brand-border bg-brand-bg text-slate-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-primary">
              Our Philosophy
            </span>
          </div>
          
          <h2 className="font-display text-3xl font-light italic leading-[1.6] text-slate-900 sm:text-4xl md:text-5xl tracking-tight max-w-4xl mx-auto">
            At Aksharam, we deliver real results through{' '}
            <span className="not-italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-brand-primary relative inline-block after:absolute after:bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-brand-primary/30 hover:after:bg-brand-primary transition-all duration-300">
              high-converting digital strategies
            </span>{' '}
            designed to scale your business, attract the right audience, and maximize ROI with precision.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

