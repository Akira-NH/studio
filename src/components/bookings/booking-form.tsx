"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockGuests, mockRooms } from "@/lib/data";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

const formSchema = z.object({
  guestId: z.string().min(1, "Guest is required"),
  roomId: z.string().min(1, "Room is required"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export function BookingForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestId: "",
      roomId: "",
      dates: {
        from: new Date(),
        to: addDays(new Date(), 5),
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Booking Created",
      description: `Reservation has been successfully created.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="guestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a guest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockGuests.map(guest => (
                    <SelectItem key={guest.id} value={guest.id}>{guest.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockRooms.filter(r => r.status === 'Available').map(room => (
                    <SelectItem key={room.id} value={room.id}>
                      Room {room.roomNumber} ({room.type}) - ${room.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Check-in / Check-out Dates</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                            field.value.to ? (
                            <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                            </>
                            ) : (
                            format(field.value.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value as DateRange}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full mt-4">
          Create Booking
        </Button>
      </form>
    </Form>
  );
}
