
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Send, Paperclip, User, Stethoscope } from 'lucide-react';
import { mockConsultations } from '../../data/mockData';

export function ConsultationChat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'vet',
      senderName: 'Dr. Sarah Johnson',
      content: 'Hello! I\'ve reviewed your consultation request about your cow not eating properly. Can you tell me how long this has been going on?',
      timestamp: new Date().toISOString(),
      type: 'text'
    },
    {
      id: '2',
      sender: 'farmer',
      senderName: 'You',
      content: 'It started about 3 days ago. She was fine before that, eating normally.',
      timestamp: new Date().toISOString(),
      type: 'text'
    },
    {
      id: '3',
      sender: 'vet',
      senderName: 'Dr. Sarah Johnson',
      content: 'I see. Has she been drinking water normally? Any changes in behavior or movement?',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);

  // Simulate finding consultation
  const consultation = mockConsultations.find(c => c.id === id) || mockConsultations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'farmer',
      senderName: 'You',
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate vet response after 2 seconds
    setTimeout(() => {
      const responses = [
        "Thank you for that information. Based on what you've described, I'd like to recommend some initial steps.",
        "That's helpful. Can you also check if there are any visible signs of illness like discharge from eyes or nose?",
        "I understand. Let me provide you with a treatment plan and some immediate care instructions."
      ];
      
      const vetResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'vet',
        senderName: 'Dr. Sarah Johnson',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setMessages(prev => [...prev, vetResponse]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{consultation.title}</h1>
            <p className="text-gray-600">Consultation with Dr. Sarah Johnson</p>
          </div>
          <Badge className="bg-green-100 text-green-800">
            Active Session
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Animal Type</p>
                  <p className="font-medium capitalize">{consultation.animalType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <Badge className={consultation.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {consultation.urgency}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Started</p>
                  <p className="font-medium">{new Date(consultation.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fee</p>
                  <p className="font-medium text-green-600">XAF 15,000</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Veterinarian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Large Animal Specialist</p>
                    <p className="text-sm text-gray-500">8 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Chat with Veterinarian</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[450px]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === 'farmer' ? 'order-2' : 'order-1'}`}>
                        <div className={`p-3 rounded-lg ${
                          msg.sender === 'farmer' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {msg.sender === 'farmer' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Stethoscope className="h-3 w-3" />
                          )}
                          <span>{msg.senderName}</span>
                          <span>•</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
