
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center gradient-card border-2 border-ghana-gold/30">
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-ghana-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-ghana-green">Application Submitted!</CardTitle>
            <CardDescription>
              Your GNACOPS membership application has been successfully submitted.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-left">
                <Clock className="w-5 h-5 text-ghana-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Review Process</p>
                  <p className="text-xs text-muted-foreground">
                    Your application will be reviewed within 5-7 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-left">
                <Mail className="w-5 h-5 text-ghana-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Email Notification</p>
                  <p className="text-xs text-muted-foreground">
                    You'll receive updates about your application status via email.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-ghana-gold/10 border border-ghana-gold/30 rounded-lg text-left">
              <p className="font-medium text-sm mb-2">Application Reference</p>
              <p className="text-xs font-mono bg-white px-2 py-1 rounded border">
                REF-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Save this reference number for future communication.
              </p>
            </div>

            <div className="space-y-3">
              <Link to="/" className="block">
                <Button className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
              </Link>
              
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">
                  Login to Portal
                </Button>
              </Link>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Need help? Contact us at <span className="text-ghana-gold">support@gnacops.org</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
