import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, Gauge, Fuel } from 'lucide-react';
import { Vehicle, FilterOptions, VehicleType } from '../types';
import { VEHICLES } from '../constants';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView: (vehicle: Vehicle) => void;
}

const VehicleCard = React.memo(({ vehicle, onView }: VehicleCardProps) => {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(13,22,38,0.04)] hover:shadow-[0_16px_32px_rgba(13,22,38,0.08)] flex flex-col h-full"
      onClick={() => onView(vehicle)}
    >
      <div className="relative aspect-[16/10] bg-[#F8F9FA] overflow-hidden shrink-0">
        <img 
          src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'} 
          alt={vehicle.model_name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-dark shadow-sm">
          Island Fleet
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-sans text-xl font-semibold text-brand-dark leading-snug line-clamp-2">{vehicle.model_name}</h3>
          <div className="text-brand-dark font-semibold text-lg whitespace-nowrap flex-shrink-0 text-right leading-none">
            ₱{vehicle.daily_rate}
            <span className="text-[9px] text-brand-text-muted font-semibold block uppercase tracking-widest mt-1.5">/DAY</span>
          </div>
        </div>
        <p className="text-xs font-semibold text-brand-text-muted mb-6 capitalize">{vehicle.type} • {vehicle.features?.[0] || 'Basic Features'}</p>

        <div className="mt-auto flex items-center justify-between border-t border-brand-border/50 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Available Now</span>
          <ArrowUpRight className="w-5 h-5 text-brand-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
});

export default function Inventory({ onVehicleSelect }: { onVehicleSelect: (v: Vehicle) => void }) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    type: 'All',
    minPrice: 0,
    maxPrice: 500000
  });

  React.useEffect(() => {
    const handleUpdateFilter = (event: Event) => {
      const customEvent = event as CustomEvent<VehicleType>;
      setFilters(prev => ({ ...prev, type: customEvent.detail }));
    };
    window.addEventListener('updateVehicleTypeFilter', handleUpdateFilter);
    return () => window.removeEventListener('updateVehicleTypeFilter', handleUpdateFilter);
  }, []);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      const matchesSearch = v.model_name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'All' || v.type === filters.type;
      const matchesPrice = v.daily_rate >= filters.minPrice && v.daily_rate <= filters.maxPrice;
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [filters]);

  const vehicleTypes: (VehicleType | 'All')[] = ['All', 'motorbike', 'car', 'van', 'tuktuk'];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'motorbike': return 'Motorbikes';
      case 'car': return 'Cars';
      case 'van': return 'Vans (With Driver)';
      case 'tuktuk': return 'Tuktuks';
      case 'All': return 'All Fleet';
      default: return type;
    }
  };

  return (
    <section id="inventory" className="py-24 px-6 bg-brand-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-brand-dark tracking-tight">
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
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                filters.type === type 
                  ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg shadow-brand-secondary/20' 
                  : 'bg-white border-brand-border text-slate-500 hover:border-slate-400'
              }`}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
                key={vehicle.id}
                className="h-full"
              >
                <VehicleCard 
                  vehicle={vehicle} 
                  onView={onVehicleSelect}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="py-20 text-center border border-dashed border-brand-border rounded-xl">
            <p className="text-brand-text-muted font-medium">No vehicles found matching your criteria.</p>
            <button 
              onClick={() => setFilters({ search: '', type: 'All', minPrice: 0, maxPrice: 500000 })}
              className="mt-4 text-brand-primary font-semibold uppercase text-xs tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
