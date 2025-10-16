import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueSection from './components/ValueSection';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import WhoIsItFor from './components/WhoIsItFor';
import Partner from './components/Partner';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partner />
      {/* <ValueSection /> */}
      <Testimonials />
      {/* <HowItWorks /> */}
      {/* <WhoIsItFor /> */}
      {/* <Pricing /> */}
      {/* <FinalCTA /> */}
      <Footer />
    </div>
  );
}