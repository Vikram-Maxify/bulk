import React from "react";

const FinalCTA = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Start Growing Your Business with WhatsApp Today 🚀
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
          Join hundreds of businesses using our platform to automate marketing,
          increase conversions, and save time.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <button className="px-6 py-3 rounded-xl bg-white text-primary font-semibold shadow hover:scale-105 transition">
            Start Free Trial
          </button>

          <button className="px-6 py-3 rounded-xl border border-white/50 text-white hover:bg-white/10 transition">
            Book Demo
          </button>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;