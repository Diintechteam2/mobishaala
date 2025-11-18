import React from 'react';

const testimonials = [
  { name: 'Megha Sharma', tag: 'UPSC mains 2024', quote: 'The analytics dashboard kept me brutally honest about my prelims accuracy. Mentors followed up whenever my streak dipped.' },
  { name: 'Satyam Patel', tag: 'MPPSC Rank 8', quote: 'State capsules + interview labs made me confident for both MPPSC and UPPCS boards without switching institutes.' },
  { name: 'Ritika Agarwal', tag: 'SSC CGL 2023', quote: 'I used ExamDrishti mainly for accountability. The WhatsApp nudges and live doubt rooms saved my prep.' },
];

const ExamDrishtiTestimonials = () => (
  <section id="testimonials" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Outcome stories</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Learners from every corner</h2>
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

export default ExamDrishtiTestimonials;

