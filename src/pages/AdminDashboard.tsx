import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Search,
  Filter,
  Store,
  Package,
  ShoppingCart,
  Star,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const stats = {
    totalMembers: 1247,
    pendingApprovals: 23,
    approvedToday: 12,
    rejectedToday: 3,
    totalRevenue: 249400,
    pendingPayments: 45,
    // Marketplace stats
    totalVendors: 89,
    pendingVendors: 12,
    totalProducts: 2341,
    pendingProducts: 34,
    marketplaceRevenue: 156789
  };

  const recentSubmissions = [
    {
      id: "REG-2024-001",
      name: "Dr. Kwame Asante",
      type: "Teacher Council",
      submittedAt: "2024-01-25 14:30",
      status: "pending",
      region: "Greater Accra"
    },
    {
      id: "REG-2024-002", 
      name: "Mary Adjei",
      type: "Parent Council",
      submittedAt: "2024-01-25 13:15",
      status: "approved",
      region: "Ashanti"
    },
    {
      id: "REG-2024-003",
      name: "Accra Private Academy",
      type: "Institutional",
      submittedAt: "2024-01-25 11:45",
      status: "pending",
      region: "Greater Accra"
    },
    {
      id: "REG-2024-004",
      name: "John Mensah",
      type: "Proprietor",
      submittedAt: "2024-01-25 10:20",
      status: "rejected",
      region: "Central"
    }
  ];

  const pendingVendors = [
    {
      id: "VEN-2024-001",
      businessName: "Smart Learning Solutions",
      contactPerson: "Kwame Osei",
      email: "kwame@smartlearning.gh",
      submittedAt: "2024-01-25 16:30",
      status: "pending"
    },
    {
      id: "VEN-2024-002",
      businessName: "Educational Supplies Co",
      contactPerson: "Akosua Mensah",
      email: "akosua@edusupplies.com",
      submittedAt: "2024-01-25 14:15",
      status: "under_review"
    }
  ];

  const pendingProducts = [
    {
      id: "PRD-001",
      name: "Advanced Chemistry Lab Kit",
      vendor: "Science Supply Co",
      price: 450.00,
      category: "Laboratory Equipment",
      submittedAt: "2024-01-25 15:20",
      status: "pending"
    },
    {
      id: "PRD-002",
      name: "Interactive Mathematics Software",
      vendor: "EduTech Solutions",
      price: 89.99,
      category: "Software",
      submittedAt: "2024-01-25 12:45",
      status: "under_review"
    }
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "Member Approved",
      description: `Application ${id} has been approved and certificate will be generated.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Member Rejected",
      description: `Application ${id} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleApproveVendor = (id: string) => {
    toast({
      title: "Vendor Approved",
      description: `Vendor application ${id} has been approved.`,
    });
  };

  const handleApproveProduct = (id: string) => {
    toast({
      title: "Product Approved",
      description: `Product ${id} has been approved and is now live.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-ghana-green text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "under_review":
        return <Badge className="bg-blue-500 text-white">Under Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredSubmissions = recentSubmissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage GNACOPS memberships, marketplace, and platform settings.</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-8 gap-4 mb-8">
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">{stats.pendingApprovals}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">{stats.approvedToday}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-red/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">{stats.rejectedToday}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVendors}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">{stats.pendingVendors}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Marketplace Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GHS {stats.marketplaceRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="forms">Form Builder</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Member Management Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>Review and manage membership applications</CardDescription>
                  </div>
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submissions Table */}
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold">{submission.name}</h4>
                          {getStatusBadge(submission.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>ID: {submission.id}</span>
                          <span>Type: {submission.type}</span>
                          <span>Region: {submission.region}</span>
                          <span>Submitted: {submission.submittedAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {submission.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                              onClick={() => handleApprove(submission.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleReject(submission.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Management Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Vendor Management */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Vendor Management
                  </CardTitle>
                  <CardDescription>Review and manage vendor applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVendors.map((vendor) => (
                      <div key={vendor.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{vendor.businessName}</h4>
                            <p className="text-sm text-muted-foreground">{vendor.contactPerson}</p>
                            <p className="text-xs text-muted-foreground">{vendor.email}</p>
                          </div>
                          {getStatusBadge(vendor.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                            onClick={() => handleApproveVendor(vendor.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Management */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Product Moderation
                  </CardTitle>
                  <CardDescription>Review and approve new products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingProducts.map((product) => (
                      <div key={product.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.vendor}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-lg font-bold text-ghana-green">GHS {product.price}</span>
                              <Badge variant="outline">{product.category}</Badge>
                            </div>
                          </div>
                          {getStatusBadge(product.status)}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                            onClick={() => handleApproveProduct(product.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Marketplace Analytics */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Marketplace Analytics
                </CardTitle>
                <CardDescription>Track marketplace performance and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-ghana-green">{stats.totalProducts.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-ghana-gold">{stats.pendingProducts}</div>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-ghana-green">GHS {stats.marketplaceRevenue.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Builder Tab */}
          <TabsContent value="forms">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Form Builder</CardTitle>
                <CardDescription>Create and manage membership forms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Institutional Membership",
                    "Teacher Council", 
                    "Parent Council",
                    "Proprietor",
                    "Service Provider",
                    "Non-Teaching Staff"
                  ].map((formType) => (
                    <div key={formType} className="border rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold">{formType}</h3>
                      <p className="text-sm text-muted-foreground">Active form with dynamic fields</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Form
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Certificate Management</CardTitle>
                <CardDescription>Generate and manage membership certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Certificate Template</h4>
                      <p className="text-sm text-muted-foreground">Standard GNACOPS membership certificate</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Template
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    <Download className="w-4 h-4 mr-2" />
                    Bulk Generate Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workers Tab */}
          <TabsContent value="workers">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>Manage admin users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Admin Users</h4>
                      <p className="text-sm text-muted-foreground">5 active admin users with various permissions</p>
                    </div>
                    <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Worker
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">John Admin</h5>
                          <p className="text-sm text-muted-foreground">Super Admin • All Permissions</p>
                        </div>
                        <Badge className="bg-ghana-green text-white">Active</Badge>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Mary Support</h5>
                          <p className="text-sm text-muted-foreground">Support Staff • Membership Only</p>
                        </div>
                        <Badge className="bg-ghana-green text-white">Active</Badge>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">Peter Marketplace</h5>
                          <p className="text-sm text-muted-foreground">Marketplace Manager • Vendor & Product Review</p>
                        </div>
                        <Badge className="bg-ghana-green text-white">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Membership Auto-Approval</h4>
                          <p className="text-sm text-muted-foreground">Automatically approve certain membership types</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Manage email notification settings</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Marketplace Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Vendor Commission Rate</h4>
                          <p className="text-sm text-muted-foreground">Set commission percentage for marketplace sales</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Product Categories</h4>
                          <p className="text-sm text-muted-foreground">Manage marketplace product categories</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
