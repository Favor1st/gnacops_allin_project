
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Package, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminMarketplace = () => {
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

  return (
    <AdminLayout 
      title="Marketplace Management" 
      description="Manage vendors, products, and marketplace operations"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">12</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,341</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Marketplace Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GHS 156,789</div>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </AdminLayout>
  );
};

export default AdminMarketplace;
