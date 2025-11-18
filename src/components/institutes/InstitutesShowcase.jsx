"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const institutes = [
  {
    name: 'Destination IAS',
    tagline: 'Integrated UPSC + Interview Labs',
    background: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop',
    link: '/institutes/destination-ias'
  },
  {
    name: 'Shashi Karna Classes',
    tagline: 'Offline + mobile-first hybrid batchrooms',
    background: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?w=200&auto=format&fit=crop',
    link: '/institutes/shashi-karna'
  },
  {
    name: 'DSL English',
    tagline: 'Spoken English cohorts with tracked streaks',
    background: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&auto=format&fit=crop',
    link: '/institutes/dsl-english'
  },
  {
    name: 'ExamDrishti',
    tagline: 'Govt exam super app with AI evaluation',
    background: 'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=800&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&auto=format&fit=crop',
    link: '/institutes/examdrishti'
  },
];

const InstitutesShowcase = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Our institutes</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
              Trusted by category leaders
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Each institute gets a bespoke workspace, dedicated WhatsApp + calling numbers, branded apps and
              real-time analytics dashboard.
            </p>
          </div>
          <button className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold">
            View full customer list
            <span>→</span>
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {institutes.map((institute, index) => (
            <Link key={institute.name} to={institute.link} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-lg group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                viewport={{ once: true }}
              >
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${institute.background})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl border border-white/50 overflow-hidden bg-white/10 backdrop-blur">
                      <img src={institute.logo} alt={institute.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{institute.name}</h3>
                      <p className="text-sm text-white/80">{institute.tagline}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    <p>• White-labeled Android + Web</p>
                    <p>• Automated WhatsApp follow-ups</p>
                    <p>• Hybrid calling desk</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutesShowcase;

