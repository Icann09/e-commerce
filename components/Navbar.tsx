"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User, Menu, Icon, SquareX } from "lucide-react";


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
          <button className="text-body text-dark-900 font-semibold transition-colors hover:text-dark-700">
            My Cart (2)
          </button>
          <p>|</p>
          {user ? (
            <button className="flex gap-2">Hi, {user.name.split(" ")[0]} <User /> </button>
            ) : (
              <div className="flex gap-6">
                <Link href="/sign-up" aria-label="Sign-In">
                  Join Us
                </Link>
                <p>|</p>
                <Link href="/sign-up" aria-label="Sign-In">
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
            <button className="flex gap-2 px-4 py-3">Hi, {user.name.split(" ")[0]} <User /> </button>
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
            <button className="text-body font-semibold">My Cart (2)</button>
          </li>
        </ul>
      </div>
    </header>
  );
}