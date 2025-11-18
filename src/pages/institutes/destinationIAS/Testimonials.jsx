import React from 'react';

const testimonials = [
  {
    name: 'Rohan Tripathi (AIR 176)',
    quote: 'Destination IAS kept me accountable through the Mobishaala tracker. Every mains copy had layered feedback within hours.',
    location: 'UPSC CSE 2024'
  },
  {
    name: 'Suhani Yadav (Rank 12, UPPCS)',
    quote: 'The combo batch for UPPCS + UPSC stopped my content overload. Mentors made me practise state specific answers relentlessly.',
    location: 'UPPCS 2023'
  },
  {
    name: 'Harshit Jain',
    quote: 'Optional mentorship with PSIR recorded classes plus weekly vivas gave me a structured plan even while working full-time.',
    location: 'Working professional'
  },
];

const DestinationIASTestimonials = () => (
  <section id="testimonials" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Success stories</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Aspirants who trusted the process</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.name} className="bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-700">“{item.quote}”</p>
            <div className="mt-6">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DestinationIASTestimonials;

