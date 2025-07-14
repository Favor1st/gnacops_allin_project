import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bell, Check, Trash2, Settings, Mail, CreditCard, Award, Calendar } from "lucide-react";

const UserNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Reminder",
      message: "Your membership fee is due in 7 days. Please make payment to avoid service interruption.",
      type: "payment",
      isRead: false,
      timestamp: "2024-01-15 09:30 AM",
      priority: "high"
    },
    {
      id: 2,
      title: "Certificate Ready",
      message: "Your membership certificate has been processed and is ready for download.",
      type: "certificate",
      isRead: false,
      timestamp: "2024-01-14 02:15 PM",
      priority: "medium"
    },
    {
      id: 3,
      title: "Event Invitation",
      message: "You're invited to the Annual GNACOPS Conference 2024. Registration is now open.",
      type: "event",
      isRead: true,
      timestamp: "2024-01-13 11:45 AM",
      priority: "medium"
    },
    {
      id: 4,
      title: "Profile Update Required",
      message: "Please update your contact information to ensure you receive important communications.",
      type: "profile",
      isRead: true,
      timestamp: "2024-01-12 04:20 PM",
      priority: "low"
    },
    {
      id: 5,
      title: "Welcome to GNACOPS",
      message: "Welcome to the Ghana National Association of Community Pharmacists. Your membership is now active.",
      type: "general",
      isRead: true,
      timestamp: "2024-01-10 10:00 AM",
      priority: "low"
    }
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    paymentReminders: true,
    eventUpdates: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "Notification has been deleted",
    });
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications deleted",
      description: "All notifications have been deleted",
    });
  };

  const handleUpdatePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4 text-red-600" />;
      case "certificate":
        return <Award className="h-4 w-4 text-green-600" />;
      case "event":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "high": "bg-red-100 text-red-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "low": "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All notifications are read"}
          </p>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline" onClick={handleDeleteAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Payment Reminders</label>
                <p className="text-sm text-muted-foreground">Get payment due date reminders</p>
              </div>
              <Switch
                checked={preferences.paymentReminders}
                onCheckedChange={(checked) => setPreferences({ ...preferences, paymentReminders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Event Updates</label>
                <p className="text-sm text-muted-foreground">Notifications about GNACOPS events</p>
              </div>
              <Switch
                checked={preferences.eventUpdates}
                onCheckedChange={(checked) => setPreferences({ ...preferences, eventUpdates: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">System Updates</label>
                <p className="text-sm text-muted-foreground">Platform maintenance and updates</p>
              </div>
              <Switch
                checked={preferences.systemUpdates}
                onCheckedChange={(checked) => setPreferences({ ...preferences, systemUpdates: checked })}
              />
            </div>
          </div>
          <Button onClick={handleUpdatePreferences}>
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up! No new notifications.</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        {getPriorityBadge(notification.priority)}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-ghana-gold rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UserNotifications;