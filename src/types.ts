export type VehicleType = 'motorbike' | 'car' | 'van' | 'tuktuk';
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Vehicle {
  id: string;
  type: VehicleType;
  model_name: string;
  plate_number: string;
  daily_rate: number;
  status?: 'available' | 'maintenance' | 'retired';
  images?: string[];
  features?: string[];
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

export interface Reservation {
  id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  status: ReservationStatus;
  userId?: string;
  customerName?: string;
  totalPrice?: number;
}
