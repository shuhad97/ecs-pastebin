'use client';

import { useState } from 'react';
import type { Paste } from '@prisma/client';

interface AdminDashboardProps {
  pastes: Paste[];
}

// Helper function for consistent date formatting
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function AdminDashboard({ pastes: initialPastes }: AdminDashboardProps) {
  const [pastes, setPastes] = useState(initialPastes);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this paste?')) {
      return;
    }

    try {
      const response = await fetch(`/api/pastes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete paste');
      }

      setPastes(pastes.filter(paste => paste.id !== id));
    } catch (error) {
      console.error('Failed to delete paste:', error);
      alert('Failed to delete paste');
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-foreground/10">
        <table className="w-full">
          <thead className="bg-foreground/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Author</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Language</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Created</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {pastes.map((paste) => (
              <tr key={paste.id} className="hover:bg-foreground/5">
                <td className="px-4 py-3 text-sm">
                  {paste.title || `Untitled ${paste.language} paste`}
                </td>
                <td className="px-4 py-3 text-sm">{paste.authorName}</td>
                <td className="px-4 py-3 text-sm">{paste.language}</td>
                <td className="px-4 py-3 text-sm">
                  {formatDate(paste.createdAt)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleDelete(paste.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 