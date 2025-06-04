
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/LoginForm';
import { FarmerDashboard } from '../components/farmer/FarmerDashboard';
import { VetDashboard } from '../components/vet/VetDashboard';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { Navigation } from '../components/Navigation';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user?.role === 'farmer' && <FarmerDashboard />}
        {user?.role === 'veterinarian' && <VetDashboard />}
        {user?.role === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
};

export default Index;
