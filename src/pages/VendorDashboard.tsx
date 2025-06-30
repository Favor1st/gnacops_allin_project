
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  GraduationCap,
  Package,
  ShoppingCart,
  BarChart,
  Settings,
  Plus,
  Edit,
  Eye,
  Trash2,
  Upload,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const VendorDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });

  // Mock data
  const vendorStats = {
    totalProducts: 24,
    totalOrders: 156,
    totalRevenue: 12450.50,
    averageRating: 4.8,
    pendingOrders: 8,
    lowStockItems: 3
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Accra Academy",
      product: "Scientific Calculator",
      quantity: 50,
      amount: 6299.50,
      status: "pending",
      date: "2024-01-25"
    },
    {
      id: "ORD-002", 
      customer: "Mary Johnson",
      product: "School Uniform Set",
      quantity: 2,
      amount: 90.00,
      status: "shipped",
      date: "2024-01-24"
    },
    {
      id: "ORD-003",
      customer: "Tema International School",
      product: "Interactive Whiteboard",
      quantity: 1,
      amount: 899.99,
      status: "completed",
      date: "2024-01-23"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Scientific Calculator TI-84",
      category: "Technology",
      price: 125.99,
      stock: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "School Uniform Set - SHS",
      category: "Uniforms",
      price: 45.00,
      stock: 2,
      status: "active",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Interactive Whiteboard 75\"",
      category: "Technology", 
      price: 899.99,
      stock: 0,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=150&h=150&fit=crop"
    }
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Added",
      description: "Your product has been added successfully and is pending review.",
    });
    setNewProduct({ name: "", description: "", price: "", category: "", stock: "" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500 text-white">Shipped</Badge>;
      case "completed":
        return <Badge className="bg-ghana-green text-white">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/marketplace" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                <p className="text-xs text-muted-foreground">Vendor Dashboard</p>
              </div>
            </Link>
            
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
          <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and orders on GNACOPS Marketplace.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorStats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorStats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GHS {vendorStats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vendorStats.averageRating}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">{vendorStats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-red/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">{vendorStats.lowStockItems}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="storefront">Storefront</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Add New Product */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Product
                  </CardTitle>
                  <CardDescription>Add a new product to your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school-supplies">School Supplies</SelectItem>
                          <SelectItem value="books">Books & Materials</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="uniforms">Uniforms</SelectItem>
                          <SelectItem value="sports">Sports Equipment</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (GHS)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Product List */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="font-bold text-ghana-green">GHS {product.price}</span>
                            <span className={`text-sm ${product.stock < 5 ? 'text-ghana-red' : 'text-muted-foreground'}`}>
                              Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold">{order.id}</h4>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.customer} • {order.product} × {order.quantity}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-ghana-green">GHS {order.amount.toLocaleString()}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Sales Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-ghana-green">GHS 12,450</p>
                    <p className="text-muted-foreground">Total Revenue This Month</p>
                    <p className="text-sm text-ghana-green mt-2">↑ 15% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Customers</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers</span>
                      <span className="font-semibold">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order</span>
                      <span className="font-semibold">GHS 79.81</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Storefront Tab */}
          <TabsContent value="storefront">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Storefront Settings</CardTitle>
                <CardDescription>Customize your vendor profile and store appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Store Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Store Name</Label>
                        <Input defaultValue="EduTech Ghana" />
                      </div>
                      <div className="space-y-2">
                        <Label>Contact Email</Label>
                        <Input defaultValue="contact@edutech.gh" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Store Description</Label>
                      <Textarea rows={3} defaultValue="Leading supplier of educational technology and supplies in Ghana." />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Business Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Business Registration</Label>
                        <Input defaultValue="BN-12345-2020" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input defaultValue="Accra, Greater Accra Region" />
                      </div>
                    </div>
                  </div>

                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    Update Store Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
