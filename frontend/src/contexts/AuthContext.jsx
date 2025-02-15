import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setAuthToken(token); // Set token in axios defaults
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await api.verifyToken(token);
      setUser({
        ...response.user,
        streak: response.user.streak || { count: 0, lastReviewDate: null }
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      api.setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStreak = (newStreak) => {
    setUser(prev => ({
      ...prev,
      streak: newStreak
    }));
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login...'); // Debug log
      const response = await api.login(email, password);
      console.log('Login response:', response); // Debug log
      localStorage.setItem('token', response.token);
      setUser({
        ...response.user,
        streak: response.user.streak || { count: 0, lastReviewDate: null }
      });
    } catch (error) {
      console.error('Login error:', error); // Debug log
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to login. Please try again.');
      }
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await api.signup(username, email, password);
      localStorage.setItem('token', response.token);
      setUser({
        ...response.user,
        streak: response.user.streak || { count: 0, lastReviewDate: null }
      });
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to create account. Please try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserStreak
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 