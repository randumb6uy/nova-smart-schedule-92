import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import studentStudying from '@/assets/student-studying.jpg';
import universityIcon from '@/assets/university-icon.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated) {
    const { user } = useAuth();
    return <Navigate to={`/${user?.role}-dashboard`} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, role);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome to NovaTech University!`,
        });
        // Navigation will be handled by the redirect logic above
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (demoRole: UserRole) => {
    setRole(demoRole);
    switch(demoRole) {
      case 'admin':
        setEmail('admin@demo.com');
        setPassword('admin123');
        break;
      case 'faculty':
        setEmail('faculty@demo.com');
        setPassword('faculty123');
        break;
      case 'student':
        setEmail('student@demo.com');
        setPassword('student123');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-card items-center justify-center p-12">
        <div className="max-w-lg text-center animate-fade-in">
          <img 
            src={studentStudying} 
            alt="Student studying with technology"
            className="w-full h-auto rounded-2xl shadow-medium animate-float"
          />
          <div className="mt-8 space-y-4">
            <h2 className="text-3xl font-bold text-nova-navy">Smart Learning</h2>
            <p className="text-nova-navy/70 text-lg">
              Empowering education through intelligent classroom management and seamless timetable generation
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md shadow-strong animate-slide-in">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <img 
                src={universityIcon} 
                alt="NovaTech University"
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold text-nova-navy">NovaTech</h1>
            </div>
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Access your smart classroom dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <Tabs value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-nova-navy">
                  Email Address
                </label>
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

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-nova-navy">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-nova-navy hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="nova"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials Section */}
            <div className="border-t pt-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-nova-navy mb-2">Demo Credentials</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted rounded-md">
                    <p className="font-medium">Admin Login:</p>
                    <p>Email: admin@demo.com</p>
                    <p>Password: admin123</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1 w-full"
                      onClick={() => fillDemoCredentials('admin')}
                    >
                      Fill Admin Credentials
                    </Button>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="font-medium">Faculty Login:</p>
                    <p>Email: faculty@demo.com</p>
                    <p>Password: faculty123</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1 w-full"
                      onClick={() => fillDemoCredentials('faculty')}
                    >
                      Fill Faculty Credentials
                    </Button>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="font-medium">Student Login:</p>
                    <p>Email: student@demo.com</p>
                    <p>Password: student123</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1 w-full"
                      onClick={() => fillDemoCredentials('student')}
                    >
                      Fill Student Credentials
                    </Button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Demo Credentials</span>
                {showDemoCredentials ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
              
              {showDemoCredentials && (
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="font-medium">Admin:</p>
                    <p>admin1@novatech.edu / password123</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="font-medium">Faculty:</p>
                    <p>faculty1@novatech.edu / password123</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="font-medium">Student:</p>
                    <p>student1@novatech.edu / password123</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground pt-2">
              Not signed up?{" "}
              <button className="text-nova-navy hover:underline">
                Contact Admin
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;