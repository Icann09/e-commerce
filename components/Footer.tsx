import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  Featured: ["Air Force 1", "Huarache", "Air Max 90", "Air Max 95"],
  Shoes: ["All Shoes", "Custom Shoes", "Jordan Shoes", "Running Shoes"],
  Clothing: ["All Clothing", "Modest Wear", "Hoodies & Pullovers", "Shirts & Tops"],
  Kids: ["Infant & Toddler Shoes", "Kids' Shoes", "Kids' Jordan Shoes", "Kids' Basketball Shoes"],
};

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div>
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="mb-3 font-semibold text-white">{section}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Socials */}
        <div className="flex gap-4 md:justify-end">
          <Twitter size={20} className="hover:text-white" />
          <Facebook size={20} className="hover:text-white" />
          <Instagram size={20} className="hover:text-white" />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Nike Clone. All rights reserved.
      </div>
    </footer>
  );
}
