"use client";

import { useVariantStore } from "@/store/variant";
import { useCartStore } from "@/store/cart";

type Props = {
  productId: string;
  name: string;
  price: number;
  galleryColors: {
    color: string;
    images: string[];
  }[];
};

export default function AddToBagButton({
  productId,
  name,
  price,
  galleryColors,
}: Props) {
  const selectedVariantId = useVariantStore(
    (s) => s.selectedVariantByProduct[productId]
  );

  const selectedColorIndex = useVariantStore(
    (s) => s.selectedColorByProduct[productId] ?? 0
  );

  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = useVariantStore(
  (s) => s.selectedVariantByProduct[productId]
);


  // ✅ correct image for selected color
  const image =
    galleryColors[selectedColorIndex]?.images[0];

  const onAdd = () => {
  if (!selectedVariant || !image) return;

  addItem({
    id: `${productId}-${selectedVariant.id}`,
    name,
    price,
    image,
    size: selectedVariant.size, // ✅ works
  });
};


  return (
    <button
      onClick={onAdd}
      disabled={!selectedVariantId}
      className="rounded-full bg-dark-900 px-6 py-4 text-light-100 disabled:opacity-50"
    >
      Add to Bag
    </button>
  );
}
