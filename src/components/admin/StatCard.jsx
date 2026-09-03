"use client";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-green-100",
  iconColor = "text-green-600",
  trend,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={23} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {subtitle}
        </p>

        {trend && (
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}