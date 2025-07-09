import React from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  { name: 'Development', image: 'https://via.placeholder.com/300x200?text=Development' },
  { name: 'Design', image: 'https://via.placeholder.com/300x200?text=Design' },
  { name: 'Marketing', image: 'https://via.placeholder.com/300x200?text=Marketing' },
  { name: 'Business', image: 'https://via.placeholder.com/300x200?text=Business' },
  { name: 'Photography', image: 'https://via.placeholder.com/300x200?text=Photography' },
  { name: 'IT & Software', image: 'https://via.placeholder.com/300x200?text=IT+Software' },
];

const TopCategories = () => {
  return (
    <section className="px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Top Categories</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <CategoryCard key={index} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
