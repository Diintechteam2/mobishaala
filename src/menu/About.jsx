import React from 'react';

const LinkRow = ({ title }) => (
  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white">
    <div className="font-semibold text-gray-900">{title}</div>
    <span className="text-primary font-bold">Coming Soon</span>
  </div>
);

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 text-center">About Us</h1>
      <div className="mt-10 space-y-4">
        <LinkRow title="Contact Us" />
        <LinkRow title="About Mobishaala" />
        <LinkRow title="Leadership Team" />
        <LinkRow title="Milestones / Partners" />
      </div>
    </div>
  );
}


