import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Navbar = ({ activeTab = 'institutes', onOpenInquiry }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const [openDesktopMenuIndex, setOpenDesktopMenuIndex] = useState(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsElevated(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the toggle button
      if (event.target.closest('button[aria-label="Toggle menu"]')) {
        return;
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const menu = activeTab === 'students' ? [
    // { name: 'Home', href: '/students' },
    {
      name: 'Services', href: '/students/products', children: [
        { name: 'Online Courses', href: '/students/courses' },
        { name: 'Study Materials', href: '/students/materials' },
        { name: 'Practice Tests', href: '/students/tests' },
      ]
    },
    { name: 'Partners', href: '/students/partners' },
    {
      name: 'Resources', href: '/students/resources', children: [
        { name: 'Study Guides', href: '/students/guides' },
        { name: 'Success Stories', href: '/students/success' },
        { name: 'Help Center', href: '/students/help' },
        { name: 'Video Tutorials', href: '/students/videos' },
      ]
    },
    {
      name: 'About Us', href: '/students/about', children: [
        { name: 'Contact Us', href: '/students/contact' },
        { name: 'Student Support', href: '/students/support' },
        { name: 'Mentorship', href: '/students/mentorship' },
      ]
    },
  ] : activeTab === 'publications' ? [
    // { name: 'Home', href: '/publications' },
    {
      name: 'Research', href: '/publications/research', children: [
        { name: 'Research Papers', href: '/publications/papers' },
        { name: 'Case Studies', href: '/publications/cases' },
        { name: 'White Papers', href: '/publications/whitepapers' },
      ]
    },
    { name: 'Journals', href: '/publications/journals' },
    {
      name: 'Resources', href: '/publications/resources', children: [
        { name: 'Publication Guidelines', href: '/publications/guidelines' },
        { name: 'Research Tools', href: '/publications/tools' },
        { name: 'Citation Help', href: '/publications/citations' },
        { name: 'Peer Review', href: '/publications/review' },
      ]
    },
    {
      name: 'About Us', href: '/publications/about', children: [
        { name: 'Contact Us', href: '/publications/contact' },
        { name: 'Editorial Board', href: '/publications/board' },
        { name: 'Submission Process', href: '/publications/submit' },
      ]
    },
  ] : [
    // { name: 'Home', href: '/' },
    {
      name: 'Services', href: '/products', children: [
        { name: 'Software', href: '/institutes' },
        { name: 'Sales', href: '/teachers' },
        { name: 'Marketing', href: '/aggregators' },
        { name: 'Support', href: '/aggregators' },
      ]
    },
    { name: 'Partners', href: '/partners' },
    {
      name: 'Resources', href: '/resources', children: [
        { name: 'Blogs & Articles', href: '/blogs' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Help Center / FAQs', href: '/help-center' },
        { name: 'Video Tutorials', href: '/video-tutorials' },
      ]
    },
    {
      name: 'About Us', href: '/about', children: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'About Mobishaala', href: '/about-mobishaala' },
        { name: 'Leadership Team', href: '/leadership' },
        { name: 'Milestones / Partners', href: '/milestones' },
      ]
    },
  ];

  return (
    <header className="fixed top-12 left-0 right-0 z-40">
      {/* Top contact bar (now responsive) */}
      {/* <div className="bg-gray-50 text-gray-700 text-sm p-2"> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919549718846" className="hover:text-black transition-colors">
              Talk to Sales: +91 95497 18846
            </a>
            <a href="mailto:hello@mobishaala.com" className="hover:text-black transition-colors">
              contact@mobishaala.com
            </a>
          </div>
          <a href="#login" className="inline-flex items-center gap-2 rounded-full border border-primary text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-white transition-colors">Teacher Login / Student Login</a>
        </div> */}
        {/* Mobile layout */}
        {/* <div className="md:hidden border-b border-gray-200">
          <div className="px-3 py-2 flex items-center justify-between gap-2 text-gray-800">
            <a href="tel:+919549718846" className="inline-flex items-center gap-2 text-sm">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.57 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.14a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>
              <span className="font-medium">+91 95497 18846</span>
            </a>
            <a href="#login" className="inline-flex items-center rounded-full border border-primary text-primary px-3 py-1 text-xs font-semibold hover:bg-primary hover:text-white transition-colors">Login</a>
          </div>
          <div className="px-3 pb-2 text-xs text-gray-700 truncate">
            <a href="mailto:hello@mobishaala.com" className="truncate block">contact@mobishaala.com</a>
          </div>
        </div> */}
      {/* </div> */}

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`bg-white ${isElevated ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-28 sm:h-28 md:h-36 lg:h-36 w-auto flex items-center">
                <img src="/moboshaalanewlogoback.png" alt="Mobishaala" className="h-full w-auto object-contain" />
              </div>
            </Link>

            {/* Desktop menu with dropdowns (hover + click to keep open) */}
            <div className="hidden lg:flex items-center gap-6">
              {menu.map((item, idx) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.children && setOpenDesktopMenuIndex(idx)}
                  onMouseLeave={() => item.children && setOpenDesktopMenuIndex((prev) => (prev === idx ? null : prev))}
                >
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className={`relative text-gray-700 hover:text-black font-medium px-1 py-2 inline-block transition-colors ${
                        openDesktopMenuIndex === idx ? 'text-primary' : ''
                      }`}
                    >
                      {item.name}
                      {item.children && (
                        <span
                          className={`absolute left-0 right-0 bottom-0 h-0.5 bg-primary transition-opacity duration-200 ${
                            openDesktopMenuIndex === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                          }`}
                        />
                      )}
                    </Link>
                    {item.children && (
                      <button
                        aria-label="Toggle dropdown"
                        className={`ml-1 text-gray-500 hover:text-gray-800 transition-transform ${openDesktopMenuIndex === idx ? 'rotate-180' : ''}`}
                        onClick={(e) => { e.preventDefault(); setOpenDesktopMenuIndex((prev) => prev === idx ? null : idx); }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
                        openDesktopMenuIndex === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                      }`}
                      onMouseEnter={() => setOpenDesktopMenuIndex(idx)}
                    >
                      <div className="relative min-w-[260px] bg-white border border-gray-200 rounded-2xl shadow-xl py-3">
                        <div className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white border border-gray-200 border-b-0 border-r-0" />
                        <div className="space-y-1">
                          {item.children.map((child) => (
                            <Link key={child.name} to={child.href} className="block px-5 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenInquiry?.()}
                className="rounded-full bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                TRY FOR FREE
              </button>
            </div>

            {/* Mobile/Tablet button */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen((v) => !v);
              }}
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

          {/* Mobile/Tablet menu with accordions */}
          {isMobileMenuOpen && (
            <div ref={mobileMenuRef} className="lg:hidden pb-4 max-h-96 overflow-y-auto scrollbar-hide">
              <div className="grid gap-1">
                {menu.map((item) => (
                  <div key={item.name} className="border-b border-gray-100">
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-3 py-3 text-gray-900 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.children && (
                        <span className="text-gray-400">▾</span>
                      )}
                    </Link>
                    {item.children && (
                      <div className="pl-4 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 inline-block text-center rounded-full bg-primary text-white px-5 py-2 font-semibold"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenInquiry?.();
                  }}
                >
                  TRY FOR FREE
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
