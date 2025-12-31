import { NextRequest, NextResponse } from 'next/server';

/**
 * Firebase Auth Action Route
 * 
 * This route handles Firebase email link authentication callbacks.
 * Firebase redirects to /__/auth/action with authentication parameters,
 * and this route forwards them to our callback page.
 */
export async function GET(request: NextRequest) {
  console.log('[AUTH ACTION] GET handler called', request.url);
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:10',message:'GET handler called',data:{url:request.url,method:request.method},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  try {
    const searchParams = request.nextUrl.searchParams;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:13',message:'Search params extracted',data:{hasEmail:searchParams.has('email'),hasContinueUrl:searchParams.has('continueUrl'),allParams:Object.fromEntries(searchParams.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
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
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:33',message:'Callback URL created',data:{callbackUrl:callbackUrl.toString(),baseUrl:request.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Preserve email if provided (callback page will use this or localStorage)
    if (finalEmail) {
      callbackUrl.searchParams.set('email', finalEmail);
    }
    
    // Pass the full original URL as the link parameter
    // The callback page will use this to verify and sign in
    callbackUrl.searchParams.set('link', request.url);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:42',message:'Before redirect',data:{finalCallbackUrl:callbackUrl.toString(),finalEmail:finalEmail || null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Redirect to callback page
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:47',message:'Error caught',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.error('Auth action error:', error);
    // Fallback: redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function POST(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/d94ad755-3914-4983-a8a3-bbf08c5f5e98',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:53',message:'POST handler called',data:{url:request.url,method:request.method},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  // Handle POST requests the same way as GET
  return GET(request);
}

