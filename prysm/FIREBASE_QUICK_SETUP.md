# Quick Firebase Setup (2 Minutes)

## Step 1: Login to Firebase
```bash
cd prysm
firebase login
```

## Step 2: Initialize Firebase (if not done)
```bash
firebase init
```
- Select: **Firestore** and **Hosting**
- Choose existing project or create new
- Location: `africa-south1` (or closest to users)
- Accept defaults

## Step 3: Create Firestore Database
1. Go to https://console.firebase.google.com
2. Select your project
3. **Firestore Database** → **Create database**
4. **Start in production mode** ✅
5. Location: `africa-south1`

## Step 4: Deploy Security Rules
```bash
npm run firebase:deploy-rules
```

## Step 5: Enable Authentication
1. Firebase Console → **Authentication** → **Get started**
2. Enable **Email/Password**
3. Enable **Google** (add OAuth consent screen)

## Step 6: Get Environment Variables

### Quick Method:
1. Firebase Console → **Project Settings** (gear icon)
2. Scroll to **"Your apps"** → Click web app
3. Copy config values

### Or use CLI:
```bash
firebase apps:sdkconfig web
```

## Step 7: Create .env.local

Create `prysm/.env.local` with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=from_console
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=from_console
NEXT_PUBLIC_FIREBASE_APP_ID=from_console

FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=from_service_account_json
FIREBASE_ADMIN_PRIVATE_KEY="from_service_account_json"

JWT_SECRET=generate-random-string-here
```

**Get Admin SDK from:** Project Settings → Service Accounts → Generate new private key

## Step 8: Test
```bash
npm run dev
```

Visit http://localhost:3000 and test signup!

## Cloud Functions? 

**Answer: FREE on Spark plan!** (2M invocations/month)

But you **don't need them yet** - your app works without Cloud Functions. Add them later if you want more secure server-side operations.

## Deploy Rules Anytime
```bash
npm run firebase:deploy-rules
```


