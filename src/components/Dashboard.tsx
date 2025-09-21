import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import RoleGuard from '@/components/RoleGuard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const projectData = [
  { name: 'ЖК Солнечный', progress: 85, budget: 150, spent: 128 },
  { name: 'ТЦ Северный', progress: 62, budget: 200, spent: 124 },
  { name: 'Офис Центр', progress: 91, budget: 80, spent: 73 },
  { name: 'Склад Восток', progress: 45, budget: 120, spent: 54 }
];

const monthlyData = [
  { month: 'Янв', budget: 450, actual: 420 },
  { month: 'Фев', budget: 520, actual: 485 },
  { month: 'Мар', budget: 480, actual: 510 },
  { month: 'Апр', budget: 600, actual: 580 },
  { month: 'Май', budget: 550, actual: 525 },
  { month: 'Июн', budget: 580, actual: 595 }
];

const taskDistribution = [
  { name: 'СМР', value: 35, color: '#2563EB' },
  { name: 'Геодезия', value: 15, color: '#10B981' },
  { name: 'Склад', value: 25, color: '#F59E0B' },
  { name: 'ПТО', value: 25, color: '#EF4444' }
];

const navigationItems = [
  { name: 'СМР', icon: 'Hammer', active: false, roles: ['admin', 'supervisor'], permissions: ['manage_construction'] },
  { name: 'Геодезия', icon: 'MapPin', active: false, roles: ['admin', 'engineer'], permissions: ['manage_geodesy'] },
  { name: 'Архив', icon: 'Archive', active: false, roles: ['admin'], permissions: ['view_archive'] },
  { name: 'Стройконтроль', icon: 'Shield', active: false, roles: ['admin', 'supervisor'], permissions: ['view_control'] },
  { name: 'Склад', icon: 'Package', active: false, roles: ['admin', 'supplier'], permissions: ['view_inventory'] },
  { name: 'ПТО', icon: 'FileText', active: false, roles: ['admin', 'engineer'], permissions: ['view_pto'] }
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-slate-900">CONSTRUCARD</h1>
            <span className="text-sm text-slate-500">Система управления проектами</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Icon name="Circle" size={8} className="mr-1 fill-green-500" />
              Все системы работают
            </Badge>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {user?.name} ({user?.role === 'admin' ? 'Администратор' : 
                           user?.role === 'engineer' ? 'Инженер' :
                           user?.role === 'supervisor' ? 'Прораб' : 'Снабженец'})
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Button variant="default" className="w-full justify-start mb-4">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Дашборд
            </Button>
            
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <RoleGuard 
                  key={item.name}
                  allowedRoles={item.roles as any}
                  permissions={item.permissions}
                  fallback={null}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-2" />
                    {item.name}
                  </Button>
                </RoleGuard>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200">
              <Button variant="ghost" className="w-full justify-start text-slate-600">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-600">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Помощь
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Активные проекты</CardTitle>
                <Icon name="Building" size={16} className="text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-green-600 mt-1">
                  <span className="inline-flex items-center">
                    <Icon name="TrendingUp" size={12} className="mr-1" />
                    +2 за месяц
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Общий бюджет</CardTitle>
                <Icon name="DollarSign" size={16} className="text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">550М ₽</div>
                <p className="text-xs text-slate-500 mt-1">379М ₽ потрачено</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Завершение</CardTitle>
                <Icon name="Target" size={16} className="text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">71%</div>
                <p className="text-xs text-blue-600 mt-1">
                  <span className="inline-flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    В срок
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Активные задачи</CardTitle>
                <Icon name="CheckSquare" size={16} className="text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-orange-600 mt-1">
                  <span className="inline-flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    23 просрочено
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Budget Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Бюджет по месяцам</CardTitle>
                <p className="text-sm text-slate-500">Плановый vs фактический</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="budget" fill="#94a3b8" name="Плановый" />
                    <Bar dataKey="actual" fill="#2563eb" name="Фактический" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Распределение задач</CardTitle>
                <p className="text-sm text-slate-500">По отделам</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {taskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-600">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Активные проекты</CardTitle>
              <p className="text-sm text-slate-500">Текущие строительные объекты</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Проект</th>
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Прогресс</th>
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Бюджет</th>
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Потрачено</th>
                      <th className="text-left text-sm font-medium text-slate-600 pb-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-3">
                    {projectData.map((project, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3">
                          <div className="font-medium text-slate-900">{project.name}</div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-600">{project.budget}М ₽</td>
                        <td className="py-3 text-slate-600">{project.spent}М ₽</td>
                        <td className="py-3">
                          <Badge 
                            variant={project.progress > 80 ? 'default' : project.progress > 50 ? 'secondary' : 'outline'}
                            className={project.progress > 80 ? 'bg-green-100 text-green-700' : ''}
                          >
                            {project.progress > 80 ? 'Завершается' : project.progress > 50 ? 'В работе' : 'Начальная стадия'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}