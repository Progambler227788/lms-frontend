// CourseCurriculum.js
import React, { useState } from 'react';
// import { formatDuration } from '../../utils/formatUtils';

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

export default function CourseCurriculum({ sections }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <h2 className="bg-gray-100 px-6 py-4 text-xl font-semibold">Course Curriculum</h2>
      
      <div className="divide-y">
        {sections?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-6">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <h3 className="font-medium">{section.title}</h3>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  expandedSections[sectionIndex] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedSections[sectionIndex] && (
              <div className="pb-4 space-y-3">
                {section.lessons?.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex justify-between items-center pl-4">
                    <span className="text-gray-700">• {lesson.title}</span>
                    <span className="text-sm text-gray-500">{formatDuration(lesson.durationMinutes)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}