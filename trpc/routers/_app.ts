import { createTRPCRouter } from "../init";
import { orderRouter } from "./order";

export const appRouter = createTRPCRouter({
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
