
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  UserCheck,
  UserX,
  Activity,
  BarChart3,
  Settings,
  Shield,
  Bell
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  
  const stats = {
    totalUsers: 1247,
    activeFarmers: 892,
    activeVets: 156,
    pendingApprovals: 23,
    totalConsultations: 3456,
    monthlyGrowth: 12.5
  };

  const recentActivity = [
    { id: '1', action: 'New veterinarian registered', user: 'Dr. Smith', time: '2 hours ago' },
    { id: '2', action: 'Farmer account verified', user: 'John Doe', time: '4 hours ago' },
    { id: '3', action: 'Consultation completed', user: 'Mary Johnson', time: '6 hours ago' },
    { id: '4', action: 'New health tip published', user: 'System', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, monitor platform activity, and system settings</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/admin/settings')}>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeFarmers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Veterinarians</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeVets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex justify-between items-start p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col"
                onClick={() => navigate('/admin/analytics')}
              >
                <BarChart3 className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col"
                onClick={() => navigate('/admin/reports')}
              >
                <Activity className="h-6 w-6 mb-2" />
                System Reports
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col"
                onClick={() => navigate('/admin/settings')}
              >
                <Settings className="h-6 w-6 mb-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
