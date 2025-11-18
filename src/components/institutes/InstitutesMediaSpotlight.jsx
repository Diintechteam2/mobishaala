"use client";
import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  { metric: '9.3/10', label: 'Average student NPS', detail: 'across 120k survey responses' },
  { metric: '42%', label: 'Faster fee recovery', detail: 'with automated WhatsApp nudges' },
  { metric: '3.5x', label: 'Increase in demo to paid', detail: 'after switching to Mobishaala desk' },
];

const pressQuotes = [
  {
    outlet: 'Business Standard',
    quote: '“Mobishaala is building the most comprehensive communication layer for coaching institutes.”',
  },
  {
    outlet: 'YourStory',
    quote: '“From leads to learning, everything sits in one cohesive workspace.”',
  },
];

const InstitutesMediaSpotlight = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Impact & media</p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              Institutes trust us with mission critical workflows
            </h2>
          </div>
          <button className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
            Download impact report
            <span>↗</span>
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <motion.div
              key={item.metric}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-4xl font-black text-white">{item.metric}</p>
              <p className="text-white/80 font-semibold mt-2">{item.label}</p>
              <p className="text-white/60 text-sm mt-2">{item.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {pressQuotes.map((press) => (
            <motion.div
              key={press.outlet}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-white/70 text-sm">{press.outlet}</p>
              <p className="text-lg font-semibold mt-2 leading-relaxed">“{press.quote.replace(/“|”/g, '')}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutesMediaSpotlight;

