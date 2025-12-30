# Quick Start Guide - Running Prysm

## How to Run the Application

### Step 1: Navigate to the Project Directory
```bash
cd prysm
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the `prysm` directory with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key\n-----END PRIVATE KEY-----\n"
JWT_SECRET=your-random-secret-key-here
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to: **http://localhost:3000**

## What You'll See

1. **Cookie Consent Popup** - Blocks access until you accept cookies
2. **Waitlist Popup** - Appears in bottom-right corner after 3 seconds (if not logged in)
3. **Homepage** - Fully responsive with animations
4. **Navigation** - Mobile-friendly menu

## Testing Features

- **Authentication**: Go to `/login` to test sign up/sign in
- **Profile**: After logging in, visit `/profile` to customize
- **Pages**: Browse `/about`, `/examhub`, `/canvas`, `/autoplanner`, `/youtubeai`, `/parenthub`
- **Privacy**: Check `/privacy` for the privacy policy

## Troubleshooting

**Port already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Firebase errors?**
- Make sure all environment variables are set correctly
- Verify Firebase project is set up with Authentication enabled
- Check that Google OAuth is configured in Firebase Console

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Production Build

To build for production:
```bash
npm run build
npm start
```

