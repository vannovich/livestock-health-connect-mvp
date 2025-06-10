
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Plus, MessageSquare, Calendar, Clock, CheckCircle } from 'lucide-react';
import { mockConsultations } from '../../data/mockData';

export function MyConsultations() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  // Simulate farmer's consultations
  const consultations = mockConsultations.filter(c => c.farmerId === '1');
  
  const filteredConsultations = filter === 'all' 
    ? consultations 
    : consultations.filter(c => c.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'assigned': return <MessageSquare className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">My Consultations</h1>
            <p className="text-gray-600">Track your veterinary consultation requests</p>
          </div>
          <Button onClick={() => navigate('/farmer/consultations/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Consultation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter Consultations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { key: 'all', label: 'All Consultations', count: consultations.length },
                  { key: 'pending', label: 'Pending', count: consultations.filter(c => c.status === 'pending').length },
                  { key: 'assigned', label: 'In Progress', count: consultations.filter(c => c.status === 'assigned').length },
                  { key: 'completed', label: 'Completed', count: consultations.filter(c => c.status === 'completed').length }
                ].map(item => (
                  <Button
                    key={item.key}
                    variant={filter === item.key ? 'default' : 'ghost'}
                    className="w-full justify-between"
                    onClick={() => setFilter(item.key)}
                  >
                    <span>{item.label}</span>
                    <Badge variant="secondary">{item.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{consultations.length}</p>
                  <p className="text-sm text-gray-600">Total Consultations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">XAF {(consultations.length * 15000).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredConsultations.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations found</h3>
                    <p className="text-gray-500 mb-4">
                      {filter === 'all' 
                        ? "You haven't requested any consultations yet."
                        : `No ${filter} consultations found.`
                      }
                    </p>
                    <Button onClick={() => navigate('/farmer/consultations/new')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Request Your First Consultation
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredConsultations.map((consultation) => (
                  <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{consultation.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(consultation.createdAt).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <span className="capitalize">{consultation.animalType}</span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(consultation.status)}>
                            {getStatusIcon(consultation.status)}
                            <span className="ml-1 capitalize">{consultation.status}</span>
                          </Badge>
                          {consultation.urgency === 'high' && (
                            <Badge className="bg-red-100 text-red-800">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-2">{consultation.description}</p>
                      
                      {consultation.vetName && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-blue-800">
                            <strong>Assigned Veterinarian:</strong> {consultation.vetName}
                          </p>
                        </div>
                      )}

                      {consultation.response && (
                        <div className="bg-green-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-green-800">
                            <strong>Veterinarian Response:</strong> {consultation.response}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Consultation ID: {consultation.id}
                        </span>
                        <div className="flex gap-2">
                          {consultation.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => navigate(`/farmer/consultation/${consultation.id}/payment`)}>
                              Pay Now (XAF 15,000)
                            </Button>
                          )}
                          {consultation.status === 'assigned' && (
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat with Vet
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
