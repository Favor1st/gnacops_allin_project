import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const AdminFormBuilder = () => {
  const { toast } = useToast();
  const [forms, setForms] = useState([
    {
      id: 1,
      name: "Membership Application",
      description: "Standard membership application form",
      fields: 12,
      status: "active",
      submissions: 45,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Event Registration",
      description: "Registration form for GNACOPS events",
      fields: 8,
      status: "draft",
      submissions: 0,
      createdAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Complaint Form",
      description: "Member complaint submission form",
      fields: 6,
      status: "active",
      submissions: 12,
      createdAt: "2024-01-10"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    type: ""
  });

  const handleCreateForm = () => {
    if (!newForm.name || !newForm.description || !newForm.type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const form = {
      id: forms.length + 1,
      name: newForm.name,
      description: newForm.description,
      fields: 0,
      status: "draft",
      submissions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, form]);
    setNewForm({ name: "", description: "", type: "" });
    setIsCreating(false);

    toast({
      title: "Success",
      description: "Form created successfully",
    });
  };

  const handleDeleteForm = (id: number) => {
    setForms(forms.filter(form => form.id !== id));
    toast({
      title: "Success",
      description: "Form deleted successfully",
    });
  };

  const handleToggleStatus = (id: number) => {
    setForms(forms.map(form => 
      form.id === id 
        ? { ...form, status: form.status === "active" ? "draft" : "active" }
        : form
    ));
    toast({
      title: "Success",
      description: "Form status updated successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="secondary">Draft</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Form Builder</h2>
          <p className="text-muted-foreground">Create and manage forms for your organization</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Form</CardTitle>
            <CardDescription>Build a new form for your organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Form Name</Label>
              <Input
                id="name"
                value={newForm.name}
                onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                placeholder="Enter form name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newForm.description}
                onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                placeholder="Enter form description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Form Type</Label>
              <Select value={newForm.type} onValueChange={(value) => setNewForm({ ...newForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select form type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="membership">Membership Application</SelectItem>
                  <SelectItem value="event">Event Registration</SelectItem>
                  <SelectItem value="complaint">Complaint Form</SelectItem>
                  <SelectItem value="survey">Survey Form</SelectItem>
                  <SelectItem value="feedback">Feedback Form</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreateForm}>Create Form</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{form.name}</h3>
                    {getStatusBadge(form.status)}
                  </div>
                  <p className="text-muted-foreground">{form.description}</p>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>{form.fields} fields</span>
                    <span>{form.submissions} submissions</span>
                    <span>Created: {form.createdAt}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(form.id)}
                  >
                    {form.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteForm(form.id)}
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

export default AdminFormBuilder;