import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for prototype
const demoUsers: Record<string, User> = {
  'admin1@novatech.edu': {
    id: '1',
    email: 'admin1@novatech.edu',
    role: 'admin',
    name: 'Dr. Sarah Johnson'
  },
  'faculty1@novatech.edu': {
    id: '2',
    email: 'faculty1@novatech.edu',
    role: 'faculty',
    name: 'Prof. Michael Chen'
  },
  'student1@novatech.edu': {
    id: '3',
    email: 'student1@novatech.edu',
    role: 'student',
    name: 'Alex Rivera'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers[email];
    
    if (foundUser && password === 'password123' && foundUser.role === role) {
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};