// src/app/admin/(dashboard)/messages/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Messages - Admin',
  robots: { index: false, follow: false },
};

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const nonLus = messages.filter((m) => !m.traite).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">{messages.length} messages · {nonLus} non lus</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-2xl border p-5 sm:p-6 ${!msg.traite ? 'border-violet-200 bg-violet-50/30' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${!msg.traite ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-500'}`}>
                      {!msg.traite ? 'Nouveau' : 'Lu'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="font-heading font-semibold text-gray-900">{msg.nom}</p>
                  <p className="text-sm text-violet font-medium">{msg.email}</p>
                  {msg.entreprise && <p className="text-xs text-gray-500">{msg.entreprise}</p>}
                  <p className="text-sm font-medium text-gray-700 mt-2">{msg.sujet}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}