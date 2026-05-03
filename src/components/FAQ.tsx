import React from 'react';
import { HelpCircle, MapPin, ShieldCheck, WalletCards } from 'lucide-react';

const faqs = [
  {
    question: 'Can you deliver to Siquijor Port or Larena Port?',
    answer: 'Yes. Port handoff is the main flow, and resort delivery can be arranged for San Juan, Paliton, and nearby stays.',
  },
  {
    question: 'What do I need for self-drive rentals?',
    answer: 'Bring a valid driver license and ID. Motorbike rentals include helmet use, and cars require a security deposit.',
  },
  {
    question: 'Are vans self-drive?',
    answer: 'Vans are positioned as with-driver rentals, with driver and gas included for coastal or mountain route pricing.',
  },
  {
    question: 'How should tourists book fastest?',
    answer: 'Pick a vehicle, send dates and pickup location through WhatsApp or Facebook, then confirm handoff details in chat.',
  },
];

const proof = [
  { icon: <MapPin className="w-5 h-5" />, title: 'Port-first handoff', desc: 'Designed around ferry arrivals and resort transfers.' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Requirements upfront', desc: 'License, ID, fuel, and helmet notes are visible before inquiry.' },
  { icon: <WalletCards className="w-5 h-5" />, title: 'Easy chat booking', desc: 'Send your trip details through WhatsApp or Messenger when you are ready.' },
];

export default function FAQ() {
  return (
    <section className="bg-brand-surface py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-primary text-xs font-semibold uppercase tracking-widest mb-5">
            <HelpCircle className="w-4 h-4" />
            Tourist Questions
          </div>
          <h2 className="text-3xl font-semibold text-brand-dark tracking-tight mb-4">
            Clear answers before guests message.
          </h2>
          <p className="text-sm font-medium leading-relaxed text-brand-text-muted mb-8">
            See pickup options, rental requirements, and handoff notes before sending your booking request.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {proof.map((item) => (
              <div key={item.title} className="bg-white border border-brand-border rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-xs font-medium leading-relaxed text-brand-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6 border-b last:border-b-0 border-brand-border">
              <h3 className="text-base font-semibold text-brand-dark mb-3">{faq.question}</h3>
              <p className="text-sm font-medium leading-relaxed text-brand-text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
