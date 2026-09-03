import Link from "next/link";
import {
  ArrowRight,
  Bird,
  Fish,
  Beef,
  Pill,
} from "lucide-react";

const categories = [
  {
    name: "Poultry",
    subtitle: "Care & nutrition",
    icon: Bird,
    emoji: "🐔",
    href: "/medicines?category=Poultry",
  },
  {
    name: "Livestock",
    subtitle: "Healthy animal care",
    icon: Beef,
    emoji: "🐄",
    href: "/medicines?category=Livestock",
  },
  {
    name: "Fish",
    subtitle: "Aquaculture solutions",
    icon: Fish,
    emoji: "🐟",
    href: "/medicines?category=Fish",
  },
  {
    name: "Supplements",
    subtitle: "Nutrition & wellness",
    icon: Pill,
    emoji: "💊",
    href: "/medicines?category=Supplements",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-green-600">
            Shop By Category
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Find What Your Farm Needs
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Choose from our growing range of products for poultry,
            livestock, fish and farm nutrition.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 transition duration-300 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition group-hover:scale-110">
                      {category.emoji}
                    </div>

                    <Icon className="h-5 w-5 text-green-500 opacity-70" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {category.subtitle}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-green-600">
                    Explore Products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}