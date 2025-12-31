"use client";

import { useVariantStore } from "@/store/variant";
import { cn } from "@/lib/utils/utils";

const SIZES = [
  "5", "5.5", "6", "6.5", "7", "7.5",
  "8", "8.5", "9", "9.5", "10",
  "10.5", "11", "11.5", "12"
];

interface SizePickerProps {
  productId: string;
  sizes: {
    variantId: string;
    sizeLabel: string;
    inStock?: boolean;
  }[];
  className?: string;
}

export default function SizePicker({
  productId,
  sizes,
  className = "",
}: SizePickerProps) {
  const selectedVariantId = useVariantStore(
    (s) => s.selectedVariantByProduct[productId]
  );

  // console.log("sizes are", JSON.stringify(sizes, null, 2));


  const setSelectedVariant = useVariantStore(
    (s) => s.setSelectedVariant
  );

  // 🔥 Build lookup for available sizes
  const sizeMap = new Map(
    sizes.map((s) => [s.sizeLabel, s])
  );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-body-medium text-dark-900">Select Size</p>
        <button className="text-caption underline hover:underline">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {SIZES.map((label) => {
          const size = sizeMap.get(label);

          const disabled =
            !size || size.inStock === false;

          const isActive =
            size && selectedVariantId === size.variantId;

          return (
            <button
              key={label}
              disabled={disabled}
              onClick={() =>
                size &&
                setSelectedVariant(productId, size.variantId)
              }
              className={cn(
                "rounded-lg border px-3 py-3 text-center transition",
                isActive
                  ? "border-dark-900 text-dark-900"
                  : "border-light-300 text-dark-700 hover:border-dark-500",
                disabled &&
                  "cursor-not-allowed opacity-40 hover:border-light-300"
              )}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
