
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
  TrendingUp,
  DollarSign,
  Activity,
  AlertTriangle,
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
    marketplaceRevenue: 156789,
    totalOrders: 5632,
    pendingOrders: 78,
    totalUsers: 3421,
    activeUsers: 892
  };

  const recentActivities = [
    {
      id: "ACT-001",
      type: "member_approval",
      description: "New member application approved",
      user: "Dr. Kwame Asante",
      timestamp: "5 min ago",
      status: "success"
    },
    {
      id: "ACT-002",
      type: "order_placed",
      description: "Large order placed by Accra Private School",
      amount: "GHS 2,450",
      timestamp: "12 min ago",
      status: "info"
    },
    {
      id: "ACT-003",
      type: "vendor_pending",
      description: "New vendor application requires review",
      user: "Smart Learning Solutions",
      timestamp: "25 min ago",
      status: "warning"
    },
    {
      id: "ACT-004",
      type: "payment_processed",
      description: "Vendor payment processed successfully",
      amount: "GHS 5,230",
      timestamp: "1 hour ago",
      status: "success"
    }
  ];

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} initiated successfully.`,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "member_approval": return <CheckCircle className="w-4 h-4 text-ghana-green" />;
      case "order_placed": return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case "vendor_pending": return <Store className="w-4 h-4 text-ghana-gold" />;
      case "payment_processed": return <DollarSign className="w-4 h-4 text-ghana-green" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success": return <Badge className="bg-ghana-green text-white">Success</Badge>;
      case "warning": return <Badge className="bg-ghana-gold text-black">Warning</Badge>;
      case "info": return <Badge className="bg-blue-500 text-white">Info</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Comprehensive platform overview and management center"
    >
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="gradient-card border-2 border-ghana-gold/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-green/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">GHS {stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-blue-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingOrders} pending</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-purple-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Store className="w-4 h-4 mr-2" />
                Total Vendors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">{stats.totalVendors}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingVendors} pending review</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-orange-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingProducts} awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="gradient-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <Link to="/admin/members" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ghana-gold/20 rounded-lg flex items-center justify-center group-hover:bg-ghana-gold/30 transition-colors">
                  <Users className="w-6 h-6 text-ghana-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Members</h3>
                  <p className="text-sm text-muted-foreground">Review applications & certificates</p>
                  <Badge className="mt-2 bg-ghana-gold text-black">{stats.pendingApprovals} pending</Badge>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <Link to="/admin/orders" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <ShoppingCart className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Order Management</h3>
                  <p className="text-sm text-muted-foreground">Process & track orders</p>
                  <Badge className="mt-2 bg-blue-500 text-white">{stats.pendingOrders} pending</Badge>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <Link to="/admin/marketplace" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ghana-green/20 rounded-lg flex items-center justify-center group-hover:bg-ghana-green/30 transition-colors">
                  <Store className="w-6 h-6 text-ghana-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Marketplace</h3>
                  <p className="text-sm text-muted-foreground">Vendors & products oversight</p>
                  <Badge className="mt-2 bg-ghana-green text-white">GHS {stats.marketplaceRevenue.toLocaleString()}</Badge>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="gradient-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <Link to="/admin/users" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">User Management</h3>
                  <p className="text-sm text-muted-foreground">Customer accounts & activity</p>
                  <Badge className="mt-2 bg-purple-500 text-white">{stats.activeUsers} active</Badge>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="gradient-card lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Platform Activity
                  </CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{activity.description}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {activity.user && <span>User: {activity.user}</span>}
                        {activity.amount && <span>Amount: {activity.amount}</span>}
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Status</span>
                  <Badge className="bg-ghana-green text-white">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Load</span>
                  <span className="font-medium text-ghana-green">23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-medium">67%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                  onClick={() => handleQuickAction("Export Member Data")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Member Data
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Generate Reports")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Send Notifications")}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
