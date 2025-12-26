"use client";

import { addToCart } from "@/lib/actions/cart";
import { useVariantStore } from "@/store/variant";
import { useTransition } from "react";

type Props = {
  productId: string;
  variants: { id: string }[];
};

export default function AddToBagButton({ productId, variants }: Props) {
  const [pending, startTransition] = useTransition();

  const variantIndex = useVariantStore(
    (s) => s.selectedByProduct[productId] ?? 0
  );

  const currentVariant = variants[variantIndex];

  const onAdd = () => {
    if (!currentVariant) return;

    startTransition(async () => {
      await addToCart({
        productVariantId: currentVariant.id,
        quantity: 1,
      });
    });
  };

  return (
    <button
      onClick={onAdd}
      disabled={pending}
      className="rounded-full bg-dark-900 px-6 py-4 text-light-100"
    >
      {pending ? "Adding…" : "Add to Bag"}
    </button>
  );
}
