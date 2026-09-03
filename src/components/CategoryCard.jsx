import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/medicines?category=${encodeURIComponent(category.name)}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl transition-transform duration-300 group-hover:scale-110">
          {category.icon}
        </div>

        {/* Content */}
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-green-700">
            {category.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {category.count} Product
          </p>
        </div>
      </div>
    </Link>
  );
}