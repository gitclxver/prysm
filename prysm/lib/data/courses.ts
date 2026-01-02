/**
 * Centralized department data for tertiary institutions
 * These are common across all universities
 */

export interface Department {
  id: string;
  name: string;
  category?: string; // Optional category grouping
  studentCount?: number;
  createdAt?: any;
  updatedAt?: any;
}

// Department categories for organization
export const departmentCategories = [
  'Engineering',
  'Computing & IT',
  'Business & Commerce',
  'Health Sciences',
  'Tourism & Hospitality',
  'Natural Sciences',
  'Social Sciences',
  'Arts & Humanities',
  'Education',
  'Law',
  'Agriculture',
  'Architecture & Design',
];

// Departments organized by category
export const departmentsByCategory: Record<string, string[]> = {
  'Engineering': [
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Industrial Engineering',
    'Biomedical Engineering',
    'Telecommunications Engineering',
    'Mining Engineering',
    'Aerospace Engineering',
    'Agricultural Engineering',
    'Environmental Engineering',
    'Petroleum Engineering',
  ],
  'Computing & IT': [
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Information Systems',
    'Computer Engineering',
    'Cybersecurity',
    'Data Science',
    'Network Engineering',
  ],
  'Business & Commerce': [
    'Business Administration',
    'Accounting',
    'Finance',
    'Marketing',
    'Economics',
    'Management',
    'Human Resource Management',
    'Supply Chain Management',
    'Entrepreneurship',
    'International Business',
    'Banking',
    'Insurance',
  ],
  'Health Sciences': [
    'Medicine',
    'Nursing',
    'Pharmacy',
    'Dentistry',
    'Physiotherapy',
    'Public Health',
    'Biomedical Sciences',
    'Medical Laboratory Science',
    'Radiography',
    'Occupational Therapy',
    'Veterinary Science',
    'Nutrition & Dietetics',
  ],
  'Tourism & Hospitality': [
    'Tourism Management',
    'Hospitality Management',
    'Hotel Management',
    'Travel & Tourism',
    'Event Management',
    'Culinary Arts',
    'Restaurant Management',
  ],
  'Natural Sciences': [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Statistics',
    'Environmental Science',
    'Geology',
    'Biotechnology',
    'Marine Science',
    'Astronomy',
    'Forensic Science',
  ],
  'Social Sciences': [
    'Psychology',
    'Sociology',
    'Political Science',
    'International Relations',
    'Social Work',
    'Anthropology',
    'Criminology',
    'Development Studies',
    'Public Administration',
    'Journalism',
    'Communication Studies',
  ],
  'Arts & Humanities': [
    'English Literature',
    'History',
    'Philosophy',
    'Languages',
    'Theatre & Drama',
    'Music',
    'Fine Arts',
    'Religious Studies',
    'Cultural Studies',
    'Linguistics',
  ],
  'Education': [
    'Education',
    'Early Childhood Education',
    'Primary Education',
    'Secondary Education',
    'Special Education',
    'Educational Psychology',
    'Curriculum Studies',
  ],
  'Law': [
    'Law',
    'Criminal Law',
    'Commercial Law',
    'International Law',
    'Constitutional Law',
    'Human Rights Law',
  ],
  'Agriculture': [
    'Agricultural Science',
    'Agronomy',
    'Animal Science',
    'Agricultural Economics',
    'Food Science',
  ],
  'Architecture & Design': [
    'Architecture',
    'Urban Planning',
    'Interior Design',
    'Graphic Design',
    'Fashion Design',
    'Industrial Design',
  ],
};

// Flattened list of all departments for seeding
export const allDepartments: Array<{ name: string; category?: string }> = [];
Object.entries(departmentsByCategory).forEach(([category, departments]) => {
  departments.forEach(department => {
    allDepartments.push({ name: department, category });
  });
});

// Legacy exports for backward compatibility (will be removed later)
export const courseCategories = departmentCategories;
export const coursesByCategory = departmentsByCategory;
export const allCourses = allDepartments;
