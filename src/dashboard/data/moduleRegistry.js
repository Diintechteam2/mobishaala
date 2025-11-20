const highlightChips = [
  { label: 'WhatsApp Suite', color: '#a90f35' },
  { label: 'Calling + CRM', color: '#111827' },
];

export const moduleSections = [
  {
    id: 'home',
    label: 'Home',
    description: 'Default landing modules for institutes audience.',
    modules: [
      {
        id: 'homeHero',
        audience: 'home',
        name: 'Home Hero',
        icon: '✨',
        description: 'Headline, CTAs, hero media and stats.',
        defaultData: {
          highlightChips,
          headline: 'WhatsApp & Calling Platform',
          subheading:
            'Do campaigns, sales calls, chatbots, support helplines and live chats from a single workspace.',
          primaryCta: { label: 'Start For Free', url: '#start', style: 'solid' },
          secondaryCta: { label: 'Watch demo', url: '#demo', style: 'ghost' },
          heroMedia: {
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop',
            alt: 'Professional using Mobishaala dashboard',
          },
          stats: [
            { label: 'Calls this week', value: '330' },
            { label: 'Automations live', value: '18' },
          ],
          offerCard: {
            title: 'Your Favorite Course',
            description: 'NOW AT 50% OFF',
            code: 'FLASHMEGA50',
          },
        },
        fields: [
          {
            name: 'highlightChips',
            label: 'Highlight Chips',
            type: 'repeater',
            itemLabel: 'Chip',
            fields: [
              { name: 'label', label: 'Label', type: 'text', required: true },
              { name: 'color', label: 'Color', type: 'color' },
            ],
          },
          { name: 'headline', label: 'Headline', type: 'textarea', rows: 2, required: true },
          { name: 'subheading', label: 'Sub Heading', type: 'textarea', rows: 3 },
          {
            name: 'primaryCta',
            label: 'Primary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text', required: true },
              { name: 'url', label: 'URL', type: 'text', required: true },
              {
                name: 'style',
                label: 'Style',
                type: 'select',
                options: [
                  { label: 'Solid', value: 'solid' },
                  { label: 'Outline', value: 'outline' },
                ],
              },
            ],
          },
          {
            name: 'secondaryCta',
            label: 'Secondary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
              {
                name: 'style',
                label: 'Style',
                type: 'select',
                options: [
                  { label: 'Ghost', value: 'ghost' },
                  { label: 'Outline', value: 'outline' },
                ],
              },
            ],
          },
          {
            name: 'heroMedia',
            label: 'Hero Media',
            type: 'object',
            fields: [
              { name: 'image', label: 'Image URL', type: 'text' },
              { name: 'alt', label: 'Alt text', type: 'text' },
            ],
          },
          {
            name: 'stats',
            label: 'Stats',
            type: 'repeater',
            itemLabel: 'Stat',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
          {
            name: 'offerCard',
            label: 'Offer Card',
            type: 'object',
            fields: [
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'text' },
              { name: 'code', label: 'Coupon Code', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Hero',
      },
      {
        id: 'partnerMarquee',
        audience: 'home',
        name: 'Partner Marquee',
        icon: '🏢',
        description: 'Logo carousel + stats',
        defaultData: {
          rows: [
            {
              logos: [
                { name: 'Giant Eagle', logo: '/giant-eagle-logo.jpg' },
                { name: 'Swiggy', logo: '/generic-food-delivery-logo.png' },
                { name: 'Backbase', logo: '/backbase-logo.jpg' },
              ],
            },
            {
              logos: [
                { name: 'Microsoft', logo: '/microsoft-logo.png' },
                { name: 'Amazon', logo: '/amazon-logo.png' },
                { name: 'TVS', logo: '/tvs-logo.jpg' },
              ],
            },
          ],
          stats: [
            { label: 'Hiring Partners', value: '220+' },
            { label: 'University Collabs', value: '40+' },
            { label: 'Careers Transformed', value: '25,000+' },
            { label: 'Team Size', value: '400+' },
          ],
        },
        fields: [
          {
            name: 'rows',
            label: 'Logo Rows',
            type: 'repeater',
            itemLabel: 'Row',
            fields: [
              {
                name: 'logos',
                label: 'Logos',
                type: 'repeater',
                itemLabel: 'Logo',
                fields: [
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'logo', label: 'Logo URL', type: 'text' },
                ],
              },
            ],
          },
          {
            name: 'stats',
            label: 'Stats',
            type: 'repeater',
            itemLabel: 'Stat',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Partner',
      },
      {
        id: 'podcastCarousel',
        audience: 'home',
        name: 'Podcast Carousel',
        icon: '🎙️',
        description: 'Content cards with CTA',
        defaultData: {
          title: 'Listen To Our Podcast',
          subtitle:
            'From industry insights to personal stories of transformation, tune into the podcasts where our mission, mentors, and learners take center stage.',
          episodes: [
            {
              title: 'Raghav Gupta Shares NEW HACKS For New Age Career',
              subtitle: 'ft. Ranveer Allahbadia',
              image:
                'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop',
            },
            {
              title: 'The REAL Reason Why Students Are Not Job-Ready',
              subtitle: 'ft. Ansh Mehra',
              image:
                'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop',
            },
          ],
        },
        fields: [
          { name: 'title', label: 'Section Title', type: 'text' },
          { name: 'subtitle', label: 'Section Subtitle', type: 'textarea', rows: 3 },
          {
            name: 'episodes',
            label: 'Episodes',
            type: 'repeater',
            itemLabel: 'Episode',
            fields: [
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'subtitle', label: 'Subtitle', type: 'text' },
              { name: 'image', label: 'Image URL', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Podcast',
      },
      {
        id: 'testimonials',
        audience: 'home',
        name: 'Testimonials',
        icon: '💬',
        description: 'Student social proof.',
        defaultData: {
          headline: 'Loved by Aspirants Across India',
          subheading: 'Join thousands of successful candidates who transformed their Mains preparation with mAIns.',
          cta: { label: 'Read More Reviews', url: '#reviews' },
          items: [
            {
              name: 'Ritika',
              role: 'UPSC Aspirant',
              content:
                'No more waiting for days to get feedback. mAIns gives me expert evaluation in hours, helping me practice more and improve faster.',
              rating: 5,
            },
            {
              name: 'Karan',
              role: 'PCS Candidate',
              content: 'Daily practice + feedback = confidence boost. The AI insights help me structure answers better.',
              rating: 5,
            },
          ],
        },
        fields: [
          { name: 'headline', label: 'Headline', type: 'text' },
          { name: 'subheading', label: 'Subheading', type: 'textarea', rows: 3 },
          {
            name: 'cta',
            label: 'CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          {
            name: 'items',
            label: 'Testimonials',
            type: 'repeater',
            itemLabel: 'Testimonial',
            fields: [
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'role', label: 'Role', type: 'text' },
              { name: 'content', label: 'Content', type: 'textarea', rows: 3 },
              { name: 'rating', label: 'Rating', type: 'number', min: 1, max: 5 },
            ],
          },
        ],
        previewComponent: 'Testimonials',
      },
    ],
  },
  {
    id: 'institutes',
    label: 'Institutes',
    description: 'Institute-specific sections',
    modules: [
      {
        id: 'institutesHero',
        audience: 'institutes',
        name: 'Institutes Hero',
        icon: '🏫',
        description: 'Hero block for /institutes.',
        defaultData: {
          badges: [{ value: 'Institutes' }, { value: 'WhatsApp + Calling Suite' }],
          headline: 'Launch your digital campus in 7 days with Mobishaala',
          description:
            'Manage admissions, run live + recorded batches, automate follow-ups and deliver a branded experience across devices.',
          primaryCta: { label: 'Book a Demo', url: '#demo' },
          secondaryCta: { label: 'Download Deck', url: '#deck' },
          stats: [
            { label: 'Onboarded Institutes', value: '350+' },
            { label: 'Active Learners', value: '5.2L' },
          ],
        },
        fields: [
          {
            name: 'badges',
            label: 'Badges',
            type: 'repeater',
            fields: [{ name: 'value', label: 'Text', type: 'text' }],
          },
          { name: 'headline', label: 'Headline', type: 'textarea', rows: 2 },
          { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
          {
            name: 'primaryCta',
            label: 'Primary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          {
            name: 'secondaryCta',
            label: 'Secondary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          {
            name: 'stats',
            label: 'Stats',
            type: 'repeater',
            itemLabel: 'Stat',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Hero',
      },
      {
        id: 'institutesShowcase',
        audience: 'institutes',
        name: 'Institutes Showcase',
        icon: '🧩',
        description: 'Cards linking to live institutes.',
        defaultData: {
          institutes: [
            {
              name: 'Destination IAS',
              tagline: 'Integrated UPSC + Interview Labs',
              background:
                'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop',
              logo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop',
              link: '/institutes/destination-ias',
            },
            {
              name: 'DSL English',
              tagline: 'Spoken English cohorts with tracked streaks',
              background:
                'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop',
              logo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&auto=format&fit=crop',
              link: '/institutes/dsl-english',
            },
          ],
        },
        fields: [
          {
            name: 'institutes',
            label: 'Institutes',
            type: 'repeater',
            itemLabel: 'Institute',
            fields: [
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'tagline', label: 'Tagline', type: 'text' },
              { name: 'background', label: 'Background URL', type: 'text' },
              { name: 'logo', label: 'Logo URL', type: 'text' },
              { name: 'link', label: 'Route', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Showcase',
      },
    ],
  },
  {
    id: 'students',
    label: 'Students',
    description: 'Student-focused landing sections.',
    modules: [
      {
        id: 'studentsHero',
        audience: 'students',
        name: 'Students Hero',
        icon: '🎓',
        description: 'Hero block for /students.',
        defaultData: {
          headline: 'Learn & Grow with Us',
          subheading:
            'Access premium courses, get personalized guidance, and connect with top educators from leading institutes.',
          primaryCta: { label: 'Start Learning', url: '#learn' },
          offerCard: { title: 'Student Special Offer', description: 'GET 30% OFF', code: 'STUDENT30' },
          statCard: { label: 'Courses completed', value: '1,250' },
        },
        fields: [
          { name: 'headline', label: 'Headline', type: 'textarea', rows: 2 },
          { name: 'subheading', label: 'Subheading', type: 'textarea', rows: 3 },
          {
            name: 'primaryCta',
            label: 'Primary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          {
            name: 'offerCard',
            label: 'Offer Card',
            type: 'object',
            fields: [
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'text' },
              { name: 'code', label: 'Code', type: 'text' },
            ],
          },
          {
            name: 'statCard',
            label: 'Stat Card',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Hero',
      },
      {
        id: 'studentsPartner',
        audience: 'students',
        name: 'Student Partners',
        icon: '🤝',
        description: 'Logo reels for student tab.',
        defaultData: {
          rows: [
            {
              logos: [
                { name: 'IIT Delhi', logo: '/iit-delhi-logo.jpg' },
                { name: 'IIT Bombay', logo: '/iit-bombay-logo.jpg' },
              ],
            },
            {
              logos: [
                { name: 'IIM Ahmedabad', logo: '/iim-ahmedabad-logo.jpg' },
                { name: 'XLRI Jamshedpur', logo: '/xlri-logo.jpg' },
              ],
            },
          ],
          stats: [
            { label: 'Partner Institutes', value: '50+' },
            { label: 'Expert Faculty', value: '500+' },
            { label: 'Students Enrolled', value: '10,000+' },
            { label: 'Success Rate', value: '95%' },
          ],
        },
        fields: [
          {
            name: 'rows',
            label: 'Logo Rows',
            type: 'repeater',
            itemLabel: 'Row',
            fields: [
              {
                name: 'logos',
                label: 'Logos',
                type: 'repeater',
                itemLabel: 'Logo',
                fields: [
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'logo', label: 'Logo URL', type: 'text' },
                ],
              },
            ],
          },
          {
            name: 'stats',
            label: 'Stats',
            type: 'repeater',
            itemLabel: 'Stat',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Partner',
      },
    ],
  },
  {
    id: 'publications',
    label: 'Publications',
    description: 'Publishing audience modules.',
    modules: [
      {
        id: 'publicationsHero',
        audience: 'publications',
        name: 'Publications Hero',
        icon: '📚',
        description: 'Hero block for /publications.',
        defaultData: {
          headline: 'Publish with Mobishaala',
          subheading:
            'Build research communities, launch journals, manage submissions, and run promotion funnels from one workspace.',
          primaryCta: { label: 'Explore Publications', url: '#publications' },
          stats: [
            { label: 'Journals Live', value: '24' },
            { label: 'Research Partners', value: '120+' },
          ],
        },
        fields: [
          { name: 'headline', label: 'Headline', type: 'textarea', rows: 2 },
          { name: 'subheading', label: 'Subheading', type: 'textarea', rows: 3 },
          {
            name: 'primaryCta',
            label: 'Primary CTA',
            type: 'object',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          {
            name: 'stats',
            label: 'Stats',
            type: 'repeater',
            itemLabel: 'Stat',
            fields: [
              { name: 'label', label: 'Label', type: 'text' },
              { name: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
        previewComponent: 'Hero',
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    description: 'Navigation, Footer and Coming Soon pages.',
    modules: [
      {
        id: 'navigationMenus',
        audience: 'global',
        name: 'Navigation Menus',
        icon: '🧭',
        description: 'Home / Students / Publications menu trees.',
        defaultData: {
          contexts: [
            {
              id: 'home',
              label: 'Institutes (default)',
              items: [
                {
                  name: 'Products',
                  href: '/products',
                  children: [
                    { name: 'For Institutes', href: '/institutes' },
                    { name: 'For Individual Teachers', href: '/teachers' },
                  ],
                },
                { name: 'Partners', href: '/partners' },
              ],
            },
            {
              id: 'students',
              label: 'Students',
              items: [
                { name: 'Home', href: '/students' },
                { name: 'Resources', href: '/students/resources' },
              ],
            },
          ],
        },
        fields: [
          {
            name: 'contexts',
            label: 'Contexts',
            type: 'repeater',
            itemLabel: 'Context',
            fields: [
              { name: 'id', label: 'Context ID', type: 'text' },
              { name: 'label', label: 'Label', type: 'text' },
              {
                name: 'items',
                label: 'Menu Items',
                type: 'repeater',
                itemLabel: 'Menu',
                fields: [
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'href', label: 'Route', type: 'text' },
                  {
                    name: 'children',
                    label: 'Children',
                    type: 'repeater',
                    itemLabel: 'Child Link',
                    fields: [
                      { name: 'name', label: 'Name', type: 'text' },
                      { name: 'href', label: 'Route', type: 'text' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        previewComponent: 'Navigation',
      },
      {
        id: 'comingSoon',
        audience: 'global',
        name: 'Coming Soon Pages',
        icon: '🚧',
        description: 'Route-specific placeholders + ETAs.',
        defaultData: {
          pages: [
            {
              route: '/teachers',
              title: 'For Individual Teachers',
              subtitle: 'Coming soon, join the waitlist.',
              eta: 'Q1 2026',
            },
            {
              route: '/blogs',
              title: 'Blogs & Articles',
              subtitle: 'Working on long-form stories.',
              eta: 'Feb 2026',
            },
          ],
        },
        fields: [
          {
            name: 'pages',
            label: 'Coming Soon Pages',
            type: 'repeater',
            itemLabel: 'Page',
            fields: [
              { name: 'route', label: 'Route', type: 'text' },
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'subtitle', label: 'Subtitle', type: 'text' },
              { name: 'eta', label: 'ETA (optional)', type: 'text' },
            ],
          },
        ],
        previewComponent: 'ComingSoon',
      },
      {
        id: 'footer',
        audience: 'global',
        name: 'Footer',
        icon: '🦶',
        description: 'Footer sections, destinations and socials.',
        defaultData: {
          sections: [
            {
              title: 'About Mobishaala',
              links: [
                { label: 'About Us', href: '/about' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
              ],
            },
            {
              title: 'For Brands',
              links: [
                { label: 'Partner With Us', href: '/partner' },
                { label: 'Destination Marketing', href: '/destination-marketing' },
              ],
            },
          ],
          destinations: [
            { name: 'Delhi', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=300' },
            { name: 'Dubai', image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=300' },
          ],
          social: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/mobishaala' },
            { platform: 'YouTube', url: 'https://youtube.com/@mobishaala' },
          ],
          legal:
            'The content and images used on this site are copyright protected. Unauthorized use is prohibited and punishable.',
        },
        fields: [
          {
            name: 'sections',
            label: 'Footer Sections',
            type: 'repeater',
            itemLabel: 'Section',
            fields: [
              { name: 'title', label: 'Title', type: 'text' },
              {
                name: 'links',
                label: 'Links',
                type: 'repeater',
                itemLabel: 'Link',
                fields: [
                  { name: 'label', label: 'Label', type: 'text' },
                  { name: 'href', label: 'URL', type: 'text' },
                ],
              },
            ],
          },
          {
            name: 'destinations',
            label: 'Destinations',
            type: 'repeater',
            itemLabel: 'Destination',
            fields: [
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'image', label: 'Image URL', type: 'text' },
            ],
          },
          {
            name: 'social',
            label: 'Social Links',
            type: 'repeater',
            itemLabel: 'Social',
            fields: [
              { name: 'platform', label: 'Platform', type: 'text' },
              { name: 'url', label: 'URL', type: 'text' },
            ],
          },
          { name: 'legal', label: 'Legal Text', type: 'textarea', rows: 3 },
        ],
        previewComponent: 'Footer',
      },
    ],
  },
];

export const initialModuleEntries = moduleSections.reduce((acc, section) => {
  section.modules.forEach((module) => {
    acc[module.id] = {
      id: module.id,
      status: 'published',
      owner: 'System Import',
      updatedAt: new Date().toISOString(),
      data: module.defaultData,
    };
  });
  return acc;
}, {});

