import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    const success = await login(email, password);
    if (success) {
      onSuccess();
    } else {
      setError('Неверный email или пароль');
    }
  };

  const demoAccounts = [
    { email: 'admin@construcard.ru', role: 'Администратор', desc: 'Полный доступ к системе' },
    { email: 'engineer@construcard.ru', role: 'Инженер', desc: 'Геодезия, ПТО, отчеты' },
    { email: 'supervisor@construcard.ru', role: 'Прораб', desc: 'СМР, контроль работ' },
    { email: 'supplier@construcard.ru', role: 'Снабженец', desc: 'Склад, закупки' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CONSTRUCARD</h1>
          <p className="text-slate-600">Система управления строительными проектами</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@construcard.ru"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <Icon name="AlertCircle" size={16} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Вход...</span>
                  </div>
                ) : (
                  'Войти'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Демо-аккаунты</CardTitle>
            <p className="text-sm text-slate-500">Пароль для всех: password123</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
              <div 
                key={account.email}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setEmail(account.email)}
              >
                <div>
                  <div className="font-medium text-sm">{account.role}</div>
                  <div className="text-xs text-slate-600">{account.email}</div>
                  <div className="text-xs text-slate-500">{account.desc}</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-slate-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>© 2024 CONSTRUCARD. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}