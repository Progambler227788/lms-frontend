import api from '../utils/api'; 

export const fetchUserEnrollments = async () => {
  try {
    const response = await api.get('/api/student/enrollments', {
      withCredentials: true, // for cookie-based auth
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
};



export const enrollStudentInCourse = async (courseId) => {
  try {
    const response = await api.post(`/api/student/courses/enroll/${courseId}`, null, {
      withCredentials: true, // for cookie-based auth
    });
    return response.data;
  } catch (error) {
    console.error('Error making enrollment:', error);
    throw error;
  }
};