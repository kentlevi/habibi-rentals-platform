import React from 'react';
import { motion } from 'motion/react';
import { Clock, ShieldCheck, MapPin, Zap } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Clock className="w-8 h-8 text-brand-primary" />,
      title: '24/7 Port Pick-up',
      desc: 'Whether you arrive at 5 AM or 10 PM, our team will be there with your keys.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: 'Full Insurance',
      desc: 'All rentals include standard island insurance for peace of mind while exploring.'
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-primary" />,
      title: 'Mainland Delivery',
      desc: 'Free delivery to Siquijor and Larena Ports. Custom delivery to your resort.'
    },
    {
      icon: <Zap className="w-8 h-8 text-brand-primary" />,
      title: 'Gcash Payment',
      desc: 'Seamless digital payments via Gcash, Maya, or international credit cards.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-brand-dark tracking-tight mb-2">Mastery In Every Service</h2>
          <p className="text-brand-text-muted text-sm font-medium">Elevating the luxury rental and ownership experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <p className="text-brand-text-muted text-sm leading-relaxed font-medium">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
