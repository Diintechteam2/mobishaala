import React from 'react';
import PublicationsHero from './publications/PublicationsHero';
import PublicationsPartner from './publications/PublicationsPartner';
import PublicationsTestimonials from './publications/PublicationsTestimonials';

const PublicationsView = () => {
  return (
    <div className="pt-24">
      <PublicationsHero />
      <PublicationsPartner />
      <PublicationsTestimonials />
    </div>
  );
};

export default PublicationsView;
