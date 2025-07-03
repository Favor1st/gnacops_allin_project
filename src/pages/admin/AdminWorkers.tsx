
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, UserCog, Shield } from "lucide-react";
import { useState } from "react";

const AdminWorkers = () => {
  const [workers] = useState([
    {
      id: "1",
      name: "John Admin",
      email: "john@gnacops.org",
      role: "Super Admin",
      permissions: ["All Permissions"],
      status: "active",
      lastLogin: "2024-01-25 14:30"
    },
    {
      id: "2",
      name: "Mary Support",
      email: "mary@gnacops.org",
      role: "Support Staff",
      permissions: ["Membership Management", "Member Support"],
      status: "active",
      lastLogin: "2024-01-25 12:15"
    },
    {
      id: "3",
      name: "Peter Marketplace",
      email: "peter@gnacops.org",
      role: "Marketplace Manager",
      permissions: ["Vendor Management", "Product Review", "Order Management"],
      status: "active",
      lastLogin: "2024-01-25 16:45"
    },
    {
      id: "4",
      name: "Sarah Analytics",
      email: "sarah@gnacops.org",
      role: "Data Analyst",
      permissions: ["Analytics View", "Report Generation"],
      status: "inactive",
      lastLogin: "2024-01-20 09:30"
    }
  ]);

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-ghana-green text-white">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin":
        return <Badge className="bg-ghana-red text-white">Super Admin</Badge>;
      case "Support Staff":
        return <Badge className="bg-blue-500 text-white">Support</Badge>;
      case "Marketplace Manager":
        return <Badge className="bg-ghana-gold text-black">Marketplace</Badge>;
      case "Data Analyst":
        return <Badge className="bg-purple-500 text-white">Analytics</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Worker Management" 
      description="Manage admin users and their permissions"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">3</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>Manage system administrators and their permissions</CardDescription>
              </div>
              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Add Worker
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workers.map((worker) => (
                <div key={worker.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ghana-gold rounded-full flex items-center justify-center">
                        <UserCog className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{worker.name}</h4>
                        <p className="text-sm text-muted-foreground">{worker.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(worker.role)}
                      {getStatusBadge(worker.status)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {worker.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last login: {worker.lastLogin}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Permissions
                      </Button>
                      {worker.role !== "Super Admin" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Define roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  role: "Super Admin",
                  description: "Full system access",
                  permissions: ["All Permissions"],
                  color: "bg-ghana-red"
                },
                {
                  role: "Support Staff",
                  description: "Member support and basic management",
                  permissions: ["Membership Management", "Member Support", "View Reports"],
                  color: "bg-blue-500"
                },
                {
                  role: "Marketplace Manager",
                  description: "Manage vendors and products",
                  permissions: ["Vendor Management", "Product Review", "Order Management"],
                  color: "bg-ghana-gold"
                },
                {
                  role: "Data Analyst",
                  description: "Analytics and reporting",
                  permissions: ["Analytics View", "Report Generation", "Data Export"],
                  color: "bg-purple-500"
                }
              ].map((roleInfo, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className={`w-8 h-8 ${roleInfo.color} rounded-lg mb-3`}></div>
                  <h4 className="font-semibold mb-1">{roleInfo.role}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{roleInfo.description}</p>
                  <div className="space-y-1">
                    {roleInfo.permissions.map((permission, permIndex) => (
                      <div key={permIndex} className="text-xs text-muted-foreground">
                        • {permission}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminWorkers;
