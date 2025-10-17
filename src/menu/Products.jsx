import React from 'react';

const ComingSoon = ({ title, subtitle }) => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 className="text-3xl md:text-4xl font-black text-gray-900">{title}</h1>
    {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    <div className="mt-10 p-10 rounded-2xl border border-primary/20 bg-primary/5">
      <div className="text-4xl font-black text-primary">Coming Soon</div>
      <p className="text-gray-700 mt-2">We are crafting something great. Stay tuned!</p>
    </div>
  </div>
);

export default function Products() {
  return <ComingSoon title="Products" subtitle="Explore our offerings soon" />;
}


