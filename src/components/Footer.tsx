import React from 'react';
import { Car, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-100 pt-24 pb-12 px-6 border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" className="mb-6 -ml-4" />
            <p className="text-brand-text-muted text-sm leading-relaxed mb-8 max-w-sm">
              Siquijor's premier rental fleet. Providing reliable scooters and cars with instant port delivery.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-brand-border rounded-lg flex items-center justify-center text-slate-400 hover:border-brand-secondary hover:text-brand-secondary transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-text-muted font-medium">
              {['Inventory', 'Professional Services', 'Rental Policy', 'About Us', 'Contact Concierge'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Showroom</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 text-brand-text-muted">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">Siquijor Port, Poblacion,<br />Siquijor, Philippines 6225</span>
              </li>
              <li className="flex gap-4 text-brand-text-muted">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">+63 (912) 345 6789</span>
              </li>
              <li className="flex gap-4 text-brand-text-muted">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">bookings@habibiandshaun.ph</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Concierge Hours</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-text-muted font-medium">
              <li className="flex justify-between">
                <span>Weekdays</span>
                <span className="text-brand-dark">09:00 - 21:00</span>
              </li>
              <li className="flex justify-between font-semibold text-brand-secondary">
                <span>Saturday</span>
                <span>10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-brand-dark italic">By Appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            © 2026 Habibi &amp; Shaun Rentals. Based in Siquijor.
          </p>
          <div className="flex gap-8 text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            <a href="#" className="hover:text-brand-dark transition-colors">Port Schedules</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Island Guide</a>
            <a href="#" className="hover:text-brand-dark transition-colors">LTO Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
