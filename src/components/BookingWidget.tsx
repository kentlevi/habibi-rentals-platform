import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import { LOCATIONS } from '../constants';
import { motion } from 'motion/react';
import { BookingSearch, VehicleType } from '../types';
import DatePicker from './DatePicker';

export default function BookingWidget() {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string | null>(null);
  const [pickupLoc, setPickupLoc] = useState(LOCATIONS[0].id);
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType>('motorbike');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!endDate) return;

    const pickupLocation = LOCATIONS.find(l => l.id === pickupLoc) || LOCATIONS[0];
    const search: BookingSearch = {
      vehicleType,
      pickupLocationId: pickupLocation.id,
      pickupLocationName: pickupLocation.name,
      startDate,
      endDate,
    };

    const inventorySection = document.getElementById('inventory');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('updateBookingSearch', { detail: search }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 relative z-30 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-brand-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-1 bg-brand-surface p-1.5 rounded-xl w-fit relative">
            {(['motorbike', 'car', 'van', 'tuktuk'] as VehicleType[]).map((type) => (
              <button 
                key={type}
                onClick={() => setVehicleType(type)}
                className={`relative px-5 py-3 rounded-lg text-sm font-semibold transition-all z-10 ${vehicleType === type ? 'text-brand-dark' : 'text-brand-text-muted hover:text-brand-dark'}`}
              >
                {vehicleType === type && (
                  <motion.div
                    layoutId="activeWidgetTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.04]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{type === 'motorbike' ? 'Motorbikes' : type === 'car' ? 'Cars' : type === 'van' ? 'Vans' : 'Tuktuks'}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-text-muted">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
               Instant pick-up
             </div>
             <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
             <div>Gcash / card accepted</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex flex-col gap-2 relative flex-[1.2]" ref={dropdownRef}>
            <label className="ml-2 text-xs font-semibold text-brand-text-muted">Pick-up location</label>
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
            >
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted transition-colors group-hover:text-brand-dark z-10" />
              <div className="w-full bg-brand-surface rounded-xl h-[56px] pl-12 pr-10 flex items-center text-sm font-semibold text-brand-dark transition-all hover:bg-[#E8E6E1]">
                <span className="truncate">{LOCATIONS.find(l => l.id === pickupLoc)?.name || 'Select Location'}</span>
              </div>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
            </div>

            {isLocDropdownOpen && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[240px] bg-white border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="max-h-[300px] overflow-y-auto">
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setPickupLoc(loc.id);
                        setIsLocDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-brand-surface transition-colors flex items-center justify-between"
                    >
                      <span className={`text-sm font-semibold ${pickupLoc === loc.id ? 'text-brand-primary' : 'text-brand-dark'}`}>
                        {loc.name}
                      </span>
                      {pickupLoc === loc.id && <Check className="w-4 h-4 text-brand-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-[1.5] relative" ref={dateDropdownRef}>
             <label className="ml-2 text-xs font-semibold text-brand-text-muted">Duration</label>
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted transition-colors group-hover:text-brand-dark z-10 pointer-events-none" />
              <div className="flex items-center pl-12 pr-4 bg-brand-surface rounded-xl h-[56px] overflow-hidden hover:bg-[#E8E6E1] transition-all group-hover:bg-[#E8E6E1] ring-0 focus-within:ring-0">
                <div className="relative flex-1 h-full transition-colors group/start">
                  <div className="absolute inset-0 flex items-center text-sm font-semibold text-brand-dark truncate pointer-events-none transition-colors group-hover/start:text-brand-primary">
                    {startDate ? format(new Date(startDate), 'MMM d, yyyy') : 'Select date'}
                  </div>
                </div>
                
                <div className="w-[1px] h-8 bg-brand-border/50 shrink-0 mx-4"></div>

                <div className="relative flex-1 h-full transition-colors group/end">
                  <div className="absolute inset-0 flex items-center text-sm font-semibold text-brand-dark truncate pointer-events-none transition-colors group-hover/end:text-brand-primary">
                    {endDate ? format(new Date(endDate), 'MMM d, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </div>

            {isDateDropdownOpen && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 z-50 shadow-2xl rounded-xl border border-brand-border bg-white"
              >
                <DatePicker 
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  onClose={() => setIsDateDropdownOpen(false)}
                />
              </div>
            )}
          </div>

          <div className="h-[56px] flex items-end shrink-0 w-full lg:w-auto">
            <button 
              onClick={handleSearch}
              disabled={!endDate}
              className="flex h-[56px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-brand-dark px-8 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(13,22,38,0.15)] transition-all hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 disabled:active:scale-100 lg:w-auto"
            >
              <>
                Search Available Fleet
                <ArrowRight className="w-5 h-5" />
              </>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
