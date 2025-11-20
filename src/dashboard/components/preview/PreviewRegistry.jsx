import React from 'react';

const SectionShell = ({ title, children }) => (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 space-y-3">
    <div className="text-sm font-semibold text-gray-900">{title}</div>
    {children}
  </div>
);

const HeroPreview = ({ data }) => (
  <SectionShell title={data.headline || 'Hero'}>
    <p className="text-gray-600 text-sm">{data.subheading}</p>
    <div className="flex flex-wrap gap-2">
      {data.highlightChips?.map((chip, idx) => (
        <span
          key={idx}
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: chip.color || '#f3f4f6', color: '#111827' }}
        >
          {chip.label || chip.value}
        </span>
      ))}
    </div>
    <div className="flex gap-3 text-sm">
      {data.primaryCta?.label && (
        <span className="px-3 py-1.5 rounded-xl bg-primary text-white">{data.primaryCta.label}</span>
      )}
      {data.secondaryCta?.label && (
        <span className="px-3 py-1.5 rounded-xl border border-gray-200">{data.secondaryCta.label}</span>
      )}
    </div>
    {data.stats && (
      <div className="grid grid-cols-2 gap-3">
        {data.stats.map((stat, idx) => (
          <div key={idx} className="rounded-2xl bg-gray-50 p-3 text-xs">
            <div className="text-gray-500">{stat.label}</div>
            <div className="text-lg font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>
    )}
  </SectionShell>
);

const PartnerPreview = ({ data }) => (
  <SectionShell title="Logo Marquee">
    <div className="space-y-3">
      {data.rows?.map((row, idx) => (
        <div key={idx} className="flex gap-3 overflow-x-auto">
          {row.logos
            ? row.logos.map((logo, i) => (
                <div key={i} className="px-3 py-2 border rounded-xl text-xs text-gray-600 whitespace-nowrap">
                  {logo.name}
                </div>
              ))
            : row.map((logo, i) => (
                <div key={i} className="px-3 py-2 border rounded-xl text-xs text-gray-600 whitespace-nowrap">
                  {logo.name}
                </div>
              ))}
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3 text-xs">
      {data.stats?.map((stat, idx) => (
        <div key={idx} className="p-3 rounded-2xl bg-gray-50">
          <div className="text-gray-500">{stat.label}</div>
          <div className="text-lg font-semibold">{stat.value}</div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const PodcastPreview = ({ data }) => (
  <SectionShell title={data.title || 'Podcast'}>
    <p className="text-sm text-gray-500">{data.subtitle}</p>
    <div className="grid gap-3 md:grid-cols-2">
      {data.episodes?.map((episode, idx) => (
        <div key={idx} className="border border-gray-200 rounded-2xl p-3 text-sm">
          <div className="font-semibold text-gray-900">{episode.title}</div>
          <div className="text-xs text-gray-500">{episode.subtitle}</div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const TestimonialsPreview = ({ data }) => (
  <SectionShell title={data.headline || 'Testimonials'}>
    <p className="text-sm text-gray-500">{data.subheading}</p>
    <div className="grid gap-3">
      {data.items?.map((item, idx) => (
        <div key={idx} className="border border-gray-100 rounded-2xl p-3 text-sm">
          <div className="font-semibold text-gray-900">{item.name}</div>
          <div className="text-xs text-gray-500">{item.role}</div>
          <p className="mt-2 text-gray-600 text-sm">"{item.content}"</p>
        </div>
      ))}
    </div>
  </SectionShell>
);

const ShowcasePreview = ({ data }) => (
  <SectionShell title="Institutes Showcase">
    <div className="grid md:grid-cols-2 gap-3">
      {data.institutes?.map((institute, idx) => (
        <div key={idx} className="border border-gray-200 rounded-2xl p-3 text-sm">
          <div className="font-semibold text-gray-900">{institute.name}</div>
          <div className="text-xs text-gray-500">{institute.tagline}</div>
          <div className="mt-2 text-xs text-primary">{institute.link}</div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const NavigationPreview = ({ data }) => (
  <SectionShell title="Navigation Contexts">
    <div className="space-y-3 text-sm">
      {data.contexts?.map((context) => (
        <div key={context.id} className="border border-gray-200 rounded-2xl p-3 space-y-1">
          <div className="font-semibold text-gray-900">{context.label}</div>
          {context.items?.map((item) => (
            <div key={item.name}>
              <span className="font-medium">{item.name}</span> → <span className="text-xs">{item.href}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </SectionShell>
);

const ComingSoonPreview = ({ data }) => (
  <SectionShell title="Coming Soon Routes">
    <div className="space-y-2 text-sm">
      {data.pages?.map((page) => (
        <div key={page.route} className="border border-gray-200 rounded-2xl p-3">
          <div className="font-semibold text-gray-900">{page.title}</div>
          <div className="text-xs text-gray-500">{page.route}</div>
          <div className="text-xs text-gray-500">{page.subtitle}</div>
          {page.eta && <div className="text-xs text-primary font-semibold">ETA: {page.eta}</div>}
        </div>
      ))}
    </div>
  </SectionShell>
);

const FooterPreview = ({ data }) => (
  <SectionShell title="Footer">
    <div className="grid md:grid-cols-2 gap-3 text-sm">
      {data.sections?.map((section) => (
        <div key={section.title}>
          <div className="font-semibold">{section.title}</div>
          <ul className="text-xs text-gray-500 space-y-1 mt-1">
            {section.links?.map((link) => (
              <li key={link.href}>{link.label}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="text-xs text-gray-500">{data.legal}</div>
  </SectionShell>
);

export const previewRegistry = {
  Hero: HeroPreview,
  Partner: PartnerPreview,
  Podcast: PodcastPreview,
  Testimonials: TestimonialsPreview,
  Showcase: ShowcasePreview,
  Navigation: NavigationPreview,
  ComingSoon: ComingSoonPreview,
  Footer: FooterPreview,
};

