import { pgTable, index, uniqueIndex, foreignKey, uuid, integer, timestamp, unique, text, boolean, numeric, date, jsonb, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const deliveryStatus = pgEnum("delivery_status", ['assigned', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed'])
export const giftCategory = pgEnum("gift_category", ['flowers', 'cakes', 'chocolates', 'custom', 'combo', 'hampers'])
export const occasion = pgEnum("occasion", ['birthday', 'anniversary', 'valentines', 'mothers_day', 'fathers_day', 'wedding', 'new_baby', 'get_well', 'just_because', 'ramadan', 'new_year'])
export const orderStatus = pgEnum("order_status", ['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'])
export const paymentStatus = pgEnum("payment_status", ['pending', 'completed', 'failed', 'refunded'])
export const userRole = pgEnum("user_role", ['customer', 'admin', 'delivery_partner'])


export const cart = pgTable("cart", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	giftId: uuid("gift_id").notNull(),
	quantity: integer().default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("cart_gift_id_idx").using("btree", table.giftId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("cart_user_gift_unique").using("btree", table.userId.asc().nullsLast().op("uuid_ops"), table.giftId.asc().nullsLast().op("uuid_ops")),
	index("cart_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "cart_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.giftId],
			foreignColumns: [gifts.id],
			name: "cart_gift_id_gifts_id_fk"
		}).onDelete("cascade"),
]);

export const deliveryPartners = pgTable("delivery_partners", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	companyName: text("company_name"),
	vehicleType: text("vehicle_type"),
	vehicleNumber: text("vehicle_number"),
	serviceArea: text("service_area").array(),
	isAvailable: boolean("is_available").default(true).notNull(),
	currentLatitude: numeric("current_latitude", { precision: 10, scale:  8 }),
	currentLongitude: numeric("current_longitude", { precision: 10, scale:  8 }),
	rating: numeric({ precision: 2, scale:  1 }).default('0'),
	totalDeliveries: integer("total_deliveries").default(0),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("delivery_partners_is_available_idx").using("btree", table.isAvailable.asc().nullsLast().op("bool_ops")),
	index("delivery_partners_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "delivery_partners_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("delivery_partners_user_id_unique").on(table.userId),
]);

export const orders = pgTable("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderNumber: text("order_number").notNull(),
	senderId: uuid("sender_id").notNull(),
	receiverId: uuid("receiver_id").notNull(),
	senderAddressId: uuid("sender_address_id").notNull(),
	receiverAddressId: uuid("receiver_address_id").notNull(),
	giftId: uuid("gift_id").notNull(),
	quantity: integer().default(1).notNull(),
	giftMessage: text("gift_message"),
	isSurprise: boolean("is_surprise").default(false).notNull(),
	surpriseRevealMessage: text("surprise_reveal_message"),
	deliveryDate: date("delivery_date").notNull(),
	deliveryTimeSlot: text("delivery_time_slot"),
	specialInstructions: text("special_instructions"),
	subtotalLkr: numeric("subtotal_lkr", { precision: 10, scale:  2 }).notNull(),
	subtotalAud: numeric("subtotal_aud", { precision: 10, scale:  2 }).notNull(),
	deliveryFeeLkr: numeric("delivery_fee_lkr", { precision: 10, scale:  2 }).notNull(),
	deliveryFeeAud: numeric("delivery_fee_aud", { precision: 10, scale:  2 }).notNull(),
	taxLkr: numeric("tax_lkr", { precision: 10, scale:  2 }).default('0').notNull(),
	taxAud: numeric("tax_aud", { precision: 10, scale:  2 }).default('0').notNull(),
	totalLkr: numeric("total_lkr", { precision: 10, scale:  2 }).notNull(),
	totalAud: numeric("total_aud", { precision: 10, scale:  2 }).notNull(),
	status: orderStatus().default('pending').notNull(),
	paymentStatus: paymentStatus("payment_status").default('pending').notNull(),
	trackingCode: text("tracking_code"),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("orders_delivery_date_idx").using("btree", table.deliveryDate.asc().nullsLast().op("date_ops")),
	index("orders_order_number_idx").using("btree", table.orderNumber.asc().nullsLast().op("text_ops")),
	index("orders_receiver_id_idx").using("btree", table.receiverId.asc().nullsLast().op("uuid_ops")),
	index("orders_sender_id_idx").using("btree", table.senderId.asc().nullsLast().op("uuid_ops")),
	index("orders_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("orders_tracking_code_idx").using("btree", table.trackingCode.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.id],
			name: "orders_sender_id_users_id_fk"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.receiverId],
			foreignColumns: [users.id],
			name: "orders_receiver_id_users_id_fk"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.senderAddressId],
			foreignColumns: [addresses.id],
			name: "orders_sender_address_id_addresses_id_fk"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.receiverAddressId],
			foreignColumns: [addresses.id],
			name: "orders_receiver_address_id_addresses_id_fk"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.giftId],
			foreignColumns: [gifts.id],
			name: "orders_gift_id_gifts_id_fk"
		}).onDelete("restrict"),
	unique("orders_order_number_unique").on(table.orderNumber),
	unique("orders_tracking_code_unique").on(table.trackingCode),
]);

