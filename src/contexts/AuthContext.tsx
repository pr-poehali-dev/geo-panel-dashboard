import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'engineer' | 'supervisor' | 'supplier';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['*'], // Полный доступ
  engineer: ['view_projects', 'create_reports', 'manage_geodesy', 'view_pto'],
  supervisor: ['view_projects', 'manage_construction', 'approve_works', 'manage_workers'],
  supplier: ['view_inventory', 'manage_supplies', 'create_orders', 'view_warehouse']
};

// Моковые пользователи для демонстрации
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@construcard.ru',
    name: 'Александр Петров',
    role: 'admin',
    department: 'Администрация',
    phone: '+7 (999) 123-45-67'
  },
  {
    id: '2', 
    email: 'engineer@construcard.ru',
    name: 'Елена Сидорова',
    role: 'engineer',
    department: 'Геодезия',
    phone: '+7 (999) 234-56-78'
  },
  {
    id: '3',
    email: 'supervisor@construcard.ru', 
    name: 'Михаил Иванов',
    role: 'supervisor',
    department: 'СМР',
    phone: '+7 (999) 345-67-89'
  },
  {
    id: '4',
    email: 'supplier@construcard.ru',
    name: 'Ольга Козлова', 
    role: 'supplier',
    department: 'Снабжение',
    phone: '+7 (999) 456-78-90'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненную сессию
    const savedUser = localStorage.getItem('construcard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('construcard_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('construcard_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      hasPermission
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