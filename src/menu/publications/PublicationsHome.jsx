import React from 'react';
import PublicationsHero from '../../components/publications/PublicationsHero';
import PublicationsPartner from '../../components/publications/PublicationsPartner';
import PublicationsTestimonials from '../../components/publications/PublicationsTestimonials';

const PublicationsHome = () => {
  return (
    <div className="pt-24">
      <PublicationsHero />
      <PublicationsPartner />
      <PublicationsTestimonials />
    </div>
  );
};

export default PublicationsHome;
