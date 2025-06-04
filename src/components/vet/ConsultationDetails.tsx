
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ArrowLeft,
  User,
  Calendar,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  Video
} from 'lucide-react';
import { mockConsultations } from '../../data/mockData';
import { toast } from '../ui/use-toast';

interface Message {
  id: string;
  sender: 'vet' | 'farmer';
  content: string;
  timestamp: string;
  type: 'text' | 'prescription';
}

export function ConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const consultation = mockConsultations.find(c => c.id === id);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'farmer',
      content: 'Hello doctor, my cattle has been showing signs of difficulty breathing for the past 2 days.',
      timestamp: '2024-01-15T08:30:00Z',
      type: 'text'
    },
    {
      id: '2',
      sender: 'vet',
      content: 'Thank you for reaching out. Can you describe the breathing pattern? Is it rapid, labored, or accompanied by any sounds?',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'text'
    },
    {
      id: '3',
      sender: 'farmer',
      content: 'The breathing is labored and I can hear some wheezing sounds. The animal also seems less active than usual.',
      timestamp: '2024-01-15T09:45:00Z',
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [response, setResponse] = useState('');
  const [prescription, setPrescription] = useState('');

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">Consultation not found.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/vet/dashboard')}
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'vet',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleSendResponse = () => {
    if (!response.trim()) return;

    // TODO: Update consultation with response in real API
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the farmer."
    });
    setResponse('');
  };

  const handleSendPrescription = () => {
    if (!prescription.trim()) return;

    const prescriptionMessage: Message = {
      id: Date.now().toString(),
      sender: 'vet',
      content: `Prescription: ${prescription}`,
      timestamp: new Date().toISOString(),
      type: 'prescription'
    };

    setMessages([...messages, prescriptionMessage]);
    setPrescription('');

    toast({
      title: "Prescription Sent",
      description: "Prescription has been sent to the farmer."
    });
  };

  const handleCompleteConsultation = () => {
    // TODO: Update consultation status in real API
    toast({
      title: "Consultation Completed",
      description: "The consultation has been marked as completed."
    });
    navigate('/vet/dashboard');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/vet/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation Details</h1>
            <p className="text-gray-600">Manage consultation and communicate with farmer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consultation Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Farmer</Label>
                <p className="font-medium">{consultation.farmerName}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Animal Type</Label>
                <p>{consultation.animalType}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Issue</Label>
                <p className="font-medium">{consultation.title}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="text-sm text-gray-700">{consultation.description}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Urgency</Label>
                <Badge className={consultation.urgency === 'high' ? 'status-urgent' : 'status-pending'}>
                  {consultation.urgency}
                </Badge>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <Badge className="bg-blue-100 text-blue-800">
                  {consultation.status}
                </Badge>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Created</Label>
                <p className="text-sm">{new Date(consultation.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 space-y-2">
                <Button className="w-full" variant="outline">
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Voice Call
                </Button>
                <Button 
                  className="w-full"
                  onClick={handleCompleteConsultation}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Consultation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chat & Communication */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Consultation Chat
              </CardTitle>
              <CardDescription>
                Communicate with the farmer about the consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'vet' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'vet' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-white border'
                        }`}
                      >
                        {message.type === 'prescription' && (
                          <div className="flex items-center gap-1 mb-1">
                            <FileText className="h-3 w-3" />
                            <span className="text-xs font-medium">Prescription</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'vet' ? 'text-primary-foreground/70' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Response & Prescription Section */}
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="response">Consultation Response</Label>
                  <Textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Provide your professional response and recommendations..."
                    rows={3}
                  />
                  <Button 
                    className="mt-2" 
                    onClick={handleSendResponse}
                    disabled={!response.trim()}
                  >
                    Send Response
                  </Button>
                </div>

                <div>
                  <Label htmlFor="prescription">Quick Prescription</Label>
                  <Textarea
                    id="prescription"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    placeholder="Write prescription details (medication, dosage, duration)..."
                    rows={2}
                  />
                  <Button 
                    className="mt-2" 
                    variant="outline"
                    onClick={handleSendPrescription}
                    disabled={!prescription.trim()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Send Prescription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
