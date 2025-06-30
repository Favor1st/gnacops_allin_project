
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Search,
  ShoppingCart,
  Star,
  Heart,
  Filter,
  Grid,
  List,
  User,
  Menu,
  Bell,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Mock data
  const categories = [
    { name: "School Supplies", count: 1250, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop" },
    { name: "Books & Materials", count: 890, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" },
    { name: "Technology", count: 567, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop" },
    { name: "Uniforms", count: 432, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop" },
    { name: "Sports Equipment", count: 345, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" },
    { name: "Furniture", count: 234, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Scientific Calculator TI-84",
      price: 125.99,
      originalPrice: 149.99,
      rating: 4.8,
      reviews: 234,
      vendor: "EduTech Ghana",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "School Uniform Set - SHS",
      price: 45.00,
      rating: 4.6,
      reviews: 189,
      vendor: "Uniform Plus",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
      badge: "New"
    },
    {
      id: 3,
      name: "Interactive Whiteboard 75\"",
      price: 899.99,
      originalPrice: 1099.99,
      rating: 4.9,
      reviews: 67,
      vendor: "Smart Class Solutions",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=300&fit=crop",
      badge: "Sale"
    },
    {
      id: 4,
      name: "Complete Chemistry Lab Kit",
      price: 299.99,
      rating: 4.7,
      reviews: 145,
      vendor: "Science Supply Co",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=300&fit=crop"
    }
  ];

  const topVendors = [
    {
      name: "EduTech Ghana",
      rating: 4.9,
      products: 156,
      location: "Accra",
      verified: true
    },
    {
      name: "Smart Class Solutions",
      rating: 4.8,
      products: 89,
      location: "Kumasi",
      verified: true
    },
    {
      name: "Science Supply Co",
      rating: 4.7,
      products: 234,
      location: "Tamale",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                <p className="text-xs text-muted-foreground">Marketplace</p>
              </div>
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for educational products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-ghana-green to-ghana-gold text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">GNACOPS Educational Marketplace</h1>
            <p className="text-xl mb-6">Everything your school needs, from trusted vendors</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-white text-ghana-green hover:bg-gray-100">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Become a Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <img src={category.image} alt={category.name} className="w-full h-24 object-cover rounded mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Vendors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Vendors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topVendors.map((vendor) => (
              <Card key={vendor.name} className="gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    {vendor.verified && (
                      <Badge className="bg-ghana-green text-white">Verified</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-ghana-gold text-ghana-gold mr-1" />
                        <span className="font-semibold">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Products</span>
                      <span className="font-semibold">{vendor.products}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="text-sm">{vendor.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-ghana-gold text-black">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-ghana-gold text-ghana-gold mr-1" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-ghana-green">GHS {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          GHS {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Marketplace;
