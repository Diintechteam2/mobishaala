import React from 'react';
import ExamDrishtiHero from './Hero';
import ExamDrishtiCourses from './Courses';
import ExamDrishtiPlatform from './Platform';
import ExamDrishtiTestimonials from './Testimonials';
import ExamDrishtiFAQ from './FAQ';
import ExamDrishtiNavbar from './Navbar';
import ExamDrishtiFooter from './Footer';

const ExamDrishtiPage = () => (
  <div className="bg-white">
    <ExamDrishtiNavbar />
    <main>
      <ExamDrishtiHero />
      <ExamDrishtiCourses />
      <ExamDrishtiPlatform />
      <ExamDrishtiTestimonials />
      <ExamDrishtiFAQ />
    </main>
    <ExamDrishtiFooter />
  </div>
);

export default ExamDrishtiPage;

