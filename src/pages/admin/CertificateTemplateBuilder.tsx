import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Eye, 
  Download, 
  Copy, 
  Trash2, 
  Plus, 
  Settings, 
  Palette,
  Type,
  Image,
  QrCode,
  User,
  Calendar,
  Award,
  Move,
  GripVertical
} from "lucide-react";

interface Component {
  id: string;
  type: 'text' | 'image' | 'qr-code' | 'signature' | 'logo' | 'variable';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
  variable?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  templateHtml: string;
  settings: {
    width: number;
    height: number;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
  };
  components: Component[];
  variables: string[];
  status: string;
}

const CertificateTemplateBuilder = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [sampleData, setSampleData] = useState({
    school_name: 'Josan Blooming Community School',
    membership_id: 'CG12N/25/7501/AR',
    issuance_date: '29th April, 2025',
    validity_period: '1 year',
    logo_url: '/assets/logos/gnacops.png',
    signature_url: '/assets/signatures/director.png'
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Available components for drag and drop
  const availableComponents = [
    { type: 'text', label: 'Text Block', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'qr-code', label: 'QR Code', icon: QrCode },
    { type: 'signature', label: 'Signature', icon: User },
    { type: 'logo', label: 'Logo', icon: Image },
    { type: 'variable', label: 'Variable', icon: Award }
  ];

  // Available variables
  const availableVariables = [
    'school_name',
    'membership_id',
    'issuance_date',
    'validity_period',
    'logo_url',
    'signature_url',
    'recipient_name',
    'certificate_number',
    'program_name',
    'achievement_title'
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/certificate-templates', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch templates",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive"
      });
    }
  };

  const createNewTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'New Certificate Template',
      description: '',
      templateHtml: '',
      settings: {
        width: 1000,
        height: 700,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 10,
        fontFamily: 'Georgia, serif',
        primaryColor: '#000000',
        secondaryColor: '#666666'
      },
      components: [],
      variables: [],
      status: 'draft'
    };
    setCurrentTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleSaveTemplate = async () => {
    if (!currentTemplate) return;

    try {
      const token = localStorage.getItem('token');
      const method = currentTemplate.id && templates.find(t => t.id === currentTemplate.id) ? 'PUT' : 'POST';
      const url = method === 'POST' ? '/api/certificate-templates' : `/api/certificate-templates/${currentTemplate.id}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentTemplate)
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Template saved successfully",
        });
        fetchTemplates();
        setIsEditing(false);
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to save template",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const handleAddComponent = (componentType: string) => {
    if (!currentTemplate) return;

    const newComponent: Component = {
      id: Date.now().toString(),
      type: componentType as any,
      content: componentType === 'variable' ? '{{variable_name}}' : 'Sample Text',
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      fontSize: 16,
      fontFamily: 'Georgia, serif',
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left'
    };

    setCurrentTemplate({
      ...currentTemplate,
      components: [...currentTemplate.components, newComponent]
    });
  };

  const handleComponentSelect = (component: Component) => {
    setSelectedComponent(component);
  };

  const handleComponentUpdate = (updates: Partial<Component>) => {
    if (!currentTemplate || !selectedComponent) return;

    const updatedComponents = currentTemplate.components.map(comp =>
      comp.id === selectedComponent.id ? { ...comp, ...updates } : comp
    );

    setCurrentTemplate({
      ...currentTemplate,
      components: updatedComponents
    });

    setSelectedComponent({ ...selectedComponent, ...updates });
  };

  const handleComponentDelete = (componentId: string) => {
    if (!currentTemplate) return;

    setCurrentTemplate({
      ...currentTemplate,
      components: currentTemplate.components.filter(comp => comp.id !== componentId)
    });

    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  };

  const handlePreview = async () => {
    if (!currentTemplate) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificate-templates/${currentTemplate.id}/preview`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sampleData })
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewMode(true);
        // In a real implementation, you'd show the preview in a modal or new window
        toast({
          title: "Preview Generated",
          description: "Certificate preview is ready",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate preview",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate preview",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateTemplate = async (templateId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificate-templates/${templateId}/duplicate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Template duplicated successfully",
        });
        fetchTemplates();
      } else {
        toast({
          title: "Error",
          description: "Failed to duplicate template",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificate-templates/${templateId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Template deleted successfully",
        });
        fetchTemplates();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to delete template",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificate Template Builder</h1>
          <p className="text-muted-foreground">Design and create certificate templates</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
          <Button onClick={createNewTemplate}>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Select a template to edit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                  currentTemplate?.id === template.id ? 'bg-muted border-primary' : ''
                }`}
                onClick={() => setCurrentTemplate(template)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateTemplate(template.id);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTemplate(template.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Design Canvas</CardTitle>
            <CardDescription>Drag and drop components to design your certificate</CardDescription>
          </CardHeader>
          <CardContent>
            {currentTemplate ? (
              <div className="space-y-4">
                {/* Template Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input
                      value={currentTemplate.name}
                      onChange={(e) => setCurrentTemplate({
                        ...currentTemplate,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={currentTemplate.status}
                      onValueChange={(value) => setCurrentTemplate({
                        ...currentTemplate,
                        status: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Canvas */}
                <div
                  ref={canvasRef}
                  className="relative border-2 border-dashed border-gray-300 bg-white"
                  style={{
                    width: currentTemplate.settings.width,
                    height: currentTemplate.settings.height,
                    backgroundColor: currentTemplate.settings.backgroundColor,
                    borderColor: currentTemplate.settings.borderColor,
                    borderWidth: currentTemplate.settings.borderWidth
                  }}
                >
                  {currentTemplate.components.map((component) => (
                    <div
                      key={component.id}
                      className={`absolute cursor-move ${
                        selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                        fontSize: component.fontSize,
                        fontFamily: component.fontFamily,
                        color: component.color,
                        fontWeight: component.fontWeight,
                        textAlign: component.textAlign as any
                      }}
                      onClick={() => handleComponentSelect(component)}
                    >
                      <div className="flex items-center justify-between bg-blue-100 p-1 rounded">
                        <GripVertical className="w-3 h-3" />
                        <span className="text-xs">{component.type}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleComponentDelete(component.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="p-2">
                        {component.type === 'image' ? (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        ) : (
                          <div>{component.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button onClick={handleSaveTemplate}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select a template to start editing</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Component Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Components</CardTitle>
            <CardDescription>Drag components to the canvas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Available Components */}
            <div>
              <Label>Add Components</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableComponents.map((comp) => (
                  <Button
                    key={comp.type}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddComponent(comp.type)}
                    className="flex flex-col items-center p-2 h-auto"
                  >
                    <comp.icon className="w-4 h-4 mb-1" />
                    <span className="text-xs">{comp.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Component Properties */}
            {selectedComponent && (
              <div className="space-y-4">
                <Label>Component Properties</Label>
                
                <div>
                  <Label>Content</Label>
                  <Input
                    value={selectedComponent.content}
                    onChange={(e) => handleComponentUpdate({ content: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>X Position</Label>
                    <Input
                      type="number"
                      value={selectedComponent.x}
                      onChange={(e) => handleComponentUpdate({ x: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Y Position</Label>
                    <Input
                      type="number"
                      value={selectedComponent.y}
                      onChange={(e) => handleComponentUpdate({ y: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Width</Label>
                    <Input
                      type="number"
                      value={selectedComponent.width}
                      onChange={(e) => handleComponentUpdate({ width: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input
                      type="number"
                      value={selectedComponent.height}
                      onChange={(e) => handleComponentUpdate({ height: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Font Size</Label>
                  <Input
                    type="number"
                    value={selectedComponent.fontSize}
                    onChange={(e) => handleComponentUpdate({ fontSize: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label>Color</Label>
                  <Input
                    type="color"
                    value={selectedComponent.color}
                    onChange={(e) => handleComponentUpdate({ color: e.target.value })}
                  />
                </div>

                {selectedComponent.type === 'variable' && (
                  <div>
                    <Label>Variable</Label>
                    <Select
                      value={selectedComponent.variable || ''}
                      onValueChange={(value) => handleComponentUpdate({ variable: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select variable" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVariables.map((variable) => (
                          <SelectItem key={variable} value={variable}>
                            {variable}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificateTemplateBuilder; 