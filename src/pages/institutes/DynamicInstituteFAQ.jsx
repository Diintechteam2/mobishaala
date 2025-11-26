import React, { useState } from 'react';

const DynamicInstituteFAQ = ({ institute, content }) => {
  const faqData = content?.faq || {};
  const title = faqData.title || 'Frequently Asked Questions';
  const subtitle = faqData.subtitle || 'Everything you need to know';
  const faqs = faqData.faqs || [];

  // Default FAQs if none provided
  const defaultFAQs = [
    {
      question: 'What courses are available?',
      answer: 'We offer a wide range of courses designed to meet your learning needs. Please check our courses section for details.'
    },
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll by clicking on the "Enroll Now" button on any course page or contact us directly for assistance.'
    },
    {
      question: 'What is the course duration?',
      answer: 'Course duration varies depending on the program. Please check individual course pages for specific details.'
    },
    {
      question: 'Do you provide certificates?',
      answer: 'Yes, we provide certificates upon successful completion of our courses.'
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">{title}</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{subtitle}</h2>
        </div>
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`text-2xl text-primary transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicInstituteFAQ;

