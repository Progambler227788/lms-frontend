import { logout } from '../services/authService';

export const logoutUser = async (setUser, navigate) => {
  try {
    await logout();
    setUser(null);
    navigate('/login');
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
