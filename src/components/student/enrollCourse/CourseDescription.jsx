// CourseDescription.js
import React from 'react';

export default function CourseDescription({ description }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Course Description</h2>
      
      {description?.sections?.map((section, index) => (
        <div key={index} className="mb-4">
          {section.heading && <h3 className="font-medium mb-2">{section.heading}</h3>}
          <ul className="list-disc pl-5 space-y-1">
            {section.bulletPoints?.map((point, i) => (
              <li key={i} className="text-gray-700">{point}</li>
            ))}
          </ul>
        </div>
      ))}
      
      {description?.hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {description.hashtags.map((tag, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}