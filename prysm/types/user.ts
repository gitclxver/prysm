import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  photoURL?: string;
  bio?: string;
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
  };
  isEarlyUser: boolean;
  signupNumber?: number; // User's position in the first 200 (1-200)
  nameEditCount?: number; // Number of times user has edited their name (max 3)
  // Privacy & Terms
  privacyPolicyAccepted?: boolean;
  privacyPolicyAcceptedAt?: Timestamp;
  termsAccepted?: boolean;
  termsAcceptedAt?: Timestamp;
  // Academic Information
  country?: "Namibia" | "South Africa" | "Eswatini";
  region?: string;
  school?: string;
  grade?: string;
  level?: string;
  syllabus?: string; // NSSCO, CAPS, IEB, EGCSE, IGCSE (Cambridge), Cambridge International, IB, AS/A Levels, etc.
  university?: string; // For university students
  isUniversityStudent?: boolean;
  department?: string; // Department for tertiary students (e.g., "Computer Science", "Engineering")
  status?: "active" | "deleted"; // Account status
  deletedAt?: Timestamp; // When the account was deleted (for 21-day recovery window)
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserMetadata {
  userCount: number;
  earlyUsers: string[]; // Array of user IDs
}
