# Seeding Schools Database

This guide explains how to populate the Firestore database with pre-built schools and institutions.

## Option 1: Browser Console (Recommended for Quick Testing)

1. Open your app in the browser (logged in as an admin/user)
2. Open the browser console (F12)
3. Copy and paste the following code:

```javascript
// Load the seeding function
const script = document.createElement('script');
script.src = '/scripts/seed-schools-to-firestore.js'; // You'll need to expose this
script.onload = () => {
  window.seedSchools();
};
document.head.appendChild(script);
```

Or use the function directly if you can import it in your app.

## Option 2: Create an Admin Page

Create a temporary admin page at `/admin/seed-schools` that calls the seeding function.

## Option 3: Firebase Admin SDK (Recommended for Production)

1. Set up Firebase Admin SDK credentials
2. Create a script using the Admin SDK
3. Run it from your server/CI

## Data Source

The schools data is in `scripts/schools-data.ts` and includes:
- ~10 most popular schools per region
- Tertiary institutions
- Organized by country and region
- Includes abbreviations for common search terms

## Adding New Schools

Users can add new schools through the UI. The `createSchool` function checks for duplicates before adding.

## Notes

- The script checks for existing schools to avoid duplicates
- Schools are added with `studentCount: 0`
- Type (highschool/tertiary) is set for filtering
- Abbreviations help with search functionality

