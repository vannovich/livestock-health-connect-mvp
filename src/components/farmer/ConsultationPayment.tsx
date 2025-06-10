
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, Smartphone } from 'lucide-react';
import { mockConsultations } from '../../data/mockData';

export function ConsultationPayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'card'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Simulate finding consultation by ID
  const consultation = mockConsultations.find(c => c.id === id) || mockConsultations[0];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === 'mtn' || paymentMethod === 'orange') {
        alert(`Payment request sent to ${phoneNumber}. Please confirm on your phone to complete the payment.`);
      } else {
        alert('Payment processed successfully! Veterinarian will be notified.');
      }
      navigate('/payment-success');
    }, 3000);
  };

  const consultationFee = 15000; // XAF

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

        <div className="space-y-6">
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

          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mtn"
                    checked={paymentMethod === 'mtn'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'mtn')}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">MTN Mobile Money</p>
                      <p className="text-sm text-gray-600">Pay with your MTN Mobile Money account</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="orange"
                    checked={paymentMethod === 'orange'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'orange')}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Orange Money</p>
                      <p className="text-sm text-gray-600">Pay with your Orange Money account</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay with Visa or Mastercard</p>
                    </div>
                  </div>
                </label>
              </div>

              {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+237 6XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}
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
                <span className="font-medium">XAF {consultationFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Service Fee:</span>
                <span className="font-medium">XAF 0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold text-green-600">XAF {consultationFee.toLocaleString()}</span>
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
                disabled={isProcessing || ((paymentMethod === 'mtn' || paymentMethod === 'orange') && !phoneNumber)}
                className="w-full mt-6"
                size="lg"
              >
                {paymentMethod === 'mtn' && <Smartphone className="h-4 w-4 mr-2" />}
                {paymentMethod === 'orange' && <Smartphone className="h-4 w-4 mr-2" />}
                {paymentMethod === 'card' && <CreditCard className="h-4 w-4 mr-2" />}
                {isProcessing ? 'Processing...' : `Pay XAF ${consultationFee.toLocaleString()}`}
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
