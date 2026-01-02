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

export interface Course {
  id: string;
  name: string;
  category: string;
  description?: string;
  studentCount?: number;
  createdAt: any;
  updatedAt: any;
}

const COURSES_COLLECTION = "courses";

/**
 * Get recommended courses by category (for recommendations)
 */
export async function getRecommendedCourses(
  category?: string,
  limitCount: number = 10
): Promise<Course[]> {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    
    let q;
    if (category) {
      // Query by category
      q = query(
        coursesRef,
        where("category", "==", category),
        orderBy("studentCount", "desc"),
        limit(limitCount * 2)
      );
    } else {
      // Query all courses
      q = query(
        coursesRef,
        orderBy("studentCount", "desc"),
        limit(limitCount * 2)
      );
    }

    const querySnapshot = await getDocs(q);
    const courses: Course[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      courses.push({
        id: doc.id,
        name: data.name,
        category: data.category,
        description: data.description,
        studentCount: data.studentCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });

    // Sort by student count (popularity) first, then by name
    return courses
      .sort((a, b) => {
        const countDiff = (b.studentCount || 0) - (a.studentCount || 0);
        if (countDiff !== 0) return countDiff;
        return a.name.localeCompare(b.name);
      })
      .slice(0, limitCount);
  } catch (error) {
    console.error("Error getting recommended courses:", error);
    return [];
  }
}

/**
 * Search for courses by name
 */
export async function searchCourses(
  searchTerm: string,
  category?: string,
  limitCount: number = 10
): Promise<Course[]> {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return [];
    }

    const coursesRef = collection(db, COURSES_COLLECTION);
    const searchLower = searchTerm.toLowerCase().trim();

    // Query courses (filter by category if specified)
    const fetchLimit = limitCount * 5;
    
    let q;
    if (category) {
      q = query(
        coursesRef,
        where("category", "==", category),
        orderBy("name"),
        limit(fetchLimit)
      );
    } else {
      q = query(
        coursesRef,
        orderBy("name"),
        limit(fetchLimit)
      );
    }

    const querySnapshot = await getDocs(q);
    const courses: Course[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const courseName = data.name?.toLowerCase() || "";

      // Filter by search term (case-insensitive)
      if (courseName.includes(searchLower)) {
        courses.push({
          id: doc.id,
          name: data.name,
          category: data.category,
          description: data.description,
          studentCount: data.studentCount || 0,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    });

    // Sort by relevance (exact matches first, then by student count)
    const sorted = courses.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(searchLower);
      const bExact = b.name.toLowerCase().startsWith(searchLower);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      return (b.studentCount || 0) - (a.studentCount || 0);
    });

    return sorted.slice(0, limitCount);
  } catch (error) {
    console.error("Error searching courses:", error);
    return [];
  }
}

/**
 * Get course by ID
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      const data = courseSnap.data();
      return {
        id: courseSnap.id,
        name: data.name,
        category: data.category,
        description: data.description,
        studentCount: data.studentCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting course:", error);
    return null;
  }
}

/**
 * Create a new course in the database
 */
export async function createCourse(
  name: string,
  category: string
): Promise<Course> {
  try {
    // Check if course already exists
    const existingCourses = await searchCourses(name, category, 10);
    const nameLower = name.toLowerCase().trim();
    
    const exactMatch = existingCourses.find(
      (course) => course.name.toLowerCase() === nameLower
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Create new course
    const coursesRef = collection(db, COURSES_COLLECTION);
    const newCourseRef = await addDoc(coursesRef, {
      name: name.trim(),
      category: category.trim(),
      description: null,
      studentCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: newCourseRef.id,
      name: name.trim(),
      category: category.trim(),
      studentCount: 0,
      createdAt: null,
      updatedAt: null,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

/**
 * Increment student count for a course
 */
export async function incrementCourseStudentCount(
  courseId: string
): Promise<void> {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      await updateDoc(courseRef, {
        studentCount: increment(1),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error incrementing course student count:", error);
  }
}

