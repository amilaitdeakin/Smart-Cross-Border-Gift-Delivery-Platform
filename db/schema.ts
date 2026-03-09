import {
  boolean,
  date,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "admin",
  "delivery_partner",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refunded",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);
export const deliveryStatusEnum = pgEnum("delivery_status", [
  "assigned",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "failed",
]);
export const giftCategoryEnum = pgEnum("gift_category", [
  "flowers",
  "cakes",
  "chocolates",
  "custom",
  "combo",
  "hampers",
]);
export const occasionEnum = pgEnum("occasion", [
  "birthday",
  "anniversary",
  "valentines",
  "mothers_day",
  "fathers_day",
  "wedding",
  "new_baby",
  "get_well",
  "just_because",
  "ramadan",
  "new_year",
]);

// ============================================
// USERS TABLE
// ============================================

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    passwordHash: text("password_hash").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    role: userRoleEnum("role").notNull().default("customer"),
    avatarUrl: text("avatar_url"),
    isVerified: boolean("is_verified").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("users_email_idx").on(table.email),
    index("users_role_idx").on(table.role),
  ],
);

// ============================================
// ADDRESSES TABLE
// ============================================

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull().default("sender"), // 'sender' or 'receiver'
    country: text("country").notNull(),
    city: text("city").notNull(),
    state: text("state"),
    postalCode: text("postal_code"),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    landmark: text("landmark"),
    isDefault: boolean("is_default").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("addresses_user_id_idx").on(table.userId),
    index("addresses_type_idx").on(table.type),
    index("addresses_country_idx").on(table.country),
  ],
);

// ============================================
// GIFTS TABLE
// ============================================

export const gifts = pgTable(
  "gifts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description"),
    category: giftCategoryEnum("category").notNull(),
    priceLkr: decimal("price_lkr", { precision: 10, scale: 2 }).notNull(),
    priceAud: decimal("price_aud", { precision: 10, scale: 2 }).notNull(),
    discountPrice: decimal("discount_price", { precision: 10, scale: 2 }),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    imageUrl: text("image_url").notNull(),
    imageUrls: text("image_urls").array(),
    weight: decimal("weight", { precision: 8, scale: 2 }),
    weightUnit: text("weight_unit").default("kg"),
    isFragile: boolean("is_fragile").notNull().default(false),
    requiresSpecialHandling: boolean("requires_special_handling")
      .notNull()
      .default(false),
    isActive: boolean("is_active").notNull().default(true),
    isFeatured: boolean("is_featured").notNull().default(false),
    rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
    reviewCount: integer("review_count").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("gifts_category_idx").on(table.category),
    index("gifts_is_active_idx").on(table.isActive),
    index("gifts_is_featured_idx").on(table.isFeatured),
    index("gifts_price_aud_idx").on(table.priceAud),
  ],
);

// ============================================
// GIFT OCCASIONS (Junction Table)
// ============================================

export const giftOccasions = pgTable(
  "gift_occasions",
  {
    giftId: uuid("gift_id")
      .notNull()
      .references(() => gifts.id, { onDelete: "cascade" }),
    occasion: occasionEnum("occasion").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.giftId, table.occasion] }),
    index("gift_occasions_gift_id_idx").on(table.giftId),
    index("gift_occasions_occasion_idx").on(table.occasion),
  ],
);

