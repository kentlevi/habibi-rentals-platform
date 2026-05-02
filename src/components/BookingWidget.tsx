import React, { useState } from 'react';
import { Calendar, MapPin, Search, ArrowRight, User } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { LOCATIONS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingWidget() {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [pickupLoc, setPickupLoc] = useState(LOCATIONS[0].id);
  const [vehicleType, setVehicleType] = useState<'Scooter' | 'SUV'>('Scooter');

  return (
    <div className="w-full max-w-4xl mx-auto -mt-16 relative z-30 px-4">
      <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 border border-brand-border">
        <div className="flex gap-2 mb-8 bg-brand-surface p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setVehicleType('Scooter')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${vehicleType === 'Scooter' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-dark'}`}
          >
            Motorbikes
          </button>
          <button 
            onClick={() => setVehicleType('SUV')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${vehicleType === 'SUV' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-dark'}`}
          >
            4-Wheel Cars
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Pick-up Location</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary" />
              <select 
                value={pickupLoc}
                onChange={(e) => setPickupLoc(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/20 appearance-none transition-all group-hover:border-brand-primary/50"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary" />
              <div className="flex bg-brand-surface border border-brand-border rounded-2xl overflow-hidden group-hover:border-brand-primary/50 transition-all">
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent py-4 pl-12 pr-2 text-xs font-bold text-brand-dark focus:outline-none border-r border-brand-border"
                />
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent py-4 px-2 text-xs font-bold text-brand-dark focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button 
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-95"
            >
              Search Available Fleet
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-bold text-brand-text-muted uppercase tracking-widest">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
             Manual Confirmations Removed
           </div>
           <div className="w-1 h-1 rounded-full bg-slate-300"></div>
           <div>Instant Port Pick-up</div>
           <div className="w-1 h-1 rounded-full bg-slate-300"></div>
           <div>Gcash / Card Accepted</div>
        </div>
      </div>
    </div>
  );
}
