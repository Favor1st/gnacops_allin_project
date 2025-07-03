
import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-warm-cream to-background">
        <AdminSidebar />
        
        <SidebarInset>
          {/* Header */}
          <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="mr-2" />
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                      <p className="text-xs text-muted-foreground">Admin Portal</p>
                    </div>
                  </Link>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>

            {/* Page Content */}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
