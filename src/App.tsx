import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Impact from "./pages/Impact";
import Auth from "./pages/Auth";
import Partners from "./pages/Partners";
import CorporateDashboard from "./pages/CorporateDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/projects/:id" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<Events />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard/corporate"
              element={
                <ProtectedRoute>
                  <CorporateDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects:id" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/impact" 
              element={
                <ProtectedRoute>
                  <Impact />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/events" 
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/event:id" 
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } 
            />

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
