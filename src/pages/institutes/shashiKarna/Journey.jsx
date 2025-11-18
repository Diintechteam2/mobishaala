import React from 'react';

const steps = [
  { title: 'Foundation Booster', detail: 'Cover static & dynamic GS with bilingual mentoring and weekly doubt clinics.' },
  { title: 'Test Intensive Season', detail: 'Alternate between prelims drills and mains writing labs with instant evaluation.' },
  { title: 'Interview Residency', detail: 'Stay on campus for mock interviews, state update briefings and personality shaping.' },
];

const ShashiKarnaJourney = () => (
  <section id="journey" className="py-16 bg-gradient-to-b from-white via-primary/5 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Learning Journey</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Structured like your exam calendar</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div key={step.title} className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <p className="text-sm text-gray-500">Phase {idx + 1}</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">{step.title}</h3>
            <p className="text-gray-600 mt-3">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ShashiKarnaJourney;

