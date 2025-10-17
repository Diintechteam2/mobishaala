import React from 'react';

export default function ComingSoon({ title, subtitle }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center bg-gradient-to-b from-white via-primary/5 to-white rounded-none">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      <div className="mt-10 p-10 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="text-4xl font-black text-primary">Coming Soon</div>
        <p className="text-gray-700 mt-2">We are working on this page.</p>
      </div>
    </div>
  );
}


