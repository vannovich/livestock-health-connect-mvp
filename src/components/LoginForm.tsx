
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Replace with real API authentication
    const success = login(email, password);
    
    if (success) {
      // Redirect based on user role
      if (email.includes('farmer')) {
        navigate('/farmer/dashboard');
      } else if (email.includes('vet')) {
        navigate('/vet/dashboard');
      } else if (email.includes('admin')) {
        navigate('/admin/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const fillDemoCredentials = (type: 'farmer' | 'vet' | 'admin') => {
    if (type === 'farmer') {
      setEmail('john@farmer.com');
      setPassword('farmer123');
    } else if (type === 'vet') {
      setEmail('mary@vet.com');
      setPassword('vet123');
    } else if (type === 'admin') {
      setEmail('admin@healthconnect.cm');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <CardTitle className="text-2xl font-bold">Livestock HealthConnect</CardTitle>
          <CardDescription>Connect farmers with veterinarians in Buea</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demo Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="demo">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Try the platform with demo accounts:
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => fillDemoCredentials('farmer')}
                >
                  👨‍🌾 Login as Farmer
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => fillDemoCredentials('vet')}
                >
                  👩‍⚕️ Login as Veterinarian
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => fillDemoCredentials('admin')}
                >
                  👨‍💼 Login as Admin
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Click any button above to auto-fill credentials, then switch to the Login tab.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-primary hover:underline">
                Contact admin for registration
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
