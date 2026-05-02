import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Bike, User, LogOut, LayoutDashboard } from 'lucide-react';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function Navbar() {
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
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-xl shadow-lg shadow-brand-primary/20">
            <Bike className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-brand-dark">
            ISLAND<span className="text-brand-primary">RIDE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-text-muted">
          <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it Works</a>
          <a href="#inventory" className="hover:text-brand-primary transition-colors">The Fleet</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right mr-4 leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Island Concierge</div>
            <div className="text-sm font-black text-brand-dark">+63 912 345 6789</div>
          </div>
          
          {user ? (
            <div className="flex items-center gap-3 bg-brand-surface p-1 rounded-full border border-brand-border">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-white" />
              <span className="text-xs font-black text-brand-dark pr-2 hidden sm:inline">{user.displayName?.split(' ')[0]}</span>
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
              className="bg-brand-dark text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-brand-primary transition-all shadow-md shadow-brand-dark/10 flex items-center gap-2"
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
