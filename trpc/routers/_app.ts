import { createTRPCRouter } from "../init";
import { orderRouter } from "./order";
import { giftSuggestionRouter } from "./gift-suggestion";

export const appRouter = createTRPCRouter({
  order: orderRouter,
  giftSuggestion: giftSuggestionRouter,
});

export type AppRouter = typeof appRouter;
