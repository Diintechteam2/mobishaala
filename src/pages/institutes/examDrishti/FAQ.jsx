import React from 'react';

const faqs = [
  { q: 'Is this app only for UPSC?', a: 'No, ExamDrishti serves UPSC plus major state PCS, SSC and banking exams. You can toggle tracks anytime.' },
  { q: 'Can I access on multiple devices?', a: 'Yes, login works on web + mobile with progress syncing. Downloads are DRM protected.' },
  { q: 'Are there live doubt sessions?', a: 'Daily live doubt rooms and mentor office hours are part of every subscription.' },
  { q: 'How does payment work?', a: 'Buy Now triggers Mobishaala’s secure checkout with UPI, cards, EMI and GST invoice support.' },
];

const ExamDrishtiFAQ = () => (
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

export default ExamDrishtiFAQ;

