
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockConsultations, mockVeterinarians } from '../../data/mockData';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Bell,
  Plus,
  Clock,
  CheckCircle,
  CreditCard,
  Star
} from 'lucide-react';

export function FarmerDashboard() {
  // TODO: Replace with real API calls
  const [consultations] = useState(mockConsultations.filter(c => c.farmerId === '1'));
  const [nearbyVets] = useState(mockVeterinarians.slice(0, 3));

  const stats = {
    totalConsultations: consultations.length,
    pendingConsultations: consultations.filter(c => c.status === 'pending').length,
    completedConsultations: consultations.filter(c => c.status === 'completed').length,
    availableVets: nearbyVets.filter(v => v.isAvailable).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your livestock health consultations</p>
        </div>
        <Link to="/farmer/consultations/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Consultation
          </Button>
        </Link>
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingConsultations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedConsultations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Vets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availableVets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Consultations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Consultations</CardTitle>
            <CardDescription>Your latest animal health consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.slice(0, 3).map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{consultation.title}</h4>
                    <p className="text-sm text-gray-600">{consultation.animalType}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={
                        consultation.status === 'completed' ? 'status-completed' :
                        consultation.status === 'pending' ? 'status-pending' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {consultation.status}
                    </Badge>
                    {consultation.urgency === 'high' && (
                      <Badge className="status-urgent ml-1">Urgent</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/farmer/consultations">
                <Button variant="outline" size="sm">View All Consultations</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Veterinarians */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Veterinarians</CardTitle>
            <CardDescription>Available vets in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyVets.map((vet) => (
                <div key={vet.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{vet.name}</h4>
                    <p className="text-sm text-gray-600">{vet.specialization}</p>
                    <p className="text-xs text-gray-500">{vet.location}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm ml-1">{vet.rating}/5</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={vet.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {vet.isAvailable ? 'Available' : 'Busy'}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{vet.experience}y exp</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/farmer/vets">
                <Button variant="outline" size="sm">Find More Vets</Button>
              </Link>
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
            <Link to="/farmer/consultations/new">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Request Consultation
              </Button>
            </Link>
            <Link to="/farmer/tips">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Bell className="h-6 w-6 mb-2" />
                Health Tips
              </Button>
            </Link>
            <Link to="/farmer/vets">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Users className="h-6 w-6 mb-2" />
                Find Veterinarians
              </Button>
            </Link>
            <Link to="/subscription">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Star className="h-6 w-6 mb-2" />
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Payment Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Payment & Billing</CardTitle>
          <CardDescription>Manage your payments and subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/farmer/consultation/1/payment">
              <Button variant="outline" className="w-full h-16 flex flex-col">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-sm">Pay for Consultation</span>
              </Button>
            </Link>
            <Link to="/subscription">
              <Button variant="outline" className="w-full h-16 flex flex-col">
                <Star className="h-5 w-5 mb-1" />
                <span className="text-sm">View Plans</span>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-16 flex flex-col" onClick={() => alert('Payment history feature coming soon!')}>
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-sm">Payment History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
