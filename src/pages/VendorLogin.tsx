
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Store, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      toast({
        title: "Login Successful",
        description: "Welcome back to your vendor dashboard!",
      });
    } else {
      toast({
        title: "Registration Submitted",
        description: "Your vendor application is under review. We'll contact you within 48 hours.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-ghana-gold rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-black" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-foreground">GNACOPS</h1>
              <p className="text-sm text-muted-foreground">Vendor Portal</p>
            </div>
          </Link>
        </div>

        <Card className="gradient-card border-2 border-ghana-gold/20">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-ghana-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-ghana-gold" />
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Vendor Login" : "Become a Vendor"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Access your vendor dashboard" 
                : "Join GNACOPS Marketplace as a verified vendor"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Your Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      type="text"
                      placeholder="Full Name"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="vendor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                {isLogin ? "Sign In" : "Submit Application"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-ghana-green"
              >
                {isLogin 
                  ? "New vendor? Apply to join our marketplace" 
                  : "Already a vendor? Sign in here"
                }
              </Button>
            </div>

            <div className="text-center">
              <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Marketplace
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorLogin;
