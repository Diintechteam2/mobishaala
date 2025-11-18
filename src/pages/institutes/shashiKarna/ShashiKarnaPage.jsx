import React from 'react';
import ShashiKarnaHero from './Hero';
import ShashiKarnaCourses from './Courses';
import ShashiKarnaJourney from './Journey';
import ShashiKarnaTestimonials from './Testimonials';
import ShashiKarnaFAQ from './FAQ';
import ShashiKarnaNavbar from './Navbar';
import ShashiKarnaFooter from './Footer';

const ShashiKarnaPage = () => (
  <div className="bg-white">
    <ShashiKarnaNavbar />
    <main>
      <ShashiKarnaHero />
      <ShashiKarnaCourses />
      <ShashiKarnaJourney />
      <ShashiKarnaTestimonials />
      <ShashiKarnaFAQ />
    </main>
    <ShashiKarnaFooter />
  </div>
);

export default ShashiKarnaPage;

