import React, { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const mockWishlist = [
  {
    id: 1,
    name: "Advanced Chemistry Lab Kit",
    price: 450.00,
    image: "/placeholder.svg",
    inStock: true,
  },
  {
    id: 2,
    name: "Interactive Mathematics Software",
    price: 89.99,
    image: "/placeholder.svg",
    inStock: true,
  }
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(mockWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist(items => items.filter(item => item.id !== id));
  };
  const addToCart = (id: number) => {
    // Demo: just remove from wishlist
    setWishlist(items => items.filter(item => item.id !== id));
  };

  return (
    <UserLayout title="Wishlist">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Your Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            {wishlist.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Your wishlist is empty.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.map(item => (
                  <div key={item.id} className="flex items-center p-4 border rounded-lg space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 flex items-center">
                        {item.name}
                        <Heart className="w-4 h-4 ml-2 text-rose-500" />
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-ghana-green text-white">In Stock</Badge>
                        <span className="text-xl font-bold text-ghana-green">GHS {item.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-ghana-gold text-black" onClick={() => addToCart(item.id)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Wishlist; 