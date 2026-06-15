// src/app/admin/login/page.tsx
import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin - Connexion',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo/kja-studio-labs.jpg"
            alt="KJA Studio Labs"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Administration
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            KJA Studio Labs - Dashboard Admin
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}