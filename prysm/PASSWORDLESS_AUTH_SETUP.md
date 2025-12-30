# Passwordless Authentication Setup

Passwordless authentication using email links has been successfully set up! Users can now sign up and sign in without passwords.

## ✅ What's Been Configured

1. **AuthContext** - Added passwordless authentication methods:
   - `sendPasswordlessLink(email, displayName?)` - Sends a sign-in link to the user's email
   - `signInWithEmailLink(email, emailLink)` - Completes authentication when user clicks the link
   - `isPasswordlessLink(link)` - Checks if a URL is a valid passwordless link

2. **Login Page** - Updated with passwordless option:
   - Checkbox to enable "Sign in with email link"
   - Password field is hidden when passwordless is enabled
   - Success message when link is sent

3. **Callback Page** - Created `/auth/callback` to handle email link authentication:
   - Automatically verifies and processes the email link
   - Creates user profile for new users
   - Redirects to dashboard on success

## 🔧 Firebase Console Configuration

To enable passwordless authentication, you need to configure authorized domains in Firebase Console:

### Step 1: Enable Email Link Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `prysm-f7606`
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Email/Password** provider
5. Click on it and ensure it's **Enabled**
6. Under **Authorized domains**, make sure your domain is listed:
   - `localhost` (for development)
   - Your production domain (e.g., `prysmlearn.com`)

### Step 2: Configure Action URL (Optional but Recommended)

1. In Firebase Console → **Authentication** → **Settings** → **Action URL**
2. Set the action URL to: `https://yourdomain.com/auth/callback`
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`

### Step 3: Test the Flow

1. Go to `/login` page
2. Check "Sign in with email link (no password required)"
3. Enter your email (and display name if signing up)
4. Click "Send Sign-In Link" or "Send Sign-Up Link"
5. Check your email and click the link
6. You should be redirected to the dashboard

## 📧 Email Template Customization

You can customize the email template in Firebase Console:

1. Go to **Authentication** → **Templates**
2. Select **Email address verification** or **Password reset**
3. Customize the email subject and body
4. Use `{{link}}` to insert the authentication link

## 🔒 Security Notes

- Email links expire after 1 hour by default (configurable in Firebase)
- Links can only be used once
- The same device/browser must be used to complete authentication (or email must be re-entered)
- Email links are stored in localStorage for convenience

## 🐛 Troubleshooting

### Link not working?
- Check that the domain is authorized in Firebase Console
- Verify the action URL is correctly configured
- Ensure the link hasn't expired (default: 1 hour)

### "Invalid or expired link" error?
- Request a new link
- Make sure you're using the same browser/device
- Check that email matches the one used to request the link

### Email not received?
- Check spam folder
- Verify email address is correct
- Check Firebase Console → Authentication → Users for any errors
- Ensure email provider isn't blocking Firebase emails

## 📚 Additional Resources

- [Firebase Email Link Authentication Docs](https://firebase.google.com/docs/auth/web/email-link-auth)
- [Firebase Console](https://console.firebase.google.com/project/prysm-f7606)

