import React from 'react';
import { getCourseImage } from '../../../utils/courseImages';
import { formatDuration, getRandomColorClass } from '../../../utils/formatUtils';


export default function EnrollmentCard({ course, onEnroll, isEnrolling }) {
  const totalLessons = course.sections?.reduce(
    (total, section) => total + (section.lessons?.length || 0), 
    0
  ) || 0;

  return (
    <div className="sticky top-4 border rounded-xl shadow-sm overflow-hidden bg-white">
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
          <div className="font-medium">{course.rating?.toFixed(1) || '0.0'}</div>
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
          disabled={isEnrolling}
          className={`w-full py-3 text-white font-medium rounded-lg transition-colors flex items-center justify-center ${
            isEnrolling
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isEnrolling ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enrolling...
            </>
          ) : (
            'Enroll Now'
          )}
        </button>
      </div>

      {/* Additional Info */}
      <div className="px-4 pb-4 text-xs text-gray-500 text-center">
        {course.free ? (
          <p>Start learning immediately after enrollment</p>
        ) : (
          <p>30-day money-back guarantee</p>
        )}
      </div>
    </div>
  );
}