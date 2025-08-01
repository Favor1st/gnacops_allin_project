import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  Settings,
  UserCog,
  ClipboardList,
  BarChart3,
  LogOut,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const adminMenuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Members", url: "/admin/members", icon: Users },
  { title: "Applications", url: "/admin/applications", icon: ClipboardList },
  { title: "Form Builder", url: "/admin/forms", icon: FileText },
  { title: "Certificates", url: "/admin/certificates", icon: Award },
  { title: "Template Builder", url: "/admin/certificate-templates", icon: Award },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Workers", url: "/admin/workers", icon: UserCog },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) =>
    isActive(path) 
      ? "bg-ghana-gold text-black font-medium hover:bg-ghana-gold/90" 
      : "hover:bg-muted/50";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ghana-gold rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-sm font-bold">GNACOPS</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            )}
          </Link>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/'}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}