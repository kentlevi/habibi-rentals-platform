import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Gauge, Fuel, Zap, ShieldCheck, MapPin, Clock, Users, MessageCircle, Facebook } from 'lucide-react';
import { Vehicle } from '../types';
import { BUSINESS } from '../config';

interface VehicleDetailProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onStartInquiry: (vehicleName: string) => void;
}

const actionClass = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all active:scale-[0.98]';

export default function VehicleDetail({ vehicle, onClose, onStartInquiry }: VehicleDetailProps) {
  React.useEffect(() => {
    if (vehicle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [vehicle]);

  if (!vehicle) return null;

  const price = `PHP ${vehicle.daily_rate.toLocaleString()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-2xl md:flex-row"
        >
          <button
            onClick={onClose}
            aria-label="Close vehicle details"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary md:right-6 md:top-6"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full overflow-y-auto border-b border-brand-border bg-[#F8F9FA] md:w-[52%] md:border-b-0 md:border-r">
            <div>
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-brand-border/50 p-0">
                <img
                  src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'}
                  alt={vehicle.model_name}
                  className="w-full h-full object-cover mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid gap-5 p-6 md:p-7">
                <div>
                  <h4 className="mb-4 text-xs font-semibold text-slate-500">Island rental standards</h4>
                  <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                    {[
                      { icon: <ShieldCheck className="w-4 h-4" />, text: 'Safety checked before release' },
                      { icon: <Clock className="w-4 h-4" />, text: 'Port and resort handoff' },
                      { icon: <Check className="w-4 h-4" />, text: vehicle.type === 'motorbike' ? 'Clean helmets included' : 'Clean unit before pickup' },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl border border-brand-border bg-white p-4">
                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-primary">
                          {item.icon}
                        </div>
                        <div className="text-sm font-semibold leading-snug text-brand-dark">{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-brand-border bg-white p-5">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-brand-dark">
                    <MapPin className="w-3 h-3" />
                    Island logistics
                  </h4>
                  <ul className="space-y-3 text-xs font-medium text-brand-dark">
                    <li className="flex justify-between gap-4">
                      <span className="text-brand-text-muted">Main Port</span>
                      <span className="text-right">Siquijor Port</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-brand-text-muted">Return Policy</span>
                      <span className="text-right">Flexible Drop-off</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-brand-text-muted">Fuel</span>
                      <span className="text-right">{vehicle.fuelPolicy}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col overflow-y-auto bg-white p-6 md:w-[48%] md:p-10">
            <div className="mb-7 pr-10 md:pr-0">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                <Zap className="w-3 h-3" />
                {vehicle.badge || 'Available'}
              </div>
              <h2 className="mb-4 font-sans text-3xl font-semibold tracking-tight text-brand-dark">
                {vehicle.model_name}
              </h2>
              <p className="text-sm font-medium text-brand-text-muted leading-relaxed">
                {vehicle.bestFor}
              </p>
              <div className="mt-5 flex items-end gap-2 border-t border-brand-border pt-5 text-brand-primary">
                <span className="font-sans text-3xl font-semibold">{price}</span>
                <span className="mb-1 text-xs font-semibold text-brand-text-muted">/ 24 hours</span>
              </div>
            </div>

            <div className="mb-7 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-brand-surface rounded-xl border border-brand-border">
                  <Users className="w-4 h-4 text-brand-primary mb-3" />
                  <div className="text-xs text-brand-text-muted font-semibold">Seats</div>
                  <div className="text-sm font-semibold text-brand-dark mt-1">{vehicle.seats || '-'}</div>
                </div>
                <div className="p-4 bg-brand-surface rounded-xl border border-brand-border">
                  <Gauge className="w-4 h-4 text-brand-primary mb-3" />
                  <div className="text-xs text-brand-text-muted font-semibold">Drive</div>
                  <div className="text-sm font-semibold text-brand-dark mt-1">{vehicle.transmission || 'Self Drive'}</div>
                </div>
                <div className="p-4 bg-brand-surface rounded-xl border border-brand-border">
                  <Fuel className="w-4 h-4 text-brand-primary mb-3" />
                  <div className="text-xs text-brand-text-muted font-semibold">Fuel</div>
                  <div className="text-sm font-semibold text-brand-dark mt-1">{vehicle.type === 'van' ? 'Included' : 'Return'}</div>
                </div>
              </div>

              <div className="rounded-xl border border-brand-border bg-white p-5">
                <h4 className="mb-4 text-sm font-semibold text-brand-dark">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {(vehicle.requirements || ['Valid ID', 'Pickup details']).map((item) => (
                    <span key={item} className="rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-xs font-semibold text-brand-dark">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 border-t border-brand-border pt-5">
              <button
                onClick={() => {
                  onClose();
                  onStartInquiry(vehicle.model_name);
                }}
                className={`${actionClass} bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90`}
              >
                <MessageCircle className="w-4 h-4" />
                Start booking request
              </button>
              <a
                href={BUSINESS.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className={`${actionClass} border border-brand-border text-brand-dark hover:border-brand-primary hover:text-brand-primary`}
              >
                <Facebook className="w-4 h-4" />
                Message on Messenger
              </a>
              <button onClick={onClose} className="min-h-10 text-sm font-semibold text-brand-text-muted transition-colors hover:text-brand-dark">
                Browse other vehicles
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
