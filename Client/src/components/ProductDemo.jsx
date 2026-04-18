import React from "react";

const ProductDemo = () => {
    return (
        <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-surface">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
                        See How It Works in Real-Time
                    </h2>

                    <p className="mt-4 text-textLight text-sm sm:text-base max-w-lg">
                        Manage campaigns, automate messages, and track performance — all from a single powerful dashboard.
                    </p>

                    {/* Points */}
                    <div className="mt-6 space-y-3 text-sm text-textLight">
                        <p>✔ Create campaigns in seconds</p>
                        <p>✔ Track delivery & conversions</p>
                        <p>✔ Manage contacts easily</p>
                    </div>

                    {/* CTA */}
                    <button className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow hover:scale-105 transition">
                        Try Live Demo
                    </button>
                </div>

                {/* RIGHT (Dashboard Preview) */}
                <div className="relative">

                    {/* Main Image/Card */}
                    <div className="rounded-2xl border border-border bg-white shadow-xl p-4">
                        <div className="h-64 sm:h-72 md:h-80 rounded-xl bg-white flex items-center justify-center text-textLight">
                            Dashboard Screenshot
                        </div>
                    </div>

                    {/* Floating Info Cards */}
                    <div className="hidden sm:block absolute -top-6 -left-6 bg-white border border-border rounded-xl px-4 py-2 shadow">
                        <p className="text-xs text-muted">Campaign Sent</p>
                        <p className="text-sm font-semibold text-text">1,240</p>
                    </div>

                    <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white border border-border rounded-xl px-4 py-2 shadow">
                        <p className="text-xs text-muted">Open Rate</p>
                        <p className="text-sm font-semibold text-text">87%</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProductDemo;