import React from 'react';
import StudentsHero from './students/StudentsHero';
import StudentsPartner from './students/StudentsPartner';
import OneForAll from './algbunke/OneForAll';
import Podcast from './algbunke/Podcast';
import MediaSpotlight from './algbunke/MediaSpotlight';
import StudentsTestimonials from './students/StudentsTestimonials';
import StudentsFAQ from './students/StudentsFAQ';

const StudentsView = () => {
  return (
    <div className="pt-24">
      <StudentsHero />
      <StudentsPartner />
      <OneForAll />
      <Podcast />
      <MediaSpotlight />
      <StudentsTestimonials />
      <StudentsFAQ />
    </div>
  );
};

export default StudentsView;
