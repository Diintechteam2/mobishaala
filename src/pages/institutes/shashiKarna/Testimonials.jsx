import React from 'react';

const testimonials = [
  { name: 'Nivedita Kumari', badge: 'BPSC Rank 24', quote: 'The Patna + digital blend meant I never missed a class. Shashi sir personally reviewed my mains copies.' },
  { name: 'Aman Pratap', badge: 'UPSC Interview 2024', quote: 'Dual track helped me stay focussed on UPSC while covering state specific portions without extra coaching.' },
  { name: 'Lubna Sheikh', badge: 'Working professional', quote: 'Weekend hybrid batches with recorded backups let me prepare along with my job.' },
];

const ShashiKarnaTestimonials = () => (
  <section id="testimonials" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Learner stories</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Community that stays accountable</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.name} className="bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-700">“{item.quote}”</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-primary">{item.badge}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ShashiKarnaTestimonials;

