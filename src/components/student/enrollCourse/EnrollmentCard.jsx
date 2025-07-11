// EnrollmentCard.js
import React from 'react';
// import { formatDuration } from '../../utils/formatUtils';
import { getCourseImage } from '../../../utils/courseImages';

const formatDuration = (minutes) => {
  if (isNaN(minutes) || minutes < 0) return '0m'; // Handle invalid inputs
  
  if (minutes < 60) {
    return `${minutes}m`; // Show just minutes if under 1 hour
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  // Only show remaining minutes if they exist
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}m` 
    : `${hours}h`;
};

export default function EnrollmentCard({ course, onEnroll }) {
  const totalLessons = course.sections?.reduce(
    (total, section) => total + (section.lessons?.length || 0), 
    0
  ) || 0;

  return (
    <div className="sticky top-4 border rounded-xl shadow-sm overflow-hidden">
      {/* Course Image */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={course.imageUrl || getCourseImage(course.category)}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.free && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            FREE
          </div>
        )}
      </div>

      {/* Price */}
      <div className="p-4 border-b">
        <div className="text-2xl font-bold text-gray-900">
          {course.free ? 'Free' : `PKR ${course.price}`}
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="font-medium">{course.rating.toFixed(1)}</div>
          <div className="text-gray-500">Rating</div>
        </div>
        <div>
          <div className="font-medium">{totalLessons}</div>
          <div className="text-gray-500">Lessons</div>
        </div>
        <div>
          <div className="font-medium">{formatDuration(course.durationMinutes)}</div>
          <div className="text-gray-500">Duration</div>
        </div>
      </div>

      {/* Enroll Button */}
      <div className="p-4">
        <button
          onClick={() => onEnroll(course.id)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}