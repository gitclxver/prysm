# Prysm - The Ultimate Student OS

A Next.js application for Prysm, an AI-powered educational platform designed for SADC students.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project set up (for authentication)

### Installation

1. **Install dependencies:**
   ```bash
   cd prysm
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file in the `prysm` directory with the following variables:
   ```env
   # Firebase Client Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin SDK Configuration
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email@your_project_id.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

   # JWT Secret for session tokens
   JWT_SECRET=your-secret-key-change-in-production-use-a-strong-random-string

   # Site URL (optional, for SEO)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- 🔐 Firebase Authentication (Google OAuth + Email/Password)
- 🎫 JWT Session Tokens
- 👤 User Profile Management
- 🏆 Early User Tracking (First 200 users)
- 🍪 Cookie Consent System
- 📝 Privacy Policy
- ✨ Smooth Animations (Framer Motion)
- 📱 Fully Responsive Design
- 🔍 SEO Optimized

## Project Structure

```
prysm/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── about/             # About page
│   ├── examhub/           # Exam Hub page
│   ├── canvas/            # Drawing Board page
│   ├── autoplanner/       # Auto-Planner page
│   ├── youtubeai/          # YouTube AI page
│   ├── parenthub/         # Parent Hub page
│   ├── privacy/           # Privacy Policy page
│   ├── profile/           # User profile page
│   ├── dashboard/         # User dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                   # Utility libraries
│   ├── firebase/         # Firebase configuration
│   ├── jwt.ts            # JWT token handling
│   └── avatar.ts         # Avatar generation
└── types/                # TypeScript types
```

## Key Components

- **CookieConsent** - Cookie consent popup (blocks access until accepted)
- **WaitlistPopup** - Non-intrusive waiting list popup
- **Navigation** - Responsive navigation bar
- **AnimatedCard** - Card component with animations
- **Button** - Animated button component

## Firebase Setup

Firebase is already configured! See setup guides:

- **Quick Setup**: `FIREBASE_QUICK_SETUP.md` (2 minutes)
- **Complete Guide**: `FIREBASE_COMPLETE_SETUP.md` (detailed)
- **Environment Variables**: `SETUP_ENV_VARS.md`

### Quick Commands

```bash
# Deploy Firestore security rules
npm run firebase:deploy-rules

# Get Firebase config
npm run firebase:config

# Or use Firebase CLI directly
firebase apps:sdkconfig web
```

### Cloud Functions

**Cost: FREE on Spark plan** (2M invocations/month)

**Do you need them? NO** - Your app works perfectly without Cloud Functions. Add them later if needed for more secure server-side operations.

## Testing the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test authentication:**
   - Navigate to `/login`
   - Try signing up with email or Google
   - Check email verification flow

3. **Test features:**
   - Browse all demo pages
   - Check responsive design on mobile/tablet
   - Test cookie consent popup
   - Test waiting list popup
   - Check animations and hover effects

## Deployment

For production deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

Or deploy to platforms like Vercel, Netlify, or your preferred hosting service.

## License

© 2025 Prysm Learn. All rights reserved.
