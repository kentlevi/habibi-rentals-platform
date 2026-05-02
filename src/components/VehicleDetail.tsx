import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Gauge, Fuel, Calendar, Zap, ShieldCheck, MapPin } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function VehicleDetail({ vehicle, onClose }: VehicleDetailProps) {
  if (!vehicle) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-full overflow-y-auto bg-white border border-brand-border rounded-3xl shadow-2xl flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-dark hover:border-brand-primary transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Images */}
          <div className="w-full md:w-1/2 bg-slate-50">
            <div className="sticky top-0">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={vehicle.images[0]} 
                  alt={vehicle.model} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Included Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs font-bold text-brand-dark">
                      <div className="w-5 h-5 bg-brand-primary/10 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-brand-primary" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                <Zap className="w-3 h-3" />
                Available Today
              </div>
              <h2 className="text-4xl font-black text-brand-dark mt-2 mb-3 tracking-tighter italic">
                {vehicle.make} <br /> {vehicle.model}
              </h2>
              <div className="flex items-end gap-2 mt-4 text-brand-primary">
                <span className="text-4xl font-black">₱{vehicle.pricePerDay}</span>
                <span className="text-xs text-slate-400 mb-1.5 uppercase tracking-widest font-black">/ 24 Hours</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="p-6 bg-brand-surface rounded-2xl border border-brand-border">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Island Logistics
                </h4>
                <ul className="space-y-3 text-xs font-bold text-brand-dark">
                   <li className="flex justify-between">
                     <span className="text-brand-text-muted">Pick-up Location</span>
                     <span>Siquijor Port (Included)</span>
                   </li>
                   <li className="flex justify-between">
                     <span className="text-brand-text-muted">Return Location</span>
                     <span>Flexible (Must Inform)</span>
                   </li>
                   <li className="flex justify-between">
                     <span className="text-brand-text-muted">Fuel Policy</span>
                     <span>Full-to-Full</span>
                   </li>
                </ul>
              </div>

              <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-primary mb-2">Paperless Check-in</h4>
                <p className="text-xs font-medium text-brand-secondary leading-relaxed">
                  After booking, you'll be prompted to upload your Driver's License. We verify everything before your arrival so pick-up takes less than 60 seconds.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/30 active:scale-95">
                Proceed to Checkout
              </button>
              <button onClick={onClose} className="w-full border border-brand-border py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-brand-text-muted hover:border-brand-dark hover:text-brand-dark transition-all">
                Cancel
              </button>
            </div>
            
            <p className="mt-8 text-center text-[10px] uppercase font-black tracking-widest text-slate-300">
              Verified by Velocis Island Group
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
