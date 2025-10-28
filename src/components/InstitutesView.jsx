import React from 'react';
import Hero from './Hero';
import Partner from './Partner';
import Testimonials from './Testimonials';
import InstitutesFAQ from './InstitutesFAQ';

const InstitutesView = () => {
  return (
    <div className="pt-24">
      <Hero />
      <Partner />
      <Testimonials />
      <InstitutesFAQ />
    </div>
  );
};

export default InstitutesView;
