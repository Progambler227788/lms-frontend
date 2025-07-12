import React from 'react';
import { getCourseImage } from '../../../utils/courseImages';
import { formatCategory, formatDuration, getRandomColorClass } from "../../../utils/formatUtils";
import { useNavigate } from "react-router-dom";



// Extract first paragraph from structured description
const getFirstDescriptionText = (structuredDescription) => {
  if (!structuredDescription?.sections?.length) return '';
  const firstSection = structuredDescription.sections[0];
  if (firstSection.bulletPoints?.length) {
    return firstSection.bulletPoints[0];
  }
  return firstSection.heading || '';
};

// Calculate total lessons from sections
const getTotalLessons = (sections) => {
  return sections?.reduce((total, section) => total + (section.lessons?.length || 0), 0) || 0;
};


export default function CourseCard({ course, onEnroll }) {
  const {
    id,
    title,
    description,
    category,
    instructorName,
    instructorImage,
    imageUrl,
    price,
    free,
    enrolled,
    rating,
    ratingCount,
    durationMinutes,
    sections = [],
    createdAt
  } = course;

  const [bgColor, textColor] = getRandomColorClass();
  const totalLessons = getTotalLessons(sections);
  const firstDescription = getFirstDescriptionText(description);
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate(`/lesson/${course.id}`); // ✅ navigate to lesson page
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full w-full">
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl || getCourseImage(category)}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {free && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            FREE
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Badge - Now with width based on content */}
        <div
          className={`inline-block max-w-fit mb-3 px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} whitespace-nowrap`}
        >
          {formatCategory(category)}
        </div>


        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        {firstDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {firstDescription}
          </p>
        )}

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(durationMinutes)}
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {totalLessons} {totalLessons === 1 ? 'Lesson' : 'Lessons'}
          </div>
          <div className="flex items-center">
            <img
              src={instructorImage || `https://ui-avatars.com/api/?name=${instructorName.replace(' ', '+')}&background=random`}
              alt={instructorName}
              className="w-4 h-4 rounded-full mr-1.5 object-cover"
            />
            <span className="truncate">{instructorName}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {rating.toFixed(1)} ({ratingCount})
          </div>
        </div>

        {/* Price & Enroll Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {free ? 'Free' : `PKR ${price}`}
          </span>
          <button
            onClick={enrolled ? () => handleContinueClick() : () => onEnroll(id)}
            className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors 
      ${enrolled ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {enrolled ? 'Continue Learning' : 'Enroll'}
          </button>
        </div>

      </div>
    </div>
  );
}