
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Grid, List, ShoppingCart, Heart, Star, MapPin, Truck, Shield, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "teaching-materials", name: "Teaching Materials", count: 156 },
    { id: "textbooks", name: "Textbooks", count: 89 },
    { id: "laboratory-equipment", name: "Laboratory Equipment", count: 45 },
    { id: "digital-resources", name: "Digital Resources", count: 78 },
    { id: "classroom-furniture", name: "Classroom Furniture", count: 34 },
    { id: "sports-equipment", name: "Sports Equipment", count: 23 }
  ];

  const products = [
    {
      id: 1,
      name: "Advanced Chemistry Lab Kit",
      vendor: "Science Supply Co",
      price: 450.00,
      originalPrice: 500.00,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg",
      category: "laboratory-equipment",
      inStock: true,
      stockCount: 15,
      tags: ["Popular", "Verified Vendor"],
      location: "Accra, Greater Accra",
      shipping: "Free shipping",
      featured: true
    },
    {
      id: 2,
      name: "Interactive Mathematics Software Suite",
      vendor: "EduTech Solutions",
      price: 89.99,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      category: "digital-resources",
      inStock: true,
      stockCount: 50,
      tags: ["New", "Digital"],
      location: "Kumasi, Ashanti",
      shipping: "Instant download"
    },
    {
      id: 3,
      name: "Premium Student Desk Set",
      vendor: "Furniture Plus Ghana",
      price: 120.00,
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg",
      category: "classroom-furniture",
      inStock: true,
      stockCount: 8,
      tags: ["Limited Stock"],
      location: "Tema, Greater Accra",
      shipping: "GHS 25 delivery"
    },
    {
      id: 4,
      name: "Complete Biology Textbook Collection",
      vendor: "Academic Publishers",
      price: 75.50,
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg",
      category: "textbooks",
      inStock: true,
      stockCount: 25,
      tags: ["Bestseller", "Updated Edition"],
      location: "Cape Coast, Central",
      shipping: "Free shipping"
    }
  ];

  const addToCart = (productId: number) => {
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart successfully.",
    });
  };

  const addToWishlist = (productId: number) => {
    toast({
      title: "Added to Wishlist",
      description: "Product has been saved to your wishlist.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ghana-gold rounded-lg flex items-center justify-center">
                <span className="font-bold text-black">G</span>
              </div>
              <span className="text-2xl font-bold text-ghana-green">GNACOPS</span>
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for products, vendors, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button size="sm" className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (2)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                        />
                        <label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                          {category.name}
                        </label>
                        <span className="text-xs text-muted-foreground">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>GHS {priceRange[0]}</span>
                      <span>GHS {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-ghana-gold text-ghana-gold" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                          ))}
                        </div>
                        <span className="text-sm">& up</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor Features */}
                <div>
                  <h4 className="font-semibold mb-3">Vendor Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm">Verified Vendors</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-shipping" />
                      <label htmlFor="free-shipping" className="text-sm">Free Shipping</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fast-delivery" />
                      <label htmlFor="fast-delivery" className="text-sm">Fast Delivery</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Marketplace</h1>
                <span className="text-muted-foreground">({products.length} products found)</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

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

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <div className={`${viewMode === "list" ? "flex" : ""}`}>
                    <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover ${viewMode === "list" ? "h-full" : "h-48"} rounded-t-lg ${viewMode === "list" ? "rounded-r-none rounded-l-lg" : ""}`}
                      />
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 bg-ghana-red text-white">
                          Featured
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => addToWishlist(product.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg group-hover:text-ghana-green transition-colors cursor-pointer">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          {product.vendor}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-ghana-gold text-ghana-gold"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-ghana-green">
                                GHS {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  GHS {product.originalPrice}
                                </span>
                              )}
                            </div>
                            {product.inStock ? (
                              <Badge className="bg-ghana-green text-white">
                                In Stock ({product.stockCount})
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Out of Stock</Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {product.location}
                            </div>
                            <div className="flex items-center">
                              <Truck className="w-4 h-4 mr-1" />
                              {product.shipping}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <Button
                              className="flex-1 bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                              onClick={() => addToCart(product.id)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                            <Button variant="outline">
                              Quick View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default" className="bg-ghana-gold text-black">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <section className="bg-ghana-green/5 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-ghana-green mb-4" />
              <h3 className="font-semibold mb-2">Verified Vendors</h3>
              <p className="text-muted-foreground">All vendors are verified by GNACOPS for quality assurance</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-12 h-12 text-ghana-green mb-4" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable delivery across Ghana</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-ghana-green mb-4" />
              <h3 className="font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">Built by educators, for educators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
