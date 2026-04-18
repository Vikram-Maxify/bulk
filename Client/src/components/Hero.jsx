import React from 'react'

const Hero = () => {
  return (
    <>
        <section className="relative px-6 md:px-8 py-20 overflow-hidden">

  {/* Gradient Blobs (premium feel) */}
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT */}
    <div>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text">
        Automate Your WhatsApp Marketing & Boost Conversions
      </h2>

      <p className="mt-4 text-textLight max-w-xl">
        Send campaigns, automate replies, manage contacts, and track performance — all from one clean dashboard.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow hover:scale-105 transition">
          Start Free Trial
        </button>

        <button className="px-6 py-3 rounded-xl border border-border text-text hover:bg-surface transition">
          Book Demo
        </button>
      </div>

      {/* Trust Points */}
      <div className="mt-6 flex items-center gap-6 text-sm text-muted">
        <span>✔ Official API</span>
        <span>✔ No spam</span>
        <span>✔ High delivery</span>
      </div>
    </div>

    {/* RIGHT */}
    <div className="relative">

      {/* Main Card */}
      <div className="rounded-2xl border border-border bg-white shadow-xl p-4">
        <div className="h-64 md:h-80 rounded-xl bg-surface flex items-center justify-center text-textLight">
          Dashboard Preview
        </div>
      </div>

      {/* Floating Cards */}
      <div className="hidden md:block absolute -top-6 -left-6 bg-white border border-border rounded-xl px-4 py-2 shadow">
        <p className="text-xs text-muted">Delivery</p>
        <p className="text-sm font-semibold text-text">98.6%</p>
      </div>

      <div className="hidden md:block absolute -bottom-6 -right-6 bg-white border border-border rounded-xl px-4 py-2 shadow">
        <p className="text-xs text-muted">Messages</p>
        <p className="text-sm font-semibold text-text">12,450</p>
      </div>

    </div>
  </div>
</section>
    </>
  )
}

export default Hero