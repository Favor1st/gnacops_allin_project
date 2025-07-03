
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Globe, DollarSign, Mail, Shield } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminLayout 
      title="Platform Settings" 
      description="Configure system-wide settings and preferences"
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="GNACOPS" />
                  </div>
                  <div>
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input id="site-description" defaultValue="Ghana National Association of Private Schools" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="info@gnacops.org" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+233 XX XXX XXXX" />
                  </div>
                  <div>
                    <Label htmlFor="address">Physical Address</Label>
                    <Input id="address" defaultValue="Accra, Ghana" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="GMT+0 (Africa/Accra)" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Membership Auto-Approval</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve certain membership types</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send SMS notifications for important updates</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Marketplace Settings
              </CardTitle>
              <CardDescription>Configure marketplace behavior and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="commission-rate">Vendor Commission Rate (%)</Label>
                    <Input id="commission-rate" type="number" defaultValue="10" min="0" max="100" />
                  </div>
                  <div>
                    <Label htmlFor="min-order">Minimum Order Amount (GHS)</Label>
                    <Input id="min-order" type="number" defaultValue="50" min="0" />
                  </div>
                  <div>
                    <Label htmlFor="max-products">Max Products per Vendor</Label>
                    <Input id="max-products" type="number" defaultValue="100" min="1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="approval-time">Product Approval Time (hours)</Label>
                    <Input id="approval-time" type="number" defaultValue="24" min="1" />
                  </div>
                  <div>
                    <Label htmlFor="featured-fee">Featured Product Fee (GHS)</Label>
                    <Input id="featured-fee" type="number" defaultValue="20" min="0" />
                  </div>
                  <div>
                    <Label htmlFor="refund-period">Refund Period (days)</Label>
                    <Input id="refund-period" type="number" defaultValue="7" min="0" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vendor Auto-Approval</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve verified vendors</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Product Moderation</Label>
                    <p className="text-sm text-muted-foreground">Require admin approval for new products</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Featured Products</Label>
                    <p className="text-sm text-muted-foreground">Allow vendors to feature their products</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Save Marketplace Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment gateways and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Membership Fees</h3>
                  <div>
                    <Label htmlFor="institutional-fee">Institutional Membership (GHS)</Label>
                    <Input id="institutional-fee" type="number" defaultValue="500" min="0" />
                  </div>
                  <div>
                    <Label htmlFor="teacher-fee">Teacher Council (GHS)</Label>
                    <Input id="teacher-fee" type="number" defaultValue="200" min="0" />
                  </div>
                  <div>
                    <Label htmlFor="parent-fee">Parent Council (GHS)</Label>
                    <Input id="parent-fee" type="number" defaultValue="100" min="0" />
                  </div>
                  <div>
                    <Label htmlFor="proprietor-fee">Proprietor (GHS)</Label>
                    <Input id="proprietor-fee" type="number" defaultValue="300" min="0" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Gateways</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mobile Money</Label>
                      <p className="text-sm text-muted-foreground">MTN Mobile Money, AirtelTigo Money</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bank Transfer</Label>
                      <p className="text-sm text-muted-foreground">Direct bank transfers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Card Payments</Label>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard via Paystack</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure email and SMS notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Email Settings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" type="number" defaultValue="587" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">SMTP Username</Label>
                    <Input id="smtp-user" type="email" defaultValue="noreply@gnacops.org" />
                  </div>
                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" defaultValue="GNACOPS" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Membership Applications</Label>
                      <p className="text-sm text-muted-foreground">Notify when new applications are submitted</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Confirmations</Label>
                      <p className="text-sm text-muted-foreground">Send payment confirmation emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vendor Applications</Label>
                      <p className="text-sm text-muted-foreground">Notify about new vendor registrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send system maintenance and error alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" min="5" />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" min="1" />
                  </div>
                  <div>
                    <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                    <Input id="lockout-duration" type="number" defaultValue="15" min="1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password-min-length">Min Password Length</Label>
                    <Input id="password-min-length" type="number" defaultValue="8" min="6" />
                  </div>
                  <div>
                    <Label htmlFor="backup-frequency">Backup Frequency (hours)</Label>
                    <Input id="backup-frequency" type="number" defaultValue="24" min="1" />
                  </div>
                  <div>
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="90" min="1" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SSL/HTTPS Only</Label>
                    <p className="text-sm text-muted-foreground">Force secure connections</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all admin actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
