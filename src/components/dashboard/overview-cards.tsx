import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, BedDouble, CalendarCheck, Users } from 'lucide-react';
import { mockBookings, mockGuests, mockRooms } from '@/lib/data';

export function OverviewCards() {
  const totalRevenue = mockBookings.reduce((acc, booking) => acc + booking.totalAmount, 0);
  const occupiedRooms = mockRooms.filter(room => room.status === 'Occupied').length;
  const occupancyRate = (occupiedRooms / mockRooms.length) * 100;
  const totalBookings = mockBookings.length;
  const totalGuests = mockGuests.length;

  const cardData = [
    {
      title: 'Total Revenue',
      icon: DollarSign,
      value: `$${totalRevenue.toLocaleString()}`,
      description: 'Total revenue from all bookings',
    },
    {
      title: 'Occupancy Rate',
      icon: BedDouble,
      value: `${occupancyRate.toFixed(1)}%`,
      description: 'Currently occupied rooms',
    },
    {
      title: 'Total Bookings',
      icon: CalendarCheck,
      value: `+${totalBookings}`,
      description: 'Total bookings made',
    },
    {
      title: 'Total Guests',
      icon: Users,
      value: `+${totalGuests}`,
      description: 'Total guests registered',
    },
  ];

  return (
    <>
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
