import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserMetadata {
  userCount: number;
  earlyUsers: string[]; // Array of user IDs
}