// ============================================
// ORDERS TABLE
// ============================================

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: text("order_number").notNull().unique(),
    senderId: uuid("sender_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    receiverId: uuid("receiver_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    senderAddressId: uuid("sender_address_id")
      .notNull()
      .references(() => addresses.id, { onDelete: "restrict" }),
    receiverAddressId: uuid("receiver_address_id")
      .notNull()
      .references(() => addresses.id, { onDelete: "restrict" }),
    giftId: uuid("gift_id")
      .notNull()
      .references(() => gifts.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull().default(1),
    giftMessage: text("gift_message"),
    isSurprise: boolean("is_surprise").notNull().default(false),
    surpriseRevealMessage: text("surprise_reveal_message"),
    deliveryDate: date("delivery_date").notNull(),
    deliveryTimeSlot: text("delivery_time_slot"),
    specialInstructions: text("special_instructions"),
    subtotalLkr: decimal("subtotal_lkr", { precision: 10, scale: 2 }).notNull(),
    subtotalAud: decimal("subtotal_aud", { precision: 10, scale: 2 }).notNull(),
    deliveryFeeLkr: decimal("delivery_fee_lkr", {
      precision: 10,
      scale: 2,
    }).notNull(),
    deliveryFeeAud: decimal("delivery_fee_aud", {
      precision: 10,
      scale: 2,
    }).notNull(),
    taxLkr: decimal("tax_lkr", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    taxAud: decimal("tax_aud", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    totalLkr: decimal("total_lkr", { precision: 10, scale: 2 }).notNull(),
    totalAud: decimal("total_aud", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),
    paymentStatus: paymentStatusEnum("payment_status")
      .notNull()
      .default("pending"),
    trackingCode: text("tracking_code").unique(),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("orders_order_number_idx").on(table.orderNumber),
    index("orders_sender_id_idx").on(table.senderId),
    index("orders_receiver_id_idx").on(table.receiverId),
    index("orders_status_idx").on(table.status),
    index("orders_delivery_date_idx").on(table.deliveryDate),
    index("orders_tracking_code_idx").on(table.trackingCode),
  ],
);

// ============================================
// DELIVERY PARTNERS TABLE
// ============================================

export const deliveryPartners = pgTable(
  "delivery_partners",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    companyName: text("company_name"),
    vehicleType: text("vehicle_type"),
    vehicleNumber: text("vehicle_number"),
    serviceArea: text("service_area").array(), // Cities they serve
    isAvailable: boolean("is_available").notNull().default(true),
    currentLatitude: decimal("current_latitude", { precision: 10, scale: 8 }),
    currentLongitude: decimal("current_longitude", { precision: 10, scale: 8 }),
    rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
    totalDeliveries: integer("total_deliveries").default(0),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("delivery_partners_user_id_idx").on(table.userId),
    index("delivery_partners_is_available_idx").on(table.isAvailable),
  ],
);

// ============================================
// DELIVERIES TABLE
// ============================================

export const deliveries = pgTable(
  "deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .unique()
      .references(() => orders.id, { onDelete: "cascade" }),
    partnerId: uuid("partner_id")
      .notNull()
      .references(() => deliveryPartners.id, { onDelete: "restrict" }),
    status: deliveryStatusEnum("status").notNull().default("assigned"),
    estimatedDeliveryTime: timestamp("estimated_delivery_time"),
    actualDeliveryTime: timestamp("actual_delivery_time"),
    pickupTime: timestamp("pickup_time"),
    deliveryNotes: text("delivery_notes"),
    proofOfDelivery: text("proof_of_delivery"), // URL to photo
    recipientSignature: text("recipient_signature"), // URL to signature image
    customerRating: integer("customer_rating"), // 1-5
    customerFeedback: text("customer_feedback"),
    currentLatitude: decimal("current_latitude", { precision: 10, scale: 8 }),
    currentLongitude: decimal("current_longitude", { precision: 10, scale: 8 }),
    lastLocationUpdate: timestamp("last_location_update"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("deliveries_order_id_idx").on(table.orderId),
    index("deliveries_partner_id_idx").on(table.partnerId),
    index("deliveries_status_idx").on(table.status),
  ],
);

// ============================================
// PAYMENTS TABLE
// ============================================

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "restrict" }),
    paymentMethod: text("payment_method").notNull(), // 'card', 'paypal', 'bank_transfer'
    transactionId: text("transaction_id").unique(),
    amountLkr: decimal("amount_lkr", { precision: 10, scale: 2 }).notNull(),
    amountAud: decimal("amount_aud", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("AUD"),
    status: paymentStatusEnum("status").notNull().default("pending"),
    paymentDetails: jsonb("payment_details"), // Store payment gateway response
    paidAt: timestamp("paid_at"),
    refundedAt: timestamp("refunded_at"),
    refundAmount: decimal("refund_amount", { precision: 10, scale: 2 }),
    refundReason: text("refund_reason"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("payments_order_id_idx").on(table.orderId),
    index("payments_transaction_id_idx").on(table.transactionId),
    index("payments_status_idx").on(table.status),
  ],
);

// ============================================
// FAVORITES TABLE
// ============================================

export const favorites = pgTable(
  "favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    giftId: uuid("gift_id")
      .notNull()
      .references(() => gifts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.giftId] }),
    index("favorites_user_id_idx").on(table.userId),
    index("favorites_gift_id_idx").on(table.giftId),
  ],
);

// ============================================
// CART TABLE
// ============================================

export const cart = pgTable(
  "cart",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    giftId: uuid("gift_id")
      .notNull()
      .references(() => gifts.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("cart_user_id_idx").on(table.userId),
    index("cart_gift_id_idx").on(table.giftId),
    uniqueIndex("cart_user_gift_unique").on(table.userId, table.giftId),
  ],
);

// ============================================
// REVIEWS TABLE
// ============================================

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    giftId: uuid("gift_id")
      .notNull()
      .references(() => gifts.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    rating: integer("rating").notNull(), // 1-5
    title: text("title"),
    comment: text("comment").notNull(),
    isVerifiedPurchase: boolean("is_verified_purchase")
      .notNull()
      .default(false),
    helpfulCount: integer("helpful_count").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("reviews_user_id_idx").on(table.userId),
    index("reviews_gift_id_idx").on(table.giftId),
    index("reviews_rating_idx").on(table.rating),
  ],
);

// ============================================
// REVIEW HELPFUL (Junction Table)
// ============================================

export const reviewHelpful = pgTable(
  "review_helpful",
  {
    reviewId: uuid("review_id")
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.reviewId, table.userId] }),
    index("review_helpful_review_id_idx").on(table.reviewId),
    index("review_helpful_user_id_idx").on(table.userId),
  ],
);

// ============================================
// NOTIFICATIONS TABLE
// ============================================

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'order_update', 'delivery', 'promo', etc.
    title: text("title").notNull(),
    message: text("message").notNull(),
    data: jsonb("data"), // Additional data
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
    index("notifications_is_read_idx").on(table.isRead),
    index("notifications_created_at_idx").on(table.createdAt),
  ],
);
