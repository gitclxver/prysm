import { NextRequest, NextResponse } from 'next/server';

/**
 * Firebase Auth Action Route
 * 
 * This route handles Firebase email link authentication callbacks.
 * Firebase redirects to /__/auth/action with authentication parameters,
 * and this route forwards them to our callback page.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract email from query parameters (may be in continueUrl)
    const email = searchParams.get('email');
    const continueUrl = searchParams.get('continueUrl');
    
    // Extract email from continueUrl if not directly in params
    let finalEmail = email;
    if (!finalEmail && continueUrl) {
      try {
        const continueUrlObj = new URL(continueUrl);
        const emailFromContinue = continueUrlObj.searchParams.get('email');
        if (emailFromContinue) {
          finalEmail = decodeURIComponent(emailFromContinue);
        }
      } catch (e) {
        // If continueUrl parsing fails, continue without it
      }
    }
    
    // Build redirect URL to our callback page
    const callbackUrl = new URL('/auth/callback', request.url);
    
    // Preserve email if provided (callback page will use this or localStorage)
    if (finalEmail) {
      callbackUrl.searchParams.set('email', finalEmail);
    }
    
    // Pass the full original URL as the link parameter
    // The callback page will use this to verify and sign in
    callbackUrl.searchParams.set('link', request.url);
    
    // Redirect to callback page
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('Auth action error:', error);
    // Fallback: redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests the same way as GET
  return GET(request);
}

