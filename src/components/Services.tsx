import React from 'react';
import { motion } from 'motion/react';
import { Clock, ShieldCheck, MapPin, CreditCard, FileCheck, MessageCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-brand-primary" />,
      title: 'Port & Resort Delivery',
      desc: 'Meet the team at Siquijor Port, Larena Port, San Juan, Paliton, or your resort pickup point.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: 'Safety-Checked Units',
      desc: 'Every scooter, car, tuktuk, and van is checked before release for a more confident island trip.',
    },
    {
      icon: <FileCheck className="w-8 h-8 text-brand-primary" />,
      title: 'Clear Requirements',
      desc: 'Valid ID, driver license for self-drive units, helmets for bikes, and simple handoff instructions.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-brand-primary" />,
      title: 'Easy Local Payments',
      desc: 'Built for GCash, Maya, card, and cash handoffs, with booking requests routed through chat.',
    },
  ];

  const steps = [
    { icon: <MessageCircle className="w-5 h-5" />, title: 'Choose a ride', desc: 'Pick a scooter, car, tuktuk, or van based on your group and route.' },
    { icon: <Clock className="w-5 h-5" />, title: 'Send trip details', desc: 'Share pickup date, drop-off date, port or resort location, and customer name.' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Meet on arrival', desc: 'The team confirms requirements and hands over the unit when you arrive.' },
  ];

  return (
    <section id="services" className="py-24 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-dark tracking-tight mb-3">Built For Siquijor Arrivals</h2>
          <p className="text-brand-text-muted text-sm font-medium leading-relaxed">
            Book around your real arrival plan: choose your ride, send your dates and pickup point,
            then meet the team at the port or resort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="mb-6 p-4 bg-brand-surface border border-brand-border rounded-xl w-fit group-hover:border-brand-secondary transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="text-brand-dark font-semibold text-lg mb-3 tracking-tight">{s.title}</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed font-medium">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-border rounded-2xl overflow-hidden bg-brand-surface">
          {steps.map((step, index) => (
            <div key={step.title} className="p-8 bg-white border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-brand-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Step {index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3">{step.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-brand-text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
