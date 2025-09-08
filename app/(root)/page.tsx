import Card from "@/components/Card";
import { getAllProducts } from "@/lib/actions/product";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const { products } = await getAllProducts({ limit: 3 });
  

  return (
    <main>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.png')" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-28 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-pink-500 font-semibold text-lg">Bold & Sporty</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Style That Moves <br /> With You.
            </h1>
            <p className="text-gray-600 text-lg">
              Not just style. Not just comfort. Footwear that effortlessly moves
              with your every step.
            </p>
            <div>
              <Link href="/products">
                <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                  Find Your Shoe
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Shoe Image + Text */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background diagonal shape */}
            <div className="absolute -bottom-10 right-10 w-56 h-96 bg-pink-200 rotate-12 -z-10 hidden md:block"></div>

            {/* Shoe Image */}
            <Image
              src="/hero-shoe.png" // replace with your image path
              alt="Nike Air Jordan"
              width={600}
              height={400}
              className="relative z-10 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Best Product */}
      <section aria-labelledby="latest" className="pt-8 pb-12 mx-auto max-w-7xl ">
        <h2 id="latest" className="my-6 text-heading-3 text-dark-900">
          Best of Air Max
        </h2>
        <div>
          {products.length === 0 ? (
            <div className="rounded-lg border border-light-300 p-8 text-center">
              <p className="text-body text-dark-700">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-6">
              {products.map((p) => {
                const price =
                  p.minPrice !== null && p.maxPrice !== null && p.minPrice !== p.maxPrice
                    ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
                    : p.minPrice !== null
                    ? p.minPrice
                    : undefined;
                return (
                  <Card
                    key={p.id}
                    title={p.name}
                    subtitle={p.subtitle ?? undefined}
                    imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                    price={price}
                    href={`/products/${p.id}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      {/* Trending */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-lg px-3 font-semibold mb-4 md:px-0">Trending Now</h2>

        <div className="grid gap-4 md:gap-6">
          {/* Featured Product */}
          <div className="relative w-full text-white h-[300px] md:h-[500px] overflow-hidden">
            <Image
              src="/trending-1.png" // change with your real image
              alt="React Presto"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6 md:p-10">
              <h3 className="text-2xl md:text-4xl font-bold">REACT PRESTO</h3>
              <p className="mt-2 text-sm md:text-base">
                With React foam for the most comfortable Presto ever.
              </p>
              <button className="mt-4 w-36 px-5 py-1 bg-white text-black text-sm md:text-base rounded-full font-medium hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>

          {/* Smaller Cards */}
          <div className="hidden text-white md:grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/trending-2.png" // change with your real image
                alt="Air Max Dia"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-sm md:text-base font-medium">
                  Summer Must-Haves: Air Max Dia
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/trending-3.png" // change with your real image
                alt="Air Jorden 11 Retro Low LE"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-sm md:text-base font-medium">
                  Air Jorden 11 Retro Low LE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 py-16 lg:py-24">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-pink-500 font-semibold mb-2">Bold & Sporty</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              NIKE REACT <br /> PRESTO BY YOU
            </h1>
            <p className="text-gray-500 max-w-lg mb-6 mx-auto lg:mx-0">
              Take advantage of brand new, proprietary cushioning technology with
              a fresh pair of Nike react shoes.
            </p>
            <button className="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>

          {/* Right content */}
          <div className="relative flex-1 flex justify-center lg:justify-end mb-8 lg:mb-0">
            {/* Shoe image */}
            <Image
              src="/feature.png" // replace with your actual image path
              alt="Nike React Shoes"
              width={600}
              height={400}
              className="relative z-10 max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
};

