
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, CheckCircle, XCircle, Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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
    },
    {
      id: "REG-2024-004",
      name: "John Mensah",
      type: "Proprietor",
      submittedAt: "2024-01-25 10:20",
      status: "rejected",
      region: "Central"
    }
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "Member Approved",
      description: `Application ${id} has been approved and certificate will be generated.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Member Rejected",
      description: `Application ${id} has been rejected.`,
      variant: "destructive",
    });
  };

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

  const filteredSubmissions = recentSubmissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout 
      title="Member Management" 
      description="Review and manage membership applications"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">23</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">12</div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-red/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Review and manage membership applications</CardDescription>
              </div>
              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submissions Table */}
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold">{submission.name}</h4>
                      {getStatusBadge(submission.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>ID: {submission.id}</span>
                      <span>Type: {submission.type}</span>
                      <span>Region: {submission.region}</span>
                      <span>Submitted: {submission.submittedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {submission.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                          onClick={() => handleApprove(submission.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleReject(submission.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMembers;
