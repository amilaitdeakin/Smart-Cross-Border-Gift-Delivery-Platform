import { createTRPCRouter, baseProcedure } from '../init';
import {
  generateGiftSuggestions,
  type GiftSuggestionRequest,
} from '@/lib/anthropic-client';
import { z } from 'zod';

const giftSuggestionRequestSchema = z.object({
  recipientAge: z.number().optional(),
  recipientGender: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  budget: z.number().optional(),
  occasion: z.string().optional().default('General'),
  relationship: z.string().optional().default('Friend'),
  language: z.string().optional().default('English'),
});

export const giftSuggestionRouter = createTRPCRouter({
  suggestGifts: baseProcedure
    .input(giftSuggestionRequestSchema)
    .mutation(async ({ input }) => {
      try {
        const suggestions = await generateGiftSuggestions(
          input as GiftSuggestionRequest
        );
        return {
          success: true,
          suggestions,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to generate suggestions';
        throw new Error(`Gift suggestion failed: ${errorMessage}`);
      }
    }),
});
