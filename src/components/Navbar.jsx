import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsElevated(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menu = [
    { name: 'Pricing', href: '#pricing' },
    { name: 'Product', href: '#product' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Resources', href: '#resources' },
    { name: 'Company', href: '#company' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact bar */}
      <div className="hidden md:block bg-gray-50 text-gray-700 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a href="tel:+919212992129" className="hover:text-black transition-colors">
              Talk to Sales: +91 92129 92129
            </a>
            <a href="mailto:hello@mobishaala.com" className="hover:text-black transition-colors">
              hello@mobishaala.com
            </a>
          </div>
          <a href="#login" className="hover:text-black transition-colors">Login</a>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`bg-white ${isElevated ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <img src="/mobishaala.com_logo.png" alt="Mobishaala" className="h-8 w-auto" />
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {menu.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-700 hover:text-black font-medium">
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#start"
                className="rounded-full bg-teal-500 text-white px-4 py-2 text-sm font-semibold hover:bg-teal-600 transition-colors"
              >
                TRY FOR FREE
              </a>
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="grid gap-2">
                {menu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#start"
                  className="mt-2 inline-block text-center rounded-full bg-teal-500 text-white px-5 py-2 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TRY FOR FREE
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
