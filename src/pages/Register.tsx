
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  const membershipTypes = {
    institutional: {
      title: "Institutional Membership",
      description: "For private schools and educational institutions",
      steps: 3,
      color: "bg-ghana-gold"
    },
    teacher: {
      title: "Teacher Council Membership",
      description: "For educators and teaching professionals",
      steps: 3,
      color: "bg-ghana-green"
    },
    parent: {
      title: "Parent Council Membership",
      description: "For parents and guardians of students",
      steps: 3,
      color: "bg-ghana-red"
    },
    proprietor: {
      title: "Proprietor Membership",
      description: "For school owners and administrators",
      steps: 3,
      color: "bg-earth-brown"
    },
    "service-provider": {
      title: "Service Provider Membership",
      description: "For vendors and service providers to schools",
      steps: 3,
      color: "bg-accent"
    },
    "non-teaching": {
      title: "Non-Teaching Staff Membership",
      description: "For administrative and support staff",
      steps: 3,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < currentMembership.steps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="Enter your first name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Enter your last name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+233 XX XXX XXXX" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater-accra">Greater Accra</SelectItem>
                    <SelectItem value="ashanti">Ashanti</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="volta">Volta</SelectItem>
                    <SelectItem value="northern">Northern</SelectItem>
                    <SelectItem value="upper-east">Upper East</SelectItem>
                    <SelectItem value="upper-west">Upper West</SelectItem>
                    <SelectItem value="brong-ahafo">Brong Ahafo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Residential Address *</Label>
              <Textarea id="address" placeholder="Enter your full address" required />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
            
            {type === 'institutional' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input id="schoolName" placeholder="Enter school name" required />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolType">School Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="jhs">Junior High School</SelectItem>
                        <SelectItem value="shs">Senior High School</SelectItem>
                        <SelectItem value="mixed">Mixed Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentCount">Number of Students *</Label>
                    <Input id="studentCount" type="number" placeholder="Total enrollment" required />
                  </div>
                </div>
              </>
            )}

            {type === 'teacher' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diploma">Diploma in Education</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Area *</Label>
                    <Input id="subject" placeholder="Main teaching subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input id="experience" type="number" placeholder="Teaching experience" required />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="schoolAddress">School/Institution Address *</Label>
              <Textarea id="schoolAddress" placeholder="Enter institution address" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join GNACOPS? *</Label>
              <Textarea id="motivation" placeholder="Tell us about your motivation..." required />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Declaration & Agreement</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-warm-cream rounded-lg">
                <h4 className="font-semibold mb-2">Terms and Conditions</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  By submitting this application, I agree to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Abide by GNACOPS constitution and regulations</li>
                  <li>Pay membership dues as determined by the council</li>
                  <li>Participate actively in council activities</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Support the advancement of private education in Ghana</li>
                </ul>
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input type="checkbox" required className="mt-1" />
                  <span className="text-sm">
                    I certify that all information provided is true and accurate to the best of my knowledge.
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input type="checkbox" required className="mt-1" />
                  <span className="text-sm">
                    I agree to the GNACOPS terms and conditions and privacy policy.
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    I would like to receive updates and communications from GNACOPS.
                  </span>
                </label>
              </div>

              <div className="p-4 bg-ghana-gold/10 border border-ghana-gold/30 rounded-lg">
                <p className="text-sm font-medium">Next Steps:</p>
                <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                  <li>Your application will be reviewed within 5-7 business days</li>
                  <li>You'll receive an email notification about approval status</li>
                  <li>Upon approval, payment instructions will be provided</li>
                  <li>Complete payment to receive your membership certificate</li>
                </ol>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / currentMembership.steps) * 100;

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
        <div className="max-w-2xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${currentMembership.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentMembership.title}</h1>
            <p className="text-muted-foreground">{currentMembership.description}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {currentMembership.steps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form */}
          <Card className="gradient-card border-2 border-ghana-gold/20">
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>
                Please fill in all required fields to complete your membership application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStepContent()}
                
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="ml-auto bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : currentStep === currentMembership.steps ? (
                      <>
                        Submit Application
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
