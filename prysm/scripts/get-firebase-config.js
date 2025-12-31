#!/usr/bin/env node

/**
 * Script to help get Firebase configuration values
 * Run: node scripts/get-firebase-config.js
 */

const { execSync } = require('child_process');

console.log('🔍 Getting Firebase Configuration...\n');

try {
  // Get current project
  const projectId = execSync('firebase use', { encoding: 'utf-8' }).trim();
  console.log('📋 Current Firebase Project:', projectId);
  
  console.log('\n📝 Next steps:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com');
  console.log('2. Select your project');
  console.log('3. Go to Project Settings (gear icon)');
  console.log('4. Scroll to "Your apps" section');
  console.log('5. Click on your web app (or create one)');
  console.log('6. Copy the config values to your .env.local file\n');
  
  console.log('💡 Or use: firebase apps:sdkconfig web\n');
  
  console.log('🔐 For Admin SDK:');
  console.log('1. Go to Project Settings → Service Accounts');
  console.log('2. Click "Generate new private key"');
  console.log('3. Extract values from the JSON file\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Make sure you are:');
  console.log('   - Logged in: firebase login');
  console.log('   - In the prysm directory');
  console.log('   - Have a Firebase project initialized');
}







