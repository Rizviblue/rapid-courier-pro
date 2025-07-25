import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, AlertCircle, HelpCircle, Package, ArrowLeft } from 'lucide-react';
import { useAuthStore, UserRole } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';
import ForgotPassword from './ForgotPassword';
import { ThemeToggle } from './ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  
  const { login, demoLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // Demo login logic
      if (email === 'admin@courierpro.com' && password === 'password') {
        demoLogin('admin');
        navigate('/admin/dashboard');
      } else if (email === 'agent@courierpro.com' && password === 'password') {
        demoLogin('agent');
        navigate('/agent/dashboard');
      } else if (email === 'user@courierpro.com' && password === 'password') {
        demoLogin('user');
        navigate('/user/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Use demo credentials below.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: UserRole) => {
    demoLogin(role);
    navigate(`/${role}/dashboard`);
    toast({
      title: "Demo Login Successful",
      description: `Logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}`,
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
            <p className="text-muted-foreground">Welcome back to your courier dashboard</p>
          </div>

          {/* Modern Login Form */}
          <Card className="card-modern hover-scale">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-foreground">Sign In</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button 
                type="submit" 
                className="w-full hover-lift transition-smooth" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-primary hover:underline"
              >
                Forgot Password?
              </button>
              <div className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Modern Demo Credentials */}
          <Card className="card-modern">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground">Quick Demo Access</CardTitle>
              <CardDescription>
                Experience the platform instantly with demo accounts
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleDemoLogin('admin')}
                variant="outline"
                className="justify-between hover-lift group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">Admin</span>
                <span className="text-xs text-muted-foreground">Full system access</span>
              </Button>
              
              <Button
                onClick={() => handleDemoLogin('agent')}
                variant="outline"
                className="justify-between hover-lift group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">Agent</span>
                <span className="text-xs text-muted-foreground">Courier management</span>
              </Button>
              
              <Button
                onClick={() => handleDemoLogin('user')}
                variant="outline"
                className="justify-between hover-lift group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">User</span>
                <span className="text-xs text-muted-foreground">Track packages</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 border border-primary/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span>Demo password: <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">password</code></span>
            </div>
          </CardContent>
        </Card>

          {/* Support Contact Link */}
          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">Need help?</span>
                <Link to="/support" className="text-primary hover:underline text-sm transition-colors">
                  Contact Support
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ForgotPassword 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />
    </div>
  );
}