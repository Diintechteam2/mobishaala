"use client";
import React from 'react';
import { motion } from 'framer-motion';

const iconSvgs = {
  crm: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l8 4v10l-8 4-8-4V7z" />
      <path d="M12 3v18" />
      <path d="M4 7l8 4 8-4" />
    </svg>
  ),
  calling: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A18 18 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.1.82.3 1.63.58 2.41a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.5-1.14a2 2 0 0 1 2.1-.45c.8.27 1.6.45 2.42.58A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  learning: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <path d="M8 4v16" />
      <path d="M16 10h4" />
      <path d="M16 14h4" />
    </svg>
  ),
  analytics: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 3v18h18" />
      <path d="M7 13l3-3 4 4 5-7" />
    </svg>
  ),
};

const solutions = [
  {
    title: 'Admissions & CRM',
    description: 'Capture leads from web, walk-ins & WhatsApp. Auto assign counsellors, trigger drip journeys and chase fees.',
    icon: iconSvgs.crm,
    highlights: ['Smart scoring', 'Journey builder', 'Payment nudges'],
  },
  {
    title: 'Hybrid Calling Desk',
    description: 'Single window dialer for inbound + outbound with call recordings, scripts, notes and missed-call automations.',
    icon: iconSvgs.calling,
    highlights: ['Click-to-call', 'Disposition tracking', 'Auto reminders'],
  },
  {
    title: 'Learning Experience',
    description: 'Secure live classes, recordings, tests, notes, discussion rooms and progress tracking with institute branding.',
    icon: iconSvgs.learning,
    highlights: ['Custom app', 'Multi teacher', 'Offline mode'],
  },
  {
    title: 'Analytics & Revenue',
    description: 'Full-funnel visibility: campaigns, admissions, batches, attendance, fee recovery and cohort health in one view.',
    icon: iconSvgs.analytics,
    highlights: ['360° dashboard', 'Drill downs', 'Export ready'],
  },
];

const InstitutesSolutions = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">One platform</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Everything institutes need to scale
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Replace multiple tools with a single stack that keeps your counsellors, faculty and management in sync.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map(({ title, description, icon, highlights }) => (
            <motion.div
              key={title}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-600">{description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((highlight) => (
                  <span key={highlight} className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 border border-transparent rounded-3xl pointer-events-none group-hover:border-primary/20 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutesSolutions;

