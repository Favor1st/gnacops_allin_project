import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ClipboardList, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  DollarSign,
  Eye,
  Plus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminOverview = () => {
  const navigate = useNavigate();
  
  const stats = {
    totalMembers: 1247,
    pendingApprovals: 23,
    approvedToday: 12,
    rejectedToday: 3,
    totalRevenue: 249400,
    pendingPayments: 45
  };

  const recentSubmissions = [
    {
      id: "REG-2024-001",
      name: "Dr. Kwame Asante",
      type: "Teacher Council",
      submittedAt: "2024-01-25 14:30",
      status: "pending",
      region: "Greater Accra"
    },
    {
      id: "REG-2024-002", 
      name: "Mary Adjei",
      type: "Parent Council",
      submittedAt: "2024-01-25 13:15",
      status: "approved",
      region: "Ashanti"
    },
    {
      id: "REG-2024-003",
      name: "Accra Private Academy",
      type: "Institutional",
      submittedAt: "2024-01-25 11:45",
      status: "pending",
      region: "Greater Accra"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-ghana-green text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewApplication = (id: string) => {
    toast({
      title: "Viewing Application",
      description: `Opening application ${id} for review.`,
    });
    navigate(`/admin/applications`);
  };

  const handleViewAllApplications = () => {
    navigate("/admin/applications");
  };

  const handleManageMembers = () => {
    navigate("/admin/members");
  };

  const handleGenerateCertificates = () => {
    navigate("/admin/certificates");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage GNACOPS memberships and platform settings.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card border-2 border-ghana-gold/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active memberships</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2 border-ghana-gold/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ghana-gold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2 border-ghana-green/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ghana-green">{stats.approvedToday}</div>
            <p className="text-xs text-muted-foreground">New approvals</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2 border-ghana-red/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black"
              onClick={handleViewAllApplications}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Review Applications
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleManageMembers}
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Members
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleGenerateCertificates}
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Certificates
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest membership applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{submission.name}</h4>
                      {getStatusBadge(submission.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {submission.type} • {submission.region} • {submission.submittedAt}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewApplication(submission.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewAllApplications}
              >
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;