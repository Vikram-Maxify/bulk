import React, { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    desc: "Perfect for beginners",
    features: [
      "1,000 Messages",
      "Basic Automation",
      "Contact Management",
      "Email Support",
    ],
  },
  {
    name: "Growth",
    price: "₹1999",
    desc: "Best for growing businesses",
    features: [
      "5,000 Messages",
      "Advanced Automation",
      "Campaign Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Pro",
    price: "₹4999",
    desc: "For scaling businesses",
    features: [
      "Unlimited Messages",
      "Full Automation Suite",
      "Advanced Analytics",
      "Dedicated Support",
    ],
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // 👈 default center (Growth)

  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-textLight mt-3 text-sm sm:text-base">
            Choose a plan that fits your business needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {plans.map((plan, index) => {
            const isActive = selectedPlan === index;

            return (
              <div
                key={index}
                onClick={() => setSelectedPlan(index)}
                className={`relative p-6 sm:p-8 rounded-2xl border cursor-pointer transition duration-300 ${
                  isActive
                    ? "border-primary shadow-xl scale-105"
                    : "border-border bg-white hover:shadow-md"
                }`}
              >

                {/* Badge */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
                    Selected
                  </div>
                )}

                {/* Plan */}
                <h3 className="text-lg font-semibold text-text">
                  {plan.name}
                </h3>

                <p className="text-3xl font-bold mt-4 text-text">
                  {plan.price}
                  <span className="text-sm text-textLight"> /month</span>
                </p>

                <p className="text-textLight mt-2 text-sm">
                  {plan.desc}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3 text-sm text-textLight">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`mt-8 w-full py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow hover:scale-105"
                      : "border border-border text-text hover:bg-surface"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Pricing;