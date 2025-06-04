import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Bell,
  Clock,
  Phone,
  MessageSquare,
  Calendar,
  Plus,
  Send,
  ArrowLeft
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
}

export function SendReminder() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      patientName: 'John Doe',
      phone: '+237123456789',
      type: 'appointment',
      message: 'Reminder: Your cattle vaccination appointment is scheduled for tomorrow at 2 PM.',
      scheduledDate: '2024-01-16T14:00:00Z',
      status: 'sent'
    },
    {
      id: '2',
      patientName: 'Mary Smith',
      phone: '+237987654321',
      type: 'medication',
      message: 'Please remember to give the prescribed medication to your goats twice daily.',
      scheduledDate: '2024-01-15T08:00:00Z',
      status: 'delivered'
    },
    {
      id: '3',
      patientName: 'Peter Johnson',
      phone: '+237555000111',
      type: 'follow-up',
      message: 'Follow-up visit needed for your sick cow. Please call to schedule.',
      scheduledDate: '2024-01-17T10:00:00Z',
      status: 'pending'
    }
  ]);

  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    patientName: '',
    phone: '',
    type: 'appointment',
    message: '',
    scheduledDate: ''
  });

  const reminderTemplates = {
    appointment: "Reminder: Your {animal} health consultation is scheduled for {date} at {time}. Please be on time.",
    medication: "Please remember to give the prescribed medication to your {animal} as instructed. Contact us if you have questions.",
    follow_up: "A follow-up visit is needed for your {animal}. Please call us to schedule an appointment.",
    vaccination: "Your {animal} vaccination is due. Please schedule an appointment at your earliest convenience."
  };

  const handleSendReminder = () => {
    if (!newReminder.patientName || !newReminder.phone || !newReminder.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      patientName: newReminder.patientName!,
      phone: newReminder.phone!,
      type: newReminder.type as 'appointment' | 'medication' | 'follow-up' | 'vaccination',
      message: newReminder.message!,
      scheduledDate: newReminder.scheduledDate || new Date().toISOString(),
      status: 'pending'
    };

    setReminders([reminder, ...reminders]);
    setNewReminder({
      patientName: '',
      phone: '',
      type: 'appointment',
      message: '',
      scheduledDate: ''
    });

    toast({
      title: "Reminder Scheduled",
      description: `Reminder sent to ${reminder.patientName}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'medication': return <Clock className="h-4 w-4" />;
      case 'follow-up': return <Bell className="h-4 w-4" />;
      case 'vaccination': return <MessageSquare className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleTemplateSelect = (type: string) => {
    const template = reminderTemplates[type as keyof typeof reminderTemplates];
    setNewReminder({
      ...newReminder,
      type: type as 'appointment' | 'medication' | 'follow-up' | 'vaccination',
      message: template
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Send Reminders</h1>
            <p className="text-gray-600">Send automated reminders to farmers about appointments and treatments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create New Reminder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Reminder
              </CardTitle>
              <CardDescription>
                Send reminders for appointments, medications, or follow-ups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={newReminder.patientName || ''}
                  onChange={(e) => setNewReminder({...newReminder, patientName: e.target.value})}
                  placeholder="Enter farmer's name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newReminder.phone || ''}
                  onChange={(e) => setNewReminder({...newReminder, phone: e.target.value})}
                  placeholder="+237123456789"
                />
              </div>

              <div>
                <Label htmlFor="type">Reminder Type</Label>
                <Select onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reminder type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="scheduledDate">Scheduled Date & Time</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={newReminder.scheduledDate || ''}
                  onChange={(e) => setNewReminder({...newReminder, scheduledDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newReminder.message || ''}
                  onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
                  placeholder="Enter reminder message..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSendReminder} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Reminders
              </CardTitle>
              <CardDescription>
                Track sent and scheduled reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(reminder.type)}
                        <span className="font-medium">{reminder.patientName}</span>
                      </div>
                      <Badge className={getStatusColor(reminder.status)}>
                        {reminder.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reminder.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {reminder.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(reminder.scheduledDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
