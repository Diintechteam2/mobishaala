import React from 'react';

const capabilities = [
  { title: 'Smart Dashboard', detail: 'Track prelims, mains and interview readiness with AI nudges on weak areas.' },
  { title: 'Mentor on Demand', detail: 'Ping mentors directly from the Mobishaala app for doubts, strategy tweaks or answer reviews.' },
  { title: 'Community & Events', detail: 'State wise communities, daily quizzes, scholarship tests and topper AMAs.' },
];

const ExamDrishtiPlatform = () => (
  <section id="platform" className="py-16 bg-gradient-to-b from-white via-primary/5 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Platform</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why aspirants stay with ExamDrishti</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {capabilities.map((item) => (
          <div key={item.title} className="bg-white rounded-3xl p-6 shadow border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-600 mt-3">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExamDrishtiPlatform;

