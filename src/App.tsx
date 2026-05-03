/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Services from './components/Services';
import FAQ from './components/FAQ';
import MobileStickyCTA from './components/MobileStickyCTA';
import BookingInquiryModal from './components/BookingInquiryModal';
import Footer from './components/Footer';
import VehicleDetail from './components/VehicleDetail';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import HowItWorksModal from './components/HowItWorksModal';
import { Vehicle } from './types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BUSINESS } from './config';

function PublicApp() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [inquiryVehicle, setInquiryVehicle] = useState<string | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white pb-16 md:pb-0 selection:bg-brand-primary selection:text-white overflow-x-hidden overflow-y-scroll">
      <Navbar onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />
      
      <main>
        <Hero />
        
        <Inventory onVehicleSelect={setSelectedVehicle} />
        
        <Services />

        <FAQ />
        
        {/* Contact CTA Section */}
        <section id="contact" className="py-24 px-6 bg-brand-surface">
          <div className="max-w-4xl mx-auto text-center border border-brand-border bg-white p-10 md:p-16 rounded-2xl relative overflow-hidden shadow-sm">
            <h2 className="text-4xl md:text-5xl font-semibold text-brand-dark mb-6 tracking-tight italic">
              Need Help Choosing?
            </h2>
            <p className="text-brand-text-muted max-w-lg mx-auto mb-10 text-sm leading-relaxed font-medium">
              Message Habibi & Shaun with your arrival port, travel dates, and group size. The team can recommend the right ride before you reach Siquijor.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => setInquiryVehicle('right rental for my Siquijor trip')} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-8 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 active:scale-[0.98]">
                Start booking request
              </button>
              <a href={BUSINESS.messengerUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand-border bg-white px-8 text-sm font-semibold text-brand-dark transition-all hover:border-brand-primary hover:text-brand-primary active:scale-[0.98]">
                Message on Messenger
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Vehicle Detail Modal */}
      <VehicleDetail 
        vehicle={selectedVehicle} 
        onClose={() => setSelectedVehicle(null)} 
        onStartInquiry={setInquiryVehicle}
      />

      <BookingInquiryModal
        vehicleName={inquiryVehicle}
        isOpen={Boolean(inquiryVehicle)}
        onClose={() => setInquiryVehicle(null)}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <MobileStickyCTA onStartInquiry={() => setInquiryVehicle('right rental for my Siquijor trip')} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
