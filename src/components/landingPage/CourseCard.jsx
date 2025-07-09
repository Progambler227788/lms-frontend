import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <img
        src={course.image}
        alt="course"
        className="w-full h-48 object-cover"
      />

      <div className="p-4 relative">
        {/* Category at top right */}
        <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
          {course.category}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={course.instructorImage}
            alt="instructor"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm text-gray-600">By: {course.instructorName}</span>
        </div>

        {/* Lessons & Rating */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>📚 {course.totalLessons} lessons</span>
          <span>⭐ {course.rating}</span>
        </div>

        {/* Price */}
        <div className="text-right">
          <span className="text-indigo-600 font-bold text-lg">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
