import { ReactNode } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  permissions?: string[];
  fallback?: ReactNode;
}

export default function RoleGuard({ 
  children, 
  allowedRoles = [], 
  permissions = [],
  fallback 
}: RoleGuardProps) {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return fallback || (
      <Alert>
        <Icon name="Lock" size={16} />
        <AlertDescription>
          Необходима авторизация для доступа к этому разделу
        </AlertDescription>
      </Alert>
    );
  }

  // Проверка ролей
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return fallback || (
      <Alert variant="destructive">
        <Icon name="ShieldX" size={16} />
        <AlertDescription>
          У вас нет прав доступа к этому разделу. Требуется роль: {allowedRoles.join(', ')}
        </AlertDescription>
      </Alert>
    );
  }

  // Проверка разрешений
  if (permissions.length > 0 && !permissions.some(perm => hasPermission(perm))) {
    return fallback || (
      <Alert variant="destructive">
        <Icon name="ShieldX" size={16} />
        <AlertDescription>
          У вас нет необходимых разрешений для доступа к этому разделу
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}