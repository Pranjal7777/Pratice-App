"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mic2, Image as ImageIcon, PlusCircle, Headphones, Settings, LogOut, ChevronRight, Moon, Sun, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Mic2 },
  { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/dashboard/add-new-song', label: 'Add New Song', icon: PlusCircle },
  { href: '/dashboard/recordings', label: 'Recording History', icon: Headphones },
  { href: '/dashboard/pratice', label: 'Pratice', icon: Music },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); 
  };

  return (
    <aside className="bg-gradient-to-b from-primary/10 via-primary/5 to-background w-64 h-screen p-6 flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <Mic2 className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">{"Singer's"}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-sm text-muted-foreground">Pro Plan</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Weekly Goal</p>
          <Progress value={33} className="h-2" />
          <p className="text-xs text-muted-foreground">5/15 hours practiced</p>
        </div>
      </div>
      
      <nav className="flex-grow space-y-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start h-12 px-4"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
              {pathname === item.href && <ChevronRight className="ml-auto h-5 w-5" />}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-border/50">
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 h-12 px-4">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}