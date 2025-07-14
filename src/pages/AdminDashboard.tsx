import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Routes, Route } from "react-router-dom";
import AdminOverview from "./admin/AdminOverview";
import AdminMembers from "./admin/AdminMembers";
import AdminApplications from "./admin/AdminApplications";

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
              <Route path="/forms" element={<div>Form Builder Coming Soon</div>} />
              <Route path="/certificates" element={<div>Certificates Coming Soon</div>} />
              <Route path="/reports" element={<div>Reports Coming Soon</div>} />
              <Route path="/workers" element={<div>Workers Coming Soon</div>} />
              <Route path="/settings" element={<div>Settings Coming Soon</div>} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
