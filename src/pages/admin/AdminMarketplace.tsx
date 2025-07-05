
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Package, Eye, CheckCircle, XCircle, Search, Filter, TrendingUp, DollarSign, Users, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const marketplaceStats = {
    totalVendors: 89,
    pendingVendors: 12,
    approvedVendors: 77,
    totalProducts: 2341,
    pendingProducts: 34,
    totalRevenue: 156789,
    monthlyGrowth: 18,
    averageRating: 4.6,
    totalOrders: 5632
  };

  const pendingVendors = [
    {
      id: "VEN-2024-001",
      businessName: "Smart Learning Solutions",
      contactPerson: "Kwame Osei",
      email: "kwame@smartlearning.gh",
      phone: "+233 24 123 4567",
      category: "Educational Technology",
      submittedAt: "2024-01-25 16:30",
      status: "pending",
      documents: ["Business License", "Tax Certificate", "ID Card"],
      proposedProducts: 15
    },
    {
      id: "VEN-2024-002",
      businessName: "Educational Supplies Co",
      contactPerson: "Akosua Mensah",
      email: "akosua@edusupplies.com",
      phone: "+233 20 987 6543",
      category: "School Supplies",
      submittedAt: "2024-01-25 14:15",
      status: "under_review",
      documents: ["Business License", "Tax Certificate"],
      proposedProducts: 8
    },
    {
      id: "VEN-2024-003",
      businessName: "Tech Classroom Ghana",
      contactPerson: "Michael Asare",
      email: "info@techclassroom.gh",
      phone: "+233 26 456 7890",
      category: "Classroom Technology",
      submittedAt: "2024-01-24 10:20",
      status: "pending",
      documents: ["Business License", "Tax Certificate", "ID Card", "References"],
      proposedProducts: 22
    }
  ];

  const pendingProducts = [
    {
      id: "PRD-001",
      name: "Advanced Chemistry Lab Kit",
      vendor: "Science Supply Co",
      vendorId: "VEN-2023-045",
      price: 450.00,
      category: "Laboratory Equipment",
      submittedAt: "2024-01-25 15:20",
      status: "pending",
      images: 5,
      description: "Complete chemistry lab kit for secondary schools"
    },
    {
      id: "PRD-002",
      name: "Interactive Mathematics Software",
      vendor: "EduTech Solutions",
      vendorId: "VEN-2023-032",
      price: 89.99,
      category: "Educational Software",
      submittedAt: "2024-01-25 12:45",
      status: "under_review",
      images: 3,
      description: "Interactive math learning platform"
    },
    {
      id: "PRD-003",
      name: "Student Ergonomic Desk Set",
      vendor: "Furniture Plus Ghana",
      vendorId: "VEN-2023-067",
      price: 120.00,
      category: "School Furniture",
      submittedAt: "2024-01-24 14:30",
      status: "pending",
      images: 8,
      description: "Adjustable student desk and chair set"
    }
  ];

  const topVendors = [
    {
      id: "VEN-2023-001",
      name: "Premium School Supplies",
      totalSales: 45670,
      products: 89,
      rating: 4.8,
      orders: 1234
    },
    {
      id: "VEN-2023-015",
      name: "Digital Learning Hub",
      totalSales: 38900,
      products: 45,
      rating: 4.7,
      orders: 987
    },
    {
      id: "VEN-2023-029",
      name: "Science Equipment Co",
      totalSales: 32100,
      products: 67,
      rating: 4.9,
      orders: 756
    }
  ];

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

  const handleApproveVendor = (id: string, name: string) => {
    toast({
      title: "Vendor Approved",
      description: `${name} has been approved and can now start selling.`,
    });
  };

  const handleRejectVendor = (id: string, name: string) => {
    toast({
      title: "Vendor Rejected",
      description: `${name} application has been rejected.`,
      variant: "destructive",
    });
  };

  const handleApproveProduct = (id: string, name: string) => {
    toast({
      title: "Product Approved",
      description: `${name} is now live on the marketplace.`,
    });
  };

  const handleRejectProduct = (id: string, name: string) => {
    toast({
      title: "Product Rejected",
      description: `${name} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <AdminLayout 
      title="Marketplace Management" 
      description="Comprehensive marketplace oversight and vendor management"
    >
      <div className="space-y-6">
        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="gradient-card border-2 border-ghana-gold/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Store className="w-4 h-4 mr-2" />
                Total Vendors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketplaceStats.totalVendors}</div>
              <p className="text-xs text-muted-foreground">{marketplaceStats.approvedVendors} approved</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-orange-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{marketplaceStats.pendingVendors + marketplaceStats.pendingProducts}</div>
              <p className="text-xs text-muted-foreground">{marketplaceStats.pendingVendors} vendors, {marketplaceStats.pendingProducts} products</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-blue-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{marketplaceStats.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-green/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">GHS {marketplaceStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{marketplaceStats.monthlyGrowth}% this month</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-purple-500/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">{marketplaceStats.averageRating}</div>
              <p className="text-xs text-muted-foreground">From {marketplaceStats.totalOrders.toLocaleString()} orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Management Tabs */}
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="products">Product Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Vendor Management Tab */}
          <TabsContent value="vendors" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Store className="w-5 h-5 mr-2" />
                      Vendor Applications
                    </CardTitle>
                    <CardDescription>Review and manage vendor applications</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search vendors by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {pendingVendors.map((vendor) => (
                    <div key={vendor.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-lg">{vendor.businessName}</h4>
                            {getStatusBadge(vendor.status)}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Contact Person</p>
                              <p className="font-medium">{vendor.contactPerson}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Email</p>
                              <p className="font-medium">{vendor.email}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Phone</p>
                              <p className="font-medium">{vendor.phone}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium">{vendor.category}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Submitted</p>
                              <p className="font-medium">{vendor.submittedAt}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Proposed Products</p>
                              <p className="font-medium">{vendor.proposedProducts} items</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted-foreground text-sm">Documents Submitted</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {vendor.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Package className="w-4 h-4 mr-2" />
                            View Products
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                            onClick={() => handleApproveVendor(vendor.id, vendor.businessName)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectVendor(vendor.id, vendor.businessName)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Moderation Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Product Moderation Queue
                </CardTitle>
                <CardDescription>Review and approve new product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-lg">{product.name}</h4>
                            {getStatusBadge(product.status)}
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Vendor</p>
                              <p className="font-medium">{product.vendor}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium">{product.category}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-medium text-ghana-green text-lg">GHS {product.price}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Submitted</p>
                              <p className="font-medium">{product.submittedAt}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Images</p>
                              <p className="font-medium">{product.images} uploaded</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Product ID</p>
                              <p className="font-medium">{product.id}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted-foreground text-sm">Description</p>
                            <p className="text-sm">{product.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Product
                          </Button>
                          <Button variant="outline" size="sm">
                            <Store className="w-4 h-4 mr-2" />
                            View Vendor
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                            onClick={() => handleApproveProduct(product.id, product.name)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectProduct(product.id, product.name)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Performing Vendors
                  </CardTitle>
                  <CardDescription>Best performing vendors by sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topVendors.map((vendor, index) => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-ghana-gold rounded-full flex items-center justify-center text-black font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{vendor.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {vendor.products} products • {vendor.orders} orders
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-ghana-green">GHS {vendor.totalSales.toLocaleString()}</p>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{vendor.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Marketplace Insights</CardTitle>
                  <CardDescription>Key marketplace metrics and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Average Order Value</span>
                    <span className="font-bold text-ghana-green">GHS 284</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Conversion Rate</span>
                    <span className="font-bold">3.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Return Rate</span>
                    <span className="font-bold">1.8%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Customer Satisfaction</span>
                    <span className="font-bold">96%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Vendor Retention</span>
                    <span className="font-bold">89%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Marketplace Settings</CardTitle>
                <CardDescription>Configure marketplace rules and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Vendor Requirements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Minimum Rating Required</span>
                        <span className="font-medium">4.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Product Approval Required</span>
                        <Badge className="bg-ghana-green text-white">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Auto-approve Trusted Vendors</span>
                        <Badge className="bg-ghana-gold text-black">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Commission Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Standard Commission</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Premium Vendor Commission</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Payment Processing Fee</span>
                        <span className="font-medium">2.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminMarketplace;
