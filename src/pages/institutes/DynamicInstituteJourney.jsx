import React from 'react';

const DynamicInstituteJourney = ({ institute, content }) => {
  const journeyData = content?.journey || {};
  const title = journeyData.title || 'Your Learning Journey';
  const subtitle = journeyData.subtitle || 'Experience our comprehensive learning methodology';
  const modules = journeyData.modules || [];

  // Default modules if none provided
  const defaultModules = [
    { heading: 'Interactive Learning', detail: 'Engage with live sessions and interactive content designed for better understanding.' },
    { heading: 'Expert Guidance', detail: 'Learn from industry experts and experienced mentors who guide you every step of the way.' },
    { heading: 'Practice & Assessment', detail: 'Regular practice sessions and assessments to track your progress and improve.' }
  ];

  const displayModules = modules.length > 0 ? modules : defaultModules;

  return (
    <section id="journey" className="py-16 bg-gradient-to-b from-white via-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Experience</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">{title}</h2>
          </div>
          <p className="text-gray-600 max-w-xl mt-4 md:mt-0">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayModules.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{item.heading}</h3>
              <p className="text-gray-600 mt-3">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicInstituteJourney;

