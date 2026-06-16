import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "../init";
import { db } from "@/db";
import { orders, orderItems, addresses, gifts, deliveries } from "@/db/schema";
import { eq, or, inArray } from "drizzle-orm";



export const orderRouter = createTRPCRouter({
  // Admin: Get all orders with filtering
  getAllOrders: baseProcedure
    .input(
      z.object({
        status: z.enum(["pending", "processing", "out_for_delivery", "delivered", "cancelled", "refunded"]).optional(),
        paymentStatus: z.enum(["pending", "completed", "failed", "refunded"]).optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { status, paymentStatus, limit, offset, search } = input;
      
      const allOrders = await db.query.orders.findMany({
        limit: 1000,
        orderBy: (orders, { desc }) => desc(orders.createdAt),
        with: {
          items: true,
          user: true,
        }
      });

      let filteredOrders = allOrders;

      if (status) {
        filteredOrders = filteredOrders.filter(o => o.status === status);
      }

      if (paymentStatus) {
        filteredOrders = filteredOrders.filter(o => o.paymentStatus === paymentStatus);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredOrders = filteredOrders.filter(o =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          o.senderName.toLowerCase().includes(searchLower) ||
          o.receiverName.toLowerCase().includes(searchLower) ||
          o.senderEmail.toLowerCase().includes(searchLower)
        );
      }

      return {
        orders: filteredOrders.slice(offset, offset + limit),
        total: filteredOrders.length,
      };
    }),

  // Admin: Get single order details
  getOrderById: baseProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const order = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.id, input.orderId),
        with: {
          delivery: {
            with: {
              partner: {
                with: { user: true }
              }
            }
          },
          items: true,
          user: true,
          deliveryAddress: true,
        }
      });

      return order || null;
    }),

  // Admin: Update order status
  updateOrderStatus: baseProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.enum(["pending", "processing", "out_for_delivery", "delivered", "cancelled", "refunded"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { orderId, status, notes } = input;

      const [updatedOrder] = await db
        .update(orders)
        .set({
          status,
          notes: notes || undefined,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId))
        .returning();

      return updatedOrder;
    }),

  // Admin: Update payment status
  updatePaymentStatus: baseProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentStatus: z.enum(["pending", "completed", "failed", "refunded"]),
      })
    )
    .mutation(async ({ input }) => {
      const { orderId, paymentStatus } = input;

      const [updatedOrder] = await db
        .update(orders)
        .set({
          paymentStatus,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId))
        .returning();

      return updatedOrder;
    }),

  // Admin: Update delivery status
  updateDeliveryStatus: baseProcedure
    .input(
      z.object({
        orderId: z.string(),
        deliveryStatus: z.enum(["assigned", "picked_up", "in_transit", "out_for_delivery", "delivered", "failed"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { orderId, deliveryStatus, notes } = input;

      const [delivery] = await db
        .update(deliveries)
        .set({
          status: deliveryStatus,
          deliveryNotes: notes || undefined,
          updatedAt: new Date(),
        })
        .where(eq(deliveries.orderId, orderId))
        .returning();

      return delivery;
    }),

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
        userId: z.string(),
        items: z.array(
          z.object({
            giftId: z.string(),
            quantity: z.number().min(1),
            priceAud: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Generate order number
      const orderNumber = `GIFT-${Math.floor(Math.random() * 1000000)}`;

      // We'll use a hardcoded user ID if context is mocked, or null for guests
      const userId = input.userId;

      // Insert delivery address
      const [address] = await db
        .insert(addresses)
        .values({
          userId, // optional
          type: "receiver",
          country: "Unknown", // Can be updated if checkout captures it
          city: input.deliveryCity,
          postalCode: input.deliveryPostalCode,
          addressLine1: input.deliveryAddress,
          addressLine2: input.deliveryApartment || null,
        })
        .returning();

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
          specialInstructions:
            [
              input.deliveryApartment ? `Apt: ${input.deliveryApartment}` : "",
              input.deliveryInstruction,
            ]
              .filter(Boolean)
              .join(" | ") || null,
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

  trackOrder: baseProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const { code } = input;
      if (!code) {
        throw new Error("Tracking code or order number is required");
      }

      const fallbackGifts = [
        {
          id: "1",
          name: "Red Roses Bouquet",
          imageUrl: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1200&auto=format&fit=crop",
          priceAud: "39.00",
        },
        {
          id: "2",
          name: "Luxury Chocolate Box",
          imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1200&auto=format&fit=crop",
          priceAud: "52.00",
        },
        {
          id: "3",
          name: "Artisan Chocolate Set",
          imageUrl: "https://images.unsplash.com/photo-1548741487-18d363dc4469?q=80&w=1740&auto=format&fit=crop",
          priceAud: "45.00",
        },
        {
          id: "4",
          name: "Signature Gift Pack",
          imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
          priceAud: "68.00",
        },
        {
          id: "5",
          name: "Birthday Cake - Red Velvet",
          imageUrl: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=1200&auto=format&fit=crop",
          priceAud: "45.00",
        },
        {
          id: "6",
          name: "Sunflower Delight Bouquet",
          imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
          priceAud: "35.00",
        },
        {
          id: "7",
          name: "Personalized Name Necklace",
          imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
          priceAud: "89.00",
        },
        {
          id: "8",
          name: "Romantic Dinner Combo",
          imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
          priceAud: "79.00",
        },
        {
          id: "9",
          name: "Indoor Plant - Peace Lily",
          imageUrl: "https://images.unsplash.com/photo-1616690248297-1ec539dd910f?w=500&auto=format&fit=crop&q=60",
          priceAud: "32.00",
        },
        {
          id: "10",
          name: "Chocolate Strawberry Box",
          imageUrl: "https://images.unsplash.com/photo-1623284060556-37e5ff559dd3?q=80&w=1740&auto=format&fit=crop",
          priceAud: "38.00",
        },
        {
          id: "11",
          name: "Anniversary Cake - 2 Tier",
          imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1200&auto=format&fit=crop",
          priceAud: "85.00",
        },
        {
          id: "12",
          name: "Luxury Spa Hamper",
          imageUrl: "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=1200&auto=format&fit=crop",
          priceAud: "55.00",
        },
        {
          id: "13",
          name: "Mixed Roses & Lilies",
          imageUrl: "https://images.unsplash.com/photo-1679678109868-cb5bd66d61dc?q=80&w=870&auto=format&fit=crop",
          priceAud: "48.00",
        },
        {
          id: "14",
          name: "Engraved Photo Frame",
          imageUrl: "https://images.unsplash.com/photo-1606828197523-6baecdb7087b?q=80&w=1200&auto=format&fit=crop",
          priceAud: "29.00",
        },
        {
          id: "15",
          name: "Kids Birthday Combo",
          imageUrl: "https://images.unsplash.com/photo-1559617309-f827781aa6b8?q=80&w=1200&auto=format&fit=crop",
          priceAud: "49.00",
        },
        {
          id: "16",
          name: "Silver Infinity Bracelet",
          imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
          priceAud: "42.00",
        },
        {
          id: "17",
          name: "Bonsai Tree - Zen Garden",
          imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
          priceAud: "65.00",
        },
        {
          id: "18",
          name: "Chocolate Truffle Cake",
          imageUrl: "https://images.unsplash.com/photo-1606890658317-7d2e8bd92b78?q=80&w=1200&auto=format&fit=crop",
          priceAud: "42.00",
        },
      ];

      const order = await db.query.orders.findFirst({
        where: (orders, { or, eq }) =>
          or(eq(orders.orderNumber, code), eq(orders.trackingCode, code)),
        with: {
          deliveryAddress: true,
          delivery: {
            with: {
              partner: {
                with: {
                  user: true,
                },
              },
            },
          },
          items: true,
        },
      });

      if (!order) {
        return null;
      }

      const giftIds = order.items.map((item) => item.giftId);
      const isUuid = (val: string) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);

      const dbGiftIds = giftIds.filter((id) => isUuid(id));

      let dbGifts: any[] = [];
      if (dbGiftIds.length > 0) {
        dbGifts = await db
          .select()
          .from(gifts)
          .where(inArray(gifts.id, dbGiftIds));
      }

      const itemsWithGifts = order.items.map((item) => {
        let gift = dbGifts.find((g) => g.id === item.giftId) || null;
        if (!gift) {
          const fallback = fallbackGifts.find((f) => f.id === item.giftId);
          if (fallback) {
            gift = {
              id: fallback.id,
              name: fallback.name,
              imageUrl: fallback.imageUrl,
              priceAud: fallback.priceAud,
              description: "",
              longDescription: null,
              category: "custom" as any,
              priceLkr: (parseFloat(fallback.priceAud) * 200).toString(),
              discountPrice: null,
              stockQuantity: 0,
              imageUrls: [],
              weight: null,
              weightUnit: "kg",
              isFragile: false,
              requiresSpecialHandling: false,
              isActive: true,
              isFeatured: false,
              rating: "0",
              reviewCount: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          }
        }
        return {
          ...item,
          gift,
        };
      });

      return {
        ...order,
        items: itemsWithGifts,
      };
    }),
});
