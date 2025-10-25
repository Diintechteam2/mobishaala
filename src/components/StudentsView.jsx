import React from 'react';
import StudentsHero from './students/StudentsHero';
import StudentsPartner from './students/StudentsPartner';
import StudentsTestimonials from './students/StudentsTestimonials';

const StudentsView = () => {
  return (
    <div className="pt-24">
      <StudentsHero />
      <StudentsPartner />
      <StudentsTestimonials />
    </div>
  );
};

export default StudentsView;
