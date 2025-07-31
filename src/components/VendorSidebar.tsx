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
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Store,
  LayoutDashboard,
  Package,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/vendor-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/vendor/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/vendor/orders",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "/vendor/analytics",
    icon: BarChart3,
  },
  {
    title: "Earnings",
    url: "/vendor/earnings",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/vendor/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/vendor/profile",
    icon: User,
  },
];

export function VendorSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Vendor logout clicked");
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ghana-gold rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-black" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold">GNACOPS</h2>
              <p className="text-xs text-muted-foreground">Vendor Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center">
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
} 