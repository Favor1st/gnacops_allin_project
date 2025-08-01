import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Routes, Route } from "react-router-dom";
import AdminOverview from "./admin/AdminOverview";
import AdminMembers from "./admin/AdminMembers";
import AdminApplications from "./admin/AdminApplications";
import AdminFormBuilder from "./admin/AdminFormBuilder";
import AdminCertificates from "./admin/AdminCertificates";
import CertificateTemplateBuilder from "./admin/CertificateTemplateBuilder";
import AdminReports from "./admin/AdminReports";
import AdminWorkers from "./admin/AdminWorkers";
import AdminSettings from "./admin/AdminSettings";

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-warm-cream to-background">
        <AdminSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground">GNACOPS Administration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/members" element={<AdminMembers />} />
              <Route path="/applications" element={<AdminApplications />} />
              <Route path="/forms" element={<AdminFormBuilder />} />
              <Route path="/certificates" element={<AdminCertificates />} />
              <Route path="/certificate-templates" element={<CertificateTemplateBuilder />} />
              <Route path="/reports" element={<AdminReports />} />
              <Route path="/workers" element={<AdminWorkers />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
