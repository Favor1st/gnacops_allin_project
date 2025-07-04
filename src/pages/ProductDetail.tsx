
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, ShoppingCart, Heart, Share, MapPin, Truck, Shield, Users, ChevronLeft, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  // Mock product data
  const product = {
    id: 1,
    name: "Advanced Chemistry Lab Kit",
    vendor: "Science Supply Co",
    price: 450.00,
    originalPrice: 500.00,
    rating: 4.8,
    reviews: 124,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "Laboratory Equipment",
    inStock: true,
    stockCount: 15,
    tags: ["Popular", "Verified Vendor"],
    location: "Accra, Greater Accra",
    shipping: "Free shipping",
    description: "Complete chemistry laboratory kit designed for secondary schools. Includes all essential equipment and chemicals needed for comprehensive chemistry education according to Ghana Education Service curriculum.",
    features: [
      "50+ laboratory apparatus and equipment",
      "Safe, school-approved chemicals",
      "Detailed instruction manual",
      "Safety equipment included",
      "Curriculum-aligned experiments",
      "Teacher's guide and answer key"
    ],
    specifications: {
      "Kit Contents": "50+ pieces",
      "Grade Level": "SHS 1-3",
      "Curriculum": "GES Approved",
      "Safety Rating": "School Safe",
      "Weight": "15 kg",
      "Dimensions": "60cm x 40cm x 30cm"
    }
  };

  const reviews = [
    {
      id: 1,
      user: "Dr. Sarah Mensah",
      rating: 5,
      date: "2024-01-20",
      comment: "Excellent quality kit. My students love the hands-on experiments. Everything is well-organized and the safety equipment is top-notch."
    },
    {
      id: 2,
      user: "Mr. Kwame Asante",
      rating: 4,
      date: "2024-01-18",
      comment: "Good value for money. The instruction manual is very detailed and easy to follow. Some chemicals ran out quickly but overall satisfied."
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Physics Lab Equipment Set",
      price: 380.00,
      rating: 4.6,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Biology Specimen Collection",
      price: 220.00,
      rating: 4.7,
      image: "/placeholder.svg"
    }
  ];

  const addToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} item(s) added to your cart successfully.`,
    });
  };

  const addToWishlist = () => {
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
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/marketplace" className="hover:text-ghana-green">Marketplace</Link>
              <Link to="/vendors" className="hover:text-ghana-green">Vendors</Link>
              <Link to="/about" className="hover:text-ghana-green">About</Link>
            </nav>

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
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-ghana-green">Home</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-ghana-green">Marketplace</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-ghana-green">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Button variant="outline" size="sm" className="mb-6" asChild>
          <Link to="/marketplace">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-ghana-gold" : "border-gray-200"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <Link to={`/vendor/${product.vendor}`} className="hover:text-ghana-green">
                    {product.vendor}
                  </Link>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {product.location}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-ghana-gold text-ghana-gold"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-ghana-green">
                GHS {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  GHS {product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge className="bg-ghana-red text-white">
                  Save GHS {(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-4">
              {product.inStock ? (
                <Badge className="bg-ghana-green text-white">
                  In Stock ({product.stockCount} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="w-4 h-4 mr-1" />
                {product.shipping}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                  onClick={addToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={addToWishlist}>
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 pt-4 border-t">
              <div className="flex items-center text-sm">
                <Shield className="w-5 h-5 text-ghana-green mr-2" />
                Verified Vendor
              </div>
              <div className="flex items-center text-sm">
                <Truck className="w-5 h-5 text-ghana-green mr-2" />
                Fast Delivery
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-ghana-gold rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    Based on {product.reviews} verified purchases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-ghana-gold text-ghana-gold"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Write Review */}
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-gray-300 cursor-pointer hover:text-ghana-gold" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea placeholder="Share your experience with this product..." />
                  </div>
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    Submit Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-ghana-gold rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{product.vendor}</h3>
                    <p className="text-muted-foreground">Verified Educational Supplier</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <span className="font-medium">Location:</span>
                    <p className="text-muted-foreground">{product.location}</p>
                  </div>
                  <div>
                    <span className="font-medium">Member Since:</span>
                    <p className="text-muted-foreground">January 2020</p>
                  </div>
                  <div>
                    <span className="font-medium">Products:</span>
                    <p className="text-muted-foreground">45 items</p>
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span>
                    <p className="text-muted-foreground">4.7/5 (89 reviews)</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  View All Products
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{relatedProduct.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-ghana-green">
                      GHS {relatedProduct.price}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-ghana-gold text-ghana-gold mr-1" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    View Product
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

export default ProductDetail;
