import React from 'react';
import InstitutesHero from './institutes/InstitutesHero';
import InstitutesShowcase from './institutes/InstitutesShowcase';
import InstitutesSolutions from './institutes/InstitutesSolutions';
import InstitutesContentHub from './institutes/InstitutesContentHub';
import InstitutesMediaSpotlight from './institutes/InstitutesMediaSpotlight';
import InstitutesTestimonials from './institutes/InstitutesTestimonials';
import InstitutesFAQ from './InstitutesFAQ';

const InstitutesView = () => {
  return (
    <div className="pt-24">
      <InstitutesHero />
      <InstitutesShowcase />
      <InstitutesSolutions />
      <InstitutesContentHub />
      <InstitutesMediaSpotlight />
      <InstitutesTestimonials />
      <InstitutesFAQ />
    </div>
  );
};

export default InstitutesView;
