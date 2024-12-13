"use client"
import { useState } from 'react';
import { User, LayoutDashboard, UserCircle, Settings, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/profile', label: 'Profile', icon: UserCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className="flex justify-end p-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="absolute right-4 top-4">
              <X className="h-6 w-6" />
            </Button>
          </SheetHeader>
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
