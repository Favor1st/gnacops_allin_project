import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Download,
  Upload,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UserDocuments = () => {
  const [documents] = useState([
    {
      id: 1,
      name: "Teaching Certificate",
      type: "Certificate",
      status: "verified",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: 2,
      name: "Academic Transcripts",
      type: "Academic",
      status: "verified",
      uploadDate: "2024-01-15",
      size: "1.8 MB",
      format: "PDF"
    },
    {
      id: 3,
      name: "ID Card Copy",
      type: "Identification",
      status: "pending",
      uploadDate: "2024-01-20",
      size: "0.8 MB",
      format: "JPG"
    },
    {
      id: 4,
      name: "Passport Photo",
      type: "Photo",
      status: "verified",
      uploadDate: "2024-01-15",
      size: "0.5 MB",
      format: "JPG"
    },
    {
      id: 5,
      name: "Employment Letter",
      type: "Employment",
      status: "rejected",
      uploadDate: "2024-01-18",
      size: "1.2 MB",
      format: "PDF"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-ghana-green text-white"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `${docName} is being downloaded.`,
    });
  };

  const handleDelete = (docId: number, docName: string) => {
    toast({
      title: "Document Deleted",
      description: `${docName} has been removed.`,
      variant: "destructive",
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Document upload feature will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="text-muted-foreground">Manage your uploaded documents and certificates</p>
        </div>
        <Button 
          className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
          onClick={handleUpload}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Categories */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-ghana-green" />
              <div>
                <p className="text-sm font-medium">Verified</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'verified').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-ghana-gold" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-ghana-red" />
              <div>
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'rejected').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-foreground" />
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Document List</CardTitle>
          <CardDescription>All your uploaded documents and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-ghana-gold/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-ghana-gold" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{doc.name}</h4>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Type: {doc.type}</span>
                        <span>Size: {doc.size}</span>
                        <span>Format: {doc.format}</span>
                        <span>Uploaded: {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(doc.id, doc.name)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                {doc.status === "rejected" && (
                  <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      This document was rejected. Please upload a clearer version or contact support for assistance.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDocuments;