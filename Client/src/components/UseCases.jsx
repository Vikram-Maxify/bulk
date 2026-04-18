import React from "react";
import { ShoppingCart, GraduationCap, Home, Stethoscope } from "lucide-react";

const useCases = [
  {
    title: "E-commerce",
    desc: "Recover abandoned carts and send order updates instantly.",
    icon: ShoppingCart,
  },
  {
    title: "Coaching",
    desc: "Send batch reminders, updates, and nurture leads easily.",
    icon: GraduationCap,
  },
  {
    title: "Real Estate",
    desc: "Follow up with leads and share property details quickly.",
    icon: Home,
  },
  {
    title: "Clinics",
    desc: "Automate appointment reminders and patient communication.",
    icon: Stethoscope,
  },
];

const UseCases = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            Built for Every Business
          </h2>
          <p className="text-textLight mt-3 text-sm sm:text-base">
            No matter your industry, WhatsApp marketing works.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition hover:-translate-y-1 text-center"
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-text">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-textLight mt-2">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default UseCases;