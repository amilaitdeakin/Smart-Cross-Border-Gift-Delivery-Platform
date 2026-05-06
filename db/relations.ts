import { relations } from "drizzle-orm";
import {
  user,
  addresses,
  gifts,
  giftOccasions,
  orders,
  deliveryPartners,
  deliveries,
  payments,
  favorites,
  cart,
  reviews,
  reviewHelpful,
  notifications,
} from "./schema";

// ============================================
// USERS RELATIONS
// ============================================

export const userRelations = relations(user, ({ many, one }) => ({
  addresses: many(addresses),
  sentOrders: many(orders, { relationName: "sentOrders" }),
  receivedOrders: many(orders, { relationName: "receivedOrders" }),
  deliveryPartner: one(deliveryPartners),
  favorites: many(favorites),
  cartItems: many(cart),
  reviews: many(reviews),
  helpfulMarks: many(reviewHelpful),
  notifications: many(notifications),
}));

// ============================================
// ADDRESSES RELATIONS
// ============================================

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));

// ============================================
// GIFTS RELATIONS
// ============================================

export const giftsRelations = relations(gifts, ({ many }) => ({
  occasions: many(giftOccasions),
  orders: many(orders),
  favorites: many(favorites),
  cartItems: many(cart),
  reviews: many(reviews),
}));

// ============================================
// GIFT OCCASIONS RELATIONS
// ============================================

export const giftOccasionsRelations = relations(giftOccasions, ({ one }) => ({
  gift: one(gifts, {
    fields: [giftOccasions.giftId],
    references: [gifts.id],
  }),
}));

// ============================================
// ORDERS RELATIONS
// ============================================

export const ordersRelations = relations(orders, ({ one, many }) => ({
  sender: one(user, {
    fields: [orders.senderId],
    references: [user.id],
    relationName: "sentOrders",
  }),
  receiver: one(user, {
    fields: [orders.receiverId],
    references: [user.id],
    relationName: "receivedOrders",
  }),
  senderAddress: one(addresses, {
    fields: [orders.senderAddressId],
    references: [addresses.id],
  }),
  receiverAddress: one(addresses, {
    fields: [orders.receiverAddressId],
    references: [addresses.id],
  }),
  gift: one(gifts, {
    fields: [orders.giftId],
    references: [gifts.id],
  }),
  delivery: one(deliveries),
  payments: many(payments),
  reviews: many(reviews),
}));

// ============================================
// DELIVERY PARTNERS RELATIONS
// ============================================

export const deliveryPartnersRelations = relations(
  deliveryPartners,
  ({ one, many }) => ({
    user: one(user, {
      fields: [deliveryPartners.userId],
      references: [user.id],
    }),
    deliveries: many(deliveries),
  }),
);

// ============================================
// DELIVERIES RELATIONS
// ============================================

export const deliveriesRelations = relations(deliveries, ({ one }) => ({
  order: one(orders, {
    fields: [deliveries.orderId],
    references: [orders.id],
  }),
  partner: one(deliveryPartners, {
    fields: [deliveries.partnerId],
    references: [deliveryPartners.id],
  }),
}));

// ============================================
// PAYMENTS RELATIONS
// ============================================

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

// ============================================
// FAVORITES RELATIONS
// ============================================

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(user, {
    fields: [favorites.userId],
    references: [user.id],
  }),
  gift: one(gifts, {
    fields: [favorites.giftId],
    references: [gifts.id],
  }),
}));

// ============================================
// CART RELATIONS
// ============================================

export const cartRelations = relations(cart, ({ one }) => ({
  user: one(user, {
    fields: [cart.userId],
    references: [user.id],
  }),
  gift: one(gifts, {
    fields: [cart.giftId],
    references: [gifts.id],
  }),
}));

// ============================================
// REVIEWS RELATIONS
// ============================================

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(user, {
    fields: [reviews.userId],
    references: [user.id],
  }),
  gift: one(gifts, {
    fields: [reviews.giftId],
    references: [gifts.id],
  }),
  order: one(orders, {
    fields: [reviews.orderId],
    references: [orders.id],
  }),
  helpfulMarks: many(reviewHelpful),
}));

// ============================================
// REVIEW HELPFUL RELATIONS
// ============================================

export const reviewHelpfulRelations = relations(reviewHelpful, ({ one }) => ({
  review: one(reviews, {
    fields: [reviewHelpful.reviewId],
    references: [reviews.id],
  }),
  user: one(user, {
    fields: [reviewHelpful.userId],
    references: [user.id],
  }),
}));

// ============================================
// NOTIFICATIONS RELATIONS
// ============================================

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));
