import React from 'react';

const faqs = [
  { q: 'Is this only for UPSC aspirants?', a: 'Primary focus is UPSC/PCS interview candidates but corporate professionals also join separate cohorts.' },
  { q: 'Will sessions be recorded?', a: 'Yes, every session is recorded and annotated on Mobishaala so you can revisit mentor feedback.' },
  { q: 'Do you offer pronunciation support?', a: 'Dedicated phonetics mentors share personalised drills and accent tracker reports weekly.' },
  { q: 'What about payment?', a: 'Buy Now buttons redirect to Mobishaala checkout with UPI, cards and EMI options.' },
];

const DslEnglishFAQ = () => (
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

export default DslEnglishFAQ;

