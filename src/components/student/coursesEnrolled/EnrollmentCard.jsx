import React from 'react';
import { Progress } from "../../ui/Progress";
import { Badge } from "../../ui/Badge";
import { format } from "date-fns";

export default function EnrollmentCard({ course, progress, enrolledAt, totalLessons, completedLessons }) {
  const isCompleted = progress >= 100;
  const progressPercentage = Math.round(progress);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white font-medium text-xs bg-green-500 px-2 py-1 rounded-full">
              COMPLETED
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Status */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {course.title}
          </h3>
          <Badge 
            variant={isCompleted ? "success" : "secondary"} 
            className="shrink-0 mt-0.5 px-2 py-0.5 text-xs"
          >
            {isCompleted ? "Completed" : `${progressPercentage}%`}
          </Badge>
        </div>

        {/* Enrollment Date */}
        <p className="text-xs text-gray-500 mb-3 flex items-center">
          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Enrolled {format(new Date(enrolledAt), 'MMM do, yyyy')}
        </p>

        {/* Progress Section */}
        <div className="mt-auto">
          <div className="mb-1.5">
            <Progress value={progress} className="h-1.5" />
          </div>
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>
              <span className="font-medium text-gray-800">{completedLessons}</span> of {totalLessons} lessons
            </span>
            <span className="text-gray-500">{progressPercentage}% complete</span>
          </div>

          {/* Action Button */}
          {!isCompleted && (
            <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
              Continue Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
}