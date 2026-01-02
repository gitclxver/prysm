'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { doc, getDoc, collection, getDocs, updateDoc, query, where, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function AssignSignupNumbersPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const assignSignupNumbers = async () => {
    setLoading(true);
    setResult('');

    try {
      // Get the early users document
      const earlyUsersRef = doc(db, 'metadata', 'earlyUsers');
      const earlyUsersSnap = await getDoc(earlyUsersRef);

      if (!earlyUsersSnap.exists()) {
        setResult('Error: Early users document not found');
        setLoading(false);
        return;
      }

      const earlyUsersData = earlyUsersSnap.data();
      const userIds: string[] = earlyUsersData.userIds || [];

      if (userIds.length === 0) {
        setResult('No early users found');
        setLoading(false);
        return;
      }

      // Get all user profiles
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);

      const batch = writeBatch(db);
      let updatedCount = 0;
      let skippedCount = 0;

      // For each user ID in the early users list, assign their signup number
      userIds.forEach((uid, index) => {
        const signupNumber = index + 1; // 1-based index

        // Check if user profile exists
        const userDoc = usersSnapshot.docs.find(doc => doc.id === uid);
        
        if (userDoc) {
          const userData = userDoc.data();
          
          // Only update if signupNumber is missing or incorrect
          if (!userData.signupNumber || userData.signupNumber !== signupNumber) {
            const userRef = doc(db, 'users', uid);
            batch.update(userRef, { signupNumber });
            updatedCount++;
          } else {
            skippedCount++;
          }
        }
      });

      // Commit the batch
      await batch.commit();

      setResult(`Success! Updated ${updatedCount} users, skipped ${skippedCount} users (already had correct signup numbers).`);
    } catch (error: any) {
      console.error('Error assigning signup numbers:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--prysm-bg)]">
        <Card className="max-w-2xl w-full">
          <h1 className="text-3xl font-extrabold mb-6">Assign Signup Numbers</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            This will assign signup numbers (1-200) to all early users who don&apos;t have one.
            The signup number is based on their position in the early users list.
          </p>
          <Button onClick={assignSignupNumbers} disabled={loading} className="mb-4">
            {loading ? 'Assigning...' : 'Assign Signup Numbers to Early Users'}
          </Button>
          {result && (
            <div className={`p-4 rounded-lg ${
              result.startsWith('Error') 
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-green-500/10 border border-green-500/20 text-green-400'
            }`}>
              {result}
            </div>
          )}
        </Card>
      </div>
    </ProtectedRoute>
  );
}

