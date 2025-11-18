import React from 'react';

const faqs = [
  { q: 'Do I get recorded lectures?', a: 'Yes. Every class is available on Mobishaala app with smart notes, bookmarks and offline access.' },
  { q: 'Is this suitable for first attempt?', a: 'Foundation cohorts start from basics, include NCERT revision, CSAT drills and writing labs for absolute beginners.' },
  { q: 'Can I switch from UPSC to State PCS?', a: 'You can move to our combo cohorts anytime. We align notes/tests for UPPCS, MPPSC, BPSC and more.' },
  { q: 'How are Buy Now payments handled?', a: 'Payments are collected through Mobishaala secure gateway with EMI & UPI options. Receipts and app access are instant.' },
];

const DestinationIASFAQ = () => (
  <section id="faqs" className="py-16 bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-8">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <details key={item.q} className="group bg-white border border-gray-200 rounded-2xl p-4 open:shadow">
            <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-900">
              {item.q}
              <span className="text-primary group-open:rotate-180 transition-transform">⌃</span>
            </summary>
            <p className="text-gray-600 mt-3">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default DestinationIASFAQ;

