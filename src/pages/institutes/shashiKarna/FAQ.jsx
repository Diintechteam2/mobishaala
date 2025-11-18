import React from 'react';

const faqs = [
  { q: 'Are classes bilingual?', a: 'Yes, all GS classes are conducted in Hindi + English with separate English-only doubt rooms.' },
  { q: 'Can I pause my course?', a: 'You can freeze your access once for up to 30 days using the Mobishaala dashboard.' },
  { q: 'Do you provide hostel?', a: 'Limited hostel seats are available near the Patna centre. Counsellors will guide you after enrolment.' },
  { q: 'What payment options exist?', a: 'UPI, cards, no-cost EMI and education loans are available via Mobishaala checkout.' },
];

const ShashiKarnaFAQ = () => (
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

export default ShashiKarnaFAQ;

