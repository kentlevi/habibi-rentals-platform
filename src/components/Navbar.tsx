import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Bike, User, LogOut, LayoutDashboard } from 'lucide-react';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenHowItWorks }: { onOpenHowItWorks?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsub();
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-brand-border' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-4 text-left transition-opacity hover:opacity-90 active:opacity-80 py-1">
          <BrandLogo size="sm" showImage={true} hideText={true} />
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-text-muted">
          <button onClick={onOpenHowItWorks} className="hover:text-brand-primary transition-colors">How to Book</button>
          <a href="#inventory" className="hover:text-brand-primary transition-colors">The Fleet</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right mr-4 leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Island Concierge</div>
            <div className="text-sm font-semibold text-brand-dark">+63 912 345 6789</div>
          </div>
          
          {user ? (
            <div className="flex items-center gap-3 bg-brand-surface p-1 rounded-full border border-brand-border">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-white" />
              <span className="text-xs font-semibold text-brand-dark pr-2 hidden sm:inline">{user.displayName?.split(' ')[0]}</span>
              <button 
                onClick={logout}
                className="p-2 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="bg-brand-dark text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-primary transition-all shadow-md shadow-brand-dark/10 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
