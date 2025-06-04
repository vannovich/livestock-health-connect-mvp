
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
  Send,
  MessageSquare,
  Phone,
  User,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from '../ui/use-toast';

interface Reminder {
  id: string;
  patientName: string;
  phone: string;
  type: 'appointment' | 'medication' | 'follow-up' | 'vaccination';
  message: string;
  scheduledDate: string;
  status: 'pending' | 'sent' | 'delivered';
  sentAt?: string;
}

export function SendReminder() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      patientName: 'John Doe',
      phone: '+237 677 123 456',
      type: 'medication',
      message: 'Please continue giving your cattle the prescribed antibiotics for 3 more days.',
      scheduledDate: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Mary Ndifon',
      phone: '+237 655 987 654',
      type: 'follow-up',
      message: 'Time for follow-up visit to check on your pig\'s skin condition.',
      scheduledDate: '2024-01-22',
      status: 'sent',
      sentAt: '2024-01-18T10:30:00Z'
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    patientName: '',
    phone: '',
    type: '',
    message: '',
    scheduledDate: ''
  });

  const [isCreating, setIsCreating] = useState(false);

  const patients = [
    { name: 'John Doe', phone: '+237 677 123 456' },
    { name: 'Mary Ndifon', phone: '+237 655 987 654' },
    { name: 'Paul Tabi', phone: '+237 699 111 222' }
  ];

  const reminderTemplates = {
    appointment: 'Reminder: You have an appointment scheduled for {date}. Please confirm your attendance.',
    medication: 'Please remember to continue your animal\'s medication as prescribed. Contact us if you have any questions.',
    'follow-up': 'It\'s time for your animal\'s follow-up visit. Please schedule an appointment at your convenience.',
    vaccination: 'Your animals are due for vaccination. Please schedule an appointment to ensure their health.'
  };

  const handleCreateReminder = () => {
    if (!newReminder.patientName || !newReminder.type || !newReminder.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      ...newReminder,
      status: 'pending'
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      patientName: '',
      phone: '',
      type: '',
      message: '',
      scheduledDate: ''
    });
    setIsCreating(false);

    toast({
      title: "Reminder Created",
      description: "Reminder has been scheduled successfully."
    });
  };

  const handleSendReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, status: 'sent', sentAt: new Date().toISOString() }
        : reminder
    ));

    toast({
      title: "Reminder Sent",
      description: "SMS reminder has been sent to the patient."
    });
  };

  const handlePatientSelect = (patientName: string) => {
    const patient = patients.find(p => p.name === patientName);
    if (patient) {
      setNewReminder({
        ...newReminder,
        patientName: patient.name,
        phone: patient.phone
      });
    }
  };

  const handleTypeSelect = (type: string) => {
    setNewReminder({
      ...newReminder,
      type,
      message: reminderTemplates[type as keyof typeof reminderTemplates] || ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Send Reminders</h1>
            <p className="text-gray-600">Send SMS reminders to patients about appointments and medications</p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Create Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patient">Select Patient</Label>
                  <Select onValueChange={handlePatientSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.name} value={patient.name}>
                          {patient.name} - {patient.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newReminder.phone}
                    onChange={(e) => setNewReminder({...newReminder, phone: e.target.value})}
                    placeholder="+237 XXX XXX XXX"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Reminder Type</Label>
                  <Select onValueChange={handleTypeSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newReminder.message}
                    onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
                    placeholder="Enter your reminder message..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="scheduledDate">Scheduled Date (Optional)</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={newReminder.scheduledDate}
                    onChange={(e) => setNewReminder({...newReminder, scheduledDate: e.target.value})}
                  />
                </div>

                <Button onClick={handleCreateReminder} className="w-full">
                  Create Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{reminder.patientName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        {reminder.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        Type: {reminder.type}
                        {reminder.scheduledDate && (
                          <span> • Date: {new Date(reminder.scheduledDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        reminder.status === 'sent' 
                          ? 'bg-green-100 text-green-800' 
                          : reminder.status === 'delivered'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {reminder.status}
                    </Badge>
                    {reminder.status === 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => handleSendReminder(reminder.id)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Now
                      </Button>
                    )}
                    {reminder.status === 'sent' && reminder.sentAt && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4" />
                        Sent {new Date(reminder.sentAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{reminder.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {reminders.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No reminders created yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
