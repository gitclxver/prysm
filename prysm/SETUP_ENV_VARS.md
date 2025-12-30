# Setting Up Environment Variables

## Quick Method: Get from Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select project**: `prysm-f7606`
3. **Click gear icon** → **Project Settings**
4. **Scroll to "Your apps"** section
5. **Click on your web app** (or create one if needed)
6. **Copy the config values**

## Using Firebase CLI

### Get Web App Config:
```bash
cd prysm
firebase apps:sdkconfig web
```

This will output JSON with all your config values.

### Get Project ID:
```bash
firebase use
# Output: prysm-f7606
```

## Get Admin SDK Credentials

1. **Firebase Console** → **Project Settings** → **Service Accounts**
2. **Click "Generate new private key"**
3. **Download the JSON file**
4. **Extract these values:**
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep the `\n` characters!)

## Create .env.local File

Create `prysm/.env.local`:

```env
# Firebase Client Config (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prysm-f7606.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prysm-f7606
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prysm-f7606.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Firebase Admin SDK (from Service Account JSON)
FIREBASE_ADMIN_PROJECT_ID=prysm-f7606
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@prysm-f7606.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-random-string-min-32-characters-long

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Generate JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use an online generator
# https://randomkeygen.com/
```

## Verify Setup

After creating `.env.local`, restart your dev server:

```bash
npm run dev
```

Then test at http://localhost:3000/login