export const payments = pgTable("payments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull(),
	paymentMethod: text("payment_method").notNull(),
	transactionId: text("transaction_id"),
	amountLkr: numeric("amount_lkr", { precision: 10, scale:  2 }).notNull(),
	amountAud: numeric("amount_aud", { precision: 10, scale:  2 }).notNull(),
	currency: text().default('AUD').notNull(),
	status: paymentStatus().default('pending').notNull(),
	paymentDetails: jsonb("payment_details"),
	paidAt: timestamp("paid_at", { mode: 'string' }),
	refundedAt: timestamp("refunded_at", { mode: 'string' }),
	refundAmount: numeric("refund_amount", { precision: 10, scale:  2 }),
	refundReason: text("refund_reason"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payments_order_id_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("payments_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("payments_transaction_id_idx").using("btree", table.transactionId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "payments_order_id_orders_id_fk"
		}).onDelete("restrict"),
	unique("payments_transaction_id_unique").on(table.transactionId),
]);

export const addresses = pgTable("addresses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	type: text().default('sender').notNull(),
	country: text().notNull(),
	city: text().notNull(),
	state: text(),
	postalCode: text("postal_code"),
	addressLine1: text("address_line1").notNull(),
	addressLine2: text("address_line2"),
	landmark: text(),
	isDefault: boolean("is_default").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("addresses_country_idx").using("btree", table.country.asc().nullsLast().op("text_ops")),
	index("addresses_type_idx").using("btree", table.type.asc().nullsLast().op("text_ops")),
	index("addresses_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "addresses_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const gifts = pgTable("gifts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	longDescription: text("long_description"),
	category: giftCategory().notNull(),
	priceLkr: numeric("price_lkr", { precision: 10, scale:  2 }).notNull(),
	priceAud: numeric("price_aud", { precision: 10, scale:  2 }).notNull(),
	discountPrice: numeric("discount_price", { precision: 10, scale:  2 }),
	stockQuantity: integer("stock_quantity").default(0).notNull(),
	imageUrl: text("image_url").notNull(),
	imageUrls: text("image_urls").array(),
	weight: numeric({ precision: 8, scale:  2 }),
	weightUnit: text("weight_unit").default('kg'),
	isFragile: boolean("is_fragile").default(false).notNull(),
	requiresSpecialHandling: boolean("requires_special_handling").default(false).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	isFeatured: boolean("is_featured").default(false).notNull(),
	rating: numeric({ precision: 2, scale:  1 }).default('0'),
	reviewCount: integer("review_count").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("gifts_category_idx").using("btree", table.category.asc().nullsLast().op("enum_ops")),
	index("gifts_is_active_idx").using("btree", table.isActive.asc().nullsLast().op("bool_ops")),
	index("gifts_is_featured_idx").using("btree", table.isFeatured.asc().nullsLast().op("bool_ops")),
	index("gifts_price_aud_idx").using("btree", table.priceAud.asc().nullsLast().op("numeric_ops")),
]);

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	data: jsonb(),
	isRead: boolean("is_read").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("notifications_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("notifications_is_read_idx").using("btree", table.isRead.asc().nullsLast().op("bool_ops")),
	index("notifications_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "notifications_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	phone: text(),
	passwordHash: text("password_hash").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	role: userRole().default('customer').notNull(),
	avatarUrl: text("avatar_url"),
	isVerified: boolean("is_verified").default(false).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	lastLoginAt: timestamp("last_login_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("users_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("users_role_idx").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	unique("users_email_unique").on(table.email),
]);

export const deliveries = pgTable("deliveries", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull(),
	partnerId: uuid("partner_id").notNull(),
	status: deliveryStatus().default('assigned').notNull(),
	estimatedDeliveryTime: timestamp("estimated_delivery_time", { mode: 'string' }),
	actualDeliveryTime: timestamp("actual_delivery_time", { mode: 'string' }),
	pickupTime: timestamp("pickup_time", { mode: 'string' }),
	deliveryNotes: text("delivery_notes"),
	proofOfDelivery: text("proof_of_delivery"),
	recipientSignature: text("recipient_signature"),
	customerRating: integer("customer_rating"),
	customerFeedback: text("customer_feedback"),
	currentLatitude: numeric("current_latitude", { precision: 10, scale:  8 }),
	currentLongitude: numeric("current_longitude", { precision: 10, scale:  8 }),
	lastLocationUpdate: timestamp("last_location_update", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("deliveries_order_id_idx").using("btree", table.orderId.asc().nullsLast().op("uuid_ops")),
	index("deliveries_partner_id_idx").using("btree", table.partnerId.asc().nullsLast().op("uuid_ops")),
	index("deliveries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "deliveries_order_id_orders_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.partnerId],
			foreignColumns: [deliveryPartners.id],
			name: "deliveries_partner_id_delivery_partners_id_fk"
		}).onDelete("restrict"),
	unique("deliveries_order_id_unique").on(table.orderId),
]);

