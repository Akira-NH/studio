"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { pricingSuggestionTool, PricingSuggestionOutput } from "@/ai/flows/pricing-suggestion-tool";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Lightbulb } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  bookingTrends: z.string().min(10, "Please provide booking trends."),
  seasonality: z.string().min(10, "Please provide seasonality info."),
  competitorPricing: z.string().min(10, "Please provide competitor pricing info."),
  currentPrice: z.coerce.number().min(0, "Current price must be a positive number."),
});

export function PricingSuggestionTool() {
  const [result, setResult] = useState<PricingSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingTrends: "High occupancy on weekends, lower on weekdays. Average lead time is 2 weeks.",
      seasonality: "Peak season in summer (June-August), off-peak in winter (December-February).",
      competitorPricing: "Competitor A: $180/night, Competitor B: $220/night with breakfast.",
      currentPrice: 200,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await pricingSuggestionTool(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Suggestion Failed",
        description: "An error occurred while generating the price suggestion.",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bookingTrends"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Trends</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seasonality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seasonality</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitorPricing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competitor Pricing</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="currentPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Getting Suggestion..." : "Get Price Suggestion"}
          </Button>
        </form>
      </Form>

      {isLoading && <SuggestionSkeleton />}

      {result && (
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Pricing Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-4">
                <p className="text-4xl font-bold text-primary">${result.suggestedPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">suggested price</p>
            </div>
            <div>
              <h3 className="font-semibold">Reasoning</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SuggestionSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-baseline gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
            </CardContent>
        </Card>
    )
}
