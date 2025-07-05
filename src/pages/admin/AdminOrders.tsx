
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, RefreshCw, Package, Truck, CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const orders = [
    {
      id: "ORD-2024-001",
      customer: "Accra Private School",
      email: "admin@accraprivate.edu.gh",
      items: 5,
      total: 2450.00,
      status: "delivered",
      paymentStatus: "paid",
      date: "2024-01-25",
      shippingAddress: "123 Liberation Road, Accra"
    },
    {
      id: "ORD-2024-002", 
      customer: "Mary Adjei",
      email: "mary.adjei@gmail.com",
      items: 2,
      total: 189.99,
      status: "processing",
      paymentStatus: "paid",
      date: "2024-01-25",
      shippingAddress: "45 Ring Road, Kumasi"
    },
    {
      id: "ORD-2024-003",
      customer: "Dr. Kwame Asante",
      email: "kwame@smartlearning.gh",
      items: 8,
      total: 750.50,
      status: "shipped",
      paymentStatus: "paid",
      date: "2024-01-24",
      shippingAddress: "78 Castle Road, Cape Coast"
    },
    {
      id: "ORD-2024-004",
      customer: "St. Augustine College",
      email: "orders@staugustine.edu.gh",
      items: 12,
      total: 3200.00,
      status: "pending",
      paymentStatus: "pending",
      date: "2024-01-24",
      shippingAddress: "University Avenue, Cape Coast"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-ghana-green text-white"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500 text-white"><Truck className="w-3 h-3 mr-1" />Shipped</Badge>;
      case "processing":
        return <Badge className="bg-ghana-gold text-black"><Package className="w-3 h-3 mr-1" />Processing</Badge>;
      case "pending":
        return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-ghana-green text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge className="bg-blue-500 text-white">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };

  const handleRefund = (orderId: string) => {
    toast({
      title: "Refund Processed",
      description: `Refund initiated for order ${orderId}.`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout 
      title="Order Management" 
      description="View and manage all customer orders"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4">
          <Card className="gradient-card border-2 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,632</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-orange-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">78</div>
              <p className="text-xs text-muted-foreground">Requires processing</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">156</div>
              <p className="text-xs text-muted-foreground">Being prepared</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">234</div>
              <p className="text-xs text-muted-foreground">In transit</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">GHS 456K</div>
              <p className="text-xs text-muted-foreground">+18% growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Orders Table */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by order ID or customer name..."
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
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-semibold text-lg">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(order.status)}
                        {getPaymentBadge(order.paymentStatus)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-ghana-green">GHS {order.total.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer Email</p>
                      <p className="font-medium">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Shipping Address</p>
                      <p className="font-medium">{order.shippingAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {order.status === "pending" && (
                        <Button 
                          size="sm" 
                          className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                          onClick={() => handleStatusUpdate(order.id, "processing")}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Process
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button 
                          size="sm" 
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleStatusUpdate(order.id, "shipped")}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Ship
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRefund(order.id)}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Refund
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

export default AdminOrders;
