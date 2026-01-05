"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";

export default function AddedToBag() {
  const { isAddedOpen, addedItem, closeAdded } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    document.body.style.overflow = isAddedOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddedOpen]);

  if (!isAddedOpen || !addedItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={closeAdded}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute righ-0 xl:right-4 top-0 xl:top-4 w-full xl:max-w-md xl:rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            ✅ <span className="font-medium">Added to Bag</span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={closeAdded}
            onKeyDown={(e) => e.key === "Enter" && closeAdded()}
            className="cursor-pointer select-none"
          >
            ✕
          </div>
        </div>

        {/* Product */}
        <div className="flex gap-4">
          {addedItem.image && (
            <Image
              src={addedItem.image}
              alt={addedItem.name}
              width={80}
              height={80}
              className="rounded"
            />
          )}

          <div className="flex flex-col gap-1">
            <p className="font-medium">{addedItem.name}</p>
            <p className="text-sm text-gray-500">{addedItem.category}</p>
            <p className="text-sm">Size EU {addedItem.size}</p>
            <p className="font-medium">
              Rp {addedItem.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="/cart"
            className="rounded-full border py-3 text-center font-medium"
          >
            View Bag ({itemCount})
          </a>

          <a
            href="/checkout"
            className="rounded-full bg-black py-3 text-center font-medium text-white"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}

