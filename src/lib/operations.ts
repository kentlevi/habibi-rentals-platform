import { BookingInquiry, Vehicle } from '../types';

export type RequestStatus = 'New Inquiry' | 'Confirm Deposit' | 'Driver Assigned' | 'Picked Up' | 'Returned';
export type UnitStatus = NonNullable<Vehicle['status']>;

export interface DemoRequestRecord {
  id: string;
  name: string;
  vehicleId: string;
  vehicleName: string;
  loc: string;
  time: string;
  status: RequestStatus;
}

export type StoredInquiry = BookingInquiry & { id: string; createdAt: string };

const inquiryKey = 'habibi-shaun-demo-inquiries';
const requestKey = 'habibi-shaun-demo-requests';
const fleetKey = 'habibi-shaun-demo-fleet-statuses';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export async function saveBookingInquiry(inquiry: BookingInquiry) {
  const existing = readJson<StoredInquiry[]>(inquiryKey, []);
  const saved = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  writeJson(inquiryKey, [saved, ...existing].slice(0, 25));
  return saved;
}

export function getStoredInquiries() {
  return readJson<StoredInquiry[]>(inquiryKey, []);
}

export function getStoredRequests(fallback: DemoRequestRecord[]) {
  return readJson<DemoRequestRecord[]>(requestKey, fallback);
}

export function saveStoredRequests(requests: DemoRequestRecord[]) {
  writeJson(requestKey, requests);
}

export function getStoredFleetStatuses(fallback: Record<string, UnitStatus>) {
  return readJson<Record<string, UnitStatus>>(fleetKey, fallback);
}

export function saveStoredFleetStatuses(statuses: Record<string, UnitStatus>) {
  writeJson(fleetKey, statuses);
}
