
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { HealthTips } from "./components/farmer/HealthTips";
import { FindVeterinarians } from "./components/farmer/FindVeterinarians";
import { ConsultationPayment } from "./components/farmer/ConsultationPayment";
import { SubscriptionPlans } from "./components/farmer/SubscriptionPlans";
import { FarmerDashboard } from "./components/farmer/FarmerDashboard";
import { RequestConsultation } from "./components/farmer/RequestConsultation";
import { MyConsultations } from "./components/farmer/MyConsultations";
import { ConsultationChat } from "./components/farmer/ConsultationChat";
import { VetSchedule } from "./components/vet/VetSchedule";
import { VetDashboard } from "./components/vet/VetDashboard";
import { PatientHistory } from "./components/vet/PatientHistory";
import { SendReminder } from "./components/vet/SendReminder";
import { WritePrescription } from "./components/vet/WritePrescription";
import { ConsultationDetails } from "./components/vet/ConsultationDetails";
import { ManageUsers } from "./components/admin/ManageUsers";
import { Analytics } from "./components/admin/Analytics";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Contact } from "./components/Contact";
import NotFound from "./pages/NotFound";
import { LoginForm } from "./components/LoginForm";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Show navigation on all pages except login
  const showNavigation = isAuthenticated;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Navigation />}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showNavigation ? 'py-8' : ''}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/tips" element={<HealthTips />} />
          <Route path="/farmer/vets" element={<FindVeterinarians />} />
          <Route path="/farmer/consultations" element={<MyConsultations />} />
          <Route path="/farmer/consultations/new" element={<RequestConsultation />} />
          <Route path="/farmer/consultation/:id" element={<ConsultationChat />} />
          <Route path="/farmer/consultation/:id/payment" element={<ConsultationPayment />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          
          {/* Vet Routes */}
          <Route path="/vet/dashboard" element={<VetDashboard />} />
          <Route path="/vet/schedule" element={<VetSchedule />} />
          <Route path="/vet/consultations" element={<NotFound />} />
          <Route path="/vet/patients" element={<PatientHistory />} />
          <Route path="/vet/reminders" element={<SendReminder />} />
          <Route path="/vet/prescriptions" element={<WritePrescription />} />
          <Route path="/vet/consultation/:id" element={<ConsultationDetails />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          
          {/* Payment Routes */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          
          {/* General Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<NotFound />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
