import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Eye, CheckCircle, Store, Search, Shield, MessageSquare, Settings, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockVendors = [
  {
    id: "VND-001",
    name: "Smart Learning Solutions",
    store: "Smart Learning Store",
    status: "pending",
    verified: false,
    email: "admin@smartlearning.com",
    phone: "+233 20 123 4567",
    address: "123 Accra Rd, Accra",
    joinDate: "2024-01-10"
  },
  {
    id: "VND-002",
    name: "EduTech Solutions",
    store: "EduTech Hub",
    status: "approved",
    verified: true,
    email: "info@edutech.com",
    phone: "+233 24 987 6543",
    address: "45 Kumasi Ave, Kumasi",
    joinDate: "2024-01-12"
  },
  {
    id: "VND-003",
    name: "BookWorld",
    store: "BookWorld Shop",
    status: "approved",
    verified: true,
    email: "contact@bookworld.com",
    phone: "+233 27 555 1234",
    address: "78 Cape Coast St, Cape Coast",
    joinDate: "2024-01-15"
  }
];

const AdminVendors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsVendor, setDetailsVendor] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;
  const filteredVendors = mockVendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.store.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const paginatedVendors = filteredVendors.slice((currentPage - 1) * vendorsPerPage, currentPage * vendorsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);
  
  const handleViewVendor = (vendor: any) => {
    setDetailsVendor(vendor);
    setShowDetailsModal(true);
  };
  
  const handleApprove = (vendorId: string, vendorName: string) => {
    toast({
      title: "Vendor Approved",
      description: `${vendorName} has been approved and can now access the marketplace.`,
    });
  };

  const handleReject = (vendorId: string, vendorName: string) => {
    toast({
      title: "Vendor Rejected",
      description: `${vendorName} has been rejected. They will be notified via email.`,
      variant: "destructive",
    });
  };

  const handleContactVendor = (email: string, name: string) => {
    toast({
      title: "Contact Initiated",
      description: `Opening email client to contact ${name} at ${email}`,
    });
  };

  const handleViewStore = (vendorId: string, storeName: string) => {
    toast({
      title: "Viewing Store",
      description: `Opening ${storeName} storefront`,
    });
  };

  const handleManageVendor = (vendorId: string, vendorName: string) => {
    toast({
      title: "Manage Vendor",
      description: `Opening management panel for ${vendorName}`,
    });
  };

  const handleDeleteVendor = (vendorId: string, vendorName: string) => {
    toast({
      title: "Vendor Deleted",
      description: `${vendorName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleBulkApprove = () => {
    toast({
      title: "Bulk Approval",
      description: "Approving all pending vendors...",
    });
  };

  const handleExportVendors = () => {
    toast({
      title: "Export Started",
      description: "Preparing vendor data for export...",
    });
  };

  return (
    <AdminLayout title="Vendor Management" description="Manage vendor accounts and stores">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Management</h1>
            <p className="text-muted-foreground">Manage vendor accounts and marketplace stores</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportVendors}>
              <Search className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleBulkApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Bulk Approve
            </Button>
          </div>
        </div>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="space-y-4">
              {paginatedVendors.map(vendor => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{vendor.name}</h4>
                      <Badge className={vendor.verified ? "bg-ghana-green text-white" : "bg-ghana-gold text-black"}>
                        {vendor.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Store: {vendor.store}</span>
                      <span>Email: {vendor.email}</span>
                      <span>Phone: {vendor.phone}</span>
                      <span>Joined: {vendor.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewVendor(vendor)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {!vendor.verified && (
                      <Button 
                        size="sm" 
                        className="bg-ghana-green text-white" 
                        onClick={() => handleApprove(vendor.id, vendor.name)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewStore(vendor.id, vendor.store)}
                    >
                      <Store className="w-4 h-4 mr-2" />
                      View Store
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContactVendor(vendor.email, vendor.name)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleManageVendor(vendor.id, vendor.name)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteVendor(vendor.id, vendor.name)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </Button>
              {[...Array(totalPages)].map((_, idx) => (
                <Button
                  key={idx + 1}
                  size="sm"
                  variant={currentPage === idx + 1 ? "default" : "outline"}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Button>
              ))}
              <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Vendor Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vendor Details</DialogTitle>
            </DialogHeader>
            {detailsVendor && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Name:</span> {detailsVendor.name}
                  </div>
                  <div>
                    <span className="font-medium">Store:</span> {detailsVendor.store}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {detailsVendor.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {detailsVendor.phone}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Address:</span> {detailsVendor.address}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <Badge className={detailsVendor.verified ? "bg-ghana-green text-white ml-2" : "bg-ghana-gold text-black ml-2"}>
                      {detailsVendor.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Joined:</span> {detailsVendor.joinDate}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleContactVendor(detailsVendor.email, detailsVendor.name)}
                    className="flex-1"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewStore(detailsVendor.id, detailsVendor.store)}
                    className="flex-1"
                  >
                    <Store className="w-4 h-4 mr-2" />
                    View Store
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsModal(false)} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminVendors; 