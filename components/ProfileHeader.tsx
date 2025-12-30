"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const tabs = [
  { label: "My Orders", href: "/profile/my-orders" },
  { label: "Favorites", href: "/profile/favorites" },
  { label: "My Details", href: "/profile/my-details" },
  { label: "Payment Methods", href: "/profile/payment-methods" },
  { label: "Address Book", href: "/profile/address-book" },
];

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const pathname = usePathname();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4">

        <Image
          src={user.image ?? "/avatar.jpg"}
          alt="Profile"
          width={110}
          height={110}
          className="rounded-full"
        />
        <div>
          <p className="text-2xl font-semibold">{user.name}</p>
          <p className="text-lg text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 overflow-x-auto border-b-2 border-b-gray-200 text-sm">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-3 whitespace-nowrap transition-colors ${
                isActive
                  ? "border-b-2 border-black font-medium"
                  : "text-muted-foreground hover:text-black"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
