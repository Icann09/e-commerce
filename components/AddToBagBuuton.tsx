"use client";

import { addToCart } from "@/lib/actions/cart";
import { useVariantStore } from "@/store/variant";
import { useTransition } from "react";

type Props = {
  productId: string;
};

export default function AddToBagButton({ productId }: Props) {
  const [pending, startTransition] = useTransition();

  const selectedVariantId = useVariantStore(
    (s) => s.selectedVariantByProduct[productId]
  );

  const onAdd = () => {
    if (!selectedVariantId) return;

    startTransition(async () => {
      await addToCart({
        productVariantId: selectedVariantId,
        quantity: 1,
      });
    });
  };

  return (
    <button
      onClick={onAdd}
      disabled={!selectedVariantId || pending}
      className="rounded-full bg-dark-900 px-6 py-4 text-light-100 disabled:opacity-50"
    >
      {pending ? "Adding…" : "Add to Bag"}
    </button>
  );
}
