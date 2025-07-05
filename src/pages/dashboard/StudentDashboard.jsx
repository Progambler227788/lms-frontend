import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import CourseCard from '../../components/CourseCard';
import '../../assets/css/StudentDashboard.css';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const dummyCourses = [
      {
        id: '1',
        title: 'JavaScript Basics',
        description: 'Learn the fundamentals of JavaScript including variables, loops, and functions.',
        category: 'PROGRAMMING',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'UI/UX Design Principles',
        description: 'Understand core design principles for creating user-friendly interfaces.',
        category: 'DESIGN',
        createdAt: new Date(),
      },
      {
        id: '3',
        title: 'Spring Boot + React Fullstack',
        description: 'Build modern full-stack apps using Spring Boot & React.',
        category: 'PROGRAMMING',
        createdAt: new Date(),
      },
    ];
    setCourses(dummyCourses);
  }, []);

  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar role="student" />

      <div className="student-dashboard container">
        <h2 className="dashboard-title">Welcome to your Dashboard</h2>

        {/* ✅ Grid of course cards */}
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
