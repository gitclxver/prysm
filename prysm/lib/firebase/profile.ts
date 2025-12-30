import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { UserProfile } from '@/types/user';

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}


