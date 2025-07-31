import React, { useState } from "react";
import { UserLayout } from "@/components/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Eye, Truck, CheckCircle, Clock, XCircle, MapPin } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-2024-001",
    status: "delivered",
    total: 2450.00,
    date: "2024-01-25",
    items: 5,
    shipping: "123 Liberation Road, Accra",
    tracking: "TRK-001",
  },
  {
    id: "ORD-2024-002",
    status: "shipped",
    total: 189.99,
    date: "2024-01-24",
    items: 2,
    shipping: "45 Ring Road, Kumasi",
    tracking: "TRK-002",
  },
  {
    id: "ORD-2024-003",
    status: "processing",
    total: 750.50,
    date: "2024-01-23",
    items: 8,
    shipping: "78 Castle Road, Cape Coast",
    tracking: null,
  },
  {
    id: "ORD-2024-004",
    status: "pending",
    total: 3200.00,
    date: "2024-01-22",
    items: 12,
    shipping: "University Avenue, Cape Coast",
    tracking: null,
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-ghana-green text-white"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>;
    case "shipped":
      return <Badge className="bg-blue-500 text-white"><Truck className="w-3 h-3 mr-1" />Shipped</Badge>;
    case "processing":
      return <Badge className="bg-ghana-gold text-black"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
    case "pending":
      return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    case "cancelled":
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const Orders = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsOrder, setDetailsOrder] = useState<any>(null);

  const handleViewOrder = (order: any) => {
    setDetailsOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <UserLayout title="Orders">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {mockOrders.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">You have no orders yet.</div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold">{order.id}</h4>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Date: {order.date}</span>
                        <span>Items: {order.items}</span>
                        <span>Total: GHS {order.total}</span>
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{order.shipping}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      {order.status === "shipped" && order.tracking && (
                        <Button size="sm" className="bg-blue-500 text-white">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Order Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {detailsOrder && (
              <div className="space-y-2">
                <div className="font-semibold">Order ID: {detailsOrder.id}</div>
                <div>Status: {getStatusBadge(detailsOrder.status)}</div>
                <div>Date: {detailsOrder.date}</div>
                <div>Items: {detailsOrder.items}</div>
                <div>Total: GHS {detailsOrder.total}</div>
                <div>Shipping: {detailsOrder.shipping}</div>
                {detailsOrder.tracking && (
                  <div>Tracking: <span className="font-mono">{detailsOrder.tracking}</span></div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsModal(false)} className="w-full">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
};

export default Orders; 