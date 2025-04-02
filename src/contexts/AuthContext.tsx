import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  accountType: 'individual' | 'business';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual authentication logic
    setUser({
      id: '1',
      name: 'Test User',
      email: email,
      accountType: 'business' // You can modify this based on your needs
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - replace with actual registration logic
    setUser({
      id: '1',
      name: name,
      email: email,
      accountType: 'individual' // Default to individual account
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup,
      isAuthenticated: !!user 
    }}>
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