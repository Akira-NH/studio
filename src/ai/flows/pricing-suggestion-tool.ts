'use server';

/**
 * @fileOverview An AI agent that suggests optimal room prices based on booking trends, seasonality, and competitor pricing.
 *
 * - pricingSuggestionTool - A function that handles the price suggestion process.
 * - PricingSuggestionInput - The input type for the pricingSuggestionTool function.
 * - PricingSuggestionOutput - The return type for the pricingSuggestionTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PricingSuggestionInputSchema = z.object({
  bookingTrends: z.string().describe('Historical booking data, including occupancy rates, booking lead times, and average stay durations.'),
  seasonality: z.string().describe('Information about seasonal demand fluctuations and peak/off-peak periods.'),
  competitorPricing: z.string().describe('Pricing data from competitor hotels in the area, including room rates and special offers.'),
  currentPrice: z.number().describe('The current price of the room.'),
});
export type PricingSuggestionInput = z.infer<typeof PricingSuggestionInputSchema>;

const PricingSuggestionOutputSchema = z.object({
  suggestedPrice: z.number().describe('The AI-suggested optimal room price.'),
  reasoning: z.string().describe('Explanation of why the AI is suggesting this price, based on the input data.'),
});
export type PricingSuggestionOutput = z.infer<typeof PricingSuggestionOutputSchema>;

export async function pricingSuggestionTool(input: PricingSuggestionInput): Promise<PricingSuggestionOutput> {
  return pricingSuggestionFlow(input);
}

const pricingSuggestionPrompt = ai.definePrompt({
  name: 'pricingSuggestionPrompt',
  input: {schema: PricingSuggestionInputSchema},
  output: {schema: PricingSuggestionOutputSchema},
  prompt: `You are an AI hotel revenue management assistant. Based on the following data, suggest an optimal room price to maximize revenue.

Booking Trends: {{{bookingTrends}}}
Seasonality: {{{seasonality}}}
Competitor Pricing: {{{competitorPricing}}}
Current Price: {{{currentPrice}}}

Consider all factors and explain your reasoning for the suggested price.
`,
});

const pricingSuggestionFlow = ai.defineFlow(
  {
    name: 'pricingSuggestionFlow',
    inputSchema: PricingSuggestionInputSchema,
    outputSchema: PricingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await pricingSuggestionPrompt(input);
    return output!;
  }
);
