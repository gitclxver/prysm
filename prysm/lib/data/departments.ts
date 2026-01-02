/**
 * Departments organized by university for SADC countries
 * This allows filtering departments based on selected university
 */

export const departmentsByUniversity: Record<string, string[]> = {
  // Namibia Universities
  'University of Namibia (UNAM)': [
    'Agriculture & Natural Resources',
    'Education',
    'Economics & Management Sciences',
    'Engineering & Information Technology',
    'Health Sciences',
    'Humanities & Social Sciences',
    'Law',
    'Medicine',
    'Science',
  ],
  'Namibia University of Science and Technology (NUST)': [
    'Computing & Informatics',
    'Engineering & the Built Environment',
    'Health & Applied Sciences',
    'Human Sciences',
    'Management Sciences',
    'Natural Resources & Spatial Sciences',
  ],
  'International University of Management (IUM)': [
    'Business Administration',
    'Information Technology',
    'Tourism & Hospitality Management',
    'Education',
    'Accounting & Finance',
  ],

  // South Africa Universities
  'University of Cape Town (UCT)': [
    'Commerce',
    'Engineering & the Built Environment',
    'Health Sciences',
    'Humanities',
    'Law',
    'Science',
  ],
  'University of the Witwatersrand (Wits)': [
    'Commerce, Law & Management',
    'Engineering & the Built Environment',
    'Health Sciences',
    'Humanities',
    'Science',
  ],
  'Stellenbosch University': [
    'Arts & Social Sciences',
    'Economic & Management Sciences',
    'Education',
    'Engineering',
    'Law',
    'Medicine & Health Sciences',
    'Science',
    'Theology',
    'AgriSciences',
    'Military Science',
  ],
  'University of Pretoria': [
    'Economic & Management Sciences',
    'Education',
    'Engineering, Built Environment & Information Technology',
    'Health Sciences',
    'Humanities',
    'Law',
    'Natural & Agricultural Sciences',
    'Theology & Religion',
    'Veterinary Science',
  ],
  'University of Johannesburg (UJ)': [
    'Art, Design & Architecture',
    'Business & Economics',
    'Education',
    'Engineering & the Built Environment',
    'Health Sciences',
    'Humanities',
    'Law',
    'Science',
  ],
  'University of KwaZulu-Natal (UKZN)': [
    'Agriculture, Engineering & Science',
    'Health Sciences',
    'Humanities',
    'Law & Management Studies',
  ],
  'Rhodes University': [
    'Commerce',
    'Education',
    'Humanities',
    'Law',
    'Pharmacy',
    'Science',
  ],
  'University of the Free State': [
    'Economic & Management Sciences',
    'Education',
    'Health Sciences',
    'Humanities',
    'Law',
    'Natural & Agricultural Sciences',
    'Theology & Religion',
  ],
  'North-West University': [
    'Economic & Management Sciences',
    'Education',
    'Engineering',
    'Health Sciences',
    'Humanities',
    'Law',
    'Natural & Agricultural Sciences',
    'Theology',
  ],
  'University of Limpopo': [
    'Agriculture & Environmental Sciences',
    'Health Sciences',
    'Humanities',
    'Management & Law',
    'Science & Technology',
  ],
  'University of Venda': [
    'Agriculture & Rural Development',
    'Education',
    'Health Sciences',
    'Human & Social Sciences',
    'Management, Commerce & Law',
    'Science, Engineering & Technology',
  ],
  'University of Fort Hare': [
    'Education',
    'Health Sciences',
    'Law',
    'Management & Commerce',
    'Science & Agriculture',
    'Social Sciences & Humanities',
  ],
  'University of Zululand': [
    'Arts',
    'Commerce, Administration & Law',
    'Education',
    'Science & Agriculture',
  ],
  'University of the Western Cape (UWC)': [
    'Arts',
    'Community & Health Sciences',
    'Dentistry',
    'Economic & Management Sciences',
    'Education',
    'Law',
    'Natural Sciences',
    'Nursing',
  ],
  'Nelson Mandela University': [
    'Arts',
    'Business & Economic Sciences',
    'Education',
    'Engineering, the Built Environment & Information Technology',
    'Health Sciences',
    'Law',
    'Science',
  ],
  'University of Mpumalanga': [
    'Agriculture & Natural Sciences',
    'Economics, Development & Business Sciences',
    'Education',
  ],
  'Sefako Makgatho Health Sciences University': [
    'Health Sciences',
    'Science & Technology',
  ],

  // Eswatini Universities
  'University of Eswatini (UNESWA)': [
    'Agriculture',
    'Commerce',
    'Education',
    'Health Sciences',
    'Humanities',
    'Science & Engineering',
    'Social Sciences',
  ],
  'Southern Africa Nazarene University (SANU)': [
    'Business & Management',
    'Education',
    'Health Sciences',
    'Theology',
  ],

  // Other/General departments (for "Other" university option)
  'Other': [
    'Accounting',
    'Agriculture',
    'Architecture',
    'Business Administration',
    'Commerce',
    'Computing & IT',
    'Education',
    'Engineering',
    'Health Sciences',
    'Humanities',
    'Law',
    'Management',
    'Science',
    'Social Sciences',
    'Tourism & Hospitality',
  ],
};

// Get all unique departments (for search/filtering)
export const allDepartments: string[] = Array.from(
  new Set(Object.values(departmentsByUniversity).flat())
).sort();

// Get departments for a specific university
export function getDepartmentsForUniversity(university: string): string[] {
  return departmentsByUniversity[university] || departmentsByUniversity['Other'] || [];
}

