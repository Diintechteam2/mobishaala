import React from 'react';

const milestones = [
  {
    title: 'Foundation Sprint',
    description: '90-day bootcamp to cover NCERT to advanced GS with live quizzes & revision sprints.'
  },
  {
    title: 'Practice + Feedback Lab',
    description: 'Weekly mains labs, AI evaluated prelims dashboard and peer accountability pods.'
  },
  {
    title: 'Interview Leadership Council',
    description: 'Panel of bureaucrats & retired officers take mocks with actionable scorecards.'
  }
];

const DestinationIASJourney = () => (
  <section id="journey" className="py-16 bg-gradient-to-b from-white via-primary/5 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Journey</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">How we take you to list</h2>
        </div>
        <div className="text-gray-600 max-w-lg">
          Built for working professionals & full time aspirants with transparent milestones synced to UPSC calendar.
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {milestones.map((item, idx) => (
          <div key={item.title} className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <span className="text-sm font-semibold text-gray-500">Phase {idx + 1}</span>
            <h3 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h3>
            <p className="text-gray-600 mt-3">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DestinationIASJourney;

