import { relations } from "drizzle-orm";
import {
  users,
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

export const usersRelations = relations(users, ({ many, one }) => ({
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
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
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
  sender: one(users, {
    fields: [orders.senderId],
    references: [users.id],
    relationName: "sentOrders",
  }),
  receiver: one(users, {
    fields: [orders.receiverId],
    references: [users.id],
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
    user: one(users, {
      fields: [deliveryPartners.userId],
      references: [users.id],
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
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
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
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
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
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
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
  user: one(users, {
    fields: [reviewHelpful.userId],
    references: [users.id],
  }),
}));

// ============================================
// NOTIFICATIONS RELATIONS
// ============================================

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
