import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, Gauge, Fuel } from 'lucide-react';
import { Vehicle, FilterOptions, VehicleType } from '../types';
import { VEHICLES } from '../constants';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onView }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group bg-white border border-brand-border rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
      onClick={() => onView(vehicle)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight text-brand-dark shadow-sm">
          Island Fleet
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-brand-dark leading-tight">{vehicle.make} {vehicle.model}</h3>
          <div className="text-brand-primary font-black text-xl">
            ₱{vehicle.pricePerDay}
            <span className="text-[10px] text-slate-400 font-medium ml-1">/DAY</span>
          </div>
        </div>
        <p className="text-xs text-brand-text-muted mb-4">{vehicle.type} • {vehicle.features[0]}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button className="py-2.5 bg-brand-surface border border-brand-border text-brand-text-muted text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
            Terms
          </button>
          <button className="py-2.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md shadow-brand-primary/20">
            Select Unit
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Inventory({ onVehicleSelect }: { onVehicleSelect: (v: Vehicle) => void }) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    type: 'All',
    minPrice: 0,
    maxPrice: 500000
  });

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      const matchesSearch = `${v.make} ${v.model}`.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'All' || v.type === filters.type;
      const matchesPrice = v.pricePerDay >= filters.minPrice && v.pricePerDay <= filters.maxPrice;
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [filters]);

  const vehicleTypes: (VehicleType | 'All')[] = ['All', 'Scooter', 'Car', 'SUV'];

  return (
    <section id="inventory" className="py-24 px-6 bg-brand-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              Featured Inventory 
              <span className="text-slate-400 font-normal ml-3 text-lg">({filteredVehicles.length} Vehicles Available)</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search fleet..."
                className="bg-white border border-brand-border rounded-xl py-3 pl-12 pr-6 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all w-full md:w-64"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {vehicleTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilters(prev => ({ ...prev, type }))}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${
                filters.type === type 
                  ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg shadow-brand-secondary/20' 
                  : 'bg-white border-brand-border text-slate-500 hover:border-slate-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onView={onVehicleSelect}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
            <p className="text-white/40 font-medium">No vehicles found matching your criteria.</p>
            <button 
              onClick={() => setFilters({ search: '', type: 'All', minPrice: 0, maxPrice: 500000 })}
              className="mt-4 text-brand-gold font-bold uppercase text-xs tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
