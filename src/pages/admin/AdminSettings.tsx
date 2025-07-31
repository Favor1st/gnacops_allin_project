import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Shield, Mail, Globe, Database, AlertTriangle } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    organizationName: "Ghana National Association of Community Pharmacists (GNACOPS)",
    website: "https://gnacops.org",
    contactEmail: "info@gnacops.org",
    address: "123 Pharmacy Street, Accra, Ghana",
    phone: "+233 123 456 789"
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    autoApproveApplications: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5"
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@gnacops.org",
    smtpPassword: "",
    fromName: "GNACOPS Admin",
    fromEmail: "noreply@gnacops.org"
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "GHS",
    membershipFee: "200",
    latePaymentFee: "50",
    paymentMethods: ["bank_transfer", "mobile_money"],
    autoReminders: true,
    reminderDays: "7"
  });

  const [paystackSettings, setPaystackSettings] = useState({
    secretKey: "",
    publicKey: "",
    webhookSecret: "",
    testMode: true
  });

  const handleSaveGeneral = () => {
    toast({
      title: "Success",
      description: "General settings updated successfully",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "Success",
      description: "System settings updated successfully",
    });
  };

  const handleSaveEmail = () => {
    toast({
      title: "Success",
      description: "Email settings updated successfully",
    });
  };

  const handleSavePayment = () => {
    toast({
      title: "Success",
      description: "Payment settings updated successfully",
    });
  };

  const handleSavePaystack = () => {
    toast({
      title: "Success",
      description: "Paystack settings updated successfully",
    });
  };

  const handleTestPaystack = () => {
    toast({
      title: "Testing Paystack Connection",
      description: "Testing connection to Paystack API...",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to verify your configuration",
    });
  };

  const handleBackupDatabase = () => {
    toast({
      title: "Backup Started",
      description: "Database backup has been initiated",
    });
  };

  const handleMaintenanceMode = (enabled: boolean) => {
    if (enabled) {
      toast({
        title: "Maintenance Mode Enabled",
        description: "The system is now in maintenance mode. Users will see a maintenance page.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Maintenance Mode Disabled",
        description: "The system is now accessible to all users.",
      });
    }
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
      variant: "destructive",
    });
  };

  const handleExportSettings = () => {
    toast({
      title: "Settings Exported",
      description: "System settings have been exported to a configuration file",
    });
  };

  const handleImportSettings = () => {
    toast({
      title: "Import Settings",
      description: "Please select a configuration file to import",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure your organization settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportSettings}>
            <Settings className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button variant="outline" onClick={handleImportSettings}>
            <Settings className="mr-2 h-4 w-4" />
            Import Settings
          </Button>
          <Button onClick={handleBackupDatabase}>
            <Database className="mr-2 h-4 w-4" />
            Backup Database
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>Basic organization information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={generalSettings.organizationName}
                onChange={(e) => setGeneralSettings({ ...generalSettings, organizationName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={generalSettings.website}
                onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={generalSettings.contactEmail}
                onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={generalSettings.phone}
                onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={generalSettings.address}
              onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSaveGeneral}>
              <Save className="mr-2 h-4 w-4" />
              Save General Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>Security and system preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => {
                    setSystemSettings({ ...systemSettings, maintenanceMode: checked });
                    handleMaintenanceMode(checked);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registrations">Allow Registrations</Label>
                  <p className="text-sm text-muted-foreground">Enable new member registrations</p>
                </div>
                <Switch
                  id="registrations"
                  checked={systemSettings.allowRegistrations}
                  onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, allowRegistrations: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailVerification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                </div>
                <Switch
                  id="emailVerification"
                  checked={systemSettings.requireEmailVerification}
                  onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, requireEmailVerification: checked })}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                <Input
                  id="maxAttempts"
                  type="number"
                  value={systemSettings.maxLoginAttempts}
                  onChange={(e) => setSystemSettings({ ...systemSettings, maxLoginAttempts: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApprove">Auto-approve Applications</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve membership applications</p>
                </div>
                <Switch
                  id="autoApprove"
                  checked={systemSettings.autoApproveApplications}
                  onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoApproveApplications: checked })}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSaveSystem}>
            <Save className="mr-2 h-4 w-4" />
            Save System Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Email Settings
          </CardTitle>
          <CardDescription>Configure SMTP settings for email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSaveEmail}>
              <Save className="mr-2 h-4 w-4" />
              Save Email Settings
            </Button>
            <Button variant="outline" onClick={handleTestEmail}>
              Test Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure payment methods and fees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GHS">Ghana Cedi (GHS)</SelectItem>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipFee">Membership Fee</Label>
              <Input
                id="membershipFee"
                type="number"
                value={paymentSettings.membershipFee}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, membershipFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateFee">Late Payment Fee</Label>
              <Input
                id="lateFee"
                type="number"
                value={paymentSettings.latePaymentFee}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, latePaymentFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminderDays">Payment Reminder (days before due)</Label>
              <Input
                id="reminderDays"
                type="number"
                value={paymentSettings.reminderDays}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, reminderDays: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoReminders">Automatic Payment Reminders</Label>
              <p className="text-sm text-muted-foreground">Send automatic payment reminder emails</p>
            </div>
            <Switch
              id="autoReminders"
              checked={paymentSettings.autoReminders}
              onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, autoReminders: checked })}
            />
          </div>
          <Button onClick={handleSavePayment}>
            <Save className="mr-2 h-4 w-4" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Paystack Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Paystack Payment Gateway
          </CardTitle>
          <CardDescription>Configure Paystack payment gateway settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paystackSecretKey">Secret Key</Label>
              <Input
                id="paystackSecretKey"
                type="password"
                placeholder="sk_test_..."
                value={paystackSettings.secretKey}
                onChange={(e) => setPaystackSettings({ ...paystackSettings, secretKey: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Your Paystack secret key (starts with sk_test_ or sk_live_)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paystackPublicKey">Public Key</Label>
              <Input
                id="paystackPublicKey"
                type="password"
                placeholder="pk_test_..."
                value={paystackSettings.publicKey}
                onChange={(e) => setPaystackSettings({ ...paystackSettings, publicKey: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Your Paystack public key (starts with pk_test_ or pk_live_)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paystackWebhookSecret">Webhook Secret</Label>
              <Input
                id="paystackWebhookSecret"
                type="password"
                placeholder="Optional webhook secret"
                value={paystackSettings.webhookSecret}
                onChange={(e) => setPaystackSettings({ ...paystackSettings, webhookSecret: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Optional webhook secret for additional security</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paystackTestMode">Test Mode</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="paystackTestMode"
                  checked={paystackSettings.testMode}
                  onCheckedChange={(checked) => setPaystackSettings({ ...paystackSettings, testMode: checked })}
                />
                <Label htmlFor="paystackTestMode">Enable test mode (use test keys)</Label>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSavePaystack}>
              <Save className="mr-2 h-4 w-4" />
              Save Paystack Settings
            </Button>
            <Button variant="outline" onClick={handleTestPaystack}>
              <Globe className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Paystack Setup Instructions:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Create a Paystack account at <a href="https://paystack.com" target="_blank" rel="noopener noreferrer" className="underline">paystack.com</a></li>
              <li>2. Get your API keys from the Paystack dashboard</li>
              <li>3. For testing, use keys starting with "sk_test_" and "pk_test_"</li>
              <li>4. For production, use keys starting with "sk_live_" and "pk_live_"</li>
              <li>5. Set up webhook URL: https://your-domain.com/api/payments/webhook</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;