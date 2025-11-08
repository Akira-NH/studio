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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  type: z.enum(['Single', 'Double', 'Suite', 'Deluxe']),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  amenities: z.string().min(1, "Amenities are required"),
});

export function RoomForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: "",
      type: 'Single',
      price: 0,
      amenities: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Room Saved",
      description: `Room ${values.roomNumber} has been successfully saved.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per night</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 150" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities (comma-separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Wi-Fi, TV, Air Conditioning" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Save Room
        </Button>
      </form>
    </Form>
  );
}
