'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing hotel booking patterns
 * to provide insights for optimizing pricing and availability.
 *
 * - analyzeBookingPatterns - Analyzes booking data and returns insights.
 * - BookingPatternAnalysisInput - The input type for the analyzeBookingPatterns function.
 * - BookingPatternAnalysisOutput - The return type for the analyzeBookingPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookingPatternAnalysisInputSchema = z.object({
  historicalBookingData: z.string().describe('Historical booking data in JSON format.'),
});
export type BookingPatternAnalysisInput = z.infer<typeof BookingPatternAnalysisInputSchema>;

const BookingPatternAnalysisOutputSchema = z.object({
  peakSeasons: z.array(z.string()).describe('List of peak seasons.'),
  popularRoomTypes: z.array(z.string()).describe('List of popular room types.'),
  optimalPricingSuggestions: z.string().describe('Suggestions for optimal pricing.'),
  availabilityAdjustments: z.string().describe('Suggestions for availability adjustments.'),
});
export type BookingPatternAnalysisOutput = z.infer<typeof BookingPatternAnalysisOutputSchema>;

export async function analyzeBookingPatterns(input: BookingPatternAnalysisInput): Promise<BookingPatternAnalysisOutput> {
  return bookingPatternAnalysisFlow(input);
}

const bookingPatternAnalysisPrompt = ai.definePrompt({
  name: 'bookingPatternAnalysisPrompt',
  input: {schema: BookingPatternAnalysisInputSchema},
  output: {schema: BookingPatternAnalysisOutputSchema},
  prompt: `You are an AI hotel management expert. Analyze the following historical booking data to identify patterns, peak seasons, and popular room types. Provide suggestions for optimal pricing and availability adjustments.

Historical Booking Data: {{{historicalBookingData}}}

Output the analysis in JSON format, including peakSeasons, popularRoomTypes, optimalPricingSuggestions, and availabilityAdjustments.`,
});

const bookingPatternAnalysisFlow = ai.defineFlow(
  {
    name: 'bookingPatternAnalysisFlow',
    inputSchema: BookingPatternAnalysisInputSchema,
    outputSchema: BookingPatternAnalysisOutputSchema,
  },
  async input => {
    const {output} = await bookingPatternAnalysisPrompt(input);
    return output!;
  }
);
