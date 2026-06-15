// src/components/admin/Header.tsx
'use client';

import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  user: { id: string; email: string; name: string | null } | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  );
}