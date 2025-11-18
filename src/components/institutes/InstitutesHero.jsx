"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, delay = 0 }) => (
  <motion.span
    className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    {children}
  </motion.span>
);

const StatCard = ({ label, value, delay }) => (
  <motion.div
    className="bg-white/90 backdrop-blur shadow-lg rounded-2xl px-5 py-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
  >
    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
    <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
  </motion.div>
);

const FloatingCard = ({ title, subtitle, delay }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -6 }}
  >
    <p className="text-xs text-primary font-semibold mb-2">{subtitle}</p>
    <p className="text-gray-900 font-bold text-lg leading-tight">{title}</p>
  </motion.div>
);

const InstitutesHero = () => {
  return (
    <section className="pt-[150px] md:pt-32 pb-16 bg-gradient-to-b from-white via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-72 h-72 bg-white rounded-full blur-3xl absolute -top-20 -left-10" />
        <div className="w-80 h-80 bg-white rounded-full blur-3xl absolute bottom-10 right-0" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge>Institutes</Badge>
              <Badge delay={0.1}>WhatsApp + Calling Suite</Badge>
            </div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              Launch your digital campus in{' '}
              <span className="text-primary">7 days</span> with Mobishaala
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
            >
              Manage admissions, run live + recorded batches, automate follow-ups and deliver a branded
              learning experience across mobile, web and telephony—without heavy tech investment.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-primary-dark transition-colors">
                Book a Demo
              </button>
              <button className="bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-xl font-semibold shadow hover:border-gray-300">
                Download Deck
              </button>
            </motion.div>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <StatCard label="Onboarded Institutes" value="350+" delay={0.25} />
              <StatCard label="Active Learners" value="5.2L" delay={0.35} />
            </div>
          </div>
          <div className="relative h-[460px] md:h-[520px]">
            <motion.div
              className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&auto=format&fit=crop"
                alt="Institute operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/10 to-transparent" />
            </motion.div>
            <div className="absolute -top-8 -left-6 w-60">
              <FloatingCard
                title="Automated admission journeys with WhatsApp CRM"
                subtitle="Admissions"
                delay={0.4}
              />
            </div>
            <div className="absolute bottom-6 -right-4 w-60">
              <FloatingCard
                title="Hybrid calling suite for counsellors & fee recovery"
                subtitle="Calling Desk"
                delay={0.5}
              />
            </div>
            <motion.div
              className="absolute top-10 right-6 bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                AI
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Smart nudges</p>
                <p className="text-gray-900 font-semibold">Fee recovery upto 32%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutesHero;

