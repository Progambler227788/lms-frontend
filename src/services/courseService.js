import api from '../utils/api'; 

//  Exclude search if empty
export const fetchAllCourses = async (page = 0, size = 10, search = '') => {
  try {
    const params = { page, size };
    if (search.trim() !== '') {
      params.search = search;
    }

    const response = await api.get('/api/student/courses', { params, 
         withCredentials: true  // Add this for cookie-based auth
     });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchCoursesByCategory = async (category, page = 0, size = 10) => {
  try {
    const response = await api.get('/api/student/courses/filter', {
      params: { category: category.toLowerCase(), page, size },
       withCredentials: true  // Add this for cookie-based auth
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw error;
  }
};


export const fetchCourseById = async (courseId) => {

  try {

  const response = await api.get(`/api/student/courses/${courseId}`,   {withCredentials: true  });
  return response.data;
  }

  catch (error) {
    console.error("Error fetching courses :", error);
    throw error;
  }
 
};