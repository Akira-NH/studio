import { Room, Guest, Booking, Payment } from '@/lib/types';

export const mockRooms: Room[] = [
  { id: '1', roomNumber: '101', type: 'Single', price: 150, status: 'Available', amenities: ['Wi-Fi', 'TV', 'Air Conditioning'] },
  { id: '2', roomNumber: '102', type: 'Double', price: 200, status: 'Occupied', amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'] },
  { id: '3', roomNumber: '201', type: 'Suite', price: 350, status: 'Available', amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Jacuzzi', 'Balcony'] },
  { id: '4', roomNumber: '202', type: 'Deluxe', price: 250, status: 'Under Maintenance', amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Sea View'] },
  { id: '5', roomNumber: '301', type: 'Single', price: 160, status: 'Available', amenities: ['Wi-Fi', 'TV', 'Air Conditioning'] },
  { id: '6', roomNumber: '302', type: 'Double', price: 210, status: 'Available', amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'] },
];

export const mockGuests: Guest[] = [
  { id: 'g1', name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA' },
  { id: 'g2', name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', address: '456 Oak Ave, Anytown, USA' },
  { id: 'g3', name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', address: '789 Pine Ln, Anytown, USA' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', guest: { name: 'Bob Smith', email: 'bob@example.com' }, roomNumber: '102', checkIn: new Date('2024-07-20'), checkOut: new Date('2024-07-25'), status: 'Checked-in', totalAmount: 1000 },
  { id: 'b2', guest: { name: 'Alice Johnson', email: 'alice@example.com' }, roomNumber: '201', checkIn: new Date('2024-08-01'), checkOut: new Date('2024-08-05'), status: 'Confirmed', totalAmount: 1400 },
  { id: 'b3', guest: { name: 'Charlie Brown', email: 'charlie@example.com' }, roomNumber: '101', checkIn: new Date('2024-07-18'), checkOut: new Date('2024-07-19'), status: 'Checked-out', totalAmount: 150 },
];

export const mockPayments: Payment[] = [
  { id: 'p1', bookingId: 'b1', guestName: 'Bob Smith', amount: 1000, paymentDate: new Date('2024-07-20'), status: 'Paid' },
  { id: 'p2', bookingId: 'b2', guestName: 'Alice Johnson', amount: 1400, paymentDate: new Date('2024-08-01'), status: 'Unpaid' },
  { id: 'p3', bookingId: 'b3', guestName: 'Charlie Brown', amount: 150, paymentDate: new Date('2024-07-18'), status: 'Paid' },
];
