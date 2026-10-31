// src/app/admin/(dashboard)/messages/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Messages - Admin',
  robots: { index: false, follow: false },
};

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  const nonLus = messages.filter((m) => !m.traite).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Messages</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">{messages.length} messages · {nonLus} non lus</p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#0c0616]/70 backdrop-blur-2xl border border-violet-500/30 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-2xl font-heading font-bold text-violet-400">{nonLus}</div>
          <div className="text-xs text-violet-300 font-light mt-0.5">Non lus</div>
        </div>
        <div className="rounded-2xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-2xl font-heading font-bold text-gray-300">{messages.length - nonLus}</div>
          <div className="text-xs text-gray-400 font-light mt-0.5">Lus</div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-300 text-sm font-medium">Aucun message pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`rounded-2xl border p-5 transition-all bg-[#0c0616]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
                !msg.traite ? 'border-violet-500/40 bg-violet-500/5' : 'border-white/10 hover:border-violet-500/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/30 text-violet-300 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {msg.nom.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-heading font-semibold text-white text-sm">{msg.nom}</p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                      !msg.traite ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' : 'bg-white/5 text-gray-400 border-white/10'
                    }`}>
                      {!msg.traite ? 'Nouveau' : 'Lu'}
                    </span>
                  </div>

                  <p className="text-xs text-violet-300 font-medium mb-1">{msg.email}</p>
                  {msg.entreprise && <p className="text-xs text-gray-400 font-light">{msg.entreprise}</p>}

                  <div className="mt-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-xs font-heading font-semibold text-white mb-1.5">{msg.sujet}</p>
                    <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>

                  <p className="text-xs text-gray-500 font-light mt-3">
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}