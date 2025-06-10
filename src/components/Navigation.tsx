
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { 
  User,
  Bell,
  Menu,
  X,
  LogOut,
  ArrowLeft
} from 'lucide-react';

export function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-gray-900">HealthConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user.role === 'farmer' && (
              <>
                <Link to="/farmer/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/farmer/vets" className="text-gray-700 hover:text-primary transition-colors">
                  Find Vets
                </Link>
                <Link to="/farmer/consultations" className="text-gray-700 hover:text-primary transition-colors">
                  My Consultations
                </Link>
                <Link to="/farmer/tips" className="text-gray-700 hover:text-primary transition-colors">
                  Health Tips
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}

            {user.role === 'veterinarian' && (
              <>
                <Link to="/vet/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/vet/consultations" className="text-gray-700 hover:text-primary transition-colors">
                  Consultations
                </Link>
                <Link to="/vet/schedule" className="text-gray-700 hover:text-primary transition-colors">
                  Schedule
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}

            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/admin/users" className="text-gray-700 hover:text-primary transition-colors">
                  Manage Users
                </Link>
                <Link to="/admin/analytics" className="text-gray-700 hover:text-primary transition-colors">
                  Analytics
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  <span className="ml-2">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {user.role === 'farmer' && (
                <>
                  <Link 
                    to="/farmer/dashboard" 
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/farmer/vets" 
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Vets
                  </Link>
                  <Link 
                    to="/farmer/consultations" 
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Consultations
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </>
              )}
              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
