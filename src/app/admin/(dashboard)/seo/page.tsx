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

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Logs SEO</h1>
      <p className="text-sm text-gray-500 mb-6">
        {logs.length} entrées · {successCount} succès · {errorCount} erreurs
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">URL</th>
                <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Action</th>
                <th className="text-center px-4 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-500">Aucun log pour le moment.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 max-w-[300px] truncate">{log.url}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        log.action === 'URL_UPDATED' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {log.action === 'URL_UPDATED' ? 'Indexation' : 'Suppression'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        log.status === 'SUCCESS' ? 'bg-green-50 text-green-600' :
                        log.status === 'ERROR' ? 'bg-red-50 text-red-600' :
                        log.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {log.status === 'SUCCESS' ? '✅ Succès' :
                         log.status === 'ERROR' ? '❌ Erreur' :
                         log.status === 'PENDING' ? '⏳ En cours' :
                         log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}