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
