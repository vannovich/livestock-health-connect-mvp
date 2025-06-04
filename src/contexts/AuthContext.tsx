
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers, mockCredentials } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // TODO: Replace with real API call and JWT token handling
    
    // Simulate authentication with mock credentials
    const isValidFarmer = email === mockCredentials.farmer.email && password === mockCredentials.farmer.password;
    const isValidVet = email === mockCredentials.veterinarian.email && password === mockCredentials.veterinarian.password;
    const isValidAdmin = email === mockCredentials.admin.email && password === mockCredentials.admin.password;

    if (isValidFarmer || isValidVet || isValidAdmin) {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        // TODO: Store JWT token in localStorage/secure storage
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // TODO: Clear JWT token and make API call to invalidate session
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    // TODO: Validate JWT token on app startup
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
