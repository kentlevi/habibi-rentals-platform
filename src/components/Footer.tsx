import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BUSINESS } from '../config';

export default function Footer() {
  return (
    <footer className="bg-slate-100 pt-24 pb-12 px-6 border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" className="mb-6 -ml-4" />
            <p className="text-brand-text-muted text-sm leading-relaxed mb-8 max-w-sm">
              Reliable scooters, cars, tuktuks, and vans for Siquijor arrivals, beach days, and island tours.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-brand-border rounded-lg flex items-center justify-center text-slate-400 hover:border-brand-secondary hover:text-brand-secondary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={BUSINESS.facebookUrl} className="w-10 h-10 border border-brand-border rounded-lg flex items-center justify-center text-slate-400 hover:border-brand-secondary hover:text-brand-secondary transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-text-muted font-medium">
              <li><a href="#inventory" className="hover:text-brand-primary transition-colors">Inventory</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">How It Works</a></li>
              <li><a href="#contact" className="hover:text-brand-primary transition-colors">Contact Concierge</a></li>
              <li><a href={BUSINESS.facebookUrl} className="hover:text-brand-primary transition-colors">Facebook Page</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Pickup Points</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 text-brand-text-muted">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">{BUSINESS.location}</span>
              </li>
              <li className="flex gap-4 text-brand-text-muted">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">{BUSINESS.phone}</span>
              </li>
              <li className="flex gap-4 text-brand-text-muted">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm">{BUSINESS.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-8">Rental Notes</h4>
            <ul className="flex flex-col gap-4 text-sm text-brand-text-muted font-medium">
              <li className="flex justify-between gap-4">
                <span>Motorbikes</span>
                <span className="text-brand-dark text-right">Helmet included</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Cars</span>
                <span className="text-brand-dark text-right">License required</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Vans</span>
                <span className="text-brand-dark text-right">Driver included</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            Copyright 2026 Habibi &amp; Shaun Rentals. Based in Siquijor.
          </p>
          <div className="flex gap-8 text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            <a href="#services" className="hover:text-brand-dark transition-colors">Requirements</a>
            <a href="#inventory" className="hover:text-brand-dark transition-colors">Fleet</a>
            <a href="#contact" className="hover:text-brand-dark transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
