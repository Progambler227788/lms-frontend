import React from 'react';

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Just sign up, browse our courses, and click enroll. Easy and quick!',
  },
  {
    question: 'Are the courses lifetime accessible?',
    answer: 'Yes, once purchased, you get lifetime access to all course materials.',
  },
  {
    question: 'Can I become an instructor?',
    answer: 'Absolutely! Click on “Become Instructor” and submit your application.',
  },
];

const FAQSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
