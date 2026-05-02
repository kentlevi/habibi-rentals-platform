/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Services from './components/Services';
import Footer from './components/Footer';
import VehicleDetail from './components/VehicleDetail';
import { Vehicle } from './types';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LayoutDashboard, LogIn } from 'lucide-react';

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const isAdmin = user?.email === 'skaelex1@gmail.com' || user?.email === 'shaun.crissa@example.com';

  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        {isAdminMode && isAdmin ? (
          <div className="pt-32 px-6 max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-brand-dark tracking-tight">Admin Dashboard</h2>
               <button onClick={() => setIsAdminMode(false)} className="text-sm font-bold text-brand-primary">Exit Admin</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="super-app-card p-8">
                  <h3 className="text-xs font-black uppercase text-slate-400 mb-2">Today's Pickups</h3>
                  <div className="text-3xl font-black text-brand-dark">12</div>
                </div>
                <div className="super-app-card p-8">
                  <h3 className="text-xs font-black uppercase text-slate-400 mb-2">Returns</h3>
                  <div className="text-3xl font-black text-brand-dark">8</div>
                </div>
                <div className="super-app-card p-8">
                  <h3 className="text-xs font-black uppercase text-slate-400 mb-2">Fleet Utilization</h3>
                  <div className="text-3xl font-black text-brand-primary">92%</div>
                </div>
             </div>
          </div>
        ) : (
          <>
            <Hero />
            
            <Inventory onVehicleSelect={setSelectedVehicle} />
            
            <Services />
            
            {/* Contact CTA Section */}
            <section id="contact" className="py-24 px-6 bg-brand-surface">
              <div className="max-w-4xl mx-auto text-center border border-brand-border bg-white p-16 md:p-20 rounded-[2.5rem] relative overflow-hidden shadow-sm">
                <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight italic">
                  Need Help Choosing?
                </h2>
                <p className="text-brand-text-muted max-w-lg mx-auto mb-10 text-sm leading-relaxed font-medium">
                  Shaun & Crissa are just a message away. Our concierge team can help you plan your itinerary around the island's best spots.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
                    Contact via WhatsApp
                  </button>
                  <button className="bg-white border border-brand-border text-brand-text-muted px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:border-slate-400 transition-all">
                    Rental Policy
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {isAdmin && (
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white p-4 rounded-2xl shadow-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-brand-primary transition-all"
        >
          <LayoutDashboard className="w-5 h-5" />
          {isAdminMode ? 'Exit Dashboard' : 'Admin Panel'}
        </button>
      )}

      {/* Vehicle Detail Modal */}
      <VehicleDetail 
        vehicle={selectedVehicle} 
        onClose={() => setSelectedVehicle(null)} 
      />

      {/* Global Aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[24px] border-brand-dark opacity-20"></div>
    </div>
  );
}
