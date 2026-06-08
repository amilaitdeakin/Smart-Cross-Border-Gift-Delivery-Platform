import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../init";
import { db } from "@/db";
import { orders, orderItems, addresses } from "@/db/schema";
import { eq } from "drizzle-orm";

export const orderRouter = createTRPCRouter({
  createOrder: baseProcedure
    .input(
      z.object({
        senderName: z.string(),
        senderEmail: z.string().email().optional().or(z.literal("")),
        senderPhone: z.string().optional(),
        receiverName: z.string(),
        receiverPhone: z.string(),
        deliveryAddress: z.string(),
        deliveryApartment: z.string().optional(),
        deliveryCity: z.string(),
        deliveryPostalCode: z.string(),
        deliveryDate: z.string(),
        deliveryInstruction: z.string().optional(),
        giftMessage: z.string().optional(),
        paymentMethod: z.string(),
        items: z.array(
          z.object({
            giftId: z.string(),
            quantity: z.number().min(1),
            priceAud: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Generate order number
      const orderNumber = `GIFT-${Math.floor(Math.random() * 1000000)}`;

      // We'll use a hardcoded user ID if context is mocked, or null for guests
      const userId = (ctx as any).userId !== "user_123" ? (ctx as any).userId : null;

      // Insert delivery address
      const [address] = await db.insert(addresses).values({
        userId, // optional
        type: "receiver",
        country: "Unknown", // Can be updated if checkout captures it
        city: input.deliveryCity,
        postalCode: input.deliveryPostalCode,
        addressLine1: input.deliveryAddress,
        addressLine2: input.deliveryApartment || null,
      }).returning();

      const [newOrder] = await db
        .insert(orders)
        .values({
          orderNumber,
          userId,
          senderName: input.senderName || "Guest",
          senderEmail: input.senderEmail || "guest@example.com",
          senderPhone: input.senderPhone || "000000000",
          receiverName: input.receiverName,
          receiverPhone: input.receiverPhone,
          deliveryAddressId: address.id,
          specialInstructions: [input.deliveryApartment ? `Apt: ${input.deliveryApartment}` : '', input.deliveryInstruction].filter(Boolean).join(" | ") || null,
          deliveryDate: input.deliveryDate,
          giftMessage: input.giftMessage || null,
          status: "pending",
          paymentStatus: "pending",
          subtotalAud: "0",
          subtotalLkr: "0",
          deliveryFeeAud: "0",
          deliveryFeeLkr: "0",
          totalAud: "0",
          totalLkr: "0",
        })
        .returning();

      // Insert Items
      let totalAud = 0;
      for (const item of input.items) {
        await db.insert(orderItems).values({
          orderId: newOrder.id,
          giftId: item.giftId,
          quantity: item.quantity,
          priceAud: item.priceAud.toString(),
          priceLkr: (item.priceAud * 200).toString(),
        });
        totalAud += item.priceAud * item.quantity;
      }

      const deliveryFee = totalAud > 50 ? 0 : 12;
      const serviceFee = 5;
      const finalTotal = totalAud + deliveryFee + serviceFee;

      await db
        .update(orders)
        .set({
          subtotalAud: totalAud.toString(),
          subtotalLkr: (totalAud * 200).toString(),
          deliveryFeeAud: deliveryFee.toString(),
          deliveryFeeLkr: (deliveryFee * 200).toString(),
          totalAud: finalTotal.toString(),
          totalLkr: (finalTotal * 200).toString(),
        })
        .where(eq(orders.id, newOrder.id));

      return { success: true, orderNumber };
    }),
});
