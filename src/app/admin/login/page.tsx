// src/app/admin/login/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin - Connexion',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  
  // Si déjà connecté, rediriger vers le dashboard
  if (session) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#05020a] text-white flex items-center justify-center px-4 selection:bg-violet-500/30 selection:text-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo/kja-studio-labs.jpg"
            alt="KJA Studio Labs"
            className="h-12 mx-auto mb-4 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          />
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Administration
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm font-light mt-1.5">
            KJA Studio Labs - Dashboard Admin
          </p>
        </div>

        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}