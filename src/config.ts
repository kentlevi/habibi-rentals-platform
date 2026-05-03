import { BookingInquiry } from './types';

export const BUSINESS = {
  name: 'Habibi & Shaun Rentals Siquijor',
  shortName: 'Habibi & Shaun Rentals',
  phone: '+63 912 345 6789',
  email: 'bookings@habibiandshaun.ph',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61577655336928',
  messengerUrl: 'https://m.me/61577655336928',
  whatsappNumber: '639123456789',
  location: 'Siquijor Port, Siquijor, Philippines',
};

export const ADMIN_EMAILS = ['kentlevidungog@gmail.com', 'skaelex1@gmail.com', 'shaun.crissa@example.com'];

// Temporary testing switch. Set to false before sharing the admin URL publicly.
export const TEST_ADMIN_BYPASS = true;

export function buildBookingMessage(vehicleName: string) {
  return [
    `Hi ${BUSINESS.shortName}!`,
    `I want to book the ${vehicleName}.`,
    'Pickup location:',
    'Pickup date:',
    'Drop-off date:',
    'Name:',
  ].join('\n');
}

export function buildWhatsAppUrl(vehicleName: string) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(buildBookingMessage(vehicleName))}`;
}

export function buildInquiryMessage(inquiry: BookingInquiry) {
  return [
    `Hi ${BUSINESS.shortName}!`,
    `I want to book: ${inquiry.vehicleName}`,
    `Name: ${inquiry.customerName}`,
    `Contact: ${inquiry.contact}`,
    `Pickup location: ${inquiry.pickupLocation}`,
    `Pickup date: ${inquiry.startDate}`,
    `Drop-off date: ${inquiry.endDate}`,
    inquiry.notes ? `Notes: ${inquiry.notes}` : '',
  ].filter(Boolean).join('\n');
}

export function buildInquiryWhatsAppUrl(inquiry: BookingInquiry) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(buildInquiryMessage(inquiry))}`;
}
