
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

// New Admin Pages
import AdminMembers from "./pages/admin/AdminMembers";
import AdminMarketplace from "./pages/admin/AdminMarketplace";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminForms from "./pages/admin/AdminForms";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminWorkers from "./pages/admin/AdminWorkers";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSupport from "./pages/admin/AdminSupport";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/marketplace" element={<AdminMarketplace />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/forms" element={<AdminForms />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/workers" element={<AdminWorkers />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/security" element={<AdminSecurity />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
