"use client";

import { create } from "zustand";

type SelectedVariant = {
  id: string;
  size: string;
};

type VariantState = {
  selectedColorByProduct: Record<string, number>;
  setColorIndex: (productId: string, index: number) => void;

  selectedVariantByProduct: Record<
    string,
    SelectedVariant | undefined
  >;

  setSelectedVariant: (
    productId: string,
    variant: SelectedVariant
  ) => void;
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
      selectedVariantByProduct: {
        ...state.selectedVariantByProduct,
        [productId]: undefined,
      },
    })),

  setSelectedVariant: (productId, variant) =>
    set((state) => ({
      selectedVariantByProduct: {
        ...state.selectedVariantByProduct,
        [productId]: variant,
      },
    })),
}));

