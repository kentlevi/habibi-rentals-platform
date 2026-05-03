import React from 'react';
import { motion } from 'motion/react';
import BookingWidget from './BookingWidget';
import { ShieldCheck, Zap, Clock } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 bg-brand-surface">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-brand-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            Verified Island Rentals
          </div>
          
          <BrandLogo size="xl" centered className="mb-12 mt-8" />
          
          <p className="mx-auto mb-16 max-w-none text-base font-medium leading-relaxed text-[#334155] md:text-lg">
            <span className="block md:whitespace-nowrap">Scooters, cars, tuktuks, and vans for Siquijor ports and resort delivery.</span>
            <span className="block md:whitespace-nowrap">Choose your ride, send your details, and arrive with a clear handoff.</span>
          </p>
        </motion.div>

        <BookingWidget />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-24">
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border group shadow-brand-primary/5 transition-all">
                <Zap className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-dark text-sm uppercase tracking-tight">Fast Chat Booking</h3>
               <p className="text-brand-text-muted text-xs font-medium">Messenger and WhatsApp friendly.</p>
             </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border">
                <Clock className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-dark text-sm uppercase tracking-tight">24/7 Port Delivery</h3>
               <p className="text-brand-text-muted text-xs font-medium">Ready when you step off the boat.</p>
             </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-dark text-sm uppercase tracking-tight">Clear Requirements</h3>
               <p className="text-brand-text-muted text-xs font-medium">Know ID, license, and fuel details upfront.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
