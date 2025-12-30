import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

export interface School {
  id: string;
  name: string;
  country: "Namibia" | "South Africa" | "Eswatini";
  region?: string;
  city?: string;
  studentCount?: number; // Number of students from this school
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp
}

const SCHOOLS_COLLECTION = "schools";

/**
 * Search for schools by name and country
 */
export async function searchSchools(
  searchTerm: string,
  country: "Namibia" | "South Africa" | "Eswatini",
  limitCount: number = 10
): Promise<School[]> {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    const schoolsRef = collection(db, SCHOOLS_COLLECTION);
    const searchLower = searchTerm.toLowerCase().trim();

    // Query schools by country and name (case-insensitive search)
    const q = query(
      schoolsRef,
      where("country", "==", country),
      orderBy("name"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const schools: School[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const schoolName = data.name?.toLowerCase() || "";

      // Filter by search term (case-insensitive)
      if (schoolName.includes(searchLower)) {
        schools.push({
          id: doc.id,
          name: data.name,
          country: data.country,
          region: data.region,
          city: data.city,
          studentCount: data.studentCount || 0,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    });

    // Sort by relevance (exact matches first, then by student count)
    return schools.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(searchLower);
      const bExact = b.name.toLowerCase().startsWith(searchLower);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // If both or neither are exact matches, sort by student count
      return (b.studentCount || 0) - (a.studentCount || 0);
    });
  } catch (error) {
    console.error("Error searching schools:", error);
    return [];
  }
}

/**
 * Get school by ID
 */
export async function getSchoolById(schoolId: string): Promise<School | null> {
  try {
    const schoolRef = doc(db, SCHOOLS_COLLECTION, schoolId);
    const schoolSnap = await getDoc(schoolRef);

    if (schoolSnap.exists()) {
      const data = schoolSnap.data();
      return {
        id: schoolSnap.id,
        name: data.name,
        country: data.country,
        region: data.region,
        city: data.city,
        studentCount: data.studentCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting school:", error);
    return null;
  }
}

/**
 * Create a new school in the database
 */
export async function createSchool(
  name: string,
  country: "Namibia" | "South Africa" | "Eswatini",
  region?: string,
  city?: string
): Promise<School> {
  try {
    // Check if school already exists
    const existingSchools = await searchSchools(name, country, 1);
    const exactMatch = existingSchools.find(
      (school) => school.name.toLowerCase() === name.toLowerCase()
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Create new school
    const schoolsRef = collection(db, SCHOOLS_COLLECTION);
    const newSchoolRef = await addDoc(schoolsRef, {
      name: name.trim(),
      country,
      region: region || null,
      city: city || null,
      studentCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: newSchoolRef.id,
      name: name.trim(),
      country,
      region,
      city,
      studentCount: 0,
      createdAt: null,
      updatedAt: null,
    };
  } catch (error) {
    console.error("Error creating school:", error);
    throw error;
  }
}

/**
 * Increment student count for a school
 */
export async function incrementSchoolStudentCount(
  schoolId: string
): Promise<void> {
  try {
    const schoolRef = doc(db, SCHOOLS_COLLECTION, schoolId);
    const schoolSnap = await getDoc(schoolRef);

    if (schoolSnap.exists()) {
      await updateDoc(schoolRef, {
        studentCount: increment(1),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error incrementing school student count:", error);
  }
}

