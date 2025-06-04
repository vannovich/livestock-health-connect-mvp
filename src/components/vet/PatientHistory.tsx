
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Search,
  User,
  Calendar,
  FileText,
  Phone,
  MapPin,
  Eye
} from 'lucide-react';

interface PatientRecord {
  id: string;
  farmerName: string;
  farmLocation: string;
  phone: string;
  consultations: Array<{
    id: string;
    date: string;
    animalType: string;
    issue: string;
    diagnosis: string;
    prescription: string;
    status: string;
  }>;
  totalConsultations: number;
  lastVisit: string;
}

export function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  // Mock patient data
  const patients: PatientRecord[] = [
    {
      id: '1',
      farmerName: 'John Doe',
      farmLocation: 'Molyko, Buea',
      phone: '+237 677 123 456',
      lastVisit: '2024-01-15',
      totalConsultations: 3,
      consultations: [
        {
          id: '1',
          date: '2024-01-15',
          animalType: 'Cattle',
          issue: 'Respiratory infection',
          diagnosis: 'Pneumonia',
          prescription: 'Antibiotics (Oxytetracycline) 200mg daily for 7 days',
          status: 'completed'
        },
        {
          id: '2',
          date: '2023-12-20',
          animalType: 'Goat',
          issue: 'Loss of appetite',
          diagnosis: 'Intestinal parasites',
          prescription: 'Deworming medication (Albendazole) 10mg/kg',
          status: 'completed'
        }
      ]
    },
    {
      id: '2',
      farmerName: 'Mary Ndifon',
      farmLocation: 'Bonduma, Buea',
      phone: '+237 655 987 654',
      lastVisit: '2024-01-10',
      totalConsultations: 2,
      consultations: [
        {
          id: '3',
          date: '2024-01-10',
          animalType: 'Pig',
          issue: 'Skin condition',
          diagnosis: 'Mange mites',
          prescription: 'Ivermectin injection 0.3mg/kg, repeat in 14 days',
          status: 'completed'
        }
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.farmLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient History</h1>
            <p className="text-gray-600">View and manage patient consultation records</p>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.farmerName}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {patient.farmLocation}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {patient.totalConsultations} consultations
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Patient History: {patient.farmerName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p>{patient.farmLocation}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p>{patient.phone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Consultation History</h4>
                            <div className="space-y-3">
                              {patient.consultations.map((consultation) => (
                                <div key={consultation.id} className="border rounded-lg p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="font-medium">{consultation.animalType} - {consultation.issue}</p>
                                      <p className="text-sm text-gray-600">
                                        {new Date(consultation.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">
                                      {consultation.status}
                                    </Badge>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Diagnosis:</span> {consultation.diagnosis}
                                    </div>
                                    <div>
                                      <span className="font-medium">Prescription:</span> {consultation.prescription}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No patients found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
