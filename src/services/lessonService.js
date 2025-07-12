import api from '../utils/api';

export const markLessonComplete = async (courseId, lessonTitle) => {
  try {
    const response = await api.post(`/api/student/courses/${courseId}/lessons/complete`, null, {
      params: { lessonTitle },
      withCredentials: true // for cookie-based auth
    });
    return response.data;
  } catch (error) {
    console.error('Error marking lesson as complete:', error);
    
    // Handle different error scenarios
    let errorMessage = 'Failed to mark lesson as complete';
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        errorMessage = 'Please login to mark lessons as complete';
      } else if (error.response.status === 404) {
        errorMessage = 'Course or lesson not found';
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};