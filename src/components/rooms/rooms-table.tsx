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
import type { Room } from '@/lib/types';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  'Available': 'default',
  'Occupied': 'secondary',
  'Under Maintenance': 'destructive',
};

export function RoomsTable({ data }: { data: Room[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room No.</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amenities</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((room) => (
          <TableRow key={room.id}>
            <TableCell className="font-medium">{room.roomNumber}</TableCell>
            <TableCell>{room.type}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[room.status]}>{room.status}</Badge>
            </TableCell>
            <TableCell>{room.amenities.join(', ')}</TableCell>
            <TableCell className="text-right">${room.price.toFixed(2)}</TableCell>
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
                    Delete
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
