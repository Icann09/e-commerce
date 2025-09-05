"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Men", "Women", "Kids", "Collections", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} priority className="invert"/>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm font-medium text-gray-800 hover:text-black"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-800">
          <button>Search</button>
          <button>My Cart (2)</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm font-medium text-gray-800 hover:text-black"
            >
              {link}
            </Link>
          ))}
          <button className="text-sm font-medium text-gray-800">Search</button>
          <button className="text-sm font-medium text-gray-800">
            My Cart (2)
          </button>
        </nav>
      )}
    </header>
  );
}
