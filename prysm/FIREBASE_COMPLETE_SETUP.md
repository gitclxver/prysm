# ✅ Firebase Setup Complete Guide

## 🎉 What's Already Done

✅ **Firebase project initialized**: `prysm-f7606`  
✅ **Firestore rules deployed** (production mode)  
✅ **Firebase CLI configured**  
✅ **Security rules in place** (protecting user data)

## 📋 What You Need to Do Now

### 1. Create Firestore Database (if not done)

1. Go to: https://console.firebase.google.com/project/prysm-f7606/firestore
2. Click **"Create database"** (if you see this button)
3. Select **"Start in production mode"** ✅
4. Choose location: **`africa-south1`** (or closest to your users)
5. Click **"Enable"**

**Note:** The rules are already deployed, so the database will use them automatically.

### 2. Enable Authentication

1. Go to: https://console.firebase.google.com/project/prysm-f7606/authentication
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Enable:
   - ✅ **Email/Password** → Enable → Save
   - ✅ **Google** → Enable → Add OAuth consent screen details → Save

### 3. Get Environment Variables

#### Method 1: Firebase Console (Easiest)

1. Go to: https://console.firebase.google.com/project/prysm-f7606/settings/general
2. Scroll to **"Your apps"** section
3. Click on your **web app** (or create one: `</>` icon)
4. Copy the config values

#### Method 2: Firebase CLI

```bash
cd prysm
firebase apps:sdkconfig web
```

### 4. Get Admin SDK Credentials

1. Go to: https://console.firebase.google.com/project/prysm-f7606/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. **Download the JSON file**
4. **Extract these 3 values:**
   - `project_id`
   - `client_email`
   - `private_key` (keep the `\n` characters!)

### 5. Create .env.local File

Create `prysm/.env.local`:

```env
# From Firebase Console → Project Settings → Your apps → Web app
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prysm-f7606.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prysm-f7606
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prysm-f7606.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456

# From Service Account JSON file
FIREBASE_ADMIN_PROJECT_ID=prysm-f7606
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@prysm-f7606.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Generate a random secret (32+ characters)
JWT_SECRET=generate-a-random-secret-string-here-min-32-chars

# For production, change to your domain
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Generate JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use: https://randomkeygen.com/ (use CodeIgniter Encryption Keys)

### 7. Test Everything

```bash
cd prysm
npm run dev
```

Visit http://localhost:3000 and test:
- ✅ Cookie consent appears
- ✅ Sign up with email
- ✅ Sign in with Google
- ✅ Profile creation works
- ✅ Early user tracking works

## 💰 Cloud Functions - Cost & Need

### Cost: **FREE on Spark Plan!**

- ✅ **2 million invocations/month** (free)
- ✅ **400K GB-seconds compute time** (free)
- ✅ **200K GHz-seconds** (free)

### Do You Need Them? **NO, not yet!**

Your app works **perfectly without Cloud Functions** because:

✅ User count tracking uses **client-side writes** (allowed in security rules)  
✅ All operations are simple **Firestore reads/writes**  
✅ Authentication handled by **Firebase Auth** (no functions needed)  
✅ No file uploads (so no Storage triggers needed)

### When to Add Cloud Functions Later:

- 🔒 More secure server-side operations
- ⏰ Scheduled tasks (cron jobs)
- 🔗 Webhooks from external services
- 📊 Analytics processing
- 🔐 Secure API endpoints

**For now: Skip Cloud Functions** - your app is fully functional without them!

## 📁 Firebase Files Created

```
prysm/
├── firebase.json          # Firebase project config
├── .firebaserc           # Project ID reference
├── firestore.rules      # Security rules (DEPLOYED ✅)
└── firestore.indexes.json # Database indexes
```

## 🚀 Deploy Rules Anytime

If you update `firestore.rules`, deploy with:

```bash
npm run firebase:deploy-rules
```

Or:
```bash
firebase deploy --only firestore:rules
```

## 📊 Free Tier Limits (Spark Plan)

You're on the **free Spark plan**. Here are your limits:

| Service | Free Limit |
|---------|-----------|
| **Firestore** | 1 GB storage, 50K reads/day, 20K writes/day |
| **Authentication** | Unlimited users |
| **Hosting** | 10 GB storage, 360 MB/day transfer |
| **Cloud Functions** | 2M invocations/month (if you add them) |
| **Storage** | 5 GB storage (not using yet) |

**For 200 users at launch, you'll stay well within free limits!**

## ✅ Pre-Launch Checklist

Before launching in 2 days:

- [ ] Firestore database created in production mode
- [ ] Security rules deployed (✅ Already done!)
- [ ] Authentication enabled (Email + Google)
- [ ] Email verification enabled
- [ ] `.env.local` file created with all values
- [ ] Test signup/login flows
- [ ] Test profile creation
- [ ] Verify early user tracking works
- [ ] Check Firebase Console → Usage tab
- [ ] Set up billing alerts (optional, to monitor usage)

## 🔍 Monitoring (Free)

- **Firebase Console → Usage**: Track your free tier usage
- **Firestore → Usage**: Monitor reads/writes
- **Authentication → Users**: View registered users

## 🆘 Troubleshooting

**"Permission denied" errors:**
```bash
# Re-deploy rules
npm run firebase:deploy-rules
```

**Environment variables not working:**
- Restart dev server: `npm run dev`
- Check `.env.local` is in `prysm/` directory
- Ensure variables start with `NEXT_PUBLIC_` for client-side

**Firebase Admin errors:**
- Verify private key has `\n` characters
- Check service account email is correct
- Ensure project ID matches

## 📚 Quick Reference

```bash
# Deploy Firestore rules
npm run firebase:deploy-rules

# Get Firebase config
firebase apps:sdkconfig web

# View current project
firebase use

# Login to Firebase
firebase login
```

## 🎯 Next Steps

1. ✅ Create Firestore database (if not done)
2. ✅ Enable Authentication providers
3. ✅ Get environment variables
4. ✅ Create `.env.local` file
5. ✅ Test locally
6. 🚀 Launch!

Your Firebase setup is **production-ready** and **100% free** for your launch! 🎉


