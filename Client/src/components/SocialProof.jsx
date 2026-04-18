import React from "react";

const SocialProof = () => {
  return (
    <section className="px-6 md:px-8 py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto text-center">

        {/* Trusted Text */}
        <p className="text-textLight text-sm mb-8">
          Trusted by 500+ businesses worldwide
        </p>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 mb-12">
          {["Shopify", "Zoho", "HubSpot", "Razorpay", "Freshworks"].map((logo) => (
            <div
              key={logo}
              className="px-4 py-2 text-sm font-medium text-textLight border border-border rounded-lg bg-white"
            >
              {logo}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Messages Sent", value: "1M+" },
            { label: "Avg. Conversion", value: "35%" },
            { label: "Active Businesses", value: "500+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm"
            >
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-textLight mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;