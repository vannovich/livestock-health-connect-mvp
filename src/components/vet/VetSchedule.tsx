import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Clock,
  Plus,
  Edit,
  Trash2,
  CalendarDays,
  ArrowLeft
} from 'lucide-react';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  consultationId?: string;
  patientName?: string;
}

export function VetSchedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      date: new Date().toDateString(),
      startTime: '09:00',
      endTime: '10:00',
      isAvailable: false,
      consultationId: '1',
      patientName: 'John Doe'
    },
    {
      id: '2',
      date: new Date().toDateString(),
      startTime: '10:00',
      endTime: '11:00',
      isAvailable: true
    },
    {
      id: '3',
      date: new Date().toDateString(),
      startTime: '14:00',
      endTime: '15:00',
      isAvailable: true
    }
  ]);

  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: ''
  });

  const selectedDateSlots = timeSlots.filter(slot => 
    selectedDate && slot.date === selectedDate.toDateString()
  );

  const handleAddTimeSlot = () => {
    if (newSlot.startTime && newSlot.endTime && selectedDate) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        date: selectedDate.toDateString(),
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        isAvailable: true
      };
      setTimeSlots([...timeSlots, slot]);
      setNewSlot({ startTime: '', endTime: '' });
      setIsAddingSlot(false);
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
  };

  const toggleAvailability = (slotId: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === slotId 
        ? { ...slot, isAvailable: !slot.isAvailable }
        : slot
    ));
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
            <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600">Manage your consultation schedule and availability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Time Slots</CardTitle>
                  <CardDescription>
                    {selectedDate ? selectedDate.toDateString() : 'Select a date'}
                  </CardDescription>
                </div>
                <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Time Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddTimeSlot} className="w-full">
                        Add Time Slot
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDateSlots.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No time slots for this date. Add some slots to get started.
                  </p>
                ) : (
                  selectedDateSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">
                            {slot.startTime} - {slot.endTime}
                          </p>
                          {slot.patientName && (
                            <p className="text-sm text-gray-600">Patient: {slot.patientName}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {slot.isAvailable ? 'Available' : 'Booked'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAvailability(slot.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSlot(slot.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
