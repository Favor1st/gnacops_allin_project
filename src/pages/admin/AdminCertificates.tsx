
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Plus, Save, Download, Upload, Palette, Type, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  layout: 'landscape' | 'portrait';
  backgroundColor: string;
  borderStyle: string;
  logoPosition: 'top-left' | 'top-center' | 'top-right';
  titleText: string;
  titleFont: string;
  titleSize: number;
  bodyText: string;
  bodyFont: string;
  bodySize: number;
  signatureFields: { name: string; title: string; position: 'left' | 'center' | 'right' }[];
  status: 'active' | 'draft';
}

const AdminCertificates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [templates, setTemplates] = useState<CertificateTemplate[]>([
    {
      id: '1',
      name: 'Standard Membership Certificate',
      description: 'Default certificate for all membership types',
      layout: 'landscape',
      backgroundColor: '#ffffff',
      borderStyle: 'gold-border',
      logoPosition: 'top-center',
      titleText: 'Certificate of Membership',
      titleFont: 'serif',
      titleSize: 24,
      bodyText: 'This is to certify that\n\n{member_name}\n\nhas been accepted as a member of the Ghana National Association of Private Schools (GNACOPS) in the category of {membership_type}.\n\nGranted this {date} day of {month}, {year}.',
      bodyFont: 'sans-serif',
      bodySize: 14,
      signatureFields: [
        { name: 'Director General', title: 'Director General, GNACOPS', position: 'left' },
        { name: 'Chairman', title: 'Chairman, Board of Directors', position: 'right' }
      ],
      status: 'active'
    }
  ]);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const updateTemplate = (updates: Partial<CertificateTemplate>) => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => prev.map(template => 
      template.id === selectedTemplate 
        ? { ...template, ...updates }
        : template
    ));
  };

  const saveTemplate = () => {
    setIsEditing(false);
    toast({
      title: "Template Saved",
      description: "Certificate template has been saved successfully.",
    });
  };

  const generateCertificates = () => {
    toast({
      title: "Generating Certificates",
      description: "Bulk certificate generation has started. You'll be notified when complete.",
    });
  };

  return (
    <AdminLayout 
      title="Certificate Management" 
      description="Design and manage membership certificates"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Certificate Templates</CardTitle>
            <CardDescription>Manage your certificate designs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate === template.id ? 'border-ghana-gold bg-ghana-gold/10' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{template.layout}</p>
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

        {/* Template Designer */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTemplateData ? (
            <>
              <Card className="gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedTemplateData.name}</CardTitle>
                      <CardDescription>{selectedTemplateData.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPreviewMode(!previewMode)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {previewMode ? 'Edit' : 'Preview'}
                      </Button>
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
                          onClick={saveTemplate}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {previewMode ? (
                // Certificate Preview
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Certificate Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`${
                        selectedTemplateData.layout === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'
                      } border-4 border-ghana-gold bg-white p-8 mx-auto max-w-2xl relative`}
                      style={{ backgroundColor: selectedTemplateData.backgroundColor }}
                    >
                      {/* Logo */}
                      <div className={`absolute top-4 ${
                        selectedTemplateData.logoPosition === 'top-left' ? 'left-4' :
                        selectedTemplateData.logoPosition === 'top-right' ? 'right-4' : 'left-1/2 transform -translate-x-1/2'
                      }`}>
                        <div className="w-16 h-16 bg-ghana-gold rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xl">G</span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="text-center mt-20 mb-8">
                        <h1 
                          className={`font-${selectedTemplateData.titleFont} text-ghana-gold font-bold`}
                          style={{ fontSize: `${selectedTemplateData.titleSize}px` }}
                        >
                          {selectedTemplateData.titleText}
                        </h1>
                      </div>

                      {/* Body */}
                      <div 
                        className={`text-center font-${selectedTemplateData.bodyFont} text-black leading-relaxed whitespace-pre-line`}
                        style={{ fontSize: `${selectedTemplateData.bodySize}px` }}
                      >
                        {selectedTemplateData.bodyText
                          .replace('{member_name}', 'John Doe')
                          .replace('{membership_type}', 'Institutional Member')
                          .replace('{date}', '15th')
                          .replace('{month}', 'January')
                          .replace('{year}', '2024')
                        }
                      </div>

                      {/* Signatures */}
                      <div className="absolute bottom-8 left-0 right-0 px-8">
                        <div className="flex justify-between">
                          {selectedTemplateData.signatureFields.map((sig, index) => (
                            <div key={index} className="text-center">
                              <div className="border-b-2 border-black w-32 mb-2"></div>
                              <p className="font-bold text-sm">{sig.name}</p>
                              <p className="text-xs text-muted-foreground">{sig.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Template Editor
                <Tabs defaultValue="layout" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="styling">Styling</TabsTrigger>
                    <TabsTrigger value="signatures">Signatures</TabsTrigger>
                  </TabsList>

                  <TabsContent value="layout" className="space-y-4">
                    <Card className="gradient-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ImageIcon className="w-5 h-5 mr-2" />
                          Layout Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Orientation</Label>
                          <Select 
                            value={selectedTemplateData.layout} 
                            onValueChange={(value: 'landscape' | 'portrait') => updateTemplate({ layout: value })}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="landscape">Landscape</SelectItem>
                              <SelectItem value="portrait">Portrait</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Logo Position</Label>
                          <Select 
                            value={selectedTemplateData.logoPosition} 
                            onValueChange={(value: 'top-left' | 'top-center' | 'top-right') => updateTemplate({ logoPosition: value })}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top-left">Top Left</SelectItem>
                              <SelectItem value="top-center">Top Center</SelectItem>
                              <SelectItem value="top-right">Top Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Background Color</Label>
                          <Input
                            type="color"
                            value={selectedTemplateData.backgroundColor}
                            onChange={(e) => updateTemplate({ backgroundColor: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <Card className="gradient-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Type className="w-5 h-5 mr-2" />
                          Certificate Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Certificate Title</Label>
                          <Input
                            value={selectedTemplateData.titleText}
                            onChange={(e) => updateTemplate({ titleText: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Certificate Body Text</Label>
                          <Textarea
                            value={selectedTemplateData.bodyText}
                            onChange={(e) => updateTemplate({ bodyText: e.target.value })}
                            disabled={!isEditing}
                            rows={6}
                            placeholder="Use {member_name}, {membership_type}, {date}, {month}, {year} as placeholders"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Available placeholders: {'{member_name}'}, {'{membership_type}'}, {'{date}'}, {'{month}'}, {'{year}'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-4">
                    <Card className="gradient-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Palette className="w-5 h-5 mr-2" />
                          Typography & Styling
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Title Font</Label>
                            <Select 
                              value={selectedTemplateData.titleFont} 
                              onValueChange={(value) => updateTemplate({ titleFont: value })}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="serif">Serif</SelectItem>
                                <SelectItem value="sans-serif">Sans Serif</SelectItem>
                                <SelectItem value="mono">Monospace</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Title Size</Label>
                            <Input
                              type="number"
                              value={selectedTemplateData.titleSize}
                              onChange={(e) => updateTemplate({ titleSize: parseInt(e.target.value) })}
                              disabled={!isEditing}
                              min="12"
                              max="48"
                            />
                          </div>
                          <div>
                            <Label>Body Font</Label>
                            <Select 
                              value={selectedTemplateData.bodyFont} 
                              onValueChange={(value) => updateTemplate({ bodyFont: value })}
                              disabled={!isEditing}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="serif">Serif</SelectItem>
                                <SelectItem value="sans-serif">Sans Serif</SelectItem>
                                <SelectItem value="mono">Monospace</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Body Size</Label>
                            <Input
                              type="number"
                              value={selectedTemplateData.bodySize}
                              onChange={(e) => updateTemplate({ bodySize: parseInt(e.target.value) })}
                              disabled={!isEditing}
                              min="10"
                              max="24"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="signatures" className="space-y-4">
                    <Card className="gradient-card">
                      <CardHeader>
                        <CardTitle>Signature Fields</CardTitle>
                        <CardDescription>Configure signature areas on the certificate</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedTemplateData.signatureFields.map((sig, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                              <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Name</Label>
                                  <Input
                                    value={sig.name}
                                    onChange={(e) => {
                                      const updatedSignatures = [...selectedTemplateData.signatureFields];
                                      updatedSignatures[index].name = e.target.value;
                                      updateTemplate({ signatureFields: updatedSignatures });
                                    }}
                                    disabled={!isEditing}
                                  />
                                </div>
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={sig.title}
                                    onChange={(e) => {
                                      const updatedSignatures = [...selectedTemplateData.signatureFields];
                                      updatedSignatures[index].title = e.target.value;
                                      updateTemplate({ signatureFields: updatedSignatures });
                                    }}
                                    disabled={!isEditing}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

              {/* Action Buttons */}
              <Card className="gradient-card">
                <CardContent className="pt-6">
                  <div className="flex space-x-4">
                    <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <Button 
                      className="bg-ghana-green hover:bg-ghana-green/90 text-white"
                      onClick={generateCertificates}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Certificates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="gradient-card">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Select a certificate template to start designing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCertificates;
