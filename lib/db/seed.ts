import { db } from "@/lib/db";
import { productImages } from "./schema";
import { randomUUID } from "crypto";

export async function seed() {
  const productId = "ea7a8fe3-6f5d-491c-b737-70fd82ea040c";

  const imageswhite = [
    "/nike_air_max_3_white/Nike air max 3 white 2.webp",
    "/nike_air_max_3_white/Nike air max 3 white 3.webp",
    "/nike_air_max_3_white/Nike air max 3 white 4.webp",
    "/nike_air_max_3_white/Nike air max 3 white 5.webp",
    "/nike_air_max_3_white/Nike air max 3 white 6.webp",
    "/nike_air_max_3_white/Nike air max 3 white 7.webp",
    "/nike_air_max_3_white/Nike air max 3 white 8.webp",
  ];



  const whiteImages = imageswhite.map((url, index) => ({
  id: randomUUID(),
  productId,
  variantId: null,          // ✅ THIS IS THE KEY
  url,
  sortOrder: index,
  isPrimary: index === 0,
}));


  await db.insert(productImages).values(whiteImages);

  console.log(`✅ Seeded ${whiteImages.length} product images`);
}

seed();