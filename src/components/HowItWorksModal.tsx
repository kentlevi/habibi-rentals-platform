import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarCheck, ShieldCheck, MapPin, Key } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/20 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white border border-brand-border rounded-2xl shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center text-brand-dark hover:bg-[#E8E6E1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-semibold text-brand-dark mb-2 tracking-tight">How to Book</h2>
            <p className="text-brand-text-muted font-medium mb-10">
              Your island adventure with Habibi & Shaun starts in four simple steps.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: <CalendarCheck className="w-6 h-6" />,
                  title: "1. Choose Your Ride",
                  desc: "Browse our premium fleet of motorbikes, cars, vans, and tuktuks. Select your dates to see real-time availability."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "2. Quick Verification",
                  desc: "Upload a photo of your valid driver's license. We'll securely verify it to meet Siquijor Port Authority requirements."
                },
                {
                  icon: <Key className="w-6 h-6" />,
                  title: "3. Secure Your Booking",
                  desc: "Pay securely online. You'll instantly receive a confirmation voucher via email."
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "4. Portside Handover",
                  desc: "Arrive at Siquijor or Larena Port. The Habibi & Shaun team will be waiting with your fueled, spotless vehicle."
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/20">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-2">{step.title}</h3>
                    <p className="text-sm font-medium text-brand-text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="mt-12 w-full bg-brand-dark text-white py-4 rounded-xl font-semibold text-sm uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-primary/20 active:scale-[0.98]"
            >
              Got it, let's ride!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
