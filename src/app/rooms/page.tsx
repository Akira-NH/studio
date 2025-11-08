import { PlusCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RoomsTable } from '@/components/rooms/rooms-table';
import { mockRooms } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RoomForm } from '@/components/rooms/room-form';

export default function RoomsPage() {
  return (
    <DashboardLayout pageTitle="Rooms Management">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new room to the system.
              </DialogDescription>
            </DialogHeader>
            <RoomForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Room List</CardTitle>
          <CardDescription>
            A list of all rooms in Hotel Imperial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoomsTable data={mockRooms} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
