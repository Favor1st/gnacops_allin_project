import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, ArrowLeft, GripVertical, X, Copy, Share2, Download } from "lucide-react";

type FormField = {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

type Form = {
  id: number;
  name: string;
  description: string;
  fields: FormField[];
  status: string;
  submissions: number;
  createdAt: string;
};

const AdminFormBuilder = () => {
  const { toast } = useToast();
  const [forms, setForms] = useState<Form[]>([
    {
      id: 1,
      name: "Membership Application",
      description: "Standard membership application form",
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true },
        { id: '2', type: 'email', label: 'Email Address', required: true },
        { id: '3', type: 'phone', label: 'Phone Number', required: true },
        { id: '4', type: 'textarea', label: 'Address', required: true },
        { id: '5', type: 'select', label: 'Membership Type', required: true, options: ['Individual', 'Corporate', 'Student'] }
      ],
      status: "active",
      submissions: 45,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Event Registration",
      description: "Registration form for GNACOPS events",
      fields: [
        { id: '1', type: 'text', label: 'Event Name', required: true },
        { id: '2', type: 'date', label: 'Event Date', required: true },
        { id: '3', type: 'select', label: 'Attendance Type', required: true, options: ['Virtual', 'In-Person', 'Hybrid'] }
      ],
      status: "draft",
      submissions: 0,
      createdAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Complaint Form",
      description: "Member complaint submission form",
      fields: [
        { id: '1', type: 'text', label: 'Subject', required: true },
        { id: '2', type: 'textarea', label: 'Description', required: true },
        { id: '3', type: 'select', label: 'Priority', required: true, options: ['Low', 'Medium', 'High'] }
      ],
      status: "active",
      submissions: 12,
      createdAt: "2024-01-10"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingFormId, setEditingFormId] = useState<number | null>(null);
  const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    type: ""
  });
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: 'text',
    label: '',
    required: false
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

    const form: Form = {
      id: forms.length + 1,
      name: newForm.name,
      description: newForm.description,
      fields: [],
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

  const handleViewForm = (id: number, name: string) => {
    toast({
      title: "Viewing Form",
      description: `Opening preview for ${name}`,
    });
  };

  const handleCopyForm = (id: number, name: string) => {
    toast({
      title: "Form Copied",
      description: `A copy of ${name} has been created`,
    });
  };

  const handleShareForm = (id: number, name: string) => {
    toast({
      title: "Share Form",
      description: `Preparing ${name} for sharing`,
    });
  };

  const handleExportForm = (id: number, name: string) => {
    toast({
      title: "Export Form",
      description: `Exporting ${name} as JSON`,
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="secondary">Draft</Badge>;
  };

  const handleEditForm = (formId: number) => {
    setEditingFormId(formId);
  };

  const handleAddField = (formId: number) => {
    if (!newField.label) {
      toast({
        title: "Error",
        description: "Please enter a field label",
        variant: "destructive",
      });
      return;
    }

    const field: FormField = {
      id: Date.now().toString(),
      type: newField.type as FormField['type'],
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required || false,
      options: newField.options
    };

    setForms(forms.map(form => 
      form.id === formId 
        ? { ...form, fields: [...form.fields, field] }
        : form
    ));

    setNewField({ type: 'text', label: '', required: false });
    toast({
      title: "Success",
      description: "Field added successfully",
    });
  };

  const handleDeleteField = (formId: number, fieldId: string) => {
    setForms(forms.map(form => 
      form.id === formId 
        ? { ...form, fields: form.fields.filter(field => field.id !== fieldId) }
        : form
    ));
    toast({
      title: "Success",
      description: "Field deleted successfully",
    });
  };

  const handleUpdateField = (formId: number, fieldId: string, updates: Partial<FormField>) => {
    setForms(forms.map(form => 
      form.id === formId 
        ? { 
            ...form, 
            fields: form.fields.map(field => 
              field.id === fieldId ? { ...field, ...updates } : field
            ) 
          }
        : form
    ));
  };

  const editingForm = editingFormId ? forms.find(f => f.id === editingFormId) : null;

  if (editingForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setEditingFormId(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forms
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Editing: {editingForm.name}</h2>
            <p className="text-muted-foreground">Customize form fields and settings</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Field</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Field Type</Label>
                <Select 
                  value={newField.type} 
                  onValueChange={(value) => setNewField({ ...newField, type: value as FormField['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Field Label</Label>
                <Input
                  value={newField.label || ''}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>
              <div className="space-y-2">
                <Label>Placeholder (optional)</Label>
                <Input
                  value={newField.placeholder || ''}
                  onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
              <div className="space-y-2">
                <Label>Required</Label>
                <div className="flex items-center space-x-2 h-9">
                  <Switch
                    checked={newField.required || false}
                    onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                  />
                  <span className="text-sm">{newField.required ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            {(newField.type === 'select' || newField.type === 'radio') && (
              <div className="space-y-2">
                <Label>Options (comma separated)</Label>
                <Input
                  value={newField.options?.join(', ') || ''}
                  onChange={(e) => setNewField({ 
                    ...newField, 
                    options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}
            <Button onClick={() => handleAddField(editingForm.id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Fields ({editingForm.fields.length})</CardTitle>
            <CardDescription>Drag to reorder, click to edit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {editingForm.fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value) => handleUpdateField(editingForm.id, field.id, { type: value as FormField['type'] })}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => handleUpdateField(editingForm.id, field.id, { label: e.target.value })}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Placeholder</Label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => handleUpdateField(editingForm.id, field.id, { placeholder: e.target.value })}
                        className="h-8"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Required</Label>
                      <div className="flex items-center h-8">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) => handleUpdateField(editingForm.id, field.id, { required: checked })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Actions</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteField(editingForm.id, field.id)}
                        className="h-8"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {editingForm.fields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No fields added yet. Add your first field above.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    <span>{form.fields.length} fields</span>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewForm(form.id, form.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCopyForm(form.id, form.name)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShareForm(form.id, form.name)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportForm(form.id, form.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditForm(form.id)}
                  >
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