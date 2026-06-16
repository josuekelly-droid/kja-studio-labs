// src/app/admin/(dashboard)/seo/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Logs SEO - Admin',
  robots: { index: false, follow: false },
};

export default async function SeoLogsPage() {
  const logs = await prisma.seoLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const successCount = logs.filter((l) => l.status === 'SUCCESS').length;
  const errorCount = logs.filter((l) => l.status === 'ERROR').length;
  const pendingCount = logs.filter((l) => l.status === 'PENDING').length;

  const statusLabel = (status: string) => {
    switch (status) {
      case 'SUCCESS': return { text: 'Succès', classe: 'bg-green-50 text-green-600' };
      case 'ERROR': return { text: 'Erreur', classe: 'bg-red-50 text-red-600' };
      case 'PENDING': return { text: 'En cours', classe: 'bg-yellow-50 text-yellow-600' };
      default: return { text: status, classe: 'bg-gray-100 text-gray-500' };
    }
  };

  const actionLabel = (action: string) => {
    switch (action) {
      case 'URL_UPDATED': return { text: 'Indexation', classe: 'bg-blue-50 text-blue-600' };
      case 'URL_DELETED': return { text: 'Suppression', classe: 'bg-red-50 text-red-600' };
      default: return { text: action, classe: 'bg-gray-100 text-gray-500' };
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">Logs SEO</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Historique des indexations Google</p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-green-600">{successCount}</div>
          <div className="text-xs text-green-500 font-medium mt-0.5">Succès</div>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-red-600">{errorCount}</div>
          <div className="text-xs text-red-500 font-medium mt-0.5">Erreurs</div>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-heading font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-xs text-yellow-500 font-medium mt-0.5">En cours</div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">URL</th>
                <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Action</th>
                <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-sm">Aucun log pour le moment.</span>
                      <span className="text-xs text-gray-300">Lancez une indexation depuis le dashboard.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const s = statusLabel(log.status);
                  const a = actionLabel(log.action);
                  return (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-xs text-gray-400 whitespace-nowrap font-mono">
                        {new Date(log.createdAt).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-600 max-w-[250px] sm:max-w-[350px] truncate font-mono" title={log.url}>
                        {log.url.replace('https://kja-studio-labs.vercel.app', '')}
                      </td>
                      <td className="px-4 py-2.5 text-center hidden sm:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.classe}`}>{a.text}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${s.classe}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            log.status === 'SUCCESS' ? 'bg-green-500' :
                            log.status === 'ERROR' ? 'bg-red-500' :
                            log.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' :
                            'bg-gray-400'
                          }`} />
                          {s.text}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}