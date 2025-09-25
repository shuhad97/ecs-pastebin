import { prisma } from '@/lib/prisma';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Header } from '@/components/Header';

export default async function DashboardPage() {
  const pastes = await prisma.paste.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/60">
              Manage all pastes from here.
            </p>
          </div>
          
          <AdminDashboard pastes={pastes} />
        </div>
      </main>
    </div>
  );
} 