import React from 'react';

const modules = [
  { heading: 'Live Skills Labs', detail: 'Role plays, debates and storytelling rooms moderated by DSL mentors.' },
  { heading: 'Pronunciation Studio', detail: 'AI powered accent tracker plus phonetics clinics twice a week.' },
  { heading: 'Panel Playground', detail: 'Mock interviews with bureaucrats and HR leaders streamed on Mobishaala.' },
];

const DslEnglishJourney = () => (
  <section id="journey" className="py-16 bg-gradient-to-b from-white via-primary/5 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Experience</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Practice first methodology</h2>
        </div>
        <p className="text-gray-600 max-w-xl">No long lectures. 70% of your time goes into speaking drills, reflection journals and mentor nudges.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {modules.map((item) => (
          <div key={item.heading} className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{item.heading}</h3>
            <p className="text-gray-600 mt-3">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DslEnglishJourney;

