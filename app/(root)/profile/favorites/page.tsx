import FavoriteCard from "@/components/FavoriteCard";
import { fetchWishlist } from "@/lib/actions/favorite";
import { getCurrentUser } from "@/lib/auth/actions";


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

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">

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
