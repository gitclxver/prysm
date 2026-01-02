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
  abbreviations?: string[]; // Common abbreviations for search
  type?: 'highschool' | 'tertiary'; // School type
  studentCount?: number; // Number of students from this school
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp
}

const SCHOOLS_COLLECTION = "schools";

/**
 * Get recommended schools by country, region, and type (for recommendations)
 */
export async function getRecommendedSchools(
  country: "Namibia" | "South Africa" | "Eswatini",
  region?: string,
  type?: 'highschool' | 'tertiary',
  limitCount: number = 10
): Promise<School[]> {
  try {
    const schoolsRef = collection(db, SCHOOLS_COLLECTION);
    
    // Query without orderBy first (to avoid index issues), then sort in memory
    let q;
    if (region) {
      // Query by country and region
      q = query(
        schoolsRef,
        where("country", "==", country),
        where("region", "==", region),
        limit(limitCount * 3) // Fetch more to account for type filtering
      );
    } else {
      // Query by country only
      q = query(
        schoolsRef,
        where("country", "==", country),
        limit(limitCount * 3)
      );
    }

    const querySnapshot = await getDocs(q);
    const schools: School[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Filter by type if specified
      if (type && data.type !== type) {
        return; // Skip if type doesn't match
      }

      schools.push({
        id: doc.id,
        name: data.name,
        country: data.country,
        region: data.region,
        city: data.city,
        abbreviations: data.abbreviations,
        type: data.type,
        studentCount: data.studentCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });

    // Sort by student count (popularity) first, then by name alphabetically
    // This ensures popular schools come first, but we have a consistent order
    return schools
      .sort((a, b) => {
        // First sort by student count (descending)
        const countDiff = (b.studentCount || 0) - (a.studentCount || 0);
        if (countDiff !== 0) return countDiff;
        // If counts are equal, sort by name (ascending)
        return a.name.localeCompare(b.name);
      })
      .slice(0, limitCount);
  } catch (error) {
    console.error("Error getting recommended schools:", error);
    return [];
  }
}

/**
 * Search for schools by name and country
 */
export async function searchSchools(
  searchTerm: string,
  country: "Namibia" | "South Africa" | "Eswatini",
  limitCount: number = 10,
  type?: 'highschool' | 'tertiary' // Optional filter by school type
): Promise<School[]> {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    const schoolsRef = collection(db, SCHOOLS_COLLECTION);
    const searchLower = searchTerm.toLowerCase().trim();

    // Query schools by country (we filter by search term and type in-memory)
    // Fetch more documents than needed to account for filtering
    const fetchLimit = limitCount * 5; // Fetch 5x more to allow for filtering
    
    const q = query(
      schoolsRef,
      where("country", "==", country),
      orderBy("name"),
      limit(fetchLimit)
    );

    const querySnapshot = await getDocs(q);
    const schools: School[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const schoolName = data.name?.toLowerCase() || "";
      const abbreviations = data.abbreviations || [];
      const abbreviationsLower = abbreviations.map((abbr: string) => abbr.toLowerCase());

      // Filter by type if specified
      if (type && data.type !== type) {
        return; // Skip if type doesn't match
      }

      // Filter by search term (case-insensitive) - check name and abbreviations
      const matchesName = schoolName.includes(searchLower);
      const matchesAbbreviation = abbreviationsLower.some((abbr: string) => abbr.includes(searchLower));

      if (matchesName || matchesAbbreviation) {
        schools.push({
          id: doc.id,
          name: data.name,
          country: data.country,
          region: data.region,
          city: data.city,
          abbreviations: data.abbreviations,
          type: data.type,
          studentCount: data.studentCount || 0,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    });

    // Sort by relevance (exact name matches first, then abbreviation matches, then by student count)
    const sorted = schools.sort((a, b) => {
      const aNameExact = a.name.toLowerCase().startsWith(searchLower);
      const bNameExact = b.name.toLowerCase().startsWith(searchLower);
      const aAbbrMatch = a.abbreviations?.some(abbr => abbr.toLowerCase() === searchLower) || false;
      const bAbbrMatch = b.abbreviations?.some(abbr => abbr.toLowerCase() === searchLower) || false;

      // Exact name matches first
      if (aNameExact && !bNameExact) return -1;
      if (!aNameExact && bNameExact) return 1;

      // Then abbreviation exact matches
      if (aAbbrMatch && !bAbbrMatch) return -1;
      if (!aAbbrMatch && bAbbrMatch) return 1;

      // If both or neither are exact matches, sort by student count
      return (b.studentCount || 0) - (a.studentCount || 0);
    });

    // Return only the requested number of results
    return sorted.slice(0, limitCount);
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
        abbreviations: data.abbreviations,
        type: data.type,
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
    // Check if school already exists (by name similarity)
    const existingSchools = await searchSchools(name, country, 10);
    const nameLower = name.toLowerCase().trim();
    
    // Check for exact match or very similar names (fuzzy match)
    const exactMatch = existingSchools.find(
      (school) => school.name.toLowerCase() === nameLower
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Check for similar names (fuzzy matching - 90% similarity threshold)
    const similarMatch = existingSchools.find((school) => {
      const schoolNameLower = school.name.toLowerCase();
      // Simple similarity check - if names are very similar, don't add duplicate
      const longer = nameLower.length > schoolNameLower.length ? nameLower : schoolNameLower;
      const shorter = nameLower.length > schoolNameLower.length ? schoolNameLower : nameLower;
      // If one is contained in the other and they're close in length, consider it similar
      if (longer.includes(shorter) && (longer.length - shorter.length) <= 5) {
        return true;
      }
      return false;
    });

    if (similarMatch) {
      return similarMatch;
    }

    // Create new school
    const schoolsRef = collection(db, SCHOOLS_COLLECTION);
    const newSchoolRef = await addDoc(schoolsRef, {
      name: name.trim(),
      country,
      region: region || null,
      city: city || null,
      abbreviations: null, // Can be added later if needed
      type: null, // Will be inferred or can be set later
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
