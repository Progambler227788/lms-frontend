import React, { useEffect, useState } from 'react';
import Navbar from '../../components/student/dashboard/Navbar';
import SearchBar from '../../components/student/coursesEnrolled/SearchBar';
import EnrollmentList from '../../components/student/coursesEnrolled/EnrollmentList';
import { fetchUserEnrollments } from '../../services/enrollmentService'; // <-- import service

export default function CoursesEnrolled() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      setLoading(true);
      try {
        const data = await fetchUserEnrollments();
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const filteredCourses = enrollments.filter(({ courseTitle }) =>
    courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
