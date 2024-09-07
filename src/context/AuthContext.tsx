import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/baseUrl';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // useEffect hook to check if the user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch user data from the server to verify token validity
          const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // If response is OK, set the user data and mark as authenticated
            const data = await response.json();
            setUser(data.data.user);
            setIsAuthenticated(true);
          } else {
            // If response is not OK, clear token and mark as not authenticated
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false); // Stop the loading state
    };

    checkAuth();
  }, []);

  // Signup function to create a new user
  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      // Send signup data to the server
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        // If response is not OK, throw an error with the server message
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      // If signup is successful, store the token and user data
      const data = await response.json();
      localStorage.setItem('token', data.data.token);
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Login function to authenticate an existing user
  const login = async (email: string, password: string) => {
    try {
      // Send login credentials to the server
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // If response is not OK, throw an error with the server message
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // If login is successful, store the token and user data
      const data = await response.json();
      localStorage.setItem('token', data.data.token);
      setUser(data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Logout function to clear user session and navigate to login page
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
