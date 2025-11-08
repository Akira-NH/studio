export type Room = {
  id: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  price: number;
  status: 'Available' | 'Occupied' | 'Under Maintenance';
  amenities: string[];
};

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type Booking = {
  id: string;
  guest: Pick<Guest, 'name' | 'email'>;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled';
  totalAmount: number;
};

export type Payment = {
  id: string;
  bookingId: string;
  guestName: string;
  amount: number;
  paymentDate: Date;
  status: 'Paid' | 'Unpaid';
};
