
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/UserSidebar";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./user/UserProfile";
import UserDocuments from "./user/UserDocuments";
import UserPayments from "./user/UserPayments";
import DashboardHome from "./user/DashboardHome";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-warm-cream to-background">
        <UserSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">GNACOPS Member Portal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/documents" element={<UserDocuments />} />
              <Route path="/payments" element={<UserPayments />} />
              <Route path="/certificate" element={<div>Certificate Coming Soon</div>} />
              <Route path="/notifications" element={<div>Notifications Coming Soon</div>} />
              <Route path="/settings" element={<div>Settings Coming Soon</div>} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
