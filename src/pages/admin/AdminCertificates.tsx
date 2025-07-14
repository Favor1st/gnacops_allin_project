import { useState } from "react";
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
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      memberName: "John Doe",
      memberEmail: "john@example.com",
      certificateType: "Full Membership",
      issueDate: "2024-01-15",
      status: "issued",
      validUntil: "2025-01-15",
      certificateNumber: "GNACOPS-001-2024"
    },
    {
      id: 2,
      memberName: "Jane Smith",
      memberEmail: "jane@example.com",
      certificateType: "Associate Membership",
      issueDate: "2024-01-10",
      status: "pending",
      validUntil: "2025-01-10",
      certificateNumber: "GNACOPS-002-2024"
    },
    {
      id: 3,
      memberName: "Robert Johnson",
      memberEmail: "robert@example.com",
      certificateType: "Student Membership",
      issueDate: "2024-01-20",
      status: "revoked",
      validUntil: "2025-01-20",
      certificateNumber: "GNACOPS-003-2024"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const handleIssueCertificate = (id: number) => {
    setCertificates(certificates.map(cert => 
      cert.id === id 
        ? { ...cert, status: "issued", issueDate: new Date().toISOString().split('T')[0] }
        : cert
    ));
    toast({
      title: "Success",
      description: "Certificate issued successfully",
    });
  };

  const handleRevokeCertificate = (id: number) => {
    setCertificates(certificates.map(cert => 
      cert.id === id 
        ? { ...cert, status: "revoked" }
        : cert
    ));
    toast({
      title: "Success",
      description: "Certificate revoked successfully",
    });
  };

  const handleDownloadCertificate = (memberName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading certificate for ${memberName}`,
    });
  };

  const handleEmailCertificate = (memberName: string, email: string) => {
    toast({
      title: "Email Sent",
      description: `Certificate emailed to ${email}`,
    });
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
                        onClick={() => handleDownloadCertificate(certificate.memberName)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailCertificate(certificate.memberName, certificate.memberEmail)}
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
                  <Button variant="outline" size="sm">
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