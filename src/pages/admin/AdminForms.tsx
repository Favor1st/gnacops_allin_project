
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Plus, Trash2, Save, GripVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'file' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  status: 'active' | 'draft';
}

const AdminForms = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: 'text',
    label: '',
    required: false
  });

  const [formTemplates, setFormTemplates] = useState<FormTemplate[]>([
    {
      id: '1',
      name: 'Institutional Membership',
      description: 'Form for educational institutions',
      status: 'active',
      fields: [
        { id: '1', type: 'text', label: 'Institution Name', required: true },
        { id: '2', type: 'email', label: 'Contact Email', required: true },
        { id: '3', type: 'phone', label: 'Phone Number', required: true },
        { id: '4', type: 'select', label: 'Institution Type', required: true, options: ['Public', 'Private', 'International'] },
        { id: '5', type: 'textarea', label: 'Description', required: false },
        { id: '6', type: 'file', label: 'Registration Certificate', required: true }
      ]
    },
    {
      id: '2',
      name: 'Teacher Council',
      description: 'Form for teacher council members',
      status: 'active',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true },
        { id: '2', type: 'email', label: 'Email Address', required: true },
        { id: '3', type: 'text', label: 'Teacher ID', required: true },
        { id: '4', type: 'select', label: 'Subject Area', required: true, options: ['Mathematics', 'Science', 'English', 'Social Studies', 'Other'] }
      ]
    }
  ]);

  const addNewField = () => {
    if (!newField.label || !selectedForm) return;
    
    const updatedTemplates = formTemplates.map(template => {
      if (template.id === selectedForm) {
        const newFieldWithId: FormField = {
          id: Date.now().toString(),
          type: newField.type as FormField['type'],
          label: newField.label,
          placeholder: newField.placeholder,
          required: newField.required || false,
          options: newField.options
        };
        
        return {
          ...template,
          fields: [...template.fields, newFieldWithId]
        };
      }
      return template;
    });
    
    setFormTemplates(updatedTemplates);
    setNewField({ type: 'text', label: '', required: false });
    
    toast({
      title: "Field Added",
      description: "New field has been added to the form.",
    });
  };

  const removeField = (fieldId: string) => {
    if (!selectedForm) return;
    
    const updatedTemplates = formTemplates.map(template => {
      if (template.id === selectedForm) {
        return {
          ...template,
          fields: template.fields.filter(field => field.id !== fieldId)
        };
      }
      return template;
    });
    
    setFormTemplates(updatedTemplates);
    
    toast({
      title: "Field Removed",
      description: "Field has been removed from the form.",
    });
  };

  const saveForm = () => {
    setIsEditing(false);
    toast({
      title: "Form Saved",
      description: "Form template has been saved successfully.",
    });
  };

  const selectedTemplate = formTemplates.find(t => t.id === selectedForm);

  return (
    <AdminLayout 
      title="Form Builder" 
      description="Create and manage membership forms"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Templates List */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Form Templates</CardTitle>
            <CardDescription>Manage your form templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedForm === template.id ? 'border-ghana-gold bg-ghana-gold/10' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedForm(template.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{template.fields.length} fields</p>
                    </div>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-ghana-gold hover:bg-ghana-gold/90 text-black">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </CardContent>
        </Card>

        {/* Form Builder */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTemplate ? (
            <>
              <Card className="gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedTemplate.name}</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                      {isEditing && (
                        <Button 
                          size="sm" 
                          className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                          onClick={saveForm}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTemplate.fields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{field.type}</Badge>
                            <span className="font-medium">{field.label}</span>
                            {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                          {field.placeholder && (
                            <p className="text-sm text-muted-foreground">Placeholder: {field.placeholder}</p>
                          )}
                          {field.options && (
                            <p className="text-sm text-muted-foreground">Options: {field.options.join(', ')}</p>
                          )}
                        </div>
                        {isEditing && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeField(field.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add New Field */}
              {isEditing && (
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Add New Field</CardTitle>
                    <CardDescription>Add a new field to this form template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="field-type">Field Type</Label>
                        <Select 
                          value={newField.type} 
                          onValueChange={(value: FormField['type']) => setNewField({...newField, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="textarea">Textarea</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="field-label">Field Label</Label>
                        <Input
                          id="field-label"
                          value={newField.label}
                          onChange={(e) => setNewField({...newField, label: e.target.value})}
                          placeholder="Enter field label"
                        />
                      </div>
                      <div>
                        <Label htmlFor="field-placeholder">Placeholder (Optional)</Label>
                        <Input
                          id="field-placeholder"
                          value={newField.placeholder || ''}
                          onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
                          placeholder="Enter placeholder text"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="field-required"
                          checked={newField.required}
                          onChange={(e) => setNewField({...newField, required: e.target.checked})}
                        />
                        <Label htmlFor="field-required">Required Field</Label>
                      </div>
                      {newField.type === 'select' && (
                        <div className="col-span-2">
                          <Label htmlFor="field-options">Options (comma-separated)</Label>
                          <Textarea
                            id="field-options"
                            value={newField.options?.join(', ') || ''}
                            onChange={(e) => setNewField({...newField, options: e.target.value.split(',').map(s => s.trim())})}
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}
                    </div>
                    <Button 
                      className="mt-4 bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                      onClick={addNewField}
                      disabled={!newField.label}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Field
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="gradient-card">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Select a form template to start editing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminForms;
