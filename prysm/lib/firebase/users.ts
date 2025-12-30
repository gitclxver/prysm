import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  runTransaction,
  arrayUnion 
} from 'firebase/firestore';
import { db } from './config';
import { UserProfile, UserMetadata } from '@/types/user';

const METADATA_DOC = 'metadata/userCount';
const EARLY_USERS_DOC = 'metadata/earlyUsers';
const EARLY_USER_LIMIT = 200;

/**
 * Check if a user is in the first 200 users and mark them accordingly
 * Returns the signup number (1-200) if early user, or null if not
 */
export async function checkAndMarkEarlyUser(uid: string): Promise<{ isEarly: boolean; signupNumber: number | null }> {
  try {
    const result = await runTransaction(db, async (transaction) => {
      const metadataRef = doc(db, METADATA_DOC);
      const earlyUsersRef = doc(db, EARLY_USERS_DOC);
      
      // Get current metadata
      const metadataSnap = await transaction.get(metadataRef);
      const earlyUsersSnap = await transaction.get(earlyUsersRef);
      
      let currentCount = 0;
      let earlyUserIds: string[] = [];
      
      if (metadataSnap.exists()) {
        const data = metadataSnap.data();
        currentCount = data.count || 0;
      }
      
      if (earlyUsersSnap.exists()) {
        const data = earlyUsersSnap.data();
        earlyUserIds = data.userIds || [];
      }
      
      // Check if user is already in early users list
      const existingIndex = earlyUserIds.indexOf(uid);
      if (existingIndex !== -1) {
        // User already exists, return their signup number (index + 1)
        return { isEarly: true, signupNumber: existingIndex + 1 };
      }
      
      // Check if we're still under the limit
      const isEarly = currentCount < EARLY_USER_LIMIT;
      let signupNumber: number | null = null;
      
      if (isEarly) {
        // Calculate signup number (current count + 1)
        signupNumber = currentCount + 1;
        
        // Add user to early users list
        transaction.update(earlyUsersRef, {
          userIds: arrayUnion(uid),
        });
      }
      
      // Increment user count
      transaction.set(metadataRef, {
        count: increment(1),
        lastUpdated: serverTimestamp(),
      }, { merge: true });
      
      return { isEarly, signupNumber };
    });
    
    return result;
  } catch (error) {
    console.error('Error checking early user status:', error);
    return { isEarly: false, signupNumber: null };
  }
}

/**
 * Get total user count
 */
export async function getUserCount(): Promise<number> {
  try {
    const metadataRef = doc(db, METADATA_DOC);
    const metadataSnap = await getDoc(metadataRef);
    
    if (metadataSnap.exists()) {
      return metadataSnap.data().count || 0;
    }
    
    return 0;
  } catch (error) {
    console.error('Error getting user count:', error);
    return 0;
  }
}

/**
 * Check if a user is an early user
 */
export async function isEarlyUser(uid: string): Promise<boolean> {
  try {
    const earlyUsersRef = doc(db, EARLY_USERS_DOC);
    const earlyUsersSnap = await getDoc(earlyUsersRef);
    
    if (earlyUsersSnap.exists()) {
      const data = earlyUsersSnap.data();
      const userIds: string[] = data.userIds || [];
      return userIds.includes(uid);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking early user:', error);
    return false;
  }
}

/**
 * Create user profile in Firestore
 */
export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string,
  isEarlyUser: boolean = false,
  signupNumber?: number | null
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    const userProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      uid,
      email,
      displayName,
      photoURL,
      bio: '',
      theme: 'system',
      notifications: {
        email: true,
        push: false,
      },
      isEarlyUser,
      signupNumber: signupNumber || undefined,
    };
    
    await setDoc(userRef, {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Get user's signup number (1-200 for early users)
 */
export async function getUserSignupNumber(uid: string): Promise<number | null> {
  try {
    const earlyUsersRef = doc(db, EARLY_USERS_DOC);
    const earlyUsersSnap = await getDoc(earlyUsersRef);
    
    if (earlyUsersSnap.exists()) {
      const data = earlyUsersSnap.data();
      const userIds: string[] = data.userIds || [];
      const index = userIds.indexOf(uid);
      
      if (index !== -1) {
        return index + 1; // Return 1-based index
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user signup number:', error);
    return null;
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

