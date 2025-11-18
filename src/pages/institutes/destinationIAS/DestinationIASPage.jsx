import React from 'react';
import DestinationIASHero from './Hero';
import DestinationIASCourses from './Courses';
import DestinationIASJourney from './Journey';
import DestinationIASTestimonials from './Testimonials';
import DestinationIASFAQ from './FAQ';
import DestinationIASNavbar from './Navbar';
import DestinationIASFooter from './Footer';

const DestinationIASPage = () => (
  <div className="bg-white">
    <DestinationIASNavbar />
    <main>
      <DestinationIASHero />
      <DestinationIASCourses />
      <DestinationIASJourney />
      <DestinationIASTestimonials />
      <DestinationIASFAQ />
    </main>
    <DestinationIASFooter />
  </div>
);

export default DestinationIASPage;

