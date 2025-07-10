import React from 'react';
import { Progress } from "../../ui/Progress";
import { Badge } from "../../ui/Badge";

import { format } from "date-fns";

export default function EnrollmentCard({ course, progress, enrolledAt, totalLessons, completedLessons }) {
  const isCompleted = progress >= 100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
        <Badge variant={isCompleted ? "success" : "secondary"}>
          {isCompleted ? "Completed" : "In Progress"}
        </Badge>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Enrolled on: {format(new Date(enrolledAt), 'PPP')}
      </p>

      <div className="mb-2">
        <Progress value={progress} />
        <p className="text-sm text-gray-600 mt-1">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>
    </div>
  );
}
