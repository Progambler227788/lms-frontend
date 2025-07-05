import api from '../utils/api'; 

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout', {}, {
    withCredentials: true,
  });
  return response.data;
};
