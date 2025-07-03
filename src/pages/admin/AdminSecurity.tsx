
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Eye, Lock, Activity } from "lucide-react";

const AdminSecurity = () => {
  const securityLogs = [
    {
      id: "1",
      type: "login",
      user: "john@gnacops.org",
      action: "Successful login",
      ip: "192.168.1.100",
      timestamp: "2024-01-25 16:30:15",
      status: "success"
    },
    {
      id: "2",
      type: "failed_login",
      user: "unknown@example.com",
      action: "Failed login attempt",
      ip: "45.123.45.67",
      timestamp: "2024-01-25 15:45:22",
      status: "warning"
    },
    {
      id: "3",
      type: "permission_change",
      user: "admin@gnacops.org",
      action: "Modified user permissions for mary@gnacops.org",
      ip: "192.168.1.101",
      timestamp: "2024-01-25 14:20:10",
      status: "info"
    },
    {
      id: "4",
      type: "suspicious_activity",
      user: "automated_system",
      action: "Multiple failed login attempts detected",
      ip: "88.77.66.55",
      timestamp: "2024-01-25 13:15:45",
      status: "danger"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-ghana-green text-white">Success</Badge>;
      case "warning":
        return <Badge className="bg-orange-500 text-white">Warning</Badge>;
      case "danger":
        return <Badge className="bg-ghana-red text-white">Danger</Badge>;
      case "info":
        return <Badge className="bg-blue-500 text-white">Info</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "login":
        return <Lock className="w-4 h-4" />;
      case "failed_login":
        return <AlertTriangle className="w-4 h-4" />;
      case "permission_change":
        return <Shield className="w-4 h-4" />;
      case "suspicious_activity":
        return <AlertTriangle className="w-4 h-4 text-ghana-red" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout 
      title="Security Center" 
      description="Monitor system security and access controls"
    >
      <div className="space-y-6">
        {/* Security Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="gradient-card border-2 border-ghana-green/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-green">85%</div>
              <p className="text-xs text-muted-foreground">Good security posture</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Current admin sessions</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-orange-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Failed Logins (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">23</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card className="gradient-card border-2 border-ghana-red/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Blocked IPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ghana-red">5</div>
              <p className="text-xs text-muted-foreground">Suspicious activity</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Security Activity Log
                    </CardTitle>
                    <CardDescription>Recent security events and system activities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityLogs.map((log) => (
                    <div key={log.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {getTypeIcon(log.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{log.action}</span>
                          {getStatusBadge(log.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>User: {log.user}</span>
                          <span className="mx-2">•</span>
                          <span>IP: {log.ip}</span>
                          <span className="mx-2">•</span>
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Access Control Management
                </CardTitle>
                <CardDescription>Manage user permissions and access rights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Active Admin Sessions</h3>
                    <div className="space-y-3">
                      {[
                        { user: "john@gnacops.org", ip: "192.168.1.100", lastActive: "2 minutes ago" },
                        { user: "mary@gnacops.org", ip: "192.168.1.101", lastActive: "15 minutes ago" },
                        { user: "peter@gnacops.org", ip: "10.0.0.25", lastActive: "1 hour ago" }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{session.user}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.ip} • {session.lastActive}
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Blocked IP Addresses</h3>
                    <div className="space-y-3">
                      {[
                        { ip: "45.123.45.67", reason: "Multiple failed login attempts", blocked: "2 hours ago" },
                        { ip: "88.77.66.55", reason: "Suspicious activity", blocked: "1 day ago" },
                        { ip: "12.34.56.78", reason: "Brute force attack", blocked: "3 days ago" }
                      ].map((blocked, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{blocked.ip}</p>
                            <p className="text-sm text-muted-foreground">
                              {blocked.reason} • {blocked.blocked}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Unblock
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Security Monitoring
                </CardTitle>
                <CardDescription>Real-time security monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Active Monitors</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Failed Login Monitor", status: "active", alerts: 3 },
                        { name: "Suspicious IP Detector", status: "active", alerts: 1 },
                        { name: "Permission Change Tracker", status: "active", alerts: 0 },
                        { name: "Data Export Monitor", status: "active", alerts: 0 }
                      ].map((monitor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{monitor.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {monitor.alerts} alerts in last 24h
                            </p>
                          </div>
                          <Badge className="bg-ghana-green text-white">
                            {monitor.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Recent Security Alerts</h3>
                    <div className="space-y-3">
                      {[
                        { alert: "Multiple failed logins from 45.123.45.67", time: "5 minutes ago", severity: "high" },
                        { alert: "Admin permission changed", time: "2 hours ago", severity: "medium" },
                        { alert: "Unusual access pattern detected", time: "6 hours ago", severity: "low" }
                      ].map((alert, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm">{alert.alert}</p>
                            <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Security Policies
                </CardTitle>
                <CardDescription>Configure security policies and compliance settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Password Policy",
                      description: "Minimum 8 characters, requires uppercase, lowercase, number, and special character",
                      status: "active",
                      lastUpdated: "2024-01-15"
                    },
                    {
                      title: "Account Lockout Policy",
                      description: "Lock account after 5 failed attempts for 15 minutes",
                      status: "active",
                      lastUpdated: "2024-01-10"
                    },
                    {
                      title: "Session Management",
                      description: "Automatic logout after 30 minutes of inactivity",
                      status: "active", 
                      lastUpdated: "2024-01-20"
                    },
                    {
                      title: "Data Retention Policy",
                      description: "Security logs retained for 90 days, user data for 7 years",
                      status: "active",
                      lastUpdated: "2024-01-05"
                    }
                  ].map((policy, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{policy.title}</h4>
                          <Badge className="bg-ghana-green text-white">{policy.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{policy.description}</p>
                        <p className="text-xs text-muted-foreground">Last updated: {policy.lastUpdated}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;
