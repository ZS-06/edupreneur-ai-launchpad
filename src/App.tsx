import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CareerGuide from "./pages/CareerGuide";
import CareerOLevels from "./pages/CareerOLevels";
import CareerALevels from "./pages/CareerALevels";
import CareerUndergrad from "./pages/CareerUndergrad";
import StartupPredictor from "./pages/StartupPredictor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-guide" element={<CareerGuide />} />
          <Route path="/career-guide/olevels" element={<CareerOLevels />} />
          <Route path="/career-guide/alevels" element={<CareerALevels />} />
          <Route path="/career-guide/undergrad" element={<CareerUndergrad />} />
          <Route path="/startup-predictor" element={<StartupPredictor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
