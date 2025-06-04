
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  FileText,
  Plus,
  User,
  Calendar,
  Pill,
  Download,
  Eye
} from 'lucide-react';
import { toast } from '../ui/use-toast';

interface Prescription {
  id: string;
  patientName: string;
  animalType: string;
  consultationId: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  additionalNotes: string;
  dateIssued: string;
  vetName: string;
}

export function WritePrescription() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientName: 'John Doe',
      animalType: 'Cattle',
      consultationId: 'CONS-001',
      medications: [
        {
          name: 'Oxytetracycline',
          dosage: '200mg',
          frequency: 'Once daily',
          duration: '7 days',
          instructions: 'Administer intramuscularly'
        }
      ],
      additionalNotes: 'Monitor for improvement in breathing. Return if symptoms persist.',
      dateIssued: '2024-01-15',
      vetName: 'Dr. Mary Vet'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [viewingPrescription, setViewingPrescription] = useState<Prescription | null>(null);
  
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    animalType: '',
    consultationId: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    additionalNotes: ''
  });

  const consultations = [
    { id: 'CONS-001', patientName: 'John Doe', animalType: 'Cattle', issue: 'Respiratory infection' },
    { id: 'CONS-002', patientName: 'Mary Ndifon', animalType: 'Pig', issue: 'Skin condition' },
    { id: 'CONS-003', patientName: 'Paul Tabi', animalType: 'Goat', issue: 'Digestive issues' }
  ];

  const commonMedications = [
    'Oxytetracycline',
    'Penicillin',
    'Ivermectin',
    'Albendazole',
    'Dexamethasone',
    'Vitamin B Complex',
    'Iron supplements'
  ];

  const handleAddMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    });
  };

  const handleRemoveMedication = (index: number) => {
    const medications = newPrescription.medications.filter((_, i) => i !== index);
    setNewPrescription({ ...newPrescription, medications });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const medications = newPrescription.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setNewPrescription({ ...newPrescription, medications });
  };

  const handleConsultationSelect = (consultationId: string) => {
    const consultation = consultations.find(c => c.id === consultationId);
    if (consultation) {
      setNewPrescription({
        ...newPrescription,
        consultationId,
        patientName: consultation.patientName,
        animalType: consultation.animalType
      });
    }
  };

  const handleCreatePrescription = () => {
    if (!newPrescription.patientName || !newPrescription.consultationId) {
      toast({
        title: "Error",
        description: "Please select a consultation and fill in required fields.",
        variant: "destructive"
      });
      return;
    }

    const prescription: Prescription = {
      id: Date.now().toString(),
      ...newPrescription,
      dateIssued: new Date().toISOString().split('T')[0],
      vetName: 'Dr. Mary Vet'
    };

    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      patientName: '',
      animalType: '',
      consultationId: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      additionalNotes: ''
    });
    setIsCreating(false);

    toast({
      title: "Prescription Created",
      description: "Prescription has been created successfully."
    });
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    // Simulate PDF download
    toast({
      title: "Download Started",
      description: "Prescription PDF is being downloaded."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Write Prescriptions</h1>
            <p className="text-gray-600">Create and manage animal medication prescriptions</p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="consultation">Select Consultation</Label>
                  <Select onValueChange={handleConsultationSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a consultation" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultations.map((consultation) => (
                        <SelectItem key={consultation.id} value={consultation.id}>
                          {consultation.id} - {consultation.patientName} ({consultation.animalType}) - {consultation.issue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={newPrescription.patientName}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="animalType">Animal Type</Label>
                    <Input
                      id="animalType"
                      value={newPrescription.animalType}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>Medications</Label>
                    <Button variant="outline" size="sm" onClick={handleAddMedication}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Medication
                    </Button>
                  </div>
                  
                  {newPrescription.medications.map((medication, index) => (
                    <Card key={index} className="mb-4">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Medication Name</Label>
                            <Select onValueChange={(value) => handleMedicationChange(index, 'name', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select medication" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonMedications.map((med) => (
                                  <SelectItem key={med} value={med}>{med}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Dosage</Label>
                            <Input
                              value={medication.dosage}
                              onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                              placeholder="e.g., 200mg"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Frequency</Label>
                            <Select onValueChange={(value) => handleMedicationChange(index, 'frequency', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Once daily">Once daily</SelectItem>
                                <SelectItem value="Twice daily">Twice daily</SelectItem>
                                <SelectItem value="Three times daily">Three times daily</SelectItem>
                                <SelectItem value="Every 12 hours">Every 12 hours</SelectItem>
                                <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={medication.duration}
                              onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                              placeholder="e.g., 7 days"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Instructions</Label>
                          <Input
                            value={medication.instructions}
                            onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                            placeholder="Special instructions for administration"
                          />
                        </div>
                        
                        {newPrescription.medications.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleRemoveMedication(index)}
                          >
                            Remove Medication
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={newPrescription.additionalNotes}
                    onChange={(e) => setNewPrescription({...newPrescription, additionalNotes: e.target.value})}
                    placeholder="Any additional instructions or notes..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleCreatePrescription} className="w-full">
                  Create Prescription
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{prescription.patientName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Animal: {prescription.animalType}</span>
                        <span>•</span>
                        <span>Consultation: {prescription.consultationId}</span>
                        <span>•</span>
                        <span>Date: {new Date(prescription.dateIssued).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewingPrescription(prescription)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPrescription(prescription)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Medications:</h4>
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Pill className="h-4 w-4 text-primary" />
                        <span className="font-medium">{med.name}</span>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      <p>{med.frequency} for {med.duration}</p>
                      {med.instructions && <p className="text-gray-600 italic">{med.instructions}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Prescription Dialog */}
        <Dialog open={!!viewingPrescription} onOpenChange={() => setViewingPrescription(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Prescription Details</DialogTitle>
            </DialogHeader>
            {viewingPrescription && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Patient</p>
                    <p>{viewingPrescription.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Animal</p>
                    <p>{viewingPrescription.animalType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date Issued</p>
                    <p>{new Date(viewingPrescription.dateIssued).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Veterinarian</p>
                    <p>{viewingPrescription.vetName}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Prescribed Medications</h4>
                  <div className="space-y-3">
                    {viewingPrescription.medications.map((med, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="h-5 w-5 text-primary" />
                          <span className="font-medium text-lg">{med.name}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Dosage:</span> {med.dosage}
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span> {med.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {med.duration}
                          </div>
                        </div>
                        {med.instructions && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Instructions:</span> {med.instructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {viewingPrescription.additionalNotes && (
                  <div>
                    <h4 className="font-semibold mb-2">Additional Notes</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {viewingPrescription.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
