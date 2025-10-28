import React from 'react';

const StudentsFAQ = () => {
  const faqs = [
    { q: 'What is Mobishaala for Students?', a: 'An app to access live classes, recorded lectures, notes, tests, and doubt support from your institute.' },
    { q: 'How do I join a live class?', a: 'Log in to your app, open your course, and tap the live class schedule to join directly.' },
    { q: 'Can I watch videos offline?', a: 'Yes. Secure offline downloads are supported on mobile apps for enrolled courses.' },
    { q: 'How are tests evaluated?', a: 'Objective tests are auto-evaluated with instant results. Subjective answers can be reviewed by teachers.' },
    { q: 'Will my progress sync across devices?', a: 'Yes. Your watch-time, bookmarks, notes, and test scores sync across web and mobile.' },
    { q: 'How do I ask doubts?', a: 'Use the in-class chat, course discussion, or raise a support ticket for teacher assistance.' },
    { q: 'What payment methods are supported?', a: 'UPI, cards, net banking, and EMI are supported via secure payment gateways.' },
    { q: 'Is my data safe?', a: 'Yes. Your personal data is protected with encryption and strict access controls.' },
    { q: 'Can I switch batches or upgrade plans?', a: 'Contact support via the app to request batch changes or plan upgrades as per policy.' },
    { q: 'Do I get certificates?', a: 'Institutes may issue course completion certificates. Check your course details for availability.' },
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
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-6">FAQs for Students</h2>
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

export default StudentsFAQ;


