"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAvailabilityRecommendations, AvailabilityRecommendationsOutput } from "@/ai/flows/availability-adjustment-recommendations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Lightbulb, Percent } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  currentOccupancyRate: z.coerce.number().min(0).max(100, "Occupancy must be between 0 and 100."),
  historicalBookingData: z.string().min(10, "Please provide historical data."),
  upcomingEvents: z.string().min(10, "Please provide info on upcoming events."),
});

export function AvailabilityRecommendationsTool() {
  const [result, setResult] = useState<AvailabilityRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentOccupancyRate: 75,
      historicalBookingData: "Last year, occupancy was 90% during the summer festival. Mid-week bookings are generally low.",
      upcomingEvents: "City Marathon next weekend. Tech conference in two weeks.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await getAvailabilityRecommendations(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Recommendation Failed",
        description: "An error occurred while generating recommendations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentOccupancyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Occupancy Rate</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="number" className="pl-8" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="historicalBookingData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Booking Data</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upcomingEvents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upcoming Events</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Get Recommendations"}
          </Button>
        </form>
      </Form>

      {isLoading && <RecommendationSkeleton />}

      {result && (
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-accent" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Actionable Advice</h3>
                <Badge variant={result.confidenceLevel === 'High' ? 'default' : 'secondary'}>
                    Confidence: {result.confidenceLevel}
                </Badge>
            </div>
            <p className="text-muted-foreground">{result.recommendations}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RecommendationSkeleton() {
    return (
        <Card>
            <CardHeader>
                 <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </CardContent>
        </Card>
    )
}
