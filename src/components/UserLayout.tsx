import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/UserSidebar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

interface UserLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function UserLayout({ children, title, description }: UserLayoutProps) {
  const { logout } = useAuth();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-warm-cream to-background">
        <UserSidebar />
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
                      <p className="text-xs text-muted-foreground">Member Portal</p>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={logout}>
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