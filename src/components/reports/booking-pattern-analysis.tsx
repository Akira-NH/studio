"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { analyzeBookingPatterns, BookingPatternAnalysisOutput } from "@/ai/flows/booking-pattern-analysis";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Lightbulb } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  historicalBookingData: z.string().min(10, "Please provide more detailed booking data."),
});

export function BookingPatternAnalysisTool() {
  const [result, setResult] = useState<BookingPatternAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalBookingData: '{"bookings": [{"date": "2023-06-15", "roomType": "Double", "bookings": 5}, {"date": "2023-07-20", "roomType": "Suite", "bookings": 3}]}',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await analyzeBookingPatterns(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the data.",
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
            name="historicalBookingData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Booking Data (JSON)</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Enter historical booking data in JSON format..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Patterns"}
          </Button>
        </form>
      </Form>

      {isLoading && <AnalysisSkeleton />}
      
      {result && (
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Peak Seasons</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.peakSeasons.map((season, i) => <Badge key={i} variant="secondary">{season}</Badge>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Popular Room Types</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.popularRoomTypes.map((type, i) => <Badge key={i} variant="secondary">{type}</Badge>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Optimal Pricing Suggestions</h3>
              <p className="text-muted-foreground">{result.optimalPricingSuggestions}</p>
            </div>
            <div>
              <h3 className="font-semibold">Availability Adjustments</h3>
              <p className="text-muted-foreground">{result.availabilityAdjustments}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AnalysisSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
            </CardContent>
        </Card>
    )
}
