import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Booking } from '@/lib/types';
import { format } from 'date-fns';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' } = {
  'Confirmed': 'default',
  'Checked-in': 'secondary',
  'Checked-out': 'outline',
  'Cancelled': 'destructive',
};

export function BookingsTable({ data }: { data: Booking[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
                <div className="font-medium">{booking.guest.name}</div>
                <div className="text-sm text-muted-foreground">{booking.guest.email}</div>
            </TableCell>
            <TableCell>{booking.roomNumber}</TableCell>
            <TableCell>{format(booking.checkIn, 'PPP')}</TableCell>
            <TableCell>{format(booking.checkOut, 'PPP')}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${booking.totalAmount.toFixed(2)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel Booking
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
