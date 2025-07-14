import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, MessageSquare, Phone, Mail, Send, Book, Video } from "lucide-react";

const UserSupport = () => {
  const { toast } = useToast();
  const [ticket, setTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    message: ""
  });

  const [tickets] = useState([
    {
      id: 1,
      subject: "Payment Issue",
      category: "Billing",
      status: "open",
      priority: "high",
      createdAt: "2024-01-15",
      lastReply: "2024-01-15"
    },
    {
      id: 2,
      subject: "Certificate Download Problem",
      category: "Technical",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-10",
      lastReply: "2024-01-12"
    }
  ]);

  const faqItems = [
    {
      question: "How do I update my membership information?",
      answer: "You can update your membership information by going to your Profile page and clicking the 'Edit Profile' button."
    },
    {
      question: "When are membership fees due?",
      answer: "Membership fees are due annually on the anniversary of your membership start date. You'll receive reminder emails 30, 14, and 7 days before the due date."
    },
    {
      question: "How do I download my membership certificate?",
      answer: "Go to the Certificates page in your dashboard and click the download button next to your membership certificate."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept bank transfers, mobile money (MTN Mobile Money, Vodafone Cash, AirtelTigo Money), and credit/debit cards."
    },
    {
      question: "How do I reset my password?",
      answer: "Click the 'Forgot Password' link on the login page and follow the instructions sent to your email."
    }
  ];

  const handleSubmitTicket = () => {
    if (!ticket.subject || !ticket.category || !ticket.priority || !ticket.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "Your support ticket has been submitted. We'll respond within 24 hours.",
    });

    setTicket({
      subject: "",
      category: "",
      priority: "",
      message: ""
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "open": "bg-blue-100 text-blue-800",
      "in_progress": "bg-yellow-100 text-yellow-800",
      "resolved": "bg-green-100 text-green-800",
      "closed": "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "high": "bg-red-100 text-red-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "low": "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Help & Support</h2>
          <p className="text-muted-foreground">Get help with your GNACOPS membership</p>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-ghana-gold mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground mb-3">Mon-Fri, 8am-5pm</p>
            <p className="font-medium">+233 123 456 789</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-ghana-gold mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-3">We'll respond within 24 hours</p>
            <p className="font-medium">support@gnacops.org</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-ghana-gold mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">Chat with our support team</p>
            <Button className="bg-ghana-gold text-black hover:bg-ghana-gold/90">Start Chat</Button>
          </CardContent>
        </Card>
      </div>

      {/* Create Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="mr-2 h-5 w-5" />
            Create Support Ticket
          </CardTitle>
          <CardDescription>Submit a detailed support request</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={ticket.subject}
                onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                placeholder="Brief description of your issue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={ticket.category} onValueChange={(value) => setTicket({ ...ticket, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="billing">Billing & Payments</SelectItem>
                  <SelectItem value="technical">Technical Issues</SelectItem>
                  <SelectItem value="account">Account Management</SelectItem>
                  <SelectItem value="membership">Membership Questions</SelectItem>
                  <SelectItem value="certificates">Certificates</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select value={ticket.priority} onValueChange={(value) => setTicket({ ...ticket, priority: value })}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              placeholder="Please provide detailed information about your issue..."
              rows={5}
            />
          </div>
          <Button onClick={handleSubmitTicket}>
            <Send className="mr-2 h-4 w-4" />
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      {/* My Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>Track your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{ticket.subject}</h4>
                  <div className="flex space-x-2 text-sm text-muted-foreground">
                    <span>#{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                    <span>•</span>
                    <span>Created: {ticket.createdAt}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-sm">{item.question}</h4>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                  {index < faqItems.length - 1 && <hr className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">User Guide</h4>
                  <p className="text-sm text-muted-foreground">Complete guide to using the platform</p>
                </div>
                <Button variant="outline" size="sm">
                  <Book className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Video Tutorials</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
                </div>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">System Status</h4>
                  <p className="text-sm text-muted-foreground">Check platform status and updates</p>
                </div>
                <Button variant="outline" size="sm">
                  Check Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSupport;