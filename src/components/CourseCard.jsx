import React from 'react';
import '../assets/css/CourseCard.css'; 

export default function CourseCard({ course }) {
  const { title, description, category, createdAt } = course;

  return (
    <div className="course-card">
      <div className="course-card-body">
        <h3 className="course-title">{title}</h3>
        <p className="course-description">{description?.substring(0, 100)}...</p>
        <div className="course-meta">
          <span className="course-category">{category}</span>
          <span className="course-date">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
