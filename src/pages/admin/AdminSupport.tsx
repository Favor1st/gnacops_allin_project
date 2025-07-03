
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, MessageSquare, Book, FileText, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

const AdminSupport = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const supportTickets = [
    {
      id: "TICK-001",
      subject: "Unable to approve membership application",
      user: "support@gnacops.org",
      priority: "high",
      status: "open",
      created: "2024-01-25 14:30",
      category: "Technical"
    },
    {
      id: "TICK-002",
      subject: "Certificate generation not working",
      user: "admin@gnacops.org",
      priority: "medium",
      status: "in_progress",
      created: "2024-01-25 12:15",
      category: "Bug Report"
    },
    {
      id: "TICK-003",
      subject: "Need help with marketplace settings",
      user: "mary@gnacops.org",
      priority: "low",
      status: "resolved",
      created: "2024-01-24 16:45",
      category: "Question"
    }
  ];

  const knowledgeBase = [
    {
      id: "KB-001",
      title: "How to Approve Membership Applications",
      category: "Membership",
      views: 245,
      lastUpdated: "2024-01-20"
    },
    {
      id: "KB-002", 
      title: "Setting Up Marketplace Commission Rates",
      category: "Marketplace",
      views: 156,
      lastUpdated: "2024-01-18"
    },
    {
      id: "KB-003",
      title: "Customizing Certificate Templates",
      category: "Certificates",
      views: 98,
      lastUpdated: "2024-01-15"
    },
    {
      id: "KB-004",
      title: "Managing User Permissions and Roles",
      category: "User Management",
      views: 189,
      lastUpdated: "2024-01-12"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-ghana-red text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-500 text-white">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-ghana-gold text-black">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-ghana-green text-white">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Help & Support" 
      description="Get help and access documentation"
    >
      <div className="space-y-6">
        {/* Support Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">
                {supportTickets.filter(t => t.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {supportTickets.filter(t => t.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">
                {supportTickets.filter(t => t.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">KB Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{knowledgeBase.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Support Tickets
                    </CardTitle>
                    <CardDescription>Manage support requests and issues</CardDescription>
                  </div>
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    Create Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{ticket.subject}</h4>
                            <Badge variant="outline">{ticket.id}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            From: {ticket.user} • Category: {ticket.category}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Created: {ticket.created}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                        {ticket.status === 'open' && (
                          <Button size="sm" className="bg-ghana-green hover:bg-ghana-green/90 text-white">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Book className="w-5 h-5 mr-2" />
                      Knowledge Base
                    </CardTitle>
                    <CardDescription>Helpful articles and guides</CardDescription>
                  </div>
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    Add Article
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {knowledgeBase.map((article) => (
                    <div key={article.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold mb-1">{article.title}</h4>
                          <Badge variant="outline" className="mb-2">{article.category}</Badge>
                          <div className="text-sm text-muted-foreground">
                            <p>{article.views} views</p>
                            <p>Updated: {article.lastUpdated}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Read Article
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  System Documentation
                </CardTitle>
                <CardDescription>Technical documentation and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Quick Start Guides</h3>
                    <div className="space-y-3">
                      {[
                        "Admin Panel Overview",
                        "Member Management Guide",
                        "Marketplace Setup",
                        "Certificate Configuration",
                        "User Role Management"
                      ].map((guide, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{guide}</span>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">API Documentation</h3>
                    <div className="space-y-3">
                      {[
                        "Authentication API",
                        "Membership API",
                        "Marketplace API",
                        "Notification API",
                        "Reporting API"
                      ].map((api, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{api}</span>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Support Channels</h3>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Email Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For technical issues and general inquiries
                      </p>
                      <p className="font-medium">support@gnacops.org</p>
                      <p className="text-xs text-muted-foreground">Response time: 2-4 hours</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Phone Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For urgent issues requiring immediate attention
                      </p>
                      <p className="font-medium">+233 XX XXX XXXX</p>
                      <p className="text-xs text-muted-foreground">Available: Mon-Fri, 8AM-6PM GMT</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Live Chat</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Real-time chat support for quick questions
                      </p>
                      <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">System Status</h3>
                    
                    <div className="space-y-3">
                      {[
                        { service: "Web Application", status: "operational", uptime: "99.9%" },
                        { service: "Database", status: "operational", uptime: "99.8%" },
                        { service: "Email Service", status: "operational", uptime: "99.7%" },
                        { service: "Payment Gateway", status: "operational", uptime: "99.6%" }
                      ].map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{service.service}</p>
                            <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                          </div>
                          <Badge className="bg-ghana-green text-white">
                            {service.status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Full Status Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
