"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { Trash2 } from "lucide-react";

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

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-body-medium text-dark-900">{name}</h2>
        <p className="text-dark-700">{category}</p>
        <div className="flex items-center gap-2 text-sm">
          <p className="text-gray-400">Size <span className="text-black font-semibold">{size}</span></p>
          <div className="flex items-center gap-3 bg-gray-200 rounded-full p-1">
            <p className="text-gray-400">Quantity</p>
            <button onClick={() => updateQuantity(id, quantity - 1)}>−</button>

            <span>{quantity}</span>
            <button onClick={() => updateQuantity(id, quantity + 1)}>+</button>

            
          </div>
        </div>

        
      </div>
      <div className="flex justify-between flex-col">
        <p className="text-body-medium text-dark-900">
          ${(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(id)}
          className=" text-red-500 flex justify-end"
        >
          <Trash2 />
        </button>
      </div>

      
    </div>
  );
}
