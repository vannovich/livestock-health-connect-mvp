
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockConsultations } from '../../data/mockData';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

export function VetDashboard() {
  const navigate = useNavigate();
  // TODO: Replace with real API calls for vet's consultations
  const [consultations] = useState(mockConsultations.filter(c => c.vetId === '2' || c.status === 'pending'));

  const stats = {
    totalConsultations: consultations.length,
    pendingConsultations: consultations.filter(c => c.status === 'pending').length,
    todayAppointments: consultations.filter(c => 
      c.scheduledDate && new Date(c.scheduledDate).toDateString() === new Date().toDateString()
    ).length,
    rating: 4.8
  };

  const handleAcceptConsultation = (consultationId: string) => {
    // TODO: Implement API call to accept consultation
    console.log('Accepting consultation:', consultationId);
    alert('Consultation accepted! Patient will be notified.');
  };

  const handleViewConsultation = (consultationId: string) => {
    navigate(`/vet/consultation/${consultationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veterinarian Dashboard</h1>
          <p className="text-gray-600">Manage your consultations and help farmers</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/vet/schedule')}>
          <Calendar className="h-4 w-4 mr-2" />
          Manage Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingConsultations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Your Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rating}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Consultation Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>New consultation requests waiting for your response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.filter(c => c.status === 'pending').map((consultation) => (
                <div key={consultation.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{consultation.title}</h4>
                      <p className="text-sm text-gray-600">Patient: {consultation.farmerName}</p>
                      <p className="text-sm text-gray-600">Animal: {consultation.animalType}</p>
                    </div>
                    <Badge className={consultation.urgency === 'high' ? 'status-urgent' : 'status-pending'}>
                      {consultation.urgency} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {consultation.description}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptConsultation(consultation.id)}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewConsultation(consultation.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              {consultations.filter(c => c.status === 'pending').length === 0 && (
                <p className="text-gray-500 text-center py-8">No pending requests</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Consultations */}
        <Card>
          <CardHeader>
            <CardTitle>Active Consultations</CardTitle>
            <CardDescription>Ongoing consultations requiring follow-up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.filter(c => c.status === 'assigned').map((consultation) => (
                <div key={consultation.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{consultation.title}</h4>
                      <p className="text-sm text-gray-600">Patient: {consultation.farmerName}</p>
                      <p className="text-sm text-gray-600">Animal: {consultation.animalType}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  {consultation.scheduledDate && (
                    <p className="text-sm text-gray-600 mb-2">
                      Scheduled: {new Date(consultation.scheduledDate).toLocaleString()}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleViewConsultation(consultation.id)}
                    >
                      Continue Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      Complete
                    </Button>
                  </div>
                </div>
              ))}
              {consultations.filter(c => c.status === 'assigned').length === 0 && (
                <p className="text-gray-500 text-center py-8">No active consultations</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => navigate('/vet/schedule')}
            >
              <Calendar className="h-6 w-6 mb-2" />
              Update Schedule
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => navigate('/vet/patients')}
            >
              <Users className="h-6 w-6 mb-2" />
              Patient History
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => navigate('/vet/reminders')}
            >
              <MessageSquare className="h-6 w-6 mb-2" />
              Send Reminder
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => navigate('/vet/prescriptions')}
            >
              <CheckCircle className="h-6 w-6 mb-2" />
              Write Prescription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
