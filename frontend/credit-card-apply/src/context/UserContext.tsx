import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Static user for development/demo
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  });
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const refresh = () => {
    // No-op for static user
  };

  return (
    <UserContext.Provider value={{ user, loading, error, refresh }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
