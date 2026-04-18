import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "E-commerce Owner",
    feedback:
      "This tool helped me recover abandoned carts and boost my sales by 30%. Super easy to use!",
  },
  {
    name: "Priya Verma",
    role: "Coaching Institute",
    feedback:
      "Managing student communication is now effortless. Automation saves me hours every day.",
  },
  {
    name: "Amit Gupta",
    role: "Real Estate Agent",
    feedback:
      "Lead follow-ups became so smooth. My conversions improved significantly.",
  },
];

const Testimonials = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            What Our Customers Say
          </h2>
          <p className="text-textLight mt-3 text-sm sm:text-base">
            Real feedback from businesses using our platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md transition"
            >
              {/* Feedback */}
              <p className="text-textLight text-sm leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-text">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;