export const reviews = pgTable("reviews", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	giftId: uuid("gift_id").notNull(),
	orderId: uuid("order_id"),
	rating: integer().notNull(),
	title: text(),
	comment: text().notNull(),
	isVerifiedPurchase: boolean("is_verified_purchase").default(false).notNull(),
	helpfulCount: integer("helpful_count").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("reviews_gift_id_idx").using("btree", table.giftId.asc().nullsLast().op("uuid_ops")),
	index("reviews_rating_idx").using("btree", table.rating.asc().nullsLast().op("int4_ops")),
	index("reviews_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reviews_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.giftId],
			foreignColumns: [gifts.id],
			name: "reviews_gift_id_gifts_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "reviews_order_id_orders_id_fk"
		}).onDelete("set null"),
]);

export const giftOccasions = pgTable("gift_occasions", {
	giftId: uuid("gift_id").notNull(),
	occasion: occasion().notNull(),
}, (table) => [
	index("gift_occasions_gift_id_idx").using("btree", table.giftId.asc().nullsLast().op("uuid_ops")),
	index("gift_occasions_occasion_idx").using("btree", table.occasion.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.giftId],
			foreignColumns: [gifts.id],
			name: "gift_occasions_gift_id_gifts_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.giftId, table.occasion], name: "gift_occasions_gift_id_occasion_pk"}),
]);

export const favorites = pgTable("favorites", {
	userId: uuid("user_id").notNull(),
	giftId: uuid("gift_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("favorites_gift_id_idx").using("btree", table.giftId.asc().nullsLast().op("uuid_ops")),
	index("favorites_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "favorites_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.giftId],
			foreignColumns: [gifts.id],
			name: "favorites_gift_id_gifts_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.giftId], name: "favorites_user_id_gift_id_pk"}),
]);

export const reviewHelpful = pgTable("review_helpful", {
	reviewId: uuid("review_id").notNull(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("review_helpful_review_id_idx").using("btree", table.reviewId.asc().nullsLast().op("uuid_ops")),
	index("review_helpful_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.reviewId],
			foreignColumns: [reviews.id],
			name: "review_helpful_review_id_reviews_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "review_helpful_user_id_users_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.reviewId, table.userId], name: "review_helpful_review_id_user_id_pk"}),
]);
