import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Phone,
  Award,
  DollarSign,
  Eye,
  Download,
  Bell,
  CreditCard
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DashboardHome = () => {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your GNACOPS membership.</p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
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

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Membership Details */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Institution:</span>
              <span>{userData.school}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
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
            <Link to="/dashboard/profile">
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </Link>
            <Link to="/dashboard/payments">
              <Button variant="outline" className="w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Make Payment
              </Button>
            </Link>
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

      {/* Recent Notifications */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Recent Notifications
          </CardTitle>
          <CardDescription>Stay updated with your GNACOPS activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 border rounded-lg ${!notification.read ? 'bg-ghana-gold/5 border-ghana-gold/30' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-ghana-green" />}
                    {notification.type === 'info' && <AlertCircle className="w-4 h-4 text-ghana-gold" />}
                    {notification.type === 'warning' && <Clock className="w-4 h-4 text-ghana-red" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      {!notification.read && <div className="w-2 h-2 bg-ghana-gold rounded-full"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/dashboard/notifications">
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;