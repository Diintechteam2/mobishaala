import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Partner from './components/Partner';
import Footer from './components/Footer';

// Page placeholders
import Home from './menu/Home';
import Products from './menu/Products';
import PartnersPage from './menu/Partners';
import Resources from './menu/Resources';
import About from './menu/About';
import ComingSoon from './menu/ComingSoon';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="App overflow-x-hidden">
      <Navbar />
      {isHome ? (
        <>
          <Hero />
          <Partner />
          <Testimonials />
        </>
      ) : (
        <div className="pt-24">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            {/* Subpages */}
            <Route path="/institutes" element={<ComingSoon title="For Institutes" />} />
            <Route path="/teachers" element={<ComingSoon title="For Individual Teachers" />} />
            <Route path="/aggregators" element={<ComingSoon title="For Coaching Aggregators" />} />
            <Route path="/blogs" element={<ComingSoon title="Blogs & Articles" />} />
            <Route path="/case-studies" element={<ComingSoon title="Case Studies" />} />
            <Route path="/success-stories" element={<ComingSoon title="Success Stories" />} />
            <Route path="/help-center" element={<ComingSoon title="Help Center / FAQs" />} />
            <Route path="/video-tutorials" element={<ComingSoon title="Video Tutorials" />} />
            <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
            <Route path="/about-mobishaala" element={<ComingSoon title="About Mobishaala" />} />
            <Route path="/leadership" element={<ComingSoon title="Leadership Team" />} />
            <Route path="/milestones" element={<ComingSoon title="Milestones / Partners" />} />
          </Routes>
        </div>
      )}
      <Footer />
    </div>
  );
}