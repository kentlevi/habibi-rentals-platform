import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { BUSINESS } from '../config';

export default function Navbar({ onOpenHowItWorks }: { onOpenHowItWorks?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full h-24 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl h-full mx-auto px-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex w-fit items-center gap-4 text-left transition-opacity hover:opacity-90 active:opacity-80 py-1">
          <BrandLogo size="sm" />
        </button>

        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-semibold text-brand-text-muted whitespace-nowrap">
          <button onClick={onOpenHowItWorks} className="hover:text-brand-primary transition-colors">How to Book</button>
          <a href="#inventory" className="hover:text-brand-primary transition-colors">The Fleet</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Support</a>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden lg:block text-right leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Island Concierge</div>
            <div className="text-sm font-semibold text-brand-dark">{BUSINESS.phone}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
