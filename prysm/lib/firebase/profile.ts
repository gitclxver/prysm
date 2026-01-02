import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, auth } from './config';
import { UserProfile } from '@/types/user';

/**
 * Update user profile (creates document if it doesn't exist)
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    
    // Check if document exists
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // Document exists, use updateDoc
      // Remove undefined values (Firestore doesn't allow them)
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );
      await updateDoc(userRef, {
        ...cleanUpdates,
        updatedAt: serverTimestamp(),
      });
    } else {
      // Document doesn't exist, create it with setDoc
      // Get user from auth to include required fields
      if (typeof window === 'undefined' || !auth) {
        throw new Error('Cannot create user profile on server side');
      }
      
      const currentUser = auth.currentUser;
      
      if (!currentUser || currentUser.uid !== uid) {
        throw new Error('User not authenticated or uid mismatch');
      }
      
      // Create document - setDoc will create it, merge ensures we don't overwrite if it somehow exists
      // Remove undefined values (Firestore doesn't allow them)
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );
      await setDoc(userRef, {
        uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        photoURL: currentUser.photoURL || null,
        bio: '',
        theme: 'system',
        notifications: {
          email: true,
          push: false,
        },
        isEarlyUser: false,
        ...cleanUpdates,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}


