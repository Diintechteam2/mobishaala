import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'All Courses', href: '/institutes/destination-ias/courses', external: false },
  { label: 'Journey', href: '#journey', external: true },
  { label: 'Testimonials', href: '#testimonials', external: true },
  { label: 'FAQs', href: '#faqs', external: true },
];

const DestinationIASNavbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <Link to="/institutes/destination-ias" className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=120&auto=format&fit=crop"
          alt="Destination IAS"
          className="h-12 w-12 rounded-2xl object-cover border border-primary/30"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Destination IAS</p>
          <p className="text-lg font-black text-gray-900">UPSC + PCS Network</p>
        </div>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) =>
          link.external ? (
            <a key={link.label} href={link.href} className="text-sm font-semibold text-gray-700 hover:text-primary">
              {link.label}
            </a>
          ) : (
            <Link key={link.label} to={link.href} className="text-sm font-semibold text-primary">
              {link.label}
            </Link>
          )
        )}
      </nav>
      <a
        href="#destination-ias-form"
        className="inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-2.5 text-sm font-semibold shadow hover:bg-primary-dark transition"
      >
        Talk to Mentor
      </a>
    </div>
  </header>
);

export default DestinationIASNavbar;

