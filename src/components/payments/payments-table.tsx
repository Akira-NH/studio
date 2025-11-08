import { MoreHorizontal } from 'lucide-react';
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
import type { Payment } from '@/lib/types';
import { format } from 'date-fns';

export function PaymentsTable({ data }: { data: Payment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Booking ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.guestName}</TableCell>
            <TableCell>{payment.bookingId}</TableCell>
            <TableCell>{format(payment.paymentDate, 'PPP')}</TableCell>
            <TableCell>
              <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'}>{payment.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
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
                  <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unpaid</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
