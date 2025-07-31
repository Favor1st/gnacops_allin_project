import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  Download,
  Eye,
  DollarSign,
  Calendar,
  Receipt,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UserPayments = () => {
  const [payments] = useState([
    {
      id: "PAY-2024-001",
      amount: 250.00,
      description: "Annual Membership Fee 2024",
      date: "2024-01-15",
      status: "completed",
      method: "Mobile Money",
      reference: "MM240115001"
    },
    {
      id: "PAY-2023-012",
      amount: 200.00,
      description: "Annual Membership Fee 2023",
      date: "2023-01-20",
      status: "completed",
      method: "Bank Transfer",
      reference: "BT230120001"
    },
    {
      id: "PAY-2024-002",
      amount: 50.00,
      description: "Certificate Replacement Fee",
      date: "2024-02-10",
      status: "pending",
      method: "Mobile Money",
      reference: "MM240210001"
    }
  ]);

  const [upcomingPayments] = useState([
    {
      description: "Annual Membership Fee 2025",
      amount: 300.00,
      dueDate: "2025-01-15",
      status: "upcoming"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ghana-green text-white"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "pending":
        return <Badge className="bg-ghana-gold text-black"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleMakePayment = () => {
    toast({
      title: "Payment Process",
      description: "Redirecting to payment gateway...",
    });
  };

  const handleDownloadReceipt = (paymentId: string) => {
    toast({
      title: "Receipt Download",
      description: `Receipt for ${paymentId} is being downloaded.`,
    });
  };

  const handleViewPayment = (paymentId: string, description: string) => {
    toast({
      title: "Viewing Payment",
      description: `Opening detailed view for ${description} (${paymentId})`,
    });
  };

  const handlePayUpcoming = (description: string, amount: number) => {
    toast({
      title: "Payment Initiated",
      description: `Processing payment for ${description} (₵${amount.toFixed(2)})`,
    });
  };

  const handleExportPayments = () => {
    toast({
      title: "Export Started",
      description: "Preparing payment history for export...",
    });
  };

  const handleSetUpAutoPay = () => {
    toast({
      title: "Auto-Pay Setup",
      description: "Opening automatic payment setup wizard...",
    });
  };

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your membership payments and billing history</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportPayments}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleSetUpAutoPay}>
            <Calendar className="w-4 h-4 mr-2" />
            Auto-Pay
          </Button>
          <Button 
            className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
            onClick={handleMakePayment}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-ghana-green" />
              <div>
                <p className="text-sm font-medium">Total Paid</p>
                <p className="text-2xl font-bold">₵{totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-ghana-gold" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">₵{pendingAmount.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-ghana-red" />
              <div>
                <p className="text-sm font-medium">Next Due</p>
                <p className="text-lg font-bold">Jan 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="w-4 h-4 text-foreground" />
              <div>
                <p className="text-sm font-medium">Transactions</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      {upcomingPayments.length > 0 && (
        <Card className="gradient-card border-ghana-gold/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Payments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-ghana-gold/30 rounded-lg bg-ghana-gold/5">
                  <div>
                    <h4 className="font-semibold">{payment.description}</h4>
                    <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold">₵{payment.amount.toFixed(2)}</span>
                    <Button 
                      className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                      onClick={() => handlePayUpcoming(payment.description, payment.amount)}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your complete payment transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-ghana-gold/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-ghana-gold" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{payment.description}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>ID: {payment.id}</span>
                        <span>Method: {payment.method}</span>
                        <span>Reference: {payment.reference}</span>
                        <span>Date: {payment.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold">₵{payment.amount.toFixed(2)}</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewPayment(payment.id, payment.description)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {payment.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPayments;