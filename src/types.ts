export type VehicleType = 'Scooter' | 'Car' | 'SUV';
export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  type: VehicleType;
  pricePerDay: number;
  images: string[];
  features: string[];
  status: 'available' | 'maintenance' | 'retired';
  totalUnits: number;
}

export interface AppLocation {
  id: string;
  name: string;
  type: 'Port' | 'Resort' | 'Office';
  deliveryFee: number;
}

export interface FilterOptions {
  search: string;
  type: VehicleType | 'All';
  minPrice: number;
  maxPrice: number;
}
export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  pickupLocation: string;
  returnLocation: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  documentUrl?: string;
}
