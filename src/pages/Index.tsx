import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import LoginForm from '@/components/LoginForm';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(!user);

  if (showLogin && !user) {
    return <LoginForm onSuccess={() => setShowLogin(false)} />;
  }

  return <Dashboard />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;