"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";

type Props = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
  size: string
};

export default function CartItem({
  id,
  name,
  category,
  price,
  quantity,
  image,
  size,
}: Props) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 border-b pb-6">
      {image && (
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="rounded-lg object-cover"
        />
      )}

      <div className="flex-1">
        <h2 className="text-body-medium text-dark-900">{name}</h2>
        <p className="text-body text-dark-700">${price.toFixed(2)}</p>

        <div className="mt-3 flex items-center gap-3">
          <button onClick={() => updateQuantity(id, quantity - 1)}>−</button>

          <span>{quantity}</span>
          <button onClick={() => updateQuantity(id, quantity + 1)}>+</button>

          <button
            onClick={() => removeItem(id)}
            className="ml-4 text-red-600"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="text-body-medium text-dark-900">
        ${(price * quantity).toFixed(2)}
      </p>
          <span>Size : {size}</span>
          <span>Category : {category}</span>


    </div>
  );
}
