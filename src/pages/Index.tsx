
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Heart, 
  Building, 
  Wrench, 
  UserCheck, 
  FileText, 
  Clock, 
  CreditCard, 
  Award,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const membershipTypes = [
    {
      id: "institutional",
      title: "Institutional Membership",
      description: "For private schools and educational institutions",
      icon: Building,
      color: "bg-ghana-gold",
      textColor: "text-black",
      route: "/register/institutional"
    },
    {
      id: "teacher",
      title: "Teacher Council",
      description: "For educators and teaching professionals",
      icon: GraduationCap,
      color: "bg-ghana-green",
      textColor: "text-white",
      route: "/register/teacher"
    },
    {
      id: "parent",
      title: "Parent Council",
      description: "For parents and guardians of students",
      icon: Heart,
      color: "bg-ghana-red",
      textColor: "text-white",
      route: "/register/parent"
    },
    {
      id: "proprietor",
      title: "Proprietor",
      description: "For school owners and administrators",
      icon: UserCheck,
      color: "bg-earth-brown",
      textColor: "text-white",
      route: "/register/proprietor"
    },
    {
      id: "service-provider",
      title: "Service Provider",
      description: "For vendors and service providers to schools",
      icon: Wrench,
      color: "bg-accent",
      textColor: "text-white",
      route: "/register/service-provider"
    },
    {
      id: "non-teaching",
      title: "Non-Teaching Staff",
      description: "For administrative and support staff",
      icon: Users,
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
      route: "/register/non-teaching"
    }
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Fill Form",
      description: "Complete your membership registration form"
    },
    {
      icon: Clock,
      title: "Wait for Approval",
      description: "Our team reviews your application"
    },
    {
      icon: CreditCard,
      title: "Pay Dues",
      description: "Complete your membership payment"
    },
    {
      icon: Award,
      title: "Get Certificate",
      description: "Download your official membership certificate"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Kwame Asante",
      role: "School Proprietor",
      content: "GNACOPS has transformed how we operate our institution. The support and resources are invaluable.",
      rating: 5
    },
    {
      name: "Mrs. Akosua Mensah",
      role: "Teacher Council Member",
      content: "Being part of GNACOPS has enhanced my professional development significantly.",
      rating: 5
    },
    {
      name: "Mr. Kofi Adjei",
      role: "Parent Council Representative",
      content: "GNACOPS ensures our children receive quality education in private schools across Ghana.",
      rating: 5
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GNACOPS</h1>
                <p className="text-xs text-muted-foreground">Private Schools Council</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Membership
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Button 
                onClick={() => scrollToSection('membership')}
                className="bg-ghana-gold hover:bg-ghana-gold/90 text-black"
              >
                Register Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 border-t pt-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="block w-full text-left text-foreground hover:text-primary transition-colors"
              >
                Membership
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className="block w-full text-left text-foreground hover:text-primary transition-colors"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Button 
                  onClick={() => scrollToSection('membership')}
                  className="flex-1 bg-ghana-gold hover:bg-ghana-gold/90 text-black"
                  size="sm"
                >
                  Register
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Ghana's Leading Private Schools Council
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Join Ghana's Private School Council Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up">
              Empowering educators, parents, and institutions to deliver quality education across Ghana. 
              Register now to become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('membership')}
                className="bg-white text-black hover:bg-gray-100 text-lg px-8"
              >
                Get Started
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('about')}
                className="border-white text-white hover:bg-white/10 text-lg px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About GNACOPS</h2>
            <p className="text-lg text-muted-foreground mb-12">
              The Ghana National Council of Private Schools (GNACOPS) is the premier organization 
              dedicated to advancing quality education in Ghana's private school sector. We bring 
              together educators, parents, school owners, and service providers under one unified platform.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-ghana-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">5,000+ Members</h3>
                <p className="text-muted-foreground">Active community of education professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-ghana-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">500+ Schools</h3>
                <p className="text-muted-foreground">Private institutions across all regions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-ghana-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">15+ Years</h3>
                <p className="text-muted-foreground">Leading educational excellence in Ghana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Register as a Member</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your role and join thousands of education professionals making a difference in Ghana's private school sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {membershipTypes.map((type, index) => (
              <Card 
                key={type.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer gradient-card border-2 hover:border-ghana-gold"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={type.route}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <type.icon className={`w-8 h-8 ${type.textColor}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                    <CardDescription className="text-center">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                      Register Now
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Registration Process</h2>
            <p className="text-lg text-muted-foreground">
              Get your GNACOPS membership in four easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-ghana-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Members Say</h2>
            <p className="text-lg text-muted-foreground">
              Hear from education professionals across Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="gradient-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-ghana-gold text-ghana-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Have questions? We're here to help you join the GNACOPS community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="w-8 h-8 text-ghana-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+233 XX XXX XXXX</p>
              </div>
              
              <div>
                <Mail className="w-8 h-8 text-ghana-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@gnacops.org</p>
              </div>
              
              <div>
                <MapPin className="w-8 h-8 text-ghana-gold mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Office</h3>
                <p className="text-muted-foreground">Accra, Ghana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-brown text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-ghana-gold rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl font-bold">GNACOPS</h3>
              </div>
              <p className="text-gray-300">
                Empowering Ghana's private school sector through professional excellence and community.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
                <li><button onClick={() => scrollToSection('membership')}>Membership</button></li>
                <li><button onClick={() => scrollToSection('process')}>Process</button></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Membership</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/register/institutional">Institutional</Link></li>
                <li><Link to="/register/teacher">Teacher Council</Link></li>
                <li><Link to="/register/parent">Parent Council</Link></li>
                <li><Link to="/register/proprietor">Proprietor</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Ghana National Council of Private Schools (GNACOPS). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
