import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  UserCheck,
  UserX
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const members = [
    {
      id: "TC-2024-0123",
      name: "Dr. Kwame Asante",
      email: "kwame.asante@email.com",
      type: "Teacher Council",
      status: "active",
      region: "Greater Accra",
      registrationDate: "2024-01-15",
      expiryDate: "2024-12-31",
      paymentStatus: "paid"
    },
    {
      id: "PC-2024-0124",
      name: "Mary Adjei",
      email: "mary.adjei@email.com", 
      type: "Parent Council",
      status: "active",
      region: "Ashanti",
      registrationDate: "2024-01-20",
      expiryDate: "2024-12-31",
      paymentStatus: "paid"
    },
    {
      id: "IN-2024-0125",
      name: "Accra Private Academy",
      email: "admin@accraprivate.edu.gh",
      type: "Institutional",
      status: "pending",
      region: "Greater Accra",
      registrationDate: "2024-01-25",
      expiryDate: "2024-12-31",
      paymentStatus: "pending"
    },
    {
      id: "PR-2024-0126",
      name: "John Mensah",
      email: "john.mensah@email.com",
      type: "Proprietor",
      status: "suspended",
      region: "Central",
      registrationDate: "2024-01-10",
      expiryDate: "2024-12-31",
      paymentStatus: "overdue"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ghana-green text-white">Active</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
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

  const handleActivate = (id: string) => {
    toast({
      title: "Member Activated",
      description: `Member ${id} has been activated.`,
    });
  };

  const handleSuspend = (id: string) => {
    toast({
      title: "Member Suspended",
      description: `Member ${id} has been suspended.`,
      variant: "destructive",
    });
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    const matchesType = filterType === "all" || member.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage all GNACOPS members</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>Search and filter members by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Teacher Council">Teacher Council</SelectItem>
                <SelectItem value="Parent Council">Parent Council</SelectItem>
                <SelectItem value="Institutional">Institutional</SelectItem>
                <SelectItem value="Proprietor">Proprietor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members List */}
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold">{member.name}</h4>
                      {getStatusBadge(member.status)}
                      {getPaymentBadge(member.paymentStatus)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span>ID: {member.id}</span>
                      <span>Type: {member.type}</span>
                      <span>Region: {member.region}</span>
                      <span>Expires: {member.expiryDate}</span>
                      <span className="md:col-span-2">Email: {member.email}</span>
                      <span>Registered: {member.registrationDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {member.status === "active" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSuspend(member.id)}
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Suspend
                      </Button>
                    )}
                    {member.status === "suspended" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleActivate(member.id)}
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No members found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMembers;