
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Advanced Chemistry Lab Kit",
      vendor: "Science Supply Co",
      price: 450.00,
      quantity: 1,
      image: "/placeholder.svg",
      inStock: true,
      shipping: "Free shipping"
    },
    {
      id: 2,
      name: "Interactive Mathematics Software",
      vendor: "EduTech Solutions", 
      price: 89.99,
      quantity: 2,
      image: "/placeholder.svg",
      inStock: true,
      shipping: "Digital download"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const { toast } = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode === "TEACHER10") {
      setAppliedPromo({ code: "TEACHER10", discount: 0.1, amount: subtotal * 0.1 });
      toast({
        title: "Promo Code Applied",
        description: "You saved 10% with code TEACHER10!",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? appliedPromo.amount : 0;
  const shipping = 0; // Free shipping
  const tax = (subtotal - discount) * 0.125; // 12.5% VAT
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ghana-gold rounded-lg flex items-center justify-center">
                <span className="font-bold text-black">G</span>
              </div>
              <span className="text-2xl font-bold text-ghana-green">GNACOPS</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
              <Link to="/marketplace">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" asChild>
            <Link to="/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Badge variant="secondary">({cartItems.length} items)</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">by {item.vendor}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge className="bg-ghana-green text-white">In Stock</Badge>
                        <span className="text-sm text-muted-foreground">{item.shipping}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Qty:</span>
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center border-0"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-ghana-green">
                            GHS {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ghana-green">✓ {appliedPromo.code} applied</span>
                    <span className="text-ghana-green">-GHS {appliedPromo.amount.toFixed(2)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>GHS {subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-ghana-green">
                    <span>Discount</span>
                    <span>-GHS {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-ghana-green">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>VAT (12.5%)</span>
                  <span>GHS {tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-ghana-green">GHS {total.toFixed(2)}</span>
                </div>

                <Button 
                  asChild 
                  className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                  size="lg"
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/marketplace">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-ghana-green/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-ghana-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Your information is protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
