import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Facebook, Send } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { LOCATIONS } from '../constants';
import { BookingInquiry } from '../types';
import { BUSINESS, buildInquiryWhatsAppUrl } from '../config';
import { saveBookingInquiry } from '../lib/operations';

interface BookingInquiryModalProps {
  vehicleName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const fieldClass = 'h-12 rounded-xl border border-brand-border bg-white px-4 text-sm font-semibold text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10';
const labelClass = 'text-xs font-semibold text-brand-text-muted';
const actionClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all active:scale-[0.98]';

export default function BookingInquiryModal({ vehicleName, isOpen, onClose }: BookingInquiryModalProps) {
  const defaultStart = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const defaultEnd = useMemo(() => format(addDays(new Date(), 1), 'yyyy-MM-dd'), []);
  const [form, setForm] = useState<BookingInquiry>({
    vehicleName: vehicleName || 'right rental for my Siquijor trip',
    customerName: '',
    contact: '',
    pickupLocation: LOCATIONS[0].name,
    startDate: defaultStart,
    endDate: defaultEnd,
    notes: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setForm(prev => ({
        ...prev,
        vehicleName: vehicleName || 'right rental for my Siquijor trip',
      }));
      setSaved(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, vehicleName]);

  const updateField = (field: keyof BookingInquiry, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const whatsappUrl = buildInquiryWhatsAppUrl(form);

  const handleSave = async () => {
    await saveBookingInquiry(form);
    setSaved(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close booking inquiry"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-brand-border px-6 py-6 pr-16 md:px-8 md:py-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-primary">
                <Send className="w-3 h-3" />
                Booking Inquiry
              </div>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight text-brand-dark md:text-3xl">
                Send a ready-to-confirm request
              </h2>
              <p className="max-w-2xl text-sm font-medium leading-relaxed text-brand-text-muted">
                Fill the basics once. The site turns it into a clean WhatsApp message so the team receives the details they need.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto px-6 py-6 md:grid-cols-2 md:px-8">
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className={labelClass}>Vehicle</span>
                <input
                  value={form.vehicleName}
                  onChange={(e) => updateField('vehicleName', e.target.value)}
                  className={`${fieldClass} bg-brand-surface`}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClass}>Name</span>
                <input
                  value={form.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClass}>Contact</span>
                <input
                  value={form.contact}
                  onChange={(e) => updateField('contact', e.target.value)}
                  placeholder="WhatsApp, Messenger, or phone"
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className={labelClass}>Pickup location</span>
                <select
                  value={form.pickupLocation}
                  onChange={(e) => updateField('pickupLocation', e.target.value)}
                  className={fieldClass}
                >
                  {LOCATIONS.map(location => (
                    <option key={location.id} value={location.name}>{location.name}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClass}>Pickup date</span>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClass}>Drop-off date</span>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className={labelClass}>Notes</span>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Arrival time, group size, hotel/resort, or questions"
                  rows={4}
                  className="resize-none rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-semibold text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                />
              </label>
            </div>

            <div className="border-t border-brand-border bg-white px-6 py-5 md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleSave}
                  className={`${actionClass} flex-1 bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Send via WhatsApp
                </a>
                <a
                  href={BUSINESS.messengerUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleSave}
                  className={`${actionClass} flex-1 border border-brand-border bg-white text-brand-dark hover:border-brand-primary hover:text-brand-primary`}
                >
                  <Facebook className="w-4 h-4" />
                  Open Messenger
                </a>
              </div>
              <p className="mt-3 text-center text-xs font-medium text-brand-text-muted">
                {saved ? 'Inquiry saved locally.' : 'No payment is collected here. The team confirms availability by chat.'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
