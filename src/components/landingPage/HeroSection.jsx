import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
          Learn From the Best <br /> Courses by Top Instructors
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of learners worldwide. Upskill with our high-quality courses.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Explore Courses
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
