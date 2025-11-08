'use server';

/**
 * @fileOverview AI-powered recommendations for adjusting room availability based on anticipated demand.
 *
 * - getAvailabilityRecommendations - A function that generates recommendations for adjusting room availability.
 * - AvailabilityRecommendationsInput - The input type for the getAvailabilityRecommendations function.
 * - AvailabilityRecommendationsOutput - The return type for the getAvailabilityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AvailabilityRecommendationsInputSchema = z.object({
  currentOccupancyRate: z.number().describe('The current occupancy rate of the hotel (as a percentage).'),
  historicalBookingData: z.string().describe('Historical booking data, including dates, room types, and occupancy rates.'),
  upcomingEvents: z.string().describe('Information about upcoming events or holidays that may affect demand.'),
});
export type AvailabilityRecommendationsInput = z.infer<typeof AvailabilityRecommendationsInputSchema>;

const AvailabilityRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('Specific recommendations for adjusting room availability to improve occupancy rates.'),
  confidenceLevel: z.string().describe('The AI model confidence level in the generated recommendations (e.g., High, Medium, Low).'),
});
export type AvailabilityRecommendationsOutput = z.infer<typeof AvailabilityRecommendationsOutputSchema>;

export async function getAvailabilityRecommendations(input: AvailabilityRecommendationsInput): Promise<AvailabilityRecommendationsOutput> {
  return availabilityAdjustmentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'availabilityAdjustmentRecommendationsPrompt',
  input: {schema: AvailabilityRecommendationsInputSchema},
  output: {schema: AvailabilityRecommendationsOutputSchema},
  prompt: `You are a hotel management expert specializing in revenue optimization.
  Based on the provided data, analyze booking patterns and suggest optimal pricing and availability adjustments.

  Current Occupancy Rate: {{{currentOccupancyRate}}}
  Historical Booking Data: {{{historicalBookingData}}}
  Upcoming Events: {{{upcomingEvents}}}

  Provide clear and actionable recommendations to improve occupancy rates, along with a confidence level for each recommendation.
  Be specific to the current occupancy, historical data and upcoming events when making recommendations.
  `,
});

const availabilityAdjustmentRecommendationsFlow = ai.defineFlow(
  {
    name: 'availabilityAdjustmentRecommendationsFlow',
    inputSchema: AvailabilityRecommendationsInputSchema,
    outputSchema: AvailabilityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
