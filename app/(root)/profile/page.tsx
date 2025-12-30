"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

const orders = [
  {
    id: "1",
    status: "Estimated arrival 24 Sep 2025",
    statusColor: "text-orange-500",
    name: "Nike Air Force 1 Mid '07",
    category: "Men's Shoes",
    size: "10",
    quantity: 2,
    price: "$98.30",
    image: "/shoe-1.png",
    cancellable: true,
  },
  {
    id: "2",
    status: "Delivered on 04 August",
    statusColor: "text-green-600",
    name: "Air Max 1 '86 Original",
    category: "Men's Shoes",
    size: "10",
    quantity: 2,
    price: "$104.26",
    image: "/shoe-2.png",
    cancellable: true,
  },
  {
    id: "3",
    status: "Delivered on 04 August",
    statusColor: "text-green-600",
    name: "Nike Air Force 1 Low Retro",
    category: "Men's Shoes",
    size: "8",
    quantity: 1,
    price: "$185.67",
    image: "/shoe-3.png",
    cancellable: true,
  },
];

export default function MyOrdersPage() {
  return (
        <div className="mx-auto space-y-6 max-w-6xl px-4 py-6 sm:px-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
          >
            {/* Product Image */}
            <div className="w-full sm:w-28">
              <Image
                src={order.image}
                alt={order.name}
                width={120}
                height={120}
                className="rounded-md object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col gap-1">
              <p className={`text-sm ${order.statusColor}`}>
                {order.status}
              </p>
              <p className="font-medium">{order.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.category}
              </p>
              <p className="text-sm text-muted-foreground">
                Size {order.size} · Quantity {order.quantity}
              </p>
            </div>

            {/* Price + Action */}
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3">
              <p className="font-semibold">{order.price}</p>
              {order.cancellable && (
                <button className="flex items-center gap-1 text-sm text-red-500 hover:underline">
                  <Trash2 size={16} />
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
  );
}
