import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";


// global state
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me", {
          withCredentials: true,
          validateStatus: (status) => status < 500 // Don't treat 401 as error
        });

        if (res.status === 401) { // Explicitly handle unauthorized
          setUser(null);
          return;
        }

        console.log(res.data)
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
