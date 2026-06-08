import * as fs from "fs";
import * as dotenv from "dotenv";

const envLocal = fs.readFileSync(".env.local", "utf-8");
const envVars = dotenv.parse(envLocal);

for (const k in envVars) {
  process.env[k] = envVars[k];
}

import { db } from "./db";
import { orders } from "./db/schema";

async function main() {
  try {
    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber: `GIFT-${Math.floor(Math.random() * 1000000)}`,
        userId: null,
        senderName: "Guest",
        senderEmail: "guest@example.com",
        senderPhone: "000000000",
        receiverName: "Sashen",
        receiverPhone: "+61433530887",
        deliveryAddressId: "863b8eeb-75f2-46d8-83ba-8381487c424a", // Wait, this address ID might not exist! If it doesn't, this will fail. Let me remove it or mock it.
        specialInstructions: null,
        deliveryDate: "2026-06-25",
        giftMessage: null,
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
    console.log("Success:", newOrder);
  } catch (e: any) {
    console.error("Error Message:", e.message);
  }
}
main();
