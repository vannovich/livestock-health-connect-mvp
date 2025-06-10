
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft, Construction } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const getPageSuggestion = (path: string) => {
    if (path.includes('/farmer/consultations')) {
      return {
        title: 'Farmer Consultations Page',
        description: 'This would show a list of your consultation requests and their status.',
        features: ['View active consultations', 'Chat with veterinarians', 'Upload photos of animals', 'Track consultation history']
      };
    }
    if (path.includes('/vet/consultations')) {
      return {
        title: 'Veterinarian Consultations Page',
        description: 'This would show incoming consultation requests from farmers.',
        features: ['Accept/decline requests', 'Respond to farmer queries', 'View animal photos', 'Provide diagnoses']
      };
    }
    if (path.includes('/profile')) {
      return {
        title: 'User Profile Page',
        description: 'This would allow users to manage their account settings.',
        features: ['Edit personal information', 'Change password', 'Notification preferences', 'Account security']
      };
    }
    return {
      title: 'Simulated Page',
      description: 'This page is not yet implemented but would contain relevant functionality.',
      features: ['Feature simulation', 'User interaction', 'Data management']
    };
  };

  const suggestion = getPageSuggestion(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Construction className="h-10 w-10 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl text-gray-800">Page Under Construction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              The page <code className="bg-gray-100 px-2 py-1 rounded text-sm">{location.pathname}</code> is not yet implemented.
            </p>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">{suggestion.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">{suggestion.description}</p>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Planned Features:</h4>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  {suggestion.features.map((feature, index) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigate('/')} 
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>💡 This simulation helps you visualize what this page would contain when fully implemented.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
