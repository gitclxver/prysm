'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { schoolsData } from '@/scripts/schools-data';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function SeedSchoolsPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ added: 0, skipped: 0, errors: 0, current: '' });

  const handleSeed = async () => {
    if (!confirm(`This will add ${schoolsData.length} schools to the database. Continue?`)) {
      return;
    }

    setLoading(true);
    setProgress({ added: 0, skipped: 0, errors: 0, current: '' });

    const schoolsRef = collection(db, 'schools');

    for (const schoolData of schoolsData) {
      try {
        setProgress(prev => ({ ...prev, current: schoolData.name }));

        // Check if school already exists
        const q = query(
          schoolsRef,
          where('country', '==', schoolData.country),
          where('name', '==', schoolData.name)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setProgress(prev => ({ ...prev, skipped: prev.skipped + 1 }));
          continue;
        }

        // Add the school
        await addDoc(schoolsRef, {
          name: schoolData.name,
          country: schoolData.country,
          region: schoolData.region || null,
          city: schoolData.city || null,
          abbreviations: schoolData.abbreviations || null,
          type: schoolData.type || null,
          studentCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setProgress(prev => ({ ...prev, added: prev.added + 1 }));

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error adding ${schoolData.name}:`, error);
        setProgress(prev => ({ ...prev, errors: prev.errors + 1 }));
      }
    }

    setLoading(false);
    setProgress(prev => ({ ...prev, current: '' }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--prysm-bg)]">
        <Card className="max-w-2xl w-full">
          <h1 className="text-3xl font-extrabold mb-6">Seed Schools Database</h1>
          
          <div className="mb-6">
            <p className="text-[var(--text-secondary)] mb-4">
              This will add {schoolsData.length} pre-built schools and institutions to the database.
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              The script will skip schools that already exist in the database.
            </p>
          </div>

          {loading && (
            <div className="mb-6 p-4 bg-[var(--bg-overlay)] rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Processing: <span className="font-semibold text-[var(--text-primary)]">{progress.current}</span>
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-[var(--lime)]">✓ Added: {progress.added}</span>
                <span className="text-[var(--text-secondary)]">⏭ Skipped: {progress.skipped}</span>
                <span className="text-red-400">✗ Errors: {progress.errors}</span>
              </div>
            </div>
          )}

          {!loading && progress.added > 0 && (
            <div className="mb-6 p-4 bg-[var(--lime)]/10 border border-[var(--lime)]/30 rounded-lg">
              <p className="font-semibold text-[var(--text-primary)] mb-2">Seeding Complete!</p>
              <div className="flex gap-4 text-sm">
                <span className="text-[var(--lime)]">✓ Added: {progress.added}</span>
                <span className="text-[var(--text-secondary)]">⏭ Skipped: {progress.skipped}</span>
                <span className="text-red-400">✗ Errors: {progress.errors}</span>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSeed}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Seeding...' : `Seed ${schoolsData.length} Schools`}
          </Button>
        </Card>
      </div>
    </ProtectedRoute>
  );
}

