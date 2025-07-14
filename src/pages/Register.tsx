
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MembershipForm from "@/components/MembershipForm";

const Register = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const membershipTypes = {
    institutional: {
      title: "Institutional Membership",
      description: "For private schools and educational institutions",
      color: "bg-ghana-gold"
    },
    teacher: {
      title: "Teacher Council Membership",
      description: "For educators and teaching professionals",
      color: "bg-ghana-green"
    },
    parent: {
      title: "Parent Council Membership",
      description: "For parents and guardians of students",
      color: "bg-ghana-red"
    },
    proprietor: {
      title: "Proprietor Membership",
      description: "For school owners and administrators",
      color: "bg-earth-brown"
    },
    "service-provider": {
      title: "Service Provider Membership",
      description: "For vendors and service providers to schools",
      color: "bg-accent"
    },
    "non-teaching": {
      title: "Non-Teaching Staff Membership",
      description: "For administrative and support staff",
      color: "bg-secondary"
    }
  };

  const currentMembership = membershipTypes[type as keyof typeof membershipTypes];
  
  if (!currentMembership) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Invalid Membership Type</h2>
            <p className="text-muted-foreground mb-4">The requested membership type was not found.</p>
            <Link to="/">
              <Button>Return to Homepage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    console.log('Form submitted with data:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted Successfully!",
        description: "Your membership application has been received. You will be notified once it's reviewed.",
      });
      navigate("/registration-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                <p className="text-xs text-muted-foreground">Registration</p>
              </div>
            </Link>
            
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${currentMembership.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentMembership.title}</h1>
            <p className="text-muted-foreground">{currentMembership.description}</p>
          </div>

          {/* Form */}
          <MembershipForm 
            membershipType={type || ''}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
