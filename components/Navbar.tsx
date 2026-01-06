"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User, Menu, SquareX } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";
import { signOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";





interface User {
  name: string;
  email: string;
}

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar ({ user }: { user: User | null } ) {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getItemCount());
  const clearCart = useCartStore((s) => s.clearCart);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  

  return (
    <header className="sticky top-0 z-50 bg-light-100 font-semibold">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" aria-label="Nike Home" className="flex items-center">
          <Image src="/logo.svg" alt="Nike" width={28} height={28} priority className="invert" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-dark-900 font-semibold transition-colors hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <button className="text-body text-dark-900 font-semibold transition-colors hover:text-dark-700">
            Search
          </button>
          <p>|</p>
          <button className="relative text-body text-dark-900 font-semibold transition-colors hover:text-dark-700">
            <Link href="/cart">
              My Cart ({cartCount})
            </Link>
          </button>
          <p>|</p>
          {user ? (
            <div className="group relative inline-block">
              <Link href="/profile/my-orders" className="flex gap-2 cursor-pointer font-medium">Hi, {user.name.split(" ")[0]} <User /> </Link>
                {/* Dialog */}
              <div
                className="
                  absolute right-0 top-full mt-2 w-56
      rounded-xl bg-white p-4 shadow-xl
      opacity-0 translate-y-1
      transition-all duration-200
      group-hover:opacity-100
      group-hover:translate-y-0
                "
              >
                <h3 className=" text-[18px]">Profile</h3>
                <div className="text-gray-500 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <Link href="/profile/my-orders">
                    My Orders
                    </Link>
                    <Link href="/profile/favorites">
                    Favorites
                    </Link>
                    <Link href="/profile/my-details">
                    My Details
                    </Link>
                    <Link href="/profile/payment-methods">
                    Payment Methods
                    </Link>
                    <Link href="/profile/address-book">
                    Address Book
                    </Link>
                    <button className="bg-black p-2 text-white cursor-pointer rounded-sm" 
                      onClick={async () => {
                        await signOut();
                        clearCart();
                        router.refresh(); // refresh server components
                      }}
                      >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              <div className="flex gap-6">
                <Link href="/sign-up" aria-label="Sign-In">
                  Join Us
                </Link>
                <p>|</p>
                <Link href="/sign-in" aria-label="Sign-In">
                  Sign In
                </Link>
              </div>
            )
          }

          

        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open! ? (
            <SquareX />
          ) : (
          <Menu />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-light-300 md:hidden ${open ? "block" : "hidden"}`}
      >
          {user ? (
            <Link href="/profile/my-orders" className="flex gap-2 px-4 py-3">Hi, {user.name.split(" ")[0]} <User /> </Link>
            ) : null
          }
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-body text-dark-900 font-semibold hover:text-dark-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-between pt-2">
            <button className="text-body font-semibold">Search</button>
            <Link
              href="/cart"
              className="relative text-body text-dark-900 font-semibold transition-colors hover:text-dark-700"
            >
              My Cart ({mounted ? cartCount : 0})
            </Link>

          </li>
          <li>
          {user ? (
            <button className="bg-black/90 w-full p-2 mt-2 text-white cursor-pointer rounded-sm" 
              onClick={async () => {
                await signOut();
                clearCart();
                router.refresh(); // refresh server components
              }}
              >
              Log Out
            </button>
          ) : null}
          
          </li>
        </ul>
      </div>
    </header>
  );
}