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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-2xl"
          >
            <button 
              onClick={onClose}
              aria-label="Close how to book"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-brand-border px-6 py-6 pr-16 md:px-8 md:py-7">
              <h2 className="mb-2 text-3xl font-semibold tracking-tight text-brand-dark">How to Book</h2>
              <p className="text-sm font-medium leading-relaxed text-brand-text-muted">
                Your island adventure with Habibi & Shaun starts in four simple steps.
              </p>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 md:px-8">
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
                <div key={i} className="flex items-start gap-4 rounded-xl border border-brand-border bg-brand-surface p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-brand-dark">{step.title}</h3>
                    <p className="text-sm font-medium text-brand-text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="m-6 mt-0 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-dark px-5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/10 transition-all hover:bg-brand-primary active:scale-[0.98] md:m-8 md:mt-0"
            >
              Got it, let's ride
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
