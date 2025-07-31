import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Edit, Trash2, Shield, User, Eye, Key } from "lucide-react";

const AdminWorkers = () => {
  const { toast } = useToast();
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@gnacops.org",
      role: "Administrator",
      department: "Management",
      status: "active",
      lastLogin: "2024-01-15 09:30 AM",
      permissions: ["full_access", "user_management", "system_settings"]
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@gnacops.org",
      role: "Moderator",
      department: "Operations",
      status: "active",
      lastLogin: "2024-01-14 02:15 PM",
      permissions: ["content_management", "member_support"]
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@gnacops.org",
      role: "Support Staff",
      department: "Customer Service",
      status: "inactive",
      lastLogin: "2024-01-10 11:45 AM",
      permissions: ["member_support"]
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    role: "",
    department: ""
  });

  const handleAddWorker = () => {
    if (!newWorker.name || !newWorker.email || !newWorker.role || !newWorker.department) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const worker = {
      id: workers.length + 1,
      name: newWorker.name,
      email: newWorker.email,
      role: newWorker.role,
      department: newWorker.department,
      status: "active",
      lastLogin: "Never",
      permissions: getDefaultPermissions(newWorker.role)
    };

    setWorkers([...workers, worker]);
    setNewWorker({ name: "", email: "", role: "", department: "" });
    setIsAdding(false);

    toast({
      title: "Success",
      description: "Worker added successfully",
    });
  };

  const getDefaultPermissions = (role: string) => {
    switch (role) {
      case "Administrator":
        return ["full_access", "user_management", "system_settings"];
      case "Moderator":
        return ["content_management", "member_support"];
      case "Support Staff":
        return ["member_support"];
      default:
        return [];
    }
  };

  const handleDeleteWorker = (id: number) => {
    setWorkers(workers.filter(worker => worker.id !== id));
    toast({
      title: "Success",
      description: "Worker removed successfully",
    });
  };

  const handleToggleStatus = (id: number) => {
    setWorkers(workers.map(worker => 
      worker.id === id 
        ? { ...worker, status: worker.status === "active" ? "inactive" : "active" }
        : worker
    ));
    toast({
      title: "Success",
      description: "Worker status updated successfully",
    });
  };

  const handleViewWorker = (id: number, name: string) => {
    toast({
      title: "Viewing Worker",
      description: `Opening detailed view for ${name}`,
    });
  };

  const handleEditWorker = (id: number, name: string) => {
    toast({
      title: "Editing Worker",
      description: `Opening edit form for ${name}`,
    });
  };

  const handleManagePermissions = (id: number, name: string) => {
    toast({
      title: "Manage Permissions",
      description: `Opening permission management for ${name}`,
    });
  };

  const handleResetPassword = (id: number, name: string) => {
    toast({
      title: "Password Reset",
      description: `Password reset email sent to ${name}`,
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      "Administrator": "bg-red-100 text-red-800",
      "Moderator": "bg-blue-100 text-blue-800",
      "Support Staff": "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[role] || "bg-gray-100 text-gray-800"}>{role}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Worker Management</h2>
          <p className="text-muted-foreground">Manage staff accounts and permissions</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Worker
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Workers</p>
                <p className="text-2xl font-bold">{workers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {workers.filter(w => w.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Administrators</p>
                <p className="text-2xl font-bold text-red-600">
                  {workers.filter(w => w.role === "Administrator").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(workers.map(w => w.department)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Worker</CardTitle>
            <CardDescription>Create a new staff account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newWorker.email}
                  onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newWorker.role} onValueChange={(value) => setNewWorker({ ...newWorker, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                    <SelectItem value="Support Staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newWorker.department} onValueChange={(value) => setNewWorker({ ...newWorker, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddWorker}>Add Worker</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {workers.map((worker) => (
          <Card key={worker.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{worker.name}</h3>
                    {getStatusBadge(worker.status)}
                    {getRoleBadge(worker.role)}
                  </div>
                  <p className="text-muted-foreground">{worker.email}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Department:</span> {worker.department}
                    </div>
                    <div>
                      <span className="font-medium">Last Login:</span> {worker.lastLogin}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Permissions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {worker.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewWorker(worker.id, worker.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditWorker(worker.id, worker.name)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManagePermissions(worker.id, worker.name)}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResetPassword(worker.id, worker.name)}
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(worker.id)}
                  >
                    {worker.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteWorker(worker.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkers;