import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Plus,
  Download,
  Store,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  
  const stats = {
    totalMembers: 1247,
    pendingApprovals: 23,
    approvedToday: 12,
    rejectedToday: 3,
    totalRevenue: 249400,
    pendingPayments: 45,
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
    }
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "Member Approved",
      description: `Application ${id} has been approved and certificate will be generated.`,
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
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Manage GNACOPS memberships, marketplace, and platform settings"
    >
      <div className="space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-8 gap-4">
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gradient-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/admin/members" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ghana-gold/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-ghana-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Members</h3>
                  <p className="text-sm text-muted-foreground">Review applications</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/admin/marketplace" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ghana-green/20 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-ghana-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Marketplace</h3>
                  <p className="text-sm text-muted-foreground">Manage vendors & products</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/admin/forms" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Form Builder</h3>
                  <p className="text-sm text-muted-foreground">Create & edit forms</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Link to="/admin/certificates" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Certificates</h3>
                  <p className="text-sm text-muted-foreground">Design templates</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Member Applications</CardTitle>
                <CardDescription>Latest membership submissions requiring review</CardDescription>
              </div>
              <Link to="/admin/members">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
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
                      <Button 
                        size="sm" 
                        className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                        onClick={() => handleApprove(submission.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}
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

export default AdminDashboard;
