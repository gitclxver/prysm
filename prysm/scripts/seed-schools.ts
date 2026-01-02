/**
 * Script to seed schools and institutions database
 * Run with: npx tsx scripts/seed-schools.ts
 * 
 * This script populates Firestore with schools and tertiary institutions
 * for Namibia and Eswatini, organized by region.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin (you'll need to set GOOGLE_APPLICATION_CREDENTIALS or use service account)
// For now, this is a reference script - adjust based on your setup

interface SchoolData {
  name: string;
  country: 'Namibia' | 'South Africa' | 'Eswatini';
  region: string;
  city?: string;
  abbreviations?: string[]; // Common abbreviations for the school
  type: 'highschool' | 'tertiary';
}

// Namibia Schools Data
const namibiaSchools: SchoolData[] = [
  // Tertiary Institutions
  { name: 'University of Namibia (UNAM)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['UNAM'], type: 'tertiary' },
  { name: 'Namibia University of Science and Technology (NUST)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['NUST'], type: 'tertiary' },
  { name: 'International University of Management (IUM)', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['IUM'], type: 'tertiary' },
  
  // High Schools - Khomas Region
  { name: 'Windhoek High School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', abbreviations: ['WHS'], type: 'highschool' },
  { name: 'St. Paul\'s College', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Delta Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Immanuel Shifidi Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Eros School for Girls', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Jan Möhr Secondary School', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Concordia College', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  { name: 'Edugate Academy', country: 'Namibia', region: 'Khomas', city: 'Windhoek', type: 'highschool' },
  
  // High Schools - Erongo Region
  { name: 'Swakopmund Secondary School', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', abbreviations: ['SSS'], type: 'highschool' },
  { name: 'Deutsche Höhere Privatschule (DHPS)', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', abbreviations: ['DHPS'], type: 'highschool' },
  { name: 'Namib High School', country: 'Namibia', region: 'Erongo', city: 'Swakopmund', type: 'highschool' },
  { name: 'Walvis Bay High School', country: 'Namibia', region: 'Erongo', city: 'Walvis Bay', type: 'highschool' },
  { name: 'Duinesig Combined School', country: 'Namibia', region: 'Erongo', city: 'Walvis Bay', type: 'highschool' },
  
  // Add more schools as needed - this is a starting point
];

// Eswatini Schools Data
const eswatiniSchools: SchoolData[] = [
  // Tertiary Institutions
  { name: 'University of Eswatini (UNESWA)', country: 'Eswatini', region: 'Hhohho', city: 'Kwaluseni', abbreviations: ['UNESWA'], type: 'tertiary' },
  { name: 'Southern Africa Nazarene University (SANU)', country: 'Eswatini', region: 'Manzini', city: 'Manzini', abbreviations: ['SANU'], type: 'tertiary' },
  
  // High Schools - Manzini Region
  { name: 'Waterford Kamhlaba United World College', country: 'Eswatini', region: 'Manzini', city: 'Mbabane', abbreviations: ['Waterford', 'WK'], type: 'highschool' },
  { name: 'Sifundzani High School', country: 'Eswatini', region: 'Manzini', city: 'Mbabane', type: 'highschool' },
  { name: 'Manzini Central High School', country: 'Eswatini', region: 'Manzini', city: 'Manzini', type: 'highschool' },
  
  // High Schools - Hhohho Region
  { name: 'Mbabane High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  { name: 'St. Mark\'s High School', country: 'Eswatini', region: 'Hhohho', city: 'Mbabane', type: 'highschool' },
  
  // Add more schools as needed
];

export const allSchools = [...namibiaSchools, ...eswatiniSchools];

// Note: This is a reference script. To actually seed:
// 1. Set up Firebase Admin SDK properly
// 2. Run this script with proper authentication
// 3. Or use Firebase Console to import this data

