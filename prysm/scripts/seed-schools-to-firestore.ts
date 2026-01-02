/**
 * Script to seed schools and institutions to Firestore
 * 
 * Usage:
 *   1. Make sure you have Firebase Admin SDK credentials set up
 *   2. Run: npx tsx scripts/seed-schools-to-firestore.ts
 * 
 * OR use the client-side approach by running this in the browser console
 * on your app (see seed-schools-client.ts for that approach)
 */

import { schoolsData } from './schools-data';

// This is a client-side seeding approach that can be run from the browser
// For server-side seeding, you'd need Firebase Admin SDK setup

export async function seedSchoolsClientSide() {
  // Import Firebase client SDK
  const { collection, addDoc, getDocs, query, where, doc, getDoc, setDoc } = await import('firebase/firestore');
  const { db } = await import('../lib/firebase/config');

  const schoolsRef = collection(db, 'schools');
  let added = 0;
  let skipped = 0;
  let errors = 0;

  console.log(`Starting to seed ${schoolsData.length} schools...`);

  for (const schoolData of schoolsData) {
    try {
      // Check if school already exists (by name and country)
      const q = query(
        schoolsRef,
        where('country', '==', schoolData.country),
        where('name', '==', schoolData.name)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        console.log(`Skipping ${schoolData.name} - already exists`);
        skipped++;
        continue;
      }

      // Add the school
      await addDoc(schoolsRef, {
        name: schoolData.name,
        country: schoolData.country,
        region: schoolData.region || null,
        city: schoolData.city || null,
        abbreviations: schoolData.abbreviations || null,
        type: schoolData.type || null,
        studentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✓ Added: ${schoolData.name} (${schoolData.region})`);
      added++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`✗ Error adding ${schoolData.name}:`, error);
      errors++;
    }
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${schoolsData.length}`);
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).seedSchools = seedSchoolsClientSide;
}

