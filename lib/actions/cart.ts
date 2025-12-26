"use server";

import { db } from "@/lib/db";
import { carts, cartItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser, guestSession } from "@/lib/auth/actions";
import { z } from "zod";
import { isNull } from "drizzle-orm";

const addToCartSchema = z.object({
  productVariantId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
});


export async function addToCart(input: unknown) {
  const { productVariantId, quantity } =
    addToCartSchema.parse(input);

  const user = await getCurrentUser();
  const guest = await guestSession();
  const guestId = guest?.sessionToken ?? null;

  let cart = await db.query.carts.findFirst({
    where: user
      ? eq(carts.userId, user.id)
      : guestId
        ? eq(carts.guestId, guestId)
        : isNull(carts.guestId),
  });

  if (!cart) {
    const [newCart] = await db
      .insert(carts)
      .values({
        userId: user?.id ?? null,
        guestId: user ? null : guestId,
      })
      .returning();

    cart = newCart;
  }

  // 2️⃣ Check existing cart item
  const existingItem = await db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productVariantId, productVariantId)
    ),
  });

  // 3️⃣ Update or insert
  if (existingItem) {
    await db
      .update(cartItems)
      .set({
        quantity: existingItem.quantity + quantity,
      })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    await db.insert(cartItems).values({
      cartId: cart.id,
      productVariantId,
      quantity,
    });
  }

  return { ok: true };
}