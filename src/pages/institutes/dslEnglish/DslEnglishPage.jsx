import React from 'react';
import DslEnglishHero from './Hero';
import DslEnglishCourses from './Courses';
import DslEnglishJourney from './Journey';
import DslEnglishTestimonials from './Testimonials';
import DslEnglishFAQ from './FAQ';
import DslEnglishNavbar from './Navbar';
import DslEnglishFooter from './Footer';

const DslEnglishPage = () => (
  <div className="bg-white">
    <DslEnglishNavbar />
    <main>
      <DslEnglishHero />
      <DslEnglishCourses />
      <DslEnglishJourney />
      <DslEnglishTestimonials />
      <DslEnglishFAQ />
    </main>
    <DslEnglishFooter />
  </div>
);

export default DslEnglishPage;

