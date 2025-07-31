import React, { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "user@example.com",
    phone: "+233 24 123 4567",
    notifyEmail: true,
    notifySMS: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitch = (name: string, value: boolean) => {
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings updated!",
        description: "Your account settings have been saved.",
      });
    }, 1000);
  };

  return (
    <UserLayout title="Account Settings">
      <div className="max-w-xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSave}>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <Input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Notifications</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={form.notifyEmail}
                      onCheckedChange={val => handleSwitch("notifyEmail", val)}
                      id="notifyEmail"
                    />
                    <label htmlFor="notifyEmail">Email</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={form.notifySMS}
                      onCheckedChange={val => handleSwitch("notifySMS", val)}
                      id="notifySMS"
                    />
                    <label htmlFor="notifySMS">SMS</label>
                  </div>
                </div>
              </div>
              <Button type="submit" className="bg-ghana-gold text-black w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default AccountSettings; 