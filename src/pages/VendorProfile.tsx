import React, { useState } from "react";
import { VendorLayout } from "@/components/VendorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Upload, 
  Save, 
  Camera,
  Edit,
  Store,
  Award
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Smart Learning Solutions",
    email: "admin@smartlearning.com",
    phone: "+233 20 123 4567",
    address: "123 Accra Rd, Accra, Ghana",
    storeName: "Smart Learning Store",
    description: "Leading provider of educational materials and learning solutions",
    website: "https://smartlearning.com",
    businessType: "Educational Supplies",
    registrationNumber: "VND-2024-001",
    verified: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your vendor profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUploadLogo = () => {
    toast({
      title: "Logo Upload",
      description: "Opening file picker for logo upload...",
    });
  };

  const handleViewStore = () => {
    toast({
      title: "Viewing Store",
      description: "Opening your storefront...",
    });
  };

  const handleManageProducts = () => {
    toast({
      title: "Manage Products",
      description: "Opening product management panel...",
    });
  };

  const handleViewAnalytics = () => {
    toast({
      title: "Analytics",
      description: "Opening vendor analytics dashboard...",
    });
  };

  return (
    <VendorLayout title="Vendor Profile">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Profile</h1>
            <p className="text-muted-foreground">Manage your store information and settings</p>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button 
                  className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button 
                className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Store Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">SL</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" onClick={handleUploadLogo}>
                    <Camera className="w-4 h-4 mr-2" />
                    Change Logo
                  </Button>
                )}
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-semibold">{formData.name}</h3>
                <p className="text-sm text-muted-foreground">{formData.businessType}</p>
                <Badge className={formData.verified ? "bg-ghana-green text-white" : "bg-ghana-gold text-black"}>
                  {formData.verified ? "Verified" : "Pending Verification"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card className="gradient-card md:col-span-2">
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                onClick={handleViewStore}
              >
                <Store className="w-4 h-4 mr-2" />
                View Store
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleManageProducts}
              >
                <Award className="w-4 h-4 mr-2" />
                Manage Products
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewAnalytics}
              >
                <Award className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorProfile; 