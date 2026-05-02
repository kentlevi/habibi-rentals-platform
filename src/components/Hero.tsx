import React from 'react';
import { motion } from 'motion/react';
import BookingWidget from './BookingWidget';
import { ShieldCheck, Zap, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-brand-surface">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            Verified Island Rentals
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter leading-[0.9] mb-8 italic">
            Your Siquijor <br />
            <span className="text-brand-primary">Adventure Simplified.</span>
          </h1>
          
          <p className="text-brand-text-muted text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Skip the manual inquiries. Instant booking for scooters and cars at Siquijor and Larena Ports. Real-time availability for the island's best fleet.
          </p>
        </motion.div>

        <BookingWidget />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-12">
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border group shadow-brand-primary/5 transition-all">
                <Zap className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-black text-brand-dark text-sm uppercase tracking-tight">Instant Confirmation</h3>
               <p className="text-brand-text-muted text-xs font-medium">No DMs required. Book in 60s.</p>
             </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border">
                <Clock className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-black text-brand-dark text-sm uppercase tracking-tight">24/7 Port Delivery</h3>
               <p className="text-brand-text-muted text-xs font-medium">Ready when you step off the boat.</p>
             </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-brand-border">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
             </div>
             <div>
               <h3 className="font-black text-brand-dark text-sm uppercase tracking-tight">Paperless Check-in</h3>
               <p className="text-brand-text-muted text-xs font-medium">Verified docs before you arrive.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
