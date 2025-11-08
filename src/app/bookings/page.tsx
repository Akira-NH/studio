import { PlusCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookingsTable } from '@/components/bookings/bookings-table';
import { mockBookings } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookingForm } from '@/components/bookings/booking-form';

export default function BookingsPage() {
  return (
    <DashboardLayout pageTitle="Bookings Management">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>
                Fill in the form below to create a new reservation.
              </DialogDescription>
            </DialogHeader>
            <BookingForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            An overview of all reservations at Hotel Imperial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookingsTable data={mockBookings} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
