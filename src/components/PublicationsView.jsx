import React from 'react';
import PublicationsHero from './publications/PublicationsHero';
import PublicationsPartner from './publications/PublicationsPartner';
import OneForAll from './algbunke/OneForAll';
import Podcast from './algbunke/Podcast';
import MediaSpotlight from './algbunke/MediaSpotlight';
import PublicationsTestimonials from './publications/PublicationsTestimonials';
import PublicationsFAQ from './publications/PublicationsFAQ';

const PublicationsView = () => {
  return (
    <div className="pt-24">
      <PublicationsHero />
      <PublicationsPartner />
      <OneForAll />
      <Podcast />
      <MediaSpotlight />
      <PublicationsTestimonials />
      <PublicationsFAQ />
    </div>
  );
};

export default PublicationsView;
