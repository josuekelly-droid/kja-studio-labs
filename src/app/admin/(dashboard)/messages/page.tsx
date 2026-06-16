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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Messages</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{messages.length} messages · {nonLus} non lus</p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="bg-violet-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-violet-600">{nonLus}</div>
          <div className="text-xs text-violet-500 font-medium mt-0.5">Non lus</div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-gray-600">{messages.length - nonLus}</div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">Lus</div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 text-sm">Aucun message pour le moment.</p>
          <p className="text-xs text-gray-400 mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all ${!msg.traite ? 'border-violet-200 bg-violet-50/20' : 'border-gray-100 hover:shadow-sm'}`}>
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-9 h-9 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {msg.nom.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-heading font-semibold text-gray-900 text-sm">{msg.nom}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${!msg.traite ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-500'}`}>
                      {!msg.traite ? 'Nouveau' : 'Lu'}
                    </span>
                  </div>

                  <p className="text-xs text-violet font-medium mb-1">{msg.email}</p>
                  {msg.entreprise && <p className="text-xs text-gray-400">{msg.entreprise}</p>}

                  <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-700 mb-1">{msg.sujet}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{msg.message}</p>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
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