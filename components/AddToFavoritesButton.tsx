"use client";

import { toggleWishlist } from "@/lib/actions/favorite";
import { Heart } from "lucide-react";
import { useOptimistic, useTransition } from "react";

type Props = {
  productId: string;
  initialAdded: boolean;
};

export default function AddToFavoritesButton({
  productId,
  initialAdded,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const [added, setAdded] = useOptimistic(
    initialAdded,
    (_: boolean, next: boolean) => next
  );

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          setAdded(!added);
          await toggleWishlist(productId);
        })
      }
      className="flex items-center justify-center gap-2 rounded-full border px-6 py-4 disabled:opacity-50"
    >
      <Heart
        className={`h-5 w-5 transition ${
          added ? "fill-black text-black" : ""
        }`}
      />
      {added ? "Favorited" : "Favorite"}
    </button>
  );
}
