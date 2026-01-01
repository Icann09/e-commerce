"use server";

import { db } from "../db";
import { wishlists } from "../db/schema";
import { getCurrentUser } from "../auth/actions";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId: string) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const inserted = await db
    .insert(wishlists)
    .values({
      userId: user.id,
      productId,
    })
    .onConflictDoNothing()
    .returning({ id: wishlists.id });

  return {
    success: true,
    added: inserted.length > 0,
    message: inserted.length > 0 ? "Added to wishlist" : "Already in wishlist",
  };
}


export async function removeFromWishlist(productId: string) {
  const user = await getCurrentUser();


  if (!user) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(wishlists)
    .where(
      and(
        eq(wishlists.userId, user.id),
        eq(wishlists.productId, productId)
      )
    );

  return { success: true };
}

// export async function toggleWishlist(productId: string) {
//   const user = await getCurrentUser();

//   if (!user?.id) {
//     throw new Error("Unauthorized");
//   }

//   const existing = await db.query.wishlists.findFirst({
//     where: and(
//       eq(wishlists.userId, user.id),
//       eq(wishlists.productId, productId)
//     ),
//   });

//   if (existing) {
//     await db
//       .delete(wishlists)
//       .where(eq(wishlists.id, existing.id));

//     return { added: false };
//   }

//   await db.insert(wishlists).values({
//     userId: user.id,
//     productId,
//   });

//   return { added: true };
// }

export async function toggleWishlist(productId: string) {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorized");

  const existing = await db.query.wishlists.findFirst({
    where: and(
      eq(wishlists.userId, user.id),
      eq(wishlists.productId, productId)
    ),
  });

  if (existing) {
    await db.delete(wishlists).where(eq(wishlists.id, existing.id));
  } else {
    await db.insert(wishlists).values({
      userId: user.id,
      productId,
    });
  }

  // 🔥 VERY IMPORTANT
  revalidatePath(`/products/${productId}`);

  return { added: !existing };
}
