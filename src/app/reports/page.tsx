import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingPatternAnalysisTool } from '@/components/reports/booking-pattern-analysis';
import { PricingSuggestionTool } from '@/components/reports/pricing-suggestion-tool';
import { AvailabilityRecommendationsTool } from '@/components/reports/availability-recommendations';

export default function ReportsPage() {
  return (
    <DashboardLayout pageTitle="AI-Powered Insights">
      <Tabs defaultValue="patterns">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Booking Patterns</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Suggestions</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Booking Pattern Analysis</CardTitle>
              <CardDescription>
                Analyze historical booking data to identify trends, peak seasons, and popular room types for pricing optimization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingPatternAnalysisTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Optimal Pricing Suggestion</CardTitle>
              <CardDescription>
                Get AI-driven price suggestions based on booking trends, seasonality, and competitor data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PricingSuggestionTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability Adjustment Recommendations</CardTitle>
              <CardDescription>
                Receive recommendations for adjusting room availability based on current occupancy and anticipated demand.
              </CardDescription>
            </CardHeader>
            <CardContent>
             <AvailabilityRecommendationsTool />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
