
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { mockVeterinarians } from '../../data/mockData';
import { Search, Star, MapPin, Phone, Clock } from 'lucide-react';

export function FindVeterinarians() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  // TODO: Replace with real API call
  const filteredVets = mockVeterinarians.filter(vet => {
    const matchesSearch = vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vet.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 vet.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const specializations = ['all', ...Array.from(new Set(mockVeterinarians.map(vet => vet.specialization)))];

  const handleContactVet = (vetId: string) => {
    // TODO: Implement actual contact functionality
    console.log('Contacting vet:', vetId);
    alert('Contact functionality would open chat or phone dialog');
  };

  const handleBookConsultation = (vetId: string) => {
    // TODO: Navigate to booking form with pre-selected vet
    console.log('Booking consultation with vet:', vetId);
    alert('Booking functionality would open consultation form');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Veterinarians</h1>
        <p className="text-gray-600">Connect with qualified veterinarians in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specializations.map(spec => (
            <Badge 
              key={spec}
              variant={selectedSpecialization === spec ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => setSelectedSpecialization(spec)}
            >
              {spec === 'all' ? 'All Specializations' : spec}
            </Badge>
          ))}
        </div>
      </div>

      {/* Veterinarians Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVets.map((vet) => (
          <Card key={vet.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {vet.name}
                    {vet.isVerified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{vet.specialization}</CardDescription>
                </div>
                <Badge className={vet.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {vet.isAvailable ? 'Available' : 'Busy'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{vet.rating}/5 ({vet.experience}y experience)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{vet.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{vet.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Available slots: {vet.schedule.length}</span>
                </div>
              </div>

              {/* Available Time Slots */}
              <div>
                <h4 className="font-medium mb-2">Available Today:</h4>
                <div className="flex flex-wrap gap-2">
                  {vet.schedule.slice(0, 4).map((time, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                  {vet.schedule.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{vet.schedule.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => handleBookConsultation(vet.id)}
                  className="flex-1"
                  disabled={!vet.isAvailable}
                >
                  Book Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleContactVet(vet.id)}
                  disabled={!vet.isAvailable}
                >
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No veterinarians found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedSpecialization('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Emergency Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">🚨 Emergency Situations</h3>
          <p className="text-yellow-700 mb-3">
            For critical animal emergencies, contact our 24/7 emergency hotline instead of booking regular consultations.
          </p>
          <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
            📞 Emergency Hotline: +237 233 XX XXXX
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
