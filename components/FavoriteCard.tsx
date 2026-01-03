"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

type Props = {
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  badgeColor?: "green" | "orange";
  colors: number;
};

export default function FavoriteCard({
  name,
  category,
  price,
  image,
  badge,
  badgeColor,
  colors,
}: Props) {
  return (
    <div>
      <div className="relative rounded-xl bg-gray-50">
      

        {/* Image */}
        <div className="relative aspect-square w-full">
            {/* Badge */}
        {badge && (
          <span
            className={`absolute z-10 left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${
              badgeColor === "green"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {badge}
          </span>
        )}

        {/* Favorite icon */}
        <button className="z-10 absolute right-4 top-4">
          <Heart className="h-5 w-5 fill-black transition-all duration-300 ease-out hover:h-8 hover:w-8 cursor-pointer" />
        </button>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
         <div className="flex justify-between">
         <h3 className="text-sm font-medium">{name}</h3>
          <span className="text-sm font-medium">${price.toFixed(2)}</span>
        </div>

       <p className="text-sm text-gray-500">{category}</p>
       <p className="text-xs text-gray-400">{colors} Colour</p>
       </div>
    </div>
    
  );
}

