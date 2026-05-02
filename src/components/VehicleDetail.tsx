import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Gauge, Fuel, Calendar, Zap, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function VehicleDetail({ vehicle, onClose }: VehicleDetailProps) {
  const [step, setStep] = React.useState<'detail' | 'verify' | 'success'>('detail');

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            onClose();
            setStep('detail');
          }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white border border-brand-border rounded-2xl shadow-2xl flex flex-col md:flex-row"
        >
          {step === 'detail' && (
            <>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-dark hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: Images */}
              <div className="w-full md:w-1/2 bg-[#F8F9FA] border-b md:border-b-0 md:border-r border-brand-border">
                <div className="sticky top-0">
                  <div className="border-b border-brand-border/50 aspect-[16/10] flex items-center justify-center overflow-hidden p-0 relative">
                     <div className="absolute inset-0">
                      <img 
                        src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'} 
                        alt={vehicle.model_name} 
                        className="w-full h-full object-cover mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-6">Island Ride Standards</h4>
                    <div className="space-y-4">
                      {[
                        { icon: <ShieldCheck className="w-4 h-4" />, text: 'Quarterly Safety Audit' },
                        { icon: <Clock className="w-4 h-4" />, text: 'Full Fuel on Delivery' },
                        { icon: <Check className="w-4 h-4" />, text: 'Clean Helmets Included' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs font-medium text-brand-dark">
                          <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-primary bg-white shadow-sm">
                            {item.icon}
                          </div>
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Info */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-semibold uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3" />
                    Instant Availability
                  </div>
                  <h2 className="font-sans text-3xl font-semibold text-brand-dark mb-4 tracking-tight">
                    {vehicle.model_name}
                  </h2>
                  <div className="flex items-end gap-2 mt-4 text-brand-primary border-t border-brand-border pt-6">
                    <span className="font-sans text-3xl font-semibold">₱{vehicle.daily_rate}</span>
                    <span className="text-xs text-brand-text-muted mb-1 uppercase tracking-widest font-semibold">/ 24 Hours</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="p-6 bg-brand-surface rounded-xl border border-brand-border">
                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Island Logistics
                    </h4>
                    <ul className="space-y-3 text-xs font-medium text-brand-dark">
                       <li className="flex justify-between">
                         <span className="text-brand-text-muted">Main Port</span>
                         <span>Siquijor Port (Included)</span>
                       </li>
                       <li className="flex justify-between">
                         <span className="text-brand-text-muted">Return Policy</span>
                         <span>Flexible Drop-off</span>
                       </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <button 
                    onClick={() => setStep('verify')}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/30 active:scale-95"
                  >
                    Confirm & Verify Docs
                  </button>
                  <button onClick={onClose} className="w-full border border-brand-border py-4 rounded-xl font-semibold text-xs uppercase tracking-widest text-brand-text-muted hover:border-brand-dark hover:text-brand-dark transition-all">
                    Browse Others
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'verify' && (
            <div className="w-full p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
               <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-8 animate-bounce">
                 <ShieldCheck className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-semibold text-brand-dark mb-4 tracking-tight">Automated Verification</h3>
               <p className="text-brand-text-muted max-w-md mx-auto mb-10 font-medium">
                 To skip the manual paperwork at the port, please snap a photo of your Driver's License. This is stored securely for Siquijor Port Authority requirements.
               </p>
               
               <div className="w-full max-w-sm border-2 border-dashed border-brand-border rounded-xl p-10 mb-10 hover:border-brand-primary transition-colors cursor-pointer group">
                  <div className="text-brand-text-muted group-hover:text-brand-primary transition-colors">
                    <Calendar className="w-8 h-8 mx-auto mb-4" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Select Document File</span>
                  </div>
               </div>

               <div className="flex gap-4 w-full max-w-sm">
                 <button 
                  onClick={() => setStep('success')}
                  className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-semibold text-xs uppercase tracking-widest shadow-xl shadow-brand-primary/20"
                 >
                   Verify & Pay
                 </button>
                 <button 
                  onClick={() => setStep('detail')}
                  className="flex-1 border border-brand-border py-4 rounded-xl font-semibold text-xs uppercase tracking-widest text-brand-text-muted"
                 >
                   Back
                 </button>
               </div>
            </div>
          )}

          {step === 'success' && (
            <div className="w-full p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
               <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-500/40">
                 <Check className="w-12 h-12" />
               </div>
               <h3 className="text-3xl font-semibold text-brand-dark mb-4 tracking-tight">Booooked!</h3>
        <p className="text-brand-text-muted max-w-2xl mx-auto mb-10 font-medium">
          Your {vehicle.model_name} is reserved. Check your email for the confirmation voucher. Shaun or Crissa will deliver it at Siquijor Port on your arrival.
        </p>
               <button 
                  onClick={() => {
                    onClose();
                    setStep('detail');
                  }}
                  className="bg-brand-dark text-white px-12 py-4 rounded-xl font-semibold text-xs uppercase tracking-widest shadow-2xl"
               >
                 Back to Main
               </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
