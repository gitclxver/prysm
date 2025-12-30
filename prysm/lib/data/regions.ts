// Region data for each country
export const countryRegions: Record<string, string[]> = {
  'Namibia': [
    'Erongo',
    'Hardap',
    '//Karas',
    'Kavango East',
    'Kavango West',
    'Khomas',
    'Kunene',
    'Ohangwena',
    'Omaheke',
    'Omusati',
    'Oshana',
    'Oshikoto',
    'Otjozondjupa',
    'Zambezi',
  ],
  'South Africa': [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape',
  ],
  'Eswatini': [
    'Hhohho',
    'Lubombo',
    'Manzini',
    'Shiselweni',
  ],
};

// Grade/Level options based on country
export const gradeLevels: Record<string, { grades: string[]; levels?: string[] }> = {
  'Namibia': {
    grades: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    levels: ['AS Level', 'A Level'],
  },
  'South Africa': {
    grades: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    levels: ['Matric'],
  },
  'Eswatini': {
    grades: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'],
    levels: ['O Level', 'A Level'],
  },
};

// Syllabus mapping based on country
export const countrySyllabi: Record<string, string[]> = {
  'Namibia': ['NSSCO', 'IGCSE (Cambridge)', 'Cambridge International', 'IB (International Baccalaureate)'],
  'South Africa': ['CAPS', 'IEB', 'IGCSE (Cambridge)', 'Cambridge International', 'IB (International Baccalaureate)', 'AS/A Levels'],
  'Eswatini': ['EGCSE', 'IGCSE (Cambridge)', 'Cambridge International', 'IB (International Baccalaureate)'],
};

// Universities by country
export const universities: Record<string, string[]> = {
  'Namibia': [
    'University of Namibia (UNAM)',
    'Namibia University of Science and Technology (NUST)',
    'International University of Management (IUM)',
    'Other',
  ],
  'South Africa': [
    'University of Cape Town (UCT)',
    'University of the Witwatersrand (Wits)',
    'Stellenbosch University',
    'University of Pretoria',
    'University of Johannesburg (UJ)',
    'University of KwaZulu-Natal (UKZN)',
    'Rhodes University',
    'University of the Free State',
    'North-West University',
    'University of Limpopo',
    'University of Venda',
    'University of Fort Hare',
    'University of Zululand',
    'University of the Western Cape (UWC)',
    'Nelson Mandela University',
    'University of Mpumalanga',
    'Sefako Makgatho Health Sciences University',
    'Other',
  ],
  'Eswatini': [
    'University of Eswatini (UNESWA)',
    'Southern Africa Nazarene University (SANU)',
    'Other',
  ],
};

