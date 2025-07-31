import React, { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    address: "123 Main St, Accra, Ghana",
    phone: "+233 24 123 4567",
    isDefault: true,
  },
  {
    id: 2,
    label: "Work",
    address: "456 Business Rd, Kumasi, Ghana",
    phone: "+233 20 987 6543",
    isDefault: false,
  },
];

const Addresses = () => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showDialog, setShowDialog] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);
  const [form, setForm] = useState({ label: "", address: "", phone: "" });

  const openAdd = () => {
    setEditAddress(null);
    setForm({ label: "", address: "", phone: "" });
    setShowDialog(true);
  };
  const openEdit = (addr: any) => {
    setEditAddress(addr);
    setForm({ label: addr.label, address: addr.address, phone: addr.phone });
    setShowDialog(true);
  };
  const closeDialog = () => setShowDialog(false);

  const handleSave = () => {
    if (editAddress) {
      setAddresses(addrs =>
        addrs.map(a =>
          a.id === editAddress.id ? { ...a, ...form } : a
        )
      );
    } else {
      setAddresses(addrs => [
        ...addrs,
        { ...form, id: Date.now(), isDefault: false },
      ]);
    }
    setShowDialog(false);
  };
  const handleDelete = (id: number) => {
    setAddresses(addrs => addrs.filter(a => a.id !== id));
  };

  return (
    <UserLayout title="Addresses">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Saved Addresses</CardTitle>
            <Button size="sm" className="bg-ghana-gold text-black" onClick={openAdd}>
              <Plus className="w-4 h-4 mr-2" /> Add Address
            </Button>
          </CardHeader>
          <CardContent>
            {addresses.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">No addresses saved yet.</div>
            ) : (
              <div className="space-y-4">
                {addresses.map(addr => (
                  <div key={addr.id} className="flex items-center border rounded-lg p-4 space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-lg">{addr.label}</span>
                        {addr.isDefault && <Badge className="bg-ghana-green text-white">Default</Badge>}
                      </div>
                      <div className="text-muted-foreground text-sm">{addr.address}</div>
                      <div className="text-muted-foreground text-sm">{addr.phone}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(addr)}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(addr.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editAddress ? "Edit Address" : "Add Address"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Label (e.g. Home, Work)"
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              />
              <Input
                placeholder="Address"
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              />
              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSave} className="bg-ghana-gold text-black">
                {editAddress ? "Save Changes" : "Add Address"}
              </Button>
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
};

export default Addresses; 