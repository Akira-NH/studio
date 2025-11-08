import { PlusCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GuestsTable } from '@/components/guests/guests-table';
import { mockGuests } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GuestForm } from '@/components/guests/guest-form';

export default function GuestsPage() {
  return (
    <DashboardLayout pageTitle="Guests Management">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
              <DialogDescription>
                Enter the guest's information below.
              </DialogDescription>
            </DialogHeader>
            <GuestForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
          <CardDescription>
            A list of all guests who have stayed at Hotel Imperial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GuestsTable data={mockGuests} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
