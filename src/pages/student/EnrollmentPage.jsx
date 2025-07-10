import React, { useEffect, useState } from 'react';
import Navbar from '../../components/student/Navbar'; 
import SearchBar from '../../components/student/enrollment/SearchBar';
import EnrollmentList from '../../components/student/enrollment/EnrollmentList';

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyEnrollments = [
      {
        id: '1',
        course: {
          id: 'course1',
          title: 'React for Beginners',
          imageUrl: 'https://via.placeholder.com/400x200?text=React',
        },
        enrolledAt: '2025-07-01T10:00:00Z',
        progress: 40,
        completed: false,
      },
      {
        id: '2',
        course: {
          id: 'course2',
          title: 'Advanced Node.js',
          imageUrl: 'https://via.placeholder.com/400x200?text=Node.js',
        },
        enrolledAt: '2025-06-15T08:30:00Z',
        progress: 75,
        completed: false,
      },
      {
        id: '3',
        course: {
          id: 'course3',
          title: 'Intro to MongoDB',
          imageUrl: 'https://via.placeholder.com/400x200?text=MongoDB',
        },
        enrolledAt: '2025-05-20T13:45:00Z',
        progress: 100,
        completed: true,
      },
    ];

    setTimeout(() => {
      setEnrollments(dummyEnrollments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = enrollments.filter(({ course }) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Enrolled Courses</h1>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {loading ? (
          <p className="text-gray-500">Loading your courses...</p>
        ) : (
          <EnrollmentList courses={filteredCourses} />
        )}
      </div>
    </>
  );
}
