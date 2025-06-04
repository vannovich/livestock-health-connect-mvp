
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { HealthTips } from "./components/farmer/HealthTips";
import { FindVeterinarians } from "./components/farmer/FindVeterinarians";
import { ConsultationPayment } from "./components/farmer/ConsultationPayment";
import { SubscriptionPlans } from "./components/farmer/SubscriptionPlans";
import { VetSchedule } from "./components/vet/VetSchedule";
import { PatientHistory } from "./components/vet/PatientHistory";
import { SendReminder } from "./components/vet/SendReminder";
import { WritePrescription } from "./components/vet/WritePrescription";
import { ConsultationDetails } from "./components/vet/ConsultationDetails";
import { ManageUsers } from "./components/admin/ManageUsers";
import { Analytics } from "./components/admin/Analytics";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/farmer/tips" element={<HealthTips />} />
            <Route path="/farmer/vets" element={<FindVeterinarians />} />
            <Route path="/farmer/consultation/:id/payment" element={<ConsultationPayment />} />
            <Route path="/subscription" element={<SubscriptionPlans />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
            <Route path="/vet/schedule" element={<VetSchedule />} />
            <Route path="/vet/patients" element={<PatientHistory />} />
            <Route path="/vet/reminders" element={<SendReminder />} />
            <Route path="/vet/prescriptions" element={<WritePrescription />} />
            <Route path="/vet/consultation/:id" element={<ConsultationDetails />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
