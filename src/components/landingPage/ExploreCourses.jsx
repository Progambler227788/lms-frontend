import React from 'react';
import CourseCard from './CourseCard';

const dummyCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    image: 'https://img.youtube.com/vi/lpx2zFkapIk/maxresdefault.jpg',
    instructorName: 'John Doe',
    instructorImage: 'https://i.pravatar.cc/40?img=1',
    rating: 4.8,
    totalLessons: 12,
    price: 49.99,
    category: 'Development',
  },
  {
    id: 2,
    title: 'Mastering UI/UX Design',
    image: 'https://img.youtube.com/vi/jZFaMEqEqEQ/maxresdefault.jpg',
    instructorName: 'Sarah Khan',
    instructorImage: 'https://i.pravatar.cc/40?img=2',
    rating: 4.6,
    totalLessons: 14,
    price: 39.99,
    category: 'Design',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    image: 'https://img.youtube.com/vi/0yboGn8errU/maxresdefault.jpg',
    instructorName: 'Ali Raza',
    instructorImage: 'https://i.pravatar.cc/40?img=3',
    rating: 4.9,
    totalLessons: 10,
    price: 59.99,
    category: 'Data Science',
  },
];

const ExploreCourses = () => {
  return (
    <section className="px-6 py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Our Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {dummyCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default ExploreCourses;
