import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getUserFromStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('quizmaster_user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
}

const saveUserToStorage = (user: User | null) => {
    try {
        if (user) {
            localStorage.setItem('quizmaster_user', JSON.stringify(user));
            // Save a user-specific copy for persisting achievements/stats across sessions
            localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
        } else {
            localStorage.removeItem('quizmaster_user');
        }
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromStorage);

  const login = useCallback((loggedInUser: User) => {
    const storedUserJSON = localStorage.getItem(`user_${loggedInUser.email}`);
    let userToSet: User;
    
    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        // Merge to preserve achievements and other persistent stats
        userToSet = { ...loggedInUser, ...storedUser };
    } else {
        userToSet = { ...loggedInUser, unlockedAchievements: [], longestStreakEver: 0 };
    }
    
    setUser(userToSet);
    saveUserToStorage(userToSet);
  }, []);
  
  const logout = useCallback(() => {
    if (user) {
        // Clear any saved in-progress quiz for the logged-out user
        localStorage.removeItem(`saved_quiz_${user.email}`);
    }
    setUser(null);
    saveUserToStorage(null);
  }, [user]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    saveUserToStorage(updatedUser);
  }, []);

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
