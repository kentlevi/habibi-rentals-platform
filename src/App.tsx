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
import AdminPanel from './components/AdminPanel';
import HowItWorksModal from './components/HowItWorksModal';
import { Vehicle } from './types';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function PublicApp() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-primary selection:text-white overflow-x-hidden overflow-y-scroll">
      <Navbar onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />
      
      <main>
        <Hero />
        
        <Inventory onVehicleSelect={setSelectedVehicle} />
        
        <Services />
        
        {/* Contact CTA Section */}
        <section id="contact" className="py-24 px-6 bg-brand-surface">
          <div className="max-w-4xl mx-auto text-center border border-brand-border bg-white p-16 md:p-20 rounded-2xl relative overflow-hidden shadow-sm">
            <h2 className="text-4xl md:text-5xl font-semibold text-brand-dark mb-6 tracking-tight italic">
              Need Help Choosing?
            </h2>
            <p className="text-brand-text-muted max-w-lg mx-auto mb-10 text-sm leading-relaxed font-medium">
              Shaun & Crissa are just a message away. Our concierge team can help you plan your itinerary around the island's best spots.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-brand-primary text-white px-10 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
                Contact via WhatsApp
              </button>
              <button className="bg-white border border-brand-border text-brand-text-muted px-10 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:border-slate-400 transition-all">
                Rental Policy
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Vehicle Detail Modal */}
      <VehicleDetail 
        vehicle={selectedVehicle} 
        onClose={() => setSelectedVehicle(null)} 
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
