import { collection, getDocs, updateDoc, doc, serverTimestamp, deleteField } from 'firebase/firestore';
import { db } from './config';
import { getUserSignupNumber } from './users';

/**
 * Sync signup numbers for all users based on their position in the early users list
 * This function should be run from an admin page or API route
 */
export async function syncSignupNumbers(): Promise<{
  total: number;
  updated: number;
  skipped: number;
  errors: number;
  details: string[];
}> {
  const results = {
    total: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    details: [] as string[],
  };

  try {
    // Get all users from Firestore
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    results.total = usersSnapshot.size;
    results.details.push(`Found ${results.total} users in database`);

    // Process each user
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();

      try {
        // Skip if user doesn't exist or is deleted
        if (userData.status === 'deleted') {
          results.skipped++;
          results.details.push(`Skipped ${userId}: Account is deleted`);
          continue;
        }

        // Get user's signup number from early users list
        const signupNumber = await getUserSignupNumber(userId);

        if (signupNumber === null) {
          // User is not in early users list
          if (userData.isEarlyUser || userData.signupNumber) {
            // User was marked as early user but not in list, or has signupNumber but not in list
            // Remove signupNumber and isEarlyUser if they exist
            const updates: any = {};
            if (userData.isEarlyUser) {
              updates.isEarlyUser = false;
            }
            if (userData.signupNumber !== undefined && userData.signupNumber !== null) {
              updates.signupNumber = deleteField();
            }
            if (Object.keys(updates).length > 0) {
              updates.updatedAt = serverTimestamp();
              await updateDoc(doc(db, 'users', userId), updates);
              results.updated++;
              results.details.push(`Updated ${userId}: Removed early user status (not in list)`);
            } else {
              results.skipped++;
            }
          } else {
            results.skipped++;
          }
          continue;
        }

        // User is in early users list
        const currentSignupNumber = userData.signupNumber;
        
        // Ensure isEarlyUser is true if signupNumber exists and is <= 200
        const shouldBeEarlyUser = signupNumber !== null && signupNumber <= 200;
        
        if (currentSignupNumber === signupNumber && userData.isEarlyUser === shouldBeEarlyUser) {
          // Signup number and isEarlyUser are already correct
          results.skipped++;
          continue;
        }

        // Update signup number and ensure isEarlyUser is correct
        await updateDoc(doc(db, 'users', userId), {
          signupNumber,
          isEarlyUser: shouldBeEarlyUser,
          updatedAt: serverTimestamp(),
        });

        results.updated++;
        results.details.push(
          `Updated ${userId}: Signup number ${currentSignupNumber || 'missing'} → ${signupNumber}`
        );
      } catch (error: any) {
        results.errors++;
        results.details.push(`Error processing ${userId}: ${error.message || 'Unknown error'}`);
        console.error(`Error syncing signup number for user ${userId}:`, error);
      }
    }

    results.details.push(`\nSync complete: ${results.updated} updated, ${results.skipped} skipped, ${results.errors} errors`);
  } catch (error: any) {
    results.errors++;
    results.details.push(`Fatal error: ${error.message || 'Unknown error'}`);
    console.error('Error syncing signup numbers:', error);
  }

  return results;
}
