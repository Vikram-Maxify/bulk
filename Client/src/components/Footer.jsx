import React from "react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
              <h2 className="text-lg font-semibold text-text">WAMarketing</h2>
            </div>
            <p className="text-sm text-textLight">
              Automate your WhatsApp marketing and grow your business effortlessly.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-textLight">
              <li className="hover:text-text cursor-pointer">Features</li>
              <li className="hover:text-text cursor-pointer">Pricing</li>
              <li className="hover:text-text cursor-pointer">Demo</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-textLight">
              <li className="hover:text-text cursor-pointer">About</li>
              <li className="hover:text-text cursor-pointer">Contact</li>
              <li className="hover:text-text cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-textLight">
              <li className="hover:text-text cursor-pointer">Privacy Policy</li>
              <li className="hover:text-text cursor-pointer">Terms of Service</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted">
          © {new Date().getFullYear()} WAMarketing. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;