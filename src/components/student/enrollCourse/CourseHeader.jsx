// CourseHeader.js
import React from 'react';
// import { formatCategory } from '../../../utils/formatUtils';

const formatCategory = (text) => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export default function CourseHeader({ title, category, instructorName, instructorImage }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      
      <div className="flex items-center gap-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
          {formatCategory(category)}
        </span>
        
        <div className="flex items-center">
          <img
            src={instructorImage || `https://ui-avatars.com/api/?name=${instructorName.replace(' ', '+')}`}
            alt={instructorName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-700">{instructorName}</span>
        </div>
      </div>
    </div>
  );
}