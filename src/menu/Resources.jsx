import React from 'react';

const Section = ({ title }) => (
  <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
    <div className="text-xl font-bold text-gray-900">{title}</div>
    <div className="mt-2 text-primary font-semibold">Coming Soon</div>
  </div>
);

export default function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 text-center">Resources</h1>
      <p className="text-center text-gray-600 mt-2">Blogs, case studies, tutorials and more</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Blogs & Articles" />
        <Section title="Case Studies" />
        <Section title="Success Stories" />
        <Section title="Help Center / FAQs" />
        <Section title="Video Tutorials" />
      </div>
    </div>
  );
}


