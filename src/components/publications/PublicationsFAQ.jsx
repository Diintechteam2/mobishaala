import React from 'react';

const PublicationsFAQ = () => {
  const faqs = [
    { q: 'What is Mobishaala Publications?', a: 'A suite for journals, research resources, and academic publishing tools integrated with learning apps.' },
    { q: 'Can institutes publish their journals?', a: 'Yes. Host institute-branded journals with article submission, review workflows, and DOI support.' },
    { q: 'Do you support peer review?', a: 'Yes. Configure single/double-blind peer review with editorial roles and automated reminders.' },
    { q: 'How are articles indexed?', a: 'We provide structured metadata, sitemaps, and integration options for indexing and discovery.' },
    { q: 'Is there plagiarism checking?', a: 'We integrate with popular plagiarism tools. Contact support to enable it for your account.' },
    { q: 'Can we monetize articles or issues?', a: 'Yes. Set open access or paid access, with subscriptions, bundles, and coupons.' },
    { q: 'What file formats are supported?', a: 'PDF, HTML, and supplemental media. Authors can attach datasets or code as supplementary files.' },
    { q: 'Do you provide DOI assignment?', a: 'We support DOI workflows via partner integrations where available.' },
    { q: 'Is long-term archiving available?', a: 'Automated backups, versioning, and export tools are available for archival needs.' },
    { q: 'How does author onboarding work?', a: 'Authors register, submit manuscripts, track reviews, and receive editorial decisions in their dashboard.' },
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
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-6">FAQs for Publications</h2>
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

export default PublicationsFAQ;


