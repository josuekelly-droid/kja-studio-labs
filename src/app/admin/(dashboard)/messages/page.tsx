// src/app/admin/(dashboard)/messages/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Messages - Admin Studio',
  robots: { index: false, follow: false },
};

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  const nonLus = messages.filter((m) => !m.traite).length;

  return (
    <div className="relative space-y-8 pb-12">
      {/* Halo lumineux d'arrière-plan haute précision */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent blur-3xl rounded-full" />

      {/* En-tête de page */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-violet-400 font-semibold">Inquiries & Contact</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">Messages</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
            {messages.length} requêtes au total · <span className="text-violet-300 font-medium">{nonLus} non lus</span>
          </p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-violet-500/30 p-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-3xl font-heading font-black text-violet-400 mb-1">{nonLus}</div>
          <div className="text-xs text-violet-300 font-light tracking-wide">Messages non lus</div>
        </div>
        <div className="rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-3xl font-heading font-black text-gray-200 mb-1">{messages.length - nonLus}</div>
          <div className="text-xs text-gray-400 font-light tracking-wide">Messages traités</div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="relative z-10 rounded-3xl bg-[#0c0616]/80 backdrop-blur-2xl border border-white/10 p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-200 text-sm font-medium">Aucun message pour le moment.</p>
          <p className="text-xs text-gray-500 font-light mt-1">Les transmissions issues du formulaire de contact public s&apos;afficheront ici instantanément.</p>
        </div>
      ) : (
        <div className="relative z-10 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`rounded-3xl border p-6 transition-all duration-300 bg-[#0c0616]/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${
                !msg.traite ? 'border-violet-500/40 bg-violet-500/[0.03] shadow-[0_0_30px_rgba(139,92,246,0.15)]' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600/30 to-purple-600/10 border border-violet-500/30 text-violet-300 rounded-2xl flex items-center justify-center font-heading font-black text-base shrink-0 shadow-md">
                  {msg.nom.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <p className="font-heading font-bold text-white text-base">{msg.nom}</p>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium border ${
                        !msg.traite ? 'bg-violet-500/10 text-violet-300 border-violet-500/30 animate-pulse' : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        {!msg.traite ? 'Nouveau' : 'Traité'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono font-light">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs mb-4 flex-wrap">
                    <a href={`mailto:${msg.email}`} className="text-violet-300 hover:text-white transition-colors font-mono underline decoration-violet-500/30">
                      {msg.email}
                    </a>
                    {msg.entreprise && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400 font-medium">{msg.entreprise}</span>
                      </>
                    )}
                  </div>

                  <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-xl space-y-2">
                    <p className="text-xs font-heading font-bold text-white tracking-wide">{msg.sujet}</p>
                    <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}