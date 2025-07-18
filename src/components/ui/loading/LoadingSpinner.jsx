import React from 'react';

const LoadingSpinner = () => {
  return (
      <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-gray-600 text-sm">Loading your courses...</p>
    </div>
  );
};

export default LoadingSpinner;