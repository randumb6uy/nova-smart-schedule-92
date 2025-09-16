import React from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import universityIcon from '@/assets/university-icon.png';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-nova-beige/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and welcome */}
        <div className="flex items-center space-x-4">
          <img 
            src={universityIcon} 
            alt="NovaTech University"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-xl font-bold text-nova-navy">Welcome Admin</h1>
            <p className="text-sm text-nova-navy/70">{user?.name}</p>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="nova-outline" size="icon" className="h-10 w-10">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="nova-outline" size="icon" className="h-10 w-10">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;