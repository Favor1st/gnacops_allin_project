
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Send, Settings, Eye, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const AdminNotifications = () => {
  const [notifications] = useState([
    {
      id: "1",
      title: "New Membership Application",
      message: "Dr. Kwame Asante has submitted a Teacher Council application",
      type: "membership",
      priority: "high",
      read: false,
      timestamp: "2024-01-25 16:30"
    },
    {
      id: "2",  
      title: "Vendor Application Pending",
      message: "Smart Learning Solutions requires approval",
      type: "marketplace",
      priority: "medium",
      read: false,
      timestamp: "2024-01-25 15:45"
    },
    {
      id: "3",
      title: "Payment Received",
      message: "Payment confirmation for REG-2024-001",
      type: "payment",
      priority: "low",
      read: true,
      timestamp: "2024-01-25 14:20"
    },
    {
      id: "4",
      title: "System Maintenance",
      message: "Scheduled maintenance completed successfully",
      type: "system",
      priority: "low",
      read: true,
      timestamp: "2024-01-25 02:00"
    },
    {
      id: "5",
      title: "Product Review Required",
      message: "3 new products awaiting moderation",
      type: "marketplace",
      priority: "medium",
      read: false,
      timestamp: "2024-01-25 12:15"
    }
  ]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "membership":
        return <Badge className="bg-ghana-gold text-black">Membership</Badge>;
      case "marketplace":
        return <Badge className="bg-ghana-green text-white">Marketplace</Badge>;
      case "payment":
        return <Badge className="bg-blue-500 text-white">Payment</Badge>;
      case "system":
        return <Badge variant="secondary">System</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-ghana-red text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-500 text-white">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AdminLayout 
      title="Notifications" 
      description="Manage system notifications and alerts"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">{unreadCount}</div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-gold">
                {notifications.filter(n => n.priority === 'high').length}
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter(n => n.timestamp.includes('2024-01-25')).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      All Notifications
                    </CardTitle>
                    <CardDescription>System notifications and alerts</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Mark All Read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${
                        !notification.read ? 'border-ghana-gold bg-ghana-gold/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className={`font-semibold ${!notification.read ? 'text-ghana-gold' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-ghana-red rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2">
                            {getTypeBadge(notification.type)}
                            {getPriorityBadge(notification.priority)}
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>Notifications requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div key={notification.id} className="p-4 border border-ghana-gold bg-ghana-gold/5 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-ghana-gold">{notification.title}</h4>
                            <div className="w-2 h-2 bg-ghana-red rounded-full"></div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                          <div className="flex items-center space-x-2">
                            {getTypeBadge(notification.type)}
                            {getPriorityBadge(notification.priority)}
                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button size="sm" className="bg-ghana-green hover:bg-ghana-green/90 text-white">
                            Mark Read
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compose" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Compose Notification
                </CardTitle>
                <CardDescription>Send notifications to users or administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Notification composer coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notification Templates</CardTitle>
                    <CardDescription>Pre-configured notification templates</CardDescription>
                  </div>
                  <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Membership Approval", description: "Notify users when membership is approved" },
                    { name: "Payment Confirmation", description: "Confirm successful payments" },
                    { name: "Vendor Application", description: "Notify about new vendor applications" },
                    { name: "System Maintenance", description: "Inform about scheduled maintenance" }
                  ].map((template, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure notification preferences and delivery options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Notification settings panel coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
