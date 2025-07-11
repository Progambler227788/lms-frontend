import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Home from './pages/landingPage/Home';
import { AuthProvider } from './context/AuthContext';
import CoursesEnrolled from './pages/student/CoursesEnrolled';
import CourseEnrollmentPage from './pages/student/CourseEnrollmentPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <CourseEnrollmentPage />
              </ProtectedRoute>
            }
          />



          <Route
            path="/enrollments"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <CoursesEnrolled />
              </ProtectedRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
