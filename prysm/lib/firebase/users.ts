import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  runTransaction,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { db } from "./config";
import { UserProfile, UserMetadata } from "@/types/user";

const METADATA_DOC = "metadata/userCount";
const EARLY_USERS_DOC = "metadata/earlyUsers";
const EARLY_USER_LIMIT = 200;

/**
 * Check if a user is in the first 200 users and mark them accordingly
 * Returns the signup number (1-200) if early user, or null if not
 */
export async function checkAndMarkEarlyUser(
  uid: string
): Promise<{ isEarly: boolean; signupNumber: number | null }> {
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

      // Check if we're still under the limit (use earlyUserIds length, not total count)
      const currentEarlyUsersCount = earlyUserIds.length;
      const isEarly = currentEarlyUsersCount < EARLY_USER_LIMIT;
      let signupNumber: number | null = null;

      if (isEarly) {
        // Calculate signup number (current early users count + 1)
        signupNumber = currentEarlyUsersCount + 1;

        // Add user to early users list
        // Handle both cases: document exists or doesn't exist
        if (earlyUsersSnap.exists()) {
          // Document exists, use update with arrayUnion
          transaction.update(earlyUsersRef, {
            userIds: arrayUnion(uid),
          });
        } else {
          // Document doesn't exist, create it with the first user
          transaction.set(earlyUsersRef, {
            userIds: [uid],
          });
        }
      }

      // Increment user count
      transaction.set(
        metadataRef,
        {
          count: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );

      return { isEarly, signupNumber };
    });

    return result;
  } catch (error) {
    console.error("Error checking early user status:", error);
    console.error("Error details:", {
      uid,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    // Don't fail silently - re-throw so we can see what's wrong
    // But for now, return null to prevent blocking signup
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
    console.error("Error getting user count:", error);
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
    console.error("Error checking early user:", error);
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
  signupNumber?: number | null,
  username?: string,
  privacyPolicyAccepted: boolean = false,
  firstName?: string,
  lastName?: string
): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);

    // Build user profile data with proper typing for Firestore
    // Using Record<string, unknown> to allow FieldValue (serverTimestamp) which converts to Timestamp in Firestore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userProfileData: Record<string, any> = {
      uid,
      email,
      displayName,
      firstName,
      lastName,
      username,
      photoURL,
      bio: "",
      theme: "system",
      notifications: {
        email: true,
        push: false,
      },
      isEarlyUser,
      ...(signupNumber !== null && signupNumber !== undefined ? { signupNumber } : {}),
      privacyPolicyAccepted,
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add privacy policy acceptance timestamps if accepted
    if (privacyPolicyAccepted) {
      userProfileData.privacyPolicyAcceptedAt = serverTimestamp();
      userProfileData.termsAccepted = true;
      userProfileData.termsAcceptedAt = serverTimestamp();
    }

    await setDoc(userRef, userProfileData);
  } catch (error) {
    console.error("Error creating user profile:", error);
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
    console.error("Error getting user signup number:", error);
    return null;
  }
}

/**
 * Get user profile from Firestore
 * Syncs signupNumber from earlyUsers if missing
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      let profile = userSnap.data() as UserProfile;
      
      // Check if account is deleted and reactivate it (recovery within 21 days)
      if (profile.status === "deleted" && profile.deletedAt) {
        try {
          const deletedAt = profile.deletedAt.toDate();
          const daysSinceDeleted = (Date.now() - deletedAt.getTime()) / (1000 * 60 * 60 * 24);
          
          // If within 21 days, reactivate the account
          if (daysSinceDeleted <= 21) {
            await reactivateUserAccount(uid);
            // Reload the profile from Firestore to get fresh data after reactivation
            const updatedSnap = await getDoc(userRef);
            if (updatedSnap.exists()) {
              const updatedProfile = updatedSnap.data() as UserProfile;
              // Continue with the rest of the function logic using the fresh profile
              profile = updatedProfile;
            } else {
              return null;
            }
          } else {
            // Account is beyond recovery period, return null
            return null;
          }
        } catch (reactivationError) {
          console.error("Error reactivating account:", reactivationError);
          // If reactivation fails, return null to prevent login
          return null;
        }
      }
      
      // If user is early user but signupNumber is missing, sync it
      if (profile.isEarlyUser && !profile.signupNumber) {
        const signupNumber = await getUserSignupNumber(uid);
        if (signupNumber !== null) {
          // Update profile with signupNumber
          await updateDoc(userRef, {
            signupNumber,
            isEarlyUser: true, // Ensure isEarlyUser is true
            updatedAt: serverTimestamp(),
          });
          profile.signupNumber = signupNumber;
          profile.isEarlyUser = true;
        }
      }
      
      // Ensure isEarlyUser is true if signupNumber exists and is <= 200
      if (profile.signupNumber !== null && profile.signupNumber !== undefined && profile.signupNumber <= 200) {
        if (!profile.isEarlyUser) {
          // Update isEarlyUser to true if it's false but user has a valid signupNumber
          await updateDoc(userRef, {
            isEarlyUser: true,
            updatedAt: serverTimestamp(),
          });
          profile.isEarlyUser = true;
        }
      } else if (profile.signupNumber !== null && profile.signupNumber !== undefined && profile.signupNumber > 200) {
        // If signupNumber > 200, user should not be an early user
        if (profile.isEarlyUser) {
          await updateDoc(userRef, {
            isEarlyUser: false,
            updatedAt: serverTimestamp(),
          });
          profile.isEarlyUser = false;
        }
      }
      
      // Ensure status is set (for backwards compatibility)
      if (!profile.status) {
        profile.status = "active";
      }
      
      return profile;
    }

    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

/**
 * Soft delete user account (marks as deleted instead of actually deleting)
 * Accounts marked as deleted will be auto-purged after 21 days
 */
export async function deleteUserAccount(uid: string): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);
    
    // Soft delete: mark account as deleted with timestamp
    await updateDoc(userRef, {
      status: "deleted",
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}

/**
 * Reactivate a deleted account (for recovery within 21 days)
 */
export async function reactivateUserAccount(uid: string): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);
    
    await updateDoc(userRef, {
      status: "active",
      deletedAt: deleteField(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error reactivating user account:", error);
    throw error;
  }
}
