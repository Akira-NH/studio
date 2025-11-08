import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentBookingsChart } from '@/components/dashboard/recent-bookings-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockBookings } from '@/lib/data';

export default function DashboardPage() {
  const recentBookings = mockBookings.slice(0, 5);

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <OverviewCards />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              A summary of your hotel's revenue over the last months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              A chart showing bookings from the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentBookingsChart />
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Upcoming Check-ins</CardTitle>
          <CardDescription>
            Guests arriving in the next 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.guest.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.guest.email}
                    </div>
                  </TableCell>
                  <TableCell>{booking.roomNumber}</TableCell>
                  <TableCell>
                     <Badge 
                        variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                        className={booking.status === 'Cancelled' ? 'bg-destructive' : ''}
                      >
                       {booking.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="text-right">${booking.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
