import { NextRequest, NextResponse } from 'next/server';

/**
 * Firebase Auth Handler Route
 * 
 * This route handles Firebase email link authentication callbacks.
 * Firebase redirects to /__/auth/handler with authentication parameters,
 * and this route forwards them to our callback page.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract email from query parameters
    const email = searchParams.get('email');
    
    // Build redirect URL to our callback page
    const callbackUrl = new URL('/callback', request.url);
    
    // Preserve email if provided (callback page will use this or localStorage)
    if (email) {
      callbackUrl.searchParams.set('email', email);
    }
    
    // Pass the full original URL as the link parameter
    // The callback page uses window.location.href, but since we're server-side,
    // we pass the full URL so the client can use it
    callbackUrl.searchParams.set('link', request.url);
    
    // Redirect to callback page
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('Auth handler error:', error);
    // Fallback: redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function POST(request: NextRequest) {
  // Handle POST requests the same way as GET
  return GET(request);
}

