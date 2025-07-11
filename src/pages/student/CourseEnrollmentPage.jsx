import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../../services/courseService';
import Navbar from '../../components/student/Navbar';
import CourseHeader from '../../components/student/enrollCourse/CourseHeader';
import CourseDescription from '../../components/student/enrollCourse/CourseDescription';
import CourseCurriculum from '../../components/student/enrollCourse/CourseCurriculum';
import EnrollmentCard from '../../components/student/enrollCourse/EnrollmentCard';
import { useAuth } from '../../context/AuthContext';

export default function CourseEnrollmentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const courseData = await fetchCourseById(courseId);
        
        if (!courseData) {
          throw new Error('Course data not found');
        }
        
        setCourse(courseData);
      } catch (err) {
        console.error('Error loading course:', err);
        
        // Handle different error types
        let errorMessage = 'Failed to load course details';
        if (err.response) {
          // Server responded with error status
          if (err.response.status === 404) {
            errorMessage = 'Course not found';
          } else if (err.response.status === 401) {
            errorMessage = 'Please login to view this course';
          } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleEnroll = async (courseId) => {
    try {
      // Replace with your actual enrollment API call
      alert(`Enrolled in course ${courseId}`);
      // After successful enrollment, you might want to navigate somewhere
      // navigate('/enrollments');
    } catch (err) {
      console.error('Enrollment failed:', err);
      
      let errorMessage = 'Enrollment failed. Please try again.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
            {error}
            <button
              onClick={() => navigate('/student-dashboard')}
              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-gray-700 text-lg mb-4">Course not found</div>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Courses
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:w-3/4 space-y-8">
            <CourseHeader 
              title={course.title}
              category={course.category}
              instructorName={course.instructorName}
              instructorImage={course.instructorImage}
            />
            
            <CourseDescription description={course.description} />
            
            <CourseCurriculum sections={course.sections} />
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:w-1/4">
            <EnrollmentCard 
              course={course} 
              onEnroll={handleEnroll}
            />
          </div>
        </div>
      </div>
    </>
  );
}