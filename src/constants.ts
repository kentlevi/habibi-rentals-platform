import { Vehicle, AppLocation } from './types';

export const VEHICLES: Vehicle[] = [
  // VANS
  {
    id: 'vehicle-hiace',
    model_name: 'Toyota Hiace Commuter Deluxe',
    type: 'van',
    plate_number: 'TBD-001',
    daily_rate: 4500, // coastal
    status: 'available',
    features: ['Coastal: ₱4,500/day', 'Mountain: ₱5,000/day', 'With Driver & Gas'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/8/80/2020_Toyota_HiAce_%28front%29.jpg']
  },
  {
    id: 'vehicle-tamaraw',
    model_name: 'Toyota Tamaraw Commuter',
    type: 'van',
    plate_number: 'TBD-002',
    daily_rate: 4500,
    status: 'available',
    features: ['Coastal: ₱4,500/day', 'Mountain: ₱5,000/day', 'With Driver & Gas'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/5/53/1997_Toyota_Kijang_1.8_SSX_%28Indonesia%29_front_view.jpg']
  },
  // CARS
  {
    id: 'vehicle-vios',
    model_name: 'Toyota Vios',
    type: 'car',
    plate_number: 'TBD-003',
    daily_rate: 2200,
    status: 'available',
    features: ['Self Drive', '5 Seater', 'Sedan'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/a/a3/Toyota_Vios_1.5_VVT-i_G_%28IV%29_%E2%80%93_f_13032025.jpg']
  },
  {
    id: 'vehicle-spresso',
    model_name: 'Suzuki S-Presso',
    type: 'car',
    plate_number: 'TBD-004',
    daily_rate: 2000,
    status: 'available',
    features: ['Self Drive (Manual)', 'Compact', 'Fuel Efficient'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/d/d1/Red_Suzuki_S-Presso_1.0_GLX_2021.jpg']
  },
  {
    id: 'vehicle-avanza',
    model_name: 'Toyota Avanza',
    type: 'car',
    plate_number: 'TBD-005',
    daily_rate: 2700,
    status: 'available',
    features: ['Self Drive', '7 Seater', 'MPV'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg']
  },
  // TUKTUK
  {
    id: 'vehicle-tuktuk',
    model_name: 'Bajaj Tuktuk',
    type: 'tuktuk',
    plate_number: 'TBD-006',
    daily_rate: 1300,
    status: 'available',
    features: ['Self Drive (Manual)', 'Island Vibes', '3 Seater'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/4/49/Bajaj_auto-rickshaw_in_Sri_Lanka.jpg']
  },
  // MOTORBIKES
  {
    id: 'vehicle-beat',
    model_name: 'Honda Beat 110cc',
    type: 'motorbike',
    plate_number: 'TBD-007',
    daily_rate: 350,
    status: 'available',
    features: ['No gas inclusion', 'Automatic', 'Two Helmets'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Honda_Scooter_BEAT_in_the_Honda_Collection_Hall..JPG']
  },
  {
    id: 'vehicle-fazzio',
    model_name: 'Yamaha Fazzio 125cc',
    type: 'motorbike',
    plate_number: 'TBD-008',
    daily_rate: 550,
    status: 'available',
    features: ['No gas inclusion', 'Classic Style', 'Two Helmets'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/0/01/2022_Yamaha_Fazzio_Smart_Key.png']
  },
  {
    id: 'vehicle-crf',
    model_name: 'Honda CRF 150L',
    type: 'motorbike',
    plate_number: 'TBD-009',
    daily_rate: 700,
    status: 'available',
    features: ['No gas inclusion', 'Dirt Bike', 'Two Helmets'],
    images: ['https://upload.wikimedia.org/wikipedia/commons/c/c8/Honda_CRF150L_-_Indonesia_International_Motor_Show_2018_-_April_26_2018.jpg']
  }
];

export const LOCATIONS: AppLocation[] = [
  { id: 'loc-1', name: 'Siquijor Port (Main)', type: 'Port', deliveryFee: 0 },
  { id: 'loc-2', name: 'Larena Port', type: 'Port', deliveryFee: 200 },
  { id: 'loc-3', name: 'San Juan Beach Area', type: 'Resort', deliveryFee: 300 },
  { id: 'loc-4', name: 'Paliton Beach', type: 'Resort', deliveryFee: 350 },
  { id: 'loc-5', name: 'Velocis HQ - Siquijor', type: 'Office', deliveryFee: 0 }
];
