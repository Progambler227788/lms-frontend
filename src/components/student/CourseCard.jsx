import React from 'react';

// Capitalize and format category string like "cyber_security" → "Cyber Security"
const formatCategory = (text) => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate random tailwind background & text color classes
const getRandomColorClass = () => {
  const colors = [
    ['bg-red-100', 'text-red-600'],
    ['bg-green-100', 'text-green-600'],
    ['bg-yellow-100', 'text-yellow-600'],
    ['bg-blue-100', 'text-blue-600'],
    ['bg-purple-100', 'text-purple-600'],
    ['bg-pink-100', 'text-pink-600'],
    ['bg-indigo-100', 'text-indigo-600'],
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function CourseCard({ course, onEnroll }) {
  const {
    id,
    title,
    description,
    category,
    createdAt,
    image,
    instructorName,
    instructorImage,
    price,
    rating,
  } = course;

  const [bgColor, textColor] = getRandomColorClass();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden w-full">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 relative">
        {/* Category Badge */}
        <div
          className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
        >
          {formatCategory(category)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2">
          {description?.substring(0, 100)}...
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={instructorImage || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`}
            alt={instructorName}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">{instructorName}</span>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
          <span className="flex items-center gap-1">
            ⭐ {rating.toFixed(1)}
          </span>
          <span className="font-semibold text-indigo-600">
            PKR {price}
          </span>
        </div>

        {/* Date */}
        <div className="text-xs text-gray-400 mb-3">
          Added on {new Date(createdAt).toLocaleDateString()}
        </div>

        {/* Enroll Button */}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={() => onEnroll(id)}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
