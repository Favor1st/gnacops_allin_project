
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import { useState } from "react";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const products = [
    {
      id: "PRD-001",
      name: "Advanced Chemistry Lab Kit",
      vendor: "Science Supply Co",
      price: 450.00,
      category: "Laboratory Equipment",
      status: "pending",
      submittedAt: "2024-01-25 15:20"
    },
    {
      id: "PRD-002",
      name: "Interactive Mathematics Software",
      vendor: "EduTech Solutions",
      price: 89.99,
      category: "Software",
      status: "approved",
      submittedAt: "2024-01-25 12:45"
    },
    {
      id: "PRD-003",
      name: "Student Desk Set",
      vendor: "Furniture Plus",
      price: 120.00,
      category: "Furniture",
      status: "under_review",
      submittedAt: "2024-01-25 10:30"
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

  return (
    <AdminLayout 
      title="Product Management" 
      description="Manage marketplace products and approvals"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,341</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">34</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">18</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GHS 2,450</div>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Product Reviews</CardTitle>
            <CardDescription>Review and approve marketplace products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{product.name}</h4>
                      {getStatusBadge(product.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Vendor: {product.vendor}</span>
                      <span>Category: {product.category}</span>
                      <span className="text-ghana-green font-semibold">GHS {product.price}</span>
                      <span>Submitted: {product.submittedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {product.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-ghana-green hover:bg-ghana-green/90 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
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
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
