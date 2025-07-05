
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Ban, Trash2, Edit, UserCheck, UserX, Mail, Shield, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = [
    {
      id: "USR-001",
      name: "Dr. Kwame Asante",
      email: "kwame@smartlearning.gh",
      role: "customer",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-25 14:30",
      orders: 12,
      totalSpent: 2450.00,
      verified: true
    },
    {
      id: "USR-002",
      name: "Mary Adjei",
      email: "mary.adjei@gmail.com",
      role: "customer",
      status: "active",
      joinDate: "2024-01-20",
      lastLogin: "2024-01-25 12:15",
      orders: 5,
      totalSpent: 890.50,
      verified: true
    },
    {
      id: "USR-003",
      name: "Smart Learning Solutions",
      email: "admin@smartlearning.com",
      role: "vendor",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-25 16:45",
      orders: 0,
      totalSpent: 0,
      verified: true,
      storeApproved: true
    },
    {
      id: "USR-004",
      name: "John Mensah",
      email: "john.mensah@email.com",
      role: "customer",
      status: "suspended",
      joinDate: "2024-01-18",
      lastLogin: "2024-01-22 09:30",
      orders: 2,
      totalSpent: 150.00,
      verified: false
    },
    {
      id: "USR-005",
      name: "Sarah Admin",
      email: "sarah@gnacops.org",
      role: "admin",
      status: "active",
      joinDate: "2023-12-01",
      lastLogin: "2024-01-25 17:00",
      orders: 0,
      totalSpent: 0,
      verified: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ghana-green text-white"><UserCheck className="w-3 h-3 mr-1" />Active</Badge>;
      case "suspended":
        return <Badge variant="destructive"><UserX className="w-3 h-3 mr-1" />Suspended</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-ghana-red text-white"><Shield className="w-3 h-3 mr-1" />Admin</Badge>;
      case "vendor":
        return <Badge className="bg-ghana-gold text-black">Vendor</Badge>;
      case "customer":
        return <Badge className="bg-blue-500 text-white">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const handleSuspendUser = (userId: string, userName: string) => {
    toast({
      title: "User Suspended",
      description: `${userName} has been suspended from the platform.`,
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: string, userName: string) => {
    toast({
      title: "User Activated",
      description: `${userName} has been reactivated.`,
    });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    toast({
      title: "User Deleted",
      description: `${userName} has been permanently deleted.`,
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AdminLayout 
      title="User Management" 
      description="Manage all platform users including customers, vendors, and staff"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4">
          <Card className="gradient-card border-2 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,421</div>
              <p className="text-xs text-muted-foreground">+15% growth</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">2,987</div>
              <p className="text-xs text-muted-foreground">87% of total</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">89</div>
              <p className="text-xs text-muted-foreground">12 pending approval</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-red/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">23</div>
              <p className="text-xs text-muted-foreground">Policy violations</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">456</div>
              <p className="text-xs text-muted-foreground">+28% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Users Table */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>Manage all platform users and their access</CardDescription>
              </div>
              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Export Users
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or user ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-ghana-gold rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-lg">{user.name}</h4>
                          {user.verified && <UserCheck className="w-4 h-4 text-ghana-green" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex space-x-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Join Date</p>
                      <p className="font-medium">{user.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Login</p>
                      <p className="font-medium">{user.lastLogin}</p>
                    </div>
                    {user.role === "customer" && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="font-medium">{user.orders}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                          <p className="font-medium text-ghana-green">GHS {user.totalSpent.toLocaleString()}</p>
                        </div>
                      </>
                    )}
                    {user.role === "vendor" && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Store Status</p>
                          <p className="font-medium">{user.storeApproved ? "Approved" : "Pending"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Products</p>
                          <p className="font-medium">12 active</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {user.status === "active" && user.role !== "admin" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendUser(user.id, user.name)}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend
                        </Button>
                      )}
                      {user.status === "suspended" && (
                        <Button 
                          size="sm" 
                          className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                          onClick={() => handleActivateUser(user.id, user.name)}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Activate
                        </Button>
                      )}
                      {user.role !== "admin" && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
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

export default AdminUsers;
