import React from 'react';

const DynamicInstituteTestimonials = ({ institute, content }) => {
  const testimonialsData = content?.testimonials || {};
  const title = testimonialsData.title || 'Success Stories';
  const subtitle = testimonialsData.subtitle || 'Students who trusted the process';
  const testimonials = testimonialsData.testimonials || [];

  // Default testimonials if none provided
  const defaultTestimonials = [
    {
      name: 'Student Name',
      quote: 'Great learning experience with excellent support and guidance throughout the course.',
      location: 'Course Graduate'
    },
    {
      name: 'Another Student',
      quote: 'The quality of content and teaching methodology helped me achieve my goals successfully.',
      location: 'Current Student'
    },
    {
      name: 'Happy Learner',
      quote: 'Highly recommended! The institute provides comprehensive learning resources and expert guidance.',
      location: 'Alumni'
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">{title}</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{subtitle}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayTestimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-3xl p-6">
              <p className="text-gray-700">"{item.quote}"</p>
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
};

export default DynamicInstituteTestimonials;

