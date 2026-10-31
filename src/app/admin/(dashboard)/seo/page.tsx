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
      case 'SUCCESS': return { text: 'Succès', classe: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'ERROR': return { text: 'Erreur', classe: 'bg-red-500/10 text-red-400 border-red-500/30' };
      case 'PENDING': return { text: 'En cours', classe: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      default: return { text: status, classe: 'bg-white/5 text-gray-400 border-white/10' };
    }
  };

  const actionLabel = (action: string) => {
    switch (action) {
      case 'URL_UPDATED': return { text: 'Indexation', classe: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'URL_DELETED': return { text: 'Suppression', classe: 'bg-red-500/10 text-red-400 border-red-500/30' };
      default: return { text: action, classe: 'bg-white/5 text-gray-400 border-white/10' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Logs SEO</h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">Historique des indexations Google</p>
        </div>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#0c0616]/70 backdrop-blur-2xl border border-emerald-500/30 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-2xl font-heading font-bold text-emerald-400">{successCount}</div>
          <div className="text-xs text-emerald-300 font-light mt-0.5">Succès</div>
        </div>
        <div className="rounded-2xl bg-[#0c0616]/70 backdrop-blur-2xl border border-red-500/30 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-2xl font-heading font-bold text-red-400">{errorCount}</div>
          <div className="text-xs text-red-300 font-light mt-0.5">Erreurs</div>
        </div>
        <div className="rounded-2xl bg-[#0c0616]/70 backdrop-blur-2xl border border-amber-500/30 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-2xl font-heading font-bold text-amber-400">{pendingCount}</div>
          <div className="text-xs text-amber-300 font-light mt-0.5">En cours</div>
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-3xl bg-[#0c0616]/70 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">URL</th>
                <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Action</th>
                <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400 font-light">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-sm text-gray-300 font-medium">Aucun log pour le moment.</span>
                      <span className="text-xs text-gray-500">Lancez une indexation depuis le dashboard.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const s = statusLabel(log.status);
                  const a = actionLabel(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap font-mono font-light">
                        {new Date(log.createdAt).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-300 max-w-[250px] sm:max-w-[350px] truncate font-mono font-light" title={log.url}>
                        {log.url.replace('https://kja-studio-labs.vercel.app', '')}
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${a.classe}`}>{a.text}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium border ${s.classe}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            log.status === 'SUCCESS' ? 'bg-emerald-400' :
                            log.status === 'ERROR' ? 'bg-red-400' :
                            log.status === 'PENDING' ? 'bg-amber-400 animate-pulse' :
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