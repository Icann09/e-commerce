"use server";

import { db } from "../db";
import { wishlists } from "../db/schema";
import { getCurrentUser } from "../auth/actions";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { products } from "../db/schema";
import { productImages } from "../db/schema";
import { productVariants } from "../db/schema";
import { categories } from "../db/schema";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";





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
  if (!user?.id) {
    redirect("/sign-in");
  };

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




export async function fetchWishlist(userId: string) {
  const rows = await db
    .select({
      id: wishlists.id,
      addedAt: wishlists.addedAt,

      productId: products.id,
      name: products.name,

      // default variant price
      price: productVariants.price,

      // primary image
      image: productImages.url,

      category: categories.name,

      // DISTINCT color count
      colors: sql<number>`
  (
    select count(distinct pv.color_id)
    from product_variants pv
    where pv.product_id = ${products.id}
  )
`,
    })
    .from(wishlists)
    .innerJoin(products, eq(wishlists.productId, products.id))
    .innerJoin(
      productVariants,
      eq(products.defaultVariantId, productVariants.id)
    )
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(
      productImages,
      and(
        eq(productImages.productId, products.id),
        eq(productImages.id, sql`
          (
            select pi.id
            from product_images pi
            where
              pi.product_id = ${products.id}
              and pi.variant_id is null
            order by pi.sort_order asc
            limit 1
          )
        `)
      )
    )
    .where(eq(wishlists.userId, userId));

  return rows.map((row) => {
  const badge = "Extra 20% off";
  const badgeColor: "green" | "orange" = "green";

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    image: row.image ?? "/placeholder.png",
    colors: row.colors ?? 1,
    badge,
    badgeColor,
  };
});

}
