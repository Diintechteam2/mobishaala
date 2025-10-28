import React from 'react';

const InstitutesFAQ = () => {
  const faqs = [
    { q: 'What is Mobishaala for Institutes?', a: 'A platform to launch branded online coaching apps for institutes with live classes, recorded content, tests, and analytics.' },
    { q: 'How quickly can we launch our app?', a: 'Most institutes go live within 7-10 business days after onboarding and content setup.' },
    { q: 'Do you support our existing YouTube or Zoom content?', a: 'Yes. You can embed or import existing videos and run secure live classes with attendance and chat.' },
    { q: 'Can we use our own branding and domain?', a: 'Yes. White-label branding with your logo, colors, and custom domain/subdomain is supported.' },
    { q: 'How is student data secured?', a: 'All data is encrypted in transit and at rest. Access is role-based with audit logs to protect student privacy.' },
    { q: 'What payment options are available?', a: 'Integrated payment gateways support UPI, cards, net banking, and EMI. You can set pricing, coupons, and bundles.' },
    { q: 'Do you provide analytics and reports?', a: 'Yes. Track enrollments, attendance, watch-time, test performance, and revenue in real-time dashboards.' },
    { q: 'Can teachers upload question banks and tests?', a: 'Yes. Create topic-wise question banks, practice sets, and timed tests with auto-evaluation.' },
    { q: 'Is there support for offline access?', a: 'Mobile apps support secure offline downloads with watermarking and time-bound access.' },
    { q: 'What kind of support is included?', a: 'Dedicated onboarding, training, and priority support via email, chat, and calls are included in all plans.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-6">FAQs for Institutes</h2>
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <details key={idx} className="group bg-white border border-gray-200 rounded-lg p-4 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between text-gray-900 font-medium">
              <span>{item.q}</span>
              <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-2 text-gray-600 leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </section>
  );
};

export default InstitutesFAQ;


