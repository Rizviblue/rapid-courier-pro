import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Users, BarChart3, Shield, Clock, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Package Management",
      description: "Complete tracking and management of packages from pickup to delivery"
    },
    {
      icon: Truck,
      title: "Courier Operations",
      description: "Streamlined courier assignment and route optimization"
    },
    {
      icon: Users,
      title: "Multi-Role System",
      description: "Admin, Agent, and User roles with specific permissions and dashboards"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive reporting and analytics for business insights"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Role-based access control and secure data management"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Live updates on package status and delivery progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Modern Header */}
      <header className="glass glass-dark border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">RapidCourier</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={() => navigate('/login')} className="hover-lift">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Next-Generation Courier Platform
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Modern Courier
              <span className="block text-primary">Management</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your delivery operations with AI-powered routing, real-time tracking, 
              and seamless collaboration tools designed for the modern logistics world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="hover-lift group text-lg px-8 py-4 h-auto"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/register')}
                className="hover-scale text-lg px-8 py-4 h-auto"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline every aspect of your courier operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-modern hover-lift group text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About RapidCourier
              </h2>
              <p className="text-muted-foreground mb-4">
                RapidCourier is a comprehensive courier management system designed to 
                streamline package delivery operations. Our platform provides tools for 
                efficient package tracking, courier management, and customer service.
              </p>
              <p className="text-muted-foreground mb-6">
                With role-based access control, real-time analytics, and intuitive 
                interfaces, we help courier companies optimize their operations and 
                deliver exceptional service to their customers.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Admin dashboard for complete system oversight</li>
                <li>✓ Agent tools for efficient package processing</li>
                <li>✓ User portal for package tracking and management</li>
                <li>✓ Real-time notifications and updates</li>
                <li>✓ Comprehensive reporting and analytics</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Increased Efficiency</h4>
                    <p className="text-sm text-muted-foreground">Reduce processing time by up to 60%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Better Analytics</h4>
                    <p className="text-sm text-muted-foreground">Make data-driven decisions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Improved Customer Service</h4>
                    <p className="text-sm text-muted-foreground">Enhanced tracking and communication</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Courier Operations?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses using RapidCourier to streamline their delivery operations.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/support')}>
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">RapidCourier</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 RapidCourier. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;