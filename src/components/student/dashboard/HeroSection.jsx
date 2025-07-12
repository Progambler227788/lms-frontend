import React from 'react';

export default function HeroSection({ searchTerm, onSearch }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-4 text-center rounded-md shadow">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Find the Best Courses With You
      </h1>
      <p className="mb-6 text-lg md:text-xl">
        Discover, explore and enroll in top courses tailored just for you.
      </p>

      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-md shadow-md overflow-hidden flex items-center">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}
