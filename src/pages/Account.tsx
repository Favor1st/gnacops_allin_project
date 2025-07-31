import React, { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Account = () => {
  const [profile, setProfile] = useState({
    name: "Mary Adjei",
    email: "mary.adjei@gmail.com",
    picture: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profile Updated", description: "Your profile info was saved successfully." });
  };
  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    toast({ title: "Password Changed", description: "Your password was updated successfully." });
    setPasswords({ current: "", new: "", confirm: "" });
  };
  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setTimeout(() => {
        setProfile({ ...profile, picture: URL.createObjectURL(e.target.files![0]) });
        setUploading(false);
        toast({ title: "Profile Picture Updated" });
      }, 1000);
    }
  };

  return (
    <UserLayout title="Account">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {profile.picture ? (
              <img src={profile.picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-muted-foreground">{profile.name[0]}</span>
            )}
          </div>
          <label className="text-sm font-medium cursor-pointer">
            <Input type="file" accept="image/*" className="hidden" onChange={handlePictureUpload} />
            <span className="underline">Change Profile Picture</span>
            {uploading && <span className="ml-2 text-xs">Uploading...</span>}
          </label>
        </div>

        {/* Personal Info Form */}
        <form onSubmit={handleProfileSave} className="space-y-4 bg-white/80 p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <Input
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleProfileChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            required
          />
          <Button type="submit" className="bg-ghana-gold text-black w-full">Save Changes</Button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSave} className="space-y-4 bg-white/80 p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Change Password</h2>
          <Input
            name="current"
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={handlePasswordChange}
            required
          />
          <Input
            name="new"
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={handlePasswordChange}
            required
          />
          <Input
            name="confirm"
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            required
          />
          <Button type="submit" className="bg-ghana-gold text-black w-full">Change Password</Button>
        </form>
      </div>
    </UserLayout>
  );
};

export default Account; 