// src/app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérifier si l'utilisateur est connecté (sauf pour la page login)
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={session?.user || null} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}