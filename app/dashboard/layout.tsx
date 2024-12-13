import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
        {/* Mobile Header */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
        
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
