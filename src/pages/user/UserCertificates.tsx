import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Award, Download, Share2, Calendar, CheckCircle } from "lucide-react";

const UserCertificates = () => {
  const { toast } = useToast();
  const [certificates] = useState([
    {
      id: 1,
      title: "Full Membership Certificate",
      type: "Membership",
      issueDate: "2024-01-15",
      validUntil: "2025-01-15",
      status: "active",
      certificateNumber: "GNACOPS-001-2024",
      description: "Official certificate confirming full membership status in GNACOPS"
    },
    {
      id: 2,
      title: "CPD Completion Certificate",
      type: "Training",
      issueDate: "2024-01-10",
      validUntil: "2025-01-10",
      status: "active",
      certificateNumber: "CPD-045-2024",
      description: "Certificate for completing 20 hours of Continuing Professional Development"
    },
    {
      id: 3,
      title: "Workshop Attendance Certificate",
      type: "Event",
      issueDate: "2023-12-05",
      validUntil: "Never",
      status: "active",
      certificateNumber: "WS-012-2023",
      description: "Certificate for attending the Annual Pharmacy Practice Workshop"
    }
  ]);

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${title}...`,
    });
  };

  const handleShare = (title: string) => {
    toast({
      title: "Share Link Generated",
      description: `Share link for ${title} has been copied to clipboard`,
    });
  };

  const handleVerify = (certificateNumber: string) => {
    toast({
      title: "Certificate Verified",
      description: `Certificate ${certificateNumber} is valid and verified`,
    });
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      "Membership": "bg-blue-100 text-blue-800",
      "Training": "bg-green-100 text-green-800",
      "Event": "bg-purple-100 text-purple-800"
    };
    return <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Certificates</h2>
          <p className="text-muted-foreground">View and manage your certificates</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Certificates</p>
          <p className="text-2xl font-bold text-ghana-gold">{certificates.length}</p>
        </div>
      </div>

      {/* Certificate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Membership</p>
                <p className="text-2xl font-bold text-blue-600">
                  {certificates.filter(c => c.type === "Membership").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Training</p>
                <p className="text-2xl font-bold text-green-600">
                  {certificates.filter(c => c.type === "Training").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events</p>
                <p className="text-2xl font-bold text-purple-600">
                  {certificates.filter(c => c.type === "Event").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <div className="grid gap-4">
        {certificates.map((certificate) => (
          <Card key={certificate.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{certificate.title}</h3>
                    {getTypeBadge(certificate.type)}
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-muted-foreground">{certificate.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Certificate #:</span> {certificate.certificateNumber}
                    </div>
                    <div>
                      <span className="font-medium">Issue Date:</span> {certificate.issueDate}
                    </div>
                    <div>
                      <span className="font-medium">Valid Until:</span> {certificate.validUntil}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> 
                      <span className="text-green-600 ml-1">✓ Valid</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(certificate.title)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(certificate.title)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify(certificate.certificateNumber)}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certificate Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Verification</CardTitle>
          <CardDescription>Verify any GNACOPS certificate using its number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter certificate number (e.g., GNACOPS-001-2024)"
              className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm"
            />
            <Button>Verify Certificate</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Use this tool to verify the authenticity of any GNACOPS certificate
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCertificates;