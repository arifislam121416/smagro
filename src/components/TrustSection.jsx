import {
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  BadgeCheck,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    description:
      "We focus on reliable products designed for responsible agricultural care.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your essential products delivered quickly and conveniently.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Multiple convenient payment options including COD and mobile banking.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Our support team is here to help you choose the right products.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    description:
      "A simple and transparent shopping experience for farmers and businesses.",
  },
  {
    icon: Leaf,
    title: "Smart Agriculture",
    description:
      "Solutions focused on healthier livestock and better farm productivity.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-green-600">
              Why SMAGRO
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Built Around Your
              <span className="block text-green-600">
                Farming Needs
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-gray-500">
              SMAGRO aims to make agricultural product shopping
              easier, more reliable and more convenient for farmers,
              livestock owners and aquaculture businesses.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <Stat value="Quality" label="Focused Products" />
              <Stat value="Easy" label="Online Shopping" />
              <Stat value="Fast" label="Delivery Service" />
              <Stat value="Safe" label="Payment Options" />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-lg font-extrabold text-green-600">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium text-gray-500">
        {label}
      </p>
    </div>
  );
}