"use client";

import { useVariantStore } from "@/store/variant";
import ColorSwatches from "@/components/ColorSwatches";
import SizePicker from "@/components/SizePicker";

export default function ProductVariants({
  productId,
  galleryColors,
}: {
  productId: string;
  galleryColors: {
    color: string;
    images: string[];
    sizes: {
      variantId: string;
      sizeLabel: string;
    }[];
  }[];
}) {
  const selectedColorIndex = useVariantStore(
    (s) => s.selectedColorByProduct[productId] ?? 0
  );

  const sizes =
    galleryColors[selectedColorIndex]?.sizes ?? [];

  return (
    <>
      <ColorSwatches
        productId={productId}
        variants={galleryColors}
      />

      <SizePicker
        productId={productId}
        sizes={sizes}
      />
    </>
  );
}
