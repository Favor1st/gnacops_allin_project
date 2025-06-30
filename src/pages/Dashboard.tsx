
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  User, 
  CreditCard, 
  Download, 
  Bell, 
  Settings, 
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  DollarSign,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [membershipStatus] = useState("approved"); // approved, pending, rejected
  const [paymentStatus] = useState("paid"); // paid, pending, overdue

  // Mock user data
  const userData = {
    name: "Dr. Kwame Asante",
    email: "kwame.asante@email.com",
    membershipType: "Teacher Council",
    membershipId: "TC-2024-0123",
    registrationDate: "2024-01-15",
    expiryDate: "2024-12-31",
    region: "Greater Accra",
    school: "Accra Private Academy"
  };

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Membership Approved",
      message: "Your membership application has been approved.",
      date: "2024-01-20",
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "Payment Confirmed",
      message: "Your membership fee payment has been processed.",
      date: "2024-01-22",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Certificate Ready",
      message: "Your membership certificate is now available for download.",
      date: "2024-01-25",
      read: true
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Redirect logic would go here
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Download Started",
      description: "Your membership certificate is being downloaded.",
    });
    // Download logic would go here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-ghana-green text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-ghana-green text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
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
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                  <p className="text-xs text-muted-foreground">Member Portal</p>
                </div>
              </Link>
              <div className="hidden md:block">
                <p className="text-sm text-muted-foreground">Welcome back, {userData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your GNACOPS membership and stay updated.</p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-ghana-green" />
                Membership Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-xs text-muted-foreground">ID: {userData.membershipId}</p>
                </div>
                {getStatusBadge(membershipStatus)}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-ghana-gold" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">Current</p>
                  <p className="text-xs text-muted-foreground">Expires: {userData.expiryDate}</p>
                </div>
                {getPaymentBadge(paymentStatus)}
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Bell className="w-4 h-4 mr-2 text-ghana-red" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</p>
                  <p className="text-xs text-muted-foreground">Unread messages</p>
                </div>
                <Badge variant="secondary">{notifications.length} Total</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Membership Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{userData.membershipType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member ID:</span>
                    <span className="font-mono text-sm">{userData.membershipId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registered:</span>
                    <span>{userData.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{userData.region}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                    onClick={handleDownloadCertificate}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest GNACOPS activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ghana-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Membership certificate downloaded</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ghana-gold rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Annual membership fee paid</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ghana-red rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Membership application approved</p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-lg">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Region</label>
                      <p>{userData.region}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Membership Type</label>
                      <p>{userData.membershipType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Institution</label>
                      <p>{userData.school}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                      <p>{userData.registrationDate}</p>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <div className="space-y-6">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Payment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold">Annual Membership Fee</p>
                      <p className="text-muted-foreground">2024 Payment Status</p>
                    </div>
                    {getPaymentBadge(paymentStatus)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">GHS 200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Date:</span>
                      <span>January 22, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span>Mobile Money</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reference:</span>
                      <span className="font-mono text-sm">PAY-2024-0123</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Annual Membership 2024</p>
                        <p className="text-sm text-muted-foreground">January 22, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">GHS 200.00</p>
                        <Badge className="bg-ghana-green text-white">Paid</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Registration Fee</p>
                        <p className="text-sm text-muted-foreground">January 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">GHS 50.00</p>
                        <Badge className="bg-ghana-green text-white">Paid</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Membership Certificates
                </CardTitle>
                <CardDescription>Download your official GNACOPS certificates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Membership Certificate 2024</h3>
                      <p className="text-sm text-muted-foreground">
                        Official GNACOPS {userData.membershipType} Certificate
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Issued: January 25, 2024 • Valid until: December 31, 2024
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                        onClick={handleDownloadCertificate}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-ghana-gold/10 border border-ghana-gold/30 rounded-lg">
                  <p className="text-sm font-medium mb-2">Certificate Information</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High-resolution PDF format</li>
                    <li>• Official GNACOPS seal and signatures</li>
                    <li>• QR code for verification</li>
                    <li>• Print-ready quality</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>Stay updated with your GNACOPS activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${!notification.read ? 'bg-ghana-gold/5 border-ghana-gold/30' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-ghana-green" />}
                          {notification.type === 'info' && <AlertCircle className="w-5 h-5 text-ghana-gold" />}
                          {notification.type === 'warning' && <Clock className="w-5 h-5 text-ghana-red" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-ghana-gold rounded-full"></div>}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
