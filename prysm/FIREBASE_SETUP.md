# Firebase Setup Guide - Free Tier Configuration

This guide will help you set up Firebase for Prysm using the **free Spark plan** (no credit card required for most features).

## Firebase Free Tier Limits (Spark Plan)

✅ **Free Forever:**
- Firestore: 1 GB storage, 50K reads/day, 20K writes/day, 20K deletes/day
- Authentication: Unlimited
- Hosting: 10 GB storage, 360 MB/day transfer
- Cloud Functions: 2 million invocations/month, 400K GB-seconds, 200K GHz-seconds
- Storage: 5 GB storage, 1 GB/day download, 20K uploads/day

## Step 1: Initialize Firebase Project

If you haven't already, initialize Firebase in your project:

```bash
cd prysm
firebase login
firebase init
```

When prompted:
- Select **Firestore** and **Hosting** (you can add Functions later if needed)
- Use existing project or create new one
- Choose your preferred location (e.g., `africa-south1` for SADC region)
- Accept defaults for other options

## Step 2: Set Up Firestore Database

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**
3. **Go to Firestore Database**
4. **Click "Create database"**
5. **Select "Start in production mode"** (we'll deploy rules via CLI)
6. **Choose location**: `africa-south1` (or closest to your users)

## Step 3: Deploy Firestore Security Rules

Deploy the production security rules:

```bash
cd prysm
firebase deploy --only firestore:rules
```

This will deploy the rules from `firestore.rules` file.

## Step 4: Set Up Authentication

1. **In Firebase Console → Authentication**
2. **Click "Get started"**
3. **Enable Sign-in methods:**
   - ✅ Email/Password
   - ✅ Google (add your OAuth consent screen details)

## Step 5: Get Environment Variables via Firebase CLI

### Option A: Using Firebase CLI (Recommended)

```bash
# Get your Firebase config
firebase apps:sdkconfig web

# This will output something like:
# {
#   "apiKey": "...",
#   "authDomain": "...",
#   "projectId": "...",
#   ...
# }
```

### Option B: From Firebase Console

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web app** (or create one)
4. Copy the config values

### Option C: Using Firebase CLI to get individual values

```bash
# Get project ID
firebase use

# Get other values from console or use:
firebase projects:list
```

## Step 6: Set Environment Variables

Create `.env.local` file in the `prysm` directory:

```bash
# In prysm directory
touch .env.local
```

Add your Firebase config (get values from Firebase Console → Project Settings):

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (for server-side operations)
# Get from Firebase Console → Project Settings → Service Accounts
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# JWT Secret (generate a strong random string)
JWT_SECRET=your-secret-key-change-in-production-use-a-strong-random-string

# Site URL (for production, change to your domain)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 7: Get Firebase Admin SDK Credentials

1. **Firebase Console → Project Settings → Service Accounts**
2. **Click "Generate new private key"**
3. **Download the JSON file**
4. **Extract values:**
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep the `\n` characters)

## Step 8: Verify Setup

Test your Firebase connection:

```bash
npm run dev
```

Then visit `http://localhost:3000/login` and try signing up.

## Cloud Functions - Do You Need Them?

### Cost: FREE on Spark Plan
- **2 million invocations/month** (free)
- **400K GB-seconds compute time** (free)
- **200K GHz-seconds** (free)

### When to Use Cloud Functions:
- ✅ Secure server-side operations (like user count tracking)
- ✅ Scheduled tasks (cron jobs)
- ✅ Webhooks from external services
- ✅ Heavy computations you don't want on client

### When NOT Needed (for now):
- ❌ Simple CRUD operations (use Firestore rules)
- ❌ Client-side authentication (Firebase Auth handles this)
- ❌ Basic data queries (Firestore handles this)

### Current Setup:
Your app works **without Cloud Functions** because:
- User count tracking uses client-side writes (allowed in rules)
- All operations are simple Firestore reads/writes
- Authentication is handled by Firebase Auth

### Future: Adding Cloud Functions (Optional)

If you want to add Cloud Functions later for better security:

```bash
firebase init functions
```

Then create a function to handle user count:

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const incrementUserCount = functions.auth.user().onCreate(async (user) => {
  const metadataRef = admin.firestore().doc('metadata/userCount');
  await metadataRef.update({
    count: admin.firestore.FieldValue.increment(1)
  });
});
```

## Firebase CLI Commands Reference

```bash
# Login to Firebase
firebase login

# List projects
firebase projects:list

# Use a specific project
firebase use <project-id>

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy everything
firebase deploy

# View current project
firebase use

# Get Firebase config
firebase apps:sdkconfig web
```

## Production Deployment Checklist

Before launching:

- [ ] Firestore rules deployed (`firebase deploy --only firestore:rules`)
- [ ] Authentication providers enabled (Email, Google)
- [ ] Email verification enabled
- [ ] Environment variables set in production hosting
- [ ] `.env.local` file created with all values
- [ ] Test signup/login flows
- [ ] Test profile creation
- [ ] Verify early user tracking works
- [ ] Check Firebase Console → Usage for any issues

## Monitoring (Free)

- **Firebase Console → Usage**: Track your free tier usage
- **Firebase Console → Firestore → Usage**: Monitor reads/writes
- **Firebase Console → Authentication → Users**: View registered users

## Troubleshooting

**"Permission denied" errors:**
- Check Firestore rules are deployed: `firebase deploy --only firestore:rules`
- Verify user is authenticated
- Check rules match your data structure

**Environment variables not working:**
- Restart dev server after changing `.env.local`
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Check `.env.local` is in `prysm/` directory (not root)

**Firebase Admin errors:**
- Verify private key has `\n` characters preserved
- Check service account email is correct
- Ensure project ID matches

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Deploy security rules
3. ✅ Configure authentication
4. ✅ Set environment variables
5. ✅ Test locally
6. 🚀 Deploy to production!


