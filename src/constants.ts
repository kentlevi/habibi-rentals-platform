import { Vehicle, AppLocation } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'scooter-1',
    make: 'Honda',
    model: 'Click 125i',
    type: 'Scooter',
    pricePerDay: 500,
    status: 'available',
    totalUnits: 10,
    features: ['Fuel Efficient', 'Helmet Included', 'Easy Handling'],
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'scooter-2',
    make: 'Yamaha',
    model: 'Aerox 155',
    type: 'Scooter',
    pricePerDay: 700,
    status: 'available',
    totalUnits: 5,
    features: ['Sporty Design', 'LCD Console', 'Spacious Compartment'],
    images: ['https://images.unsplash.com/photo-1558981403-c5f91eb1238e?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'Innova',
    type: 'SUV',
    pricePerDay: 2500,
    status: 'available',
    totalUnits: 2,
    features: ['7 Seater', 'Full Aircon', 'Diesel Engine'],
    images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'car-2',
    make: 'Suzuki',
    model: 'Jimny',
    type: 'SUV',
    pricePerDay: 3500,
    status: 'available',
    totalUnits: 1,
    features: ['4x4 Capability', 'Iconic Design', 'Compact for Island Roads'],
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800']
  }
];

export const LOCATIONS: AppLocation[] = [
  { id: 'loc-1', name: 'Siquijor Port (Main)', type: 'Port', deliveryFee: 0 },
  { id: 'loc-2', name: 'Larena Port', type: 'Port', deliveryFee: 200 },
  { id: 'loc-3', name: 'San Juan Beach Area', type: 'Resort', deliveryFee: 300 },
  { id: 'loc-4', name: 'Paliton Beach', type: 'Resort', deliveryFee: 350 },
  { id: 'loc-5', name: 'Velocis HQ - Siquijor', type: 'Office', deliveryFee: 0 }
];
