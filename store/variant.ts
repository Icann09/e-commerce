"use client";

import { create } from "zustand";

type VariantState = {
  // color selection
  selectedColorByProduct: Record<string, number>;
  setColorIndex: (productId: string, index: number) => void;

  // size / variant selection
  selectedVariantByProduct: Record<string, string | undefined>;
  setSelectedVariant: (productId: string, variantId: string) => void;
};

export const useVariantStore = create<VariantState>((set) => ({
  selectedColorByProduct: {},
  selectedVariantByProduct: {},

  setColorIndex: (productId, index) =>
    set((state) => ({
      selectedColorByProduct: {
        ...state.selectedColorByProduct,
        [productId]: index,
      },
      // 🔥 reset size when color changes
      selectedVariantByProduct: {
        ...state.selectedVariantByProduct,
        [productId]: undefined,
      },
    })),

  setSelectedVariant: (productId, variantId) =>
    set((state) => ({
      selectedVariantByProduct: {
        ...state.selectedVariantByProduct,
        [productId]: variantId,
      },
    })),
}));
