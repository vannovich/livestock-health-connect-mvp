
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockUsers, mockVeterinarians, mockConsultations } from '../../data/mockData';
import { 
  Users, 
  MessageSquare, 
  UserCheck,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

export function AdminDashboard() {
  // TODO: Replace with real API calls
  const [users] = useState(mockUsers);
  const [vets, setVets] = useState(mockVeterinarians);
  const [consultations] = useState(mockConsultations);

  const stats = {
    totalUsers: users.length,
    totalVets: vets.length,
    unverifiedVets: vets.filter(v => !v.isVerified).length,
    totalConsultations: consultations.length,
    todayConsultations: consultations.filter(c => 
      new Date(c.createdAt).toDateString() === new Date().toDateString()
    ).length,
    completedToday: consultations.filter(c => 
      c.status === 'completed' && new Date(c.createdAt).toDateString() === new Date().toDateString()
    ).length
  };

  const handleVerifyVet = (vetId: string) => {
    // TODO: Implement API call to verify veterinarian
    setVets(prev => prev.map(vet => 
      vet.id === vetId ? { ...vet, isVerified: true } : vet
    ));
    console.log('Veterinarian verified:', vetId);
  };

  const handleRejectVet = (vetId: string) => {
    // TODO: Implement API call to reject veterinarian
    console.log('Veterinarian verification rejected:', vetId);
    alert('Vet verification rejected. Notification sent.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage platform users and monitor system health</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-gray-500">Farmers & Vets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Veterinarians</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVets}</p>
                <p className="text-xs text-gray-500">{stats.unverifiedVets} pending verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</p>
                <p className="text-xs text-gray-500">{stats.todayConsultations} today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Vet Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Vet Verifications</CardTitle>
            <CardDescription>Veterinarians waiting for account verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vets.filter(vet => !vet.isVerified).map((vet) => (
                <div key={vet.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{vet.name}</h4>
                      <p className="text-sm text-gray-600">{vet.specialization}</p>
                      <p className="text-sm text-gray-600">{vet.experience} years experience</p>
                      <p className="text-sm text-gray-600">{vet.location}</p>
                    </div>
                    <Badge className="status-pending">Pending</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleVerifyVet(vet.id)}
                    >
                      Verify
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRejectVet(vet.id)}
                    >
                      Reject
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              {vets.filter(vet => !vet.isVerified).length === 0 && (
                <p className="text-gray-500 text-center py-8">No pending verifications</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
            <CardDescription>Latest consultations and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{consultation.title}</p>
                    <p className="text-xs text-gray-600">
                      {consultation.farmerName} → {consultation.vetName || 'Unassigned'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    className={
                      consultation.status === 'completed' ? 'status-completed' :
                      consultation.status === 'pending' ? 'status-pending' :
                      'bg-blue-100 text-blue-800'
                    }
                  >
                    {consultation.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Consultation Success Rate</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
              <p className="text-sm text-gray-600">Completed Today</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-sm text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Platform Messages
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <UserCheck className="h-6 w-6 mb-2" />
              System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
