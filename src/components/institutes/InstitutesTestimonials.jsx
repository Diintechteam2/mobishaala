"use client";
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Vandana Sharma',
    role: 'Founder, Destination IAS',
    quote:
      'Mobishaala gave us a single pane of glass for admissions, calling and content delivery. Our counsellors finally work off the same playbook.',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&auto=format&fit=crop',
  },
  {
    name: 'Rahul Dev',
    role: 'Director, ExamDrishti',
    quote:
      'Fee recovery improved by 38% within two months because WhatsApp reminders, IVR and dashboards are fully synced. Deployment was super quick.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
  },
  {
    name: 'Shashi Karna',
    role: 'Academic Head, SK Classes',
    quote:
      'We run 40+ hybrid batches without worrying about attendance, recordings or device security. The branded apps feel truly ours.',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&auto=format&fit=crop',
  },
];

const InstitutesTestimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Leadership teams ❤️ Mobishaala
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stories from institutes that digitised and scaled learner experience with us.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((person, index) => (
            <motion.div
              key={person.name}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <p className="text-gray-700 leading-relaxed flex-1">“{person.quote}”</p>
              <div className="mt-6 flex items-center gap-4">
                <img src={person.avatar} alt={person.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutesTestimonials;

