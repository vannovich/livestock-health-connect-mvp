
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import { mockConsultations } from '../../data/mockData';

export function ConsultationPayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate finding consultation by ID
  const consultation = mockConsultations.find(c => c.id === id) || mockConsultations[0];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment processed successfully! Veterinarian will be notified.');
      navigate('/payment-success');
    }, 2000);
  };

  const consultationFee = 50.00; // Simulated fee

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Consultation Payment</h1>
            <p className="text-gray-600">Complete payment for your veterinary consultation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Consultation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>Review your consultation request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{consultation.title}</h4>
                <p className="text-sm text-gray-600">{consultation.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Animal Type:</span>
                <span className="font-medium">{consultation.animalType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Priority:</span>
                <Badge className={consultation.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                  {consultation.urgency} priority
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className="bg-blue-100 text-blue-800">{consultation.status}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Consultation fee breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Consultation Fee:</span>
                <span className="font-medium">${consultationFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold text-green-600">${consultationFee.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  Secure payment processing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Instant veterinarian notification
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6"
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : `Pay $${consultationFee.toFixed(2)}`}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-2">
                By proceeding, you agree to our terms of service and privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
