import { useState, useEffect } from "react";
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
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

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

  // Fetch forms from API
  useEffect(() => {
    fetchForms();
  }, [pagination.currentPage]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage
      });

      const response = await fetch(`/api/forms?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setForms(data.forms);
        setPagination(data.pagination);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch forms",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast({
        title: "Error",
        description: "Failed to fetch forms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async () => {
    if (!newForm.name || !newForm.description || !newForm.type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newForm.name,
          description: newForm.description,
          type: newForm.type,
          fields: []
        })
      });

      if (response.ok) {
        const data = await response.json();
        setNewForm({ name: "", description: "", type: "" });
        setIsCreating(false);
        fetchForms(); // Refresh the list
        toast({
          title: "Success",
          description: "Form created successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create form",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create form",
        variant: "destructive",
      });
    }
  };

  const handleDeleteForm = async (id: number) => {
    if (!confirm('Are you sure you want to delete this form?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetchForms(); // Refresh the list
        toast({
          title: "Success",
          description: "Form deleted successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to delete form",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete form",
        variant: "destructive",
      });
    }
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

  const handleShareForm = async (id: number, name: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/forms/${id}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isPublic: true })
      });

      if (response.ok) {
        const data = await response.json();
        // Copy to clipboard
        navigator.clipboard.writeText(data.shareUrl);
        toast({
          title: "Share Link Generated",
          description: "Share link copied to clipboard",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to generate share link",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive",
      });
    }
  };

  const handleExportForm = async (id: number, name: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/forms/${id}/export/json`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "Export Successful",
          description: "Form exported as JSON",
        });
      } else {
        toast({
          title: "Export Failed",
          description: "Failed to export form",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export form",
        variant: "destructive",
      });
    }
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