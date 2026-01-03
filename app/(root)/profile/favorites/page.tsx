import FavoriteCard from "@/components/FavoriteCard";
import { fetchWishlist } from "@/lib/actions/favorite";
import { getCurrentUser } from "@/lib/auth/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import { green } from "colors";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="text-lg font-medium">
        Sign in to save your favorite items
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your favorites will appear here once you’re logged in.
      </p>
    </section>
  );
}

  const favorites = await fetchWishlist(user.id);
  const badge = "20%";
  const badgeColor = "green";
  console.log(JSON.stringify(favorites, null, 2));

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
  {/* <div className="relative rounded-xl bg-gray-50"> */}
      

        {/* Image */}
        {/* <div className="relative aspect-square w-full"> */}
            {/* Badge */}
        {/* {badge && (
          <span
            className={`absolute z-10 left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${
              badgeColor === "green"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {badge}
          </span>
        )} */}

        {/* Favorite icon */}
        {/* <button className="z-10 absolute right-4 top-4">
          <Heart className="h-5 w-5 fill-black transition-all duration-300 ease-out hover:h-8 hover:w-8 cursor-pointer" />
        </button>
          <Image
            src="/shoes/shoe-1.jpg"
            alt="shoe"
            
            fill
            className="rounded-xl"
          />
        </div>
      </div> */}

      {favorites.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          You haven’t added any favorites yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <FavoriteCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
}
