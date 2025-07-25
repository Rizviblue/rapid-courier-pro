import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, Package, ArrowLeft } from 'lucide-react';
import { useAuthStore, UserRole } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate registration delay
    setTimeout(() => {
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role as UserRole,
        phone: formData.phone
      };

      // Auto-login after registration
      login(newUser);
      
      toast({
        title: "Registration Successful",
        description: `Welcome ${formData.name}! Your account has been created.`,
      });

      // Navigate to appropriate dashboard
      navigate(`/${formData.role}/dashboard`);
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoRegister = (role: UserRole) => {
    setFormData({
      name: role === 'agent' ? 'Demo Agent' : 'Demo User',
      email: `demo${role}@courierpro.com`,
      phone: '+1 234 567 8900',
      password: 'password',
      confirmPassword: 'password',
      role: role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation Header */}
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover-lift"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Modern Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">RapidCourier</h1>
            </div>
            <p className="text-muted-foreground">Create your courier management account</p>
          </div>

          {/* Modern Registration Form */}
          <Card className="card-modern hover-scale">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-foreground">Create Account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Join our modern courier management platform
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value as UserRole})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent - Manage courier operations</SelectItem>
                    <SelectItem value="user">User - Track packages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full hover-lift transition-smooth" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

          {/* Modern Demo Registration */}
          <Card className="card-modern">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground">Quick Demo Registration</CardTitle>
              <CardDescription>
                Experience the platform instantly with pre-filled demo data
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleDemoRegister('agent')}
                variant="outline"
                className="justify-between hover-lift group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">Register as Agent</span>
                <span className="text-xs text-muted-foreground">Manage couriers</span>
              </Button>
              
              <Button
                onClick={() => handleDemoRegister('user')}
                variant="outline"
                className="justify-between hover-lift group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">Register as User</span>
                <span className="text-xs text-muted-foreground">Track packages</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 border border-primary/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span>Demo password: <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">password</code></span>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}