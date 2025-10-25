import React from 'react';
import StudentsHero from '../../components/students/StudentsHero';
import StudentsPartner from '../../components/students/StudentsPartner';
import StudentsTestimonials from '../../components/students/StudentsTestimonials';

const StudentsHome = () => {
  return (
    <div className="pt-24">
      <StudentsHero />
      <StudentsPartner />
      <StudentsTestimonials />
    </div>
  );
};

export default StudentsHome;
