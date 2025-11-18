"use client";
import React from 'react';
import { motion } from 'framer-motion';

const resources = [
  {
    pill: 'WhatsApp Workflows',
    title: 'Automate every counsellor follow-up with pre-approved templates',
    duration: '3-min explainer',
    linkLabel: 'Watch playthrough',
  },
  {
    pill: 'Calling Suite',
    title: 'See how fee recovery teams switch between IVR, click-to-call & voicemail drops',
    duration: 'Live lab recording',
    linkLabel: 'Join the lab',
  },
];

const InstitutesContentHub = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Demo hub</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
              See the platform in action
            </h2>
            <p className="text-gray-600 mt-4">
              Bite-sized walkthroughs to help academic directors, counsellor leads and founders understand how Mobishaala
              stitches WhatsApp, calling and learning experiences together.
            </p>
            <div className="mt-8 grid gap-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-primary/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <span className="inline-flex items-center text-xs font-semibold tracking-wide text-primary uppercase">
                    {resource.pill}
                  </span>
                  <p className="text-gray-900 font-semibold mt-2">{resource.title}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <span>{resource.duration}</span>
                    <button className="text-primary font-semibold flex items-center gap-2">
                      {resource.linkLabel}
                      <span>↗</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="relative rounded-[32px] overflow-hidden shadow-2xl min-h-[360px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&auto=format&fit=crop"
              alt="Product demo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500">Live KPI ticker</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">Calls answered in <span className="text-primary">27s avg</span></p>
              <p className="text-sm text-gray-600 mt-2">Counsellor teams collaborate with shared scripts, notes and nudges.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstitutesContentHub;

