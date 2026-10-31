// src/app/admin/login/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.erreur || 'Erreur de connexion');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-2xl border border-red-500/20 backdrop-blur-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm"
          placeholder="admin@kja-studio-labs.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-white text-gray-950 font-heading font-bold rounded-2xl hover:bg-violet-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.01]"
      >
        {loading ? 'Connexion en cours...' : 'Se connecter'}
      </button>
    </form>
  );
}