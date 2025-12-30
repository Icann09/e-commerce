import type { ReactNode } from "react";
import Image from "next/image";


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
<>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Image
              src="/avatar.jpg"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">Ronald O. Williams</p>
              <p className="text-sm text-muted-foreground">
                ronald@mail.com
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex gap-6 overflow-x-auto border-b text-sm">
            {[
              "My Orders",
              "Favorites",
              "My Details",
              "Payment Methods",
              "Address Book",
            ].map((tab, i) => (
              <button
                key={tab}
                className={`pb-3 whitespace-nowrap ${
                  i === 0
                    ? "border-b-2 border-black font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {children}
         </>

    
  );
}
