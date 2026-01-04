"use client";

import { useCartStore } from "@/store/cart";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-heading-3 text-dark-900">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-dark-900 px-6 py-3 text-light-100"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* SEO */}
      <h1 className="text-2xl font-semibold">Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">
        {/* Items */}
        <section aria-label="Shopping cart items" className="space-y-8">
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              size={item.size}
            />
          ))}
        </section>

        {/* Summary */}
        <aside aria-label="Order summary">
          <CartSummary total={total} />
        </aside>
      </div>
    </main>
  );
}
