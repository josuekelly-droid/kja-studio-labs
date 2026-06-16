// src/app/admin/projets/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from './DeleteButton';

export const metadata: Metadata = {
  title: 'Projets - Admin',
  robots: { index: false, follow: false },
};

const categoriesLabels: Record<string, string> = {
  UI_UX_DESIGN: 'UI/UX Design',
  FULLSTACK: 'Fullstack',
  CONNECT: 'Connect',
};

export default async function AdminProjetsPage() {
  const projets = await prisma.projet.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      images: { take: 1, where: { type: 'PRINCIPALE' } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
          Projets ({projets.length})
        </h1>
        <Link
          href="/admin/projets/nouveau"
          className="px-4 sm:px-6 py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-xl hover:bg-violet-700 transition-all"
        >
          + Nouveau projet
        </Link>
      </div>

      {projets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">Aucun projet pour le moment.</p>
          <Link href="/admin/projets/nouveau" className="text-violet hover:underline text-sm mt-2 inline-block">
            Créer votre premier projet
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">
                    Projet
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase hidden sm:table-cell">
                    Catégorie
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-center px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">
                    Statut
                  </th>
                  <th className="text-right px-4 sm:px-6 py-3 text-xs font-heading font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projets.map((projet) => (
                  <tr key={projet.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex items-center gap-3">
                        {projet.imagePrincipale ? (
                          <img
                            src={projet.imagePrincipale}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : projet.images[0] ? (
                          <img
                            src={projet.images[0].url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            🖼️
                          </div>
                        )}
                        <span className="font-medium text-sm text-gray-900 line-clamp-1">
                          {projet.titre || 'Sans titre'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 hidden sm:table-cell">
                      <span className="text-xs font-medium text-gray-500">
                        {categoriesLabels[projet.categorie] || projet.categorie}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-500 hidden md:table-cell">
                      {new Date(projet.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                        projet.estPublie
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {projet.estPublie ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projets/${projet.id}`}
                          className="text-sm text-violet hover:underline font-medium"
                        >
                          Modifier
                        </Link>
                        <DeleteButton projetId={projet.id} projetTitre={projet.titre} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}