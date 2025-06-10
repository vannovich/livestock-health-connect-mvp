
import { useAuth } from '../contexts/AuthContext';
import { FarmerDashboard } from '../components/farmer/FarmerDashboard';
import { VetDashboard } from '../components/vet/VetDashboard';
import { AdminDashboard } from '../components/admin/AdminDashboard';

const Index = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === 'farmer' && <FarmerDashboard />}
      {user?.role === 'veterinarian' && <VetDashboard />}
      {user?.role === 'admin' && <AdminDashboard />}
    </>
  );
};

export default Index;
