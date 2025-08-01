import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Award, Download, Send, Eye, Filter } from "lucide-react";

const AdminCertificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const [filter, setFilter] = useState("all");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Fetch certificates and templates from API
  useEffect(() => {
    fetchCertificates();
    fetchTemplates();
  }, [pagination.currentPage, filter]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        status: filter
      });

      const response = await fetch(`/api/certificates?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCertificates(data.certificates);
        setPagination(data.pagination);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch certificates",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch certificates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleIssueCertificate = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'active' })
      });

      if (response.ok) {
        fetchCertificates(); // Refresh the list
        toast({
          title: "Success",
          description: "Certificate issued successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to issue certificate",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue certificate",
        variant: "destructive",
      });
    }
  };

  const handleRevokeCertificate = async (id: number) => {
    const reason = prompt('Please provide a reason for revocation:');
    if (!reason) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificates/${id}/revoke`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ revocationReason: reason })
      });

      if (response.ok) {
        fetchCertificates(); // Refresh the list
        toast({
          title: "Success",
          description: "Certificate revoked successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to revoke certificate",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke certificate",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCertificate = async (id: number, memberName: string, certificateNumber: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificates/${id}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${certificateNumber}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "Download Successful",
          description: "Certificate downloaded successfully",
        });
      } else {
        toast({
          title: "Download Failed",
          description: "Failed to download certificate",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download certificate",
        variant: "destructive",
      });
    }
  };

  const handleEmailCertificate = async (id: number, memberName: string, email: string, certificateNumber: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/certificates/${id}/email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: `Certificate for ${memberName} (${certificateNumber}) has been sent to ${email}`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to send certificate email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send certificate email",
        variant: "destructive",
      });
    }
  };

  const handleViewCertificate = (id: number, memberName: string, certificateNumber: string) => {
    // Navigate to certificate preview page
    window.open(`/admin/certificates/${id}`, '_blank');
  };

  const handleBulkDownload = () => {
    toast({
      title: "Bulk Download Started",
      description: "Preparing all certificates for download...",
    });
    // In a real app, this would create a zip file with all certificates
  };

  const handleBulkEmail = () => {
    toast({
      title: "Bulk Email Started",
      description: "Sending certificates to all members...",
    });
    // In a real app, this would send emails to all members with their certificates
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return <Badge className="bg-green-100 text-green-800">Issued</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "revoked":
        return <Badge className="bg-red-100 text-red-800">Revoked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCertificates = filter === "all" 
    ? certificates 
    : certificates.filter(cert => cert.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Certificate Management</h2>
          <p className="text-muted-foreground">Issue and manage member certificates</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBulkDownload}>
            <Download className="mr-2 h-4 w-4" />
            Bulk Download
          </Button>
          <Button variant="outline" onClick={handleBulkEmail}>
            <Send className="mr-2 h-4 w-4" />
            Bulk Email
          </Button>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Certificates</SelectItem>
              <SelectItem value="issued">Issued</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Certificate Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {certificates.filter(c => c.status === "issued").length}
              </div>
              <div className="text-sm text-muted-foreground">Issued</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {certificates.filter(c => c.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {certificates.filter(c => c.status === "revoked").length}
              </div>
              <div className="text-sm text-muted-foreground">Revoked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{certificates.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{certificate.memberName}</h3>
                    {getStatusBadge(certificate.status)}
                  </div>
                  <p className="text-muted-foreground">{certificate.memberEmail}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {certificate.certificateType}
                    </div>
                    <div>
                      <span className="font-medium">Certificate #:</span> {certificate.certificateNumber}
                    </div>
                    <div>
                      <span className="font-medium">Issue Date:</span> {certificate.issueDate}
                    </div>
                    <div>
                      <span className="font-medium">Valid Until:</span> {certificate.validUntil}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {certificate.status === "pending" && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleIssueCertificate(certificate.id)}
                    >
                      Issue
                    </Button>
                  )}
                  {certificate.status === "issued" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCertificate(certificate.memberName, certificate.certificateNumber)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailCertificate(certificate.memberName, certificate.memberEmail, certificate.certificateNumber)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeCertificate(certificate.id)}
                      >
                        Revoke
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewCertificate(certificate.memberName, certificate.certificateNumber)}
                  >
                    <Eye className="h-4 w-4" />
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

export default AdminCertificates;