import React from 'react';

const testimonials = [
  {
    name: 'Ayesha Ahmed',
    image: 'https://i.pravatar.cc/50?img=5',
    feedback: 'This platform helped me land a job within 2 months!',
  },
  {
    name: 'Usman Tariq',
    image: 'https://i.pravatar.cc/50?img=8',
    feedback: 'Top-notch instructors and very well-structured content.',
  },
  {
    name: 'Fatima Noor',
    image: 'https://i.pravatar.cc/50?img=11',
    feedback: 'Easy to follow and very practical learning experience.',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Learners Say</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-gray-700 italic">"{t.feedback}"</p>
            <div className="flex items-center gap-3 mt-4">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full" />
              <span className="font-medium text-gray-800">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
