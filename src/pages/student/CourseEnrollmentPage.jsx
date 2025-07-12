import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../../services/courseService';
import { enrollStudentInCourse  } from '../../services/enrollmentService';
import Navbar from '../../components/student/dashboard/Navbar';
import CourseHeader from '../../components/student/enrollCourse/CourseHeader';
import CourseDescription from '../../components/student/enrollCourse/CourseDescription';
import CourseCurriculum from '../../components/student/enrollCourse/CourseCurriculum';
import EnrollmentCard from '../../components/student/enrollCourse/EnrollmentCard';
// import { useAuth } from '../../context/AuthContext';


export default function CourseEnrollmentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

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
        
        let errorMessage = 'Failed to load course details';
        if (err.response) {
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
    setIsEnrolling(true)
    try {
      await enrollStudentInCourse(courseId);
      setAlert({
        show: true,
        message: `Successfully enrolled in course ${course.title}`,
        type: 'success'
      });
      // After successful enrollment, you might want to navigate somewhere
      navigate('/enrollments');
    } catch (err) {
      console.error('Enrollment failed:', err);
      
      let errorMessage = 'Enrollment failed. Please try again.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setAlert({
        show: true,
        message: errorMessage,
        type: 'error'
      });
    }
    finally {
       setIsEnrolling(false);
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
      {/* Alert Notification */}
      {alert.show && (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out ${
          alert.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]'
        }`}>
          <div className={`px-6 py-4 rounded shadow-lg ${
            alert.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <div className="flex justify-between items-center">
              <span>{alert.message}</span>
              <button 
                onClick={() => setAlert({ show: false, message: '', type: '' })}
                className="ml-4 text-lg font-semibold"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      
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
              isEnrolling={isEnrolling} // Pass loading state to EnrollmentCard
            />
          </div>
        </div>
      </div>
    </>
  );
}