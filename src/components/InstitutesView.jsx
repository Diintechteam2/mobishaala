import React from 'react';
import Hero from './Hero';
import Partner from './Partner';
import OneForAll from './algbunke/OneForAll';
import Podcast from './algbunke/Podcast';
import MediaSpotlight from './algbunke/MediaSpotlight';
import Testimonials from './Testimonials';
import InstitutesFAQ from './InstitutesFAQ';

const InstitutesView = () => {
  return (
    <div className="pt-24">
      <Hero />
      <Partner />
      <OneForAll />
      <Podcast />
      <MediaSpotlight />
      <Testimonials />
      <InstitutesFAQ />
    </div>
  );
};

export default InstitutesView;
