
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import { HealthTips } from "./components/farmer/HealthTips";
import { FindVeterinarians } from "./components/farmer/FindVeterinarians";
import { VetSchedule } from "./components/vet/VetSchedule";
import { PatientHistory } from "./components/vet/PatientHistory";
import { SendReminder } from "./components/vet/SendReminder";
import { WritePrescription } from "./components/vet/WritePrescription";
import { ConsultationDetails } from "./components/vet/ConsultationDetails";
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
            <Route path="/vet/schedule" element={<VetSchedule />} />
            <Route path="/vet/patients" element={<PatientHistory />} />
            <Route path="/vet/reminders" element={<SendReminder />} />
            <Route path="/vet/prescriptions" element={<WritePrescription />} />
            <Route path="/vet/consultation/:id" element={<ConsultationDetails />} />
            {/* TODO: Add more routes for consultation management, admin panels */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
