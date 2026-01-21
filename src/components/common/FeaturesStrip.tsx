"use client";

import {
  Trophy,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "High Quality",
    subtitle: "crafted from top materials",
  },
  {
    icon: ShieldCheck,
    title: "Protection",
    subtitle: "Delivery",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "Order over ₹10000",
  },
  {
    icon: Headphones,
    title: "24 / 7 Support",
    subtitle: "Dedicated support",
  },
];

export default function FeaturesStrip() {
  return (
    <section className="w-full bg-[#FAF3EA] py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                {/* Icon */}
                <div className="w-[60px] h-[60px] flex items-center justify-center">
                  <Icon size={44} strokeWidth={1.5} className="text-[#242424]" />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-[22px] font-semibold text-[#242424] leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[18px] text-[#898989] leading-tight">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
