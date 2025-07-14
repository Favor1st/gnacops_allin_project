import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Download, Calendar, Users, TrendingUp, FileText } from "lucide-react";

const AdminReports = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState("30days");

  const reportTypes = [
    {
      id: "membership",
      name: "Membership Report",
      description: "Comprehensive membership statistics and trends",
      icon: Users
    },
    {
      id: "financial",
      name: "Financial Report",
      description: "Payment and revenue analysis",
      icon: TrendingUp
    },
    {
      id: "activity",
      name: "Activity Report",
      description: "User activity and engagement metrics",
      icon: BarChart3
    },
    {
      id: "applications",
      name: "Applications Report",
      description: "Application submission and approval stats",
      icon: FileText
    }
  ];

  const quickStats = [
    {
      label: "Total Members",
      value: "1,247",
      change: "+12%",
      trend: "up"
    },
    {
      label: "New Applications",
      value: "89",
      change: "+5%",
      trend: "up"
    },
    {
      label: "Revenue (GHS)",
      value: "45,670",
      change: "+18%",
      trend: "up"
    },
    {
      label: "Active Sessions",
      value: "156",
      change: "-3%",
      trend: "down"
    }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Generating Report",
      description: `Generating ${reportTypes.find(r => r.id === selectedReport)?.name} for ${dateRange}`,
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your report has been generated and is ready for download",
      });
    }, 2000);
  };

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${reportName}...`,
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Report has been scheduled for automatic generation",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Generate insights and analytics reports</p>
        </div>
        <Button onClick={handleScheduleReport}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Reports
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Create detailed reports based on your requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 3 months</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerateReport}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Available Reports</h3>
        {reportTypes.map((report) => {
          const IconComponent = report.icon;
          return (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-ghana-gold/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-ghana-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{report.name}</h4>
                      <p className="text-muted-foreground">{report.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last generated: 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReport(report.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReport(report.id);
                        handleGenerateReport();
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminReports;