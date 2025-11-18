import React from 'react';

const testimonials = [
  { name: 'Priya Verma', tag: 'UPSC Interview 2024', quote: 'The DAF drills plus daily speaking pods helped me articulate structured answers without fear.' },
  { name: 'Faizan Malik', tag: 'JKPSC Top 10', quote: 'Mentors nudged me on tone, eye contact and follow-up questions exactly like the real panel.' },
  { name: 'Rachit Anand', tag: 'Corporate professional', quote: 'Communication sprint made me confident for board presentations within six weeks.' },
];

const DslEnglishTestimonials = () => (
  <section id="testimonials" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Learner proof</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Voices that transformed</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.name} className="bg-gray-50 border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-700">“{item.quote}”</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-primary">{item.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DslEnglishTestimonials;

