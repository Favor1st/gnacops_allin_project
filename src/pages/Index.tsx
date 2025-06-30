import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Award, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Star,
  Menu,
  X,
  ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const membershipTypes = [
    {
      title: "Institutional Membership",
      description: "For private schools and educational institutions seeking professional recognition and support.",
      features: ["Official recognition", "Networking opportunities", "Professional development", "Policy advocacy"],
      price: "Contact for pricing",
      popular: true
    },
    {
      title: "Teacher Council",
      description: "Professional membership for teachers in private schools to enhance their career development.",
      features: ["Teaching resources", "Professional certification", "Career advancement", "Peer networking"],
      price: "GHS 120/year"
    },
    {
      title: "Parent Council", 
      description: "Membership for parents to actively participate in their children's educational journey.",
      features: ["School governance participation", "Educational workshops", "Parent networking", "Child advocacy"],
      price: "GHS 80/year"
    },
    {
      title: "Proprietor",
      description: "For school owners and proprietors to connect, learn, and grow their educational enterprises.",
      features: ["Business networking", "Regulatory support", "Best practices sharing", "Growth opportunities"],
      price: "GHS 200/year"
    },
    {
      title: "Service Providers",
      description: "For businesses providing services to schools - suppliers, consultants, and service companies.",
      features: ["Business opportunities", "Network access", "Service promotion", "Partnership opportunities"],
      price: "GHS 150/year"
    },
    {
      title: "Non-Teaching Staff",
      description: "Professional development and recognition for support staff in educational institutions.",
      features: ["Skills development", "Professional recognition", "Career opportunities", "Staff networking"],
      price: "GHS 60/year"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">GNACOPS</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Ghana National Council of Private Schools</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-foreground hover:text-ghana-gold transition-colors">About</a>
              <a href="#membership" className="text-foreground hover:text-ghana-gold transition-colors">Membership</a>
              <Link to="/marketplace" className="text-foreground hover:text-ghana-gold transition-colors flex items-center">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Marketplace
              </Link>
              <a href="#contact" className="text-foreground hover:text-ghana-gold transition-colors">Contact</a>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
              <div className="px-4 py-4 space-y-3">
                <a href="#about" className="block text-foreground hover:text-ghana-gold transition-colors">About</a>
                <a href="#membership" className="block text-foreground hover:text-ghana-gold transition-colors">Membership</a>
                <Link to="/marketplace" className="block text-foreground hover:text-ghana-gold transition-colors flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Marketplace
                </Link>
                <a href="#contact" className="block text-foreground hover:text-ghana-gold transition-colors">Contact</a>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Empowering Private Education in <span className="text-ghana-gold">Ghana</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Join Ghana's premier council for private schools. Professional membership, networking, and growth opportunities for educators, proprietors, and service providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ghana-gold hover:bg-ghana-gold/90 text-black text-lg px-8 py-3">
                <a href="#membership">Explore Membership</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                <Link to="/marketplace" className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Visit Marketplace
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About GNACOPS</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Ghana National Council of Private Schools is the leading professional body championing excellence in private education across Ghana.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card border-2 border-ghana-green/20">
              <CardHeader>
                <Users className="w-12 h-12 text-ghana-green mb-4" />
                <CardTitle>Professional Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with thousands of educators, proprietors, and education professionals across Ghana.</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card border-2 border-ghana-gold/20">
              <CardHeader>
                <Award className="w-12 h-12 text-ghana-gold mb-4" />
                <CardTitle>Standards & Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Promoting high educational standards and professional excellence in private education.</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card border-2 border-ghana-red/20">
              <CardHeader>
                <FileText className="w-12 h-12 text-ghana-red mb-4" />
                <CardTitle>Advocacy & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Advocating for private education interests and providing professional development support.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Options</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the membership type that best fits your role in Ghana's private education sector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipTypes.map((membership, index) => (
              <Card key={index} className={`gradient-card relative ${membership.popular ? 'border-2 border-ghana-gold' : ''}`}>
                {membership.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ghana-gold text-black">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{membership.title}</CardTitle>
                  <CardDescription className="text-base">{membership.description}</CardDescription>
                  <div className="text-2xl font-bold text-ghana-green mt-4">{membership.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {membership.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-ghana-green mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/register/${membership.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="w-full bg-ghana-gold hover:bg-ghana-gold/90 text-black">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to join Ghana's premier private education council</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Membership", description: "Select the membership type that matches your role" },
              { step: "2", title: "Complete Application", description: "Fill out the comprehensive membership form" },
              { step: "3", title: "Review Process", description: "Our team reviews your application thoroughly" },
              { step: "4", title: "Welcome Aboard", description: "Receive your certificate and start networking" }
            ].map((item, index) => (
              <Card key={index} className="gradient-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-ghana-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-black">{item.step}</span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Akosua Frimpong",
                role: "School Proprietor",
                content: "GNACOPS has been instrumental in connecting me with other education leaders. The networking opportunities are invaluable.",
                rating: 5
              },
              {
                name: "Mr. Kwame Asante",
                role: "Senior Teacher",
                content: "The professional development resources and certification programs have significantly enhanced my teaching career.",
                rating: 5
              },
              {
                name: "Mrs. Comfort Osei",
                role: "Parent Council Member",
                content: "Being part of GNACOPS gives me a voice in my child's education and connects me with other concerned parents.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="gradient-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-ghana-gold text-ghana-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
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
      <section id="contact" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">Have questions? We're here to help you join our community.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="gradient-card text-center">
              <CardHeader>
                <Phone className="w-12 h-12 text-ghana-gold mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+233 XX XXX XXXX</p>
                <p className="text-muted-foreground">Mon-Fri, 8AM-5PM</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card text-center">
              <CardHeader>
                <Mail className="w-12 h-12 text-ghana-gold mx-auto mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">info@gnacops.org</p>
                <p className="text-muted-foreground">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card text-center">
              <CardHeader>
                <MapPin className="w-12 h-12 text-ghana-gold mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Accra, Ghana</p>
                <p className="text-muted-foreground">By appointment only</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ghana-green text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-ghana-gold rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">GNACOPS</h3>
                </div>
              </div>
              <p className="text-white/80">Empowering private education excellence across Ghana.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#membership" className="hover:text-white transition-colors">Membership</a></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Membership</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/register/institutional" className="hover:text-white transition-colors">Institutional</Link></li>
                <li><Link to="/register/teacher-council" className="hover:text-white transition-colors">Teacher Council</Link></li>
                <li><Link to="/register/parent-council" className="hover:text-white transition-colors">Parent Council</Link></li>
                <li><Link to="/register/proprietor" className="hover:text-white transition-colors">Proprietor</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/login" className="hover:text-white transition-colors">Member Login</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 Ghana National Council of Private Schools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
