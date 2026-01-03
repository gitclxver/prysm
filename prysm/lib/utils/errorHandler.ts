/**
 * Sanitizes Firebase errors and converts them to user-friendly messages
 * without exposing technical details or stack traces
 */

interface FirebaseError {
  code?: string;
  message?: string;
}

/**
 * Maps Firebase error codes to user-friendly messages
 */
const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors
  'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
  'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
  'auth/password-does-not-meet-requirements': 'Password does not meet requirements.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/invalid-verification-code': 'Invalid verification code. Please try again.',
  'auth/invalid-verification-id': 'Invalid verification. Please request a new code.',
  'auth/code-expired': 'Verification code has expired. Please request a new one.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/quota-exceeded': 'We\'ve reached the daily limit for sending sign-in emails. Please try again tomorrow or contact support if you need immediate assistance.',
  'auth/network-request-failed': 'Network error. Please check your connection and try again.',
  'auth/internal-error': 'An internal error occurred. Please try again.',
  'auth/invalid-api-key': 'Service configuration error. Please contact support.',
  'auth/app-not-authorized': 'This app is not authorized. Please contact support.',
  // Popup closed by user - don't show error
  'auth/popup-closed-by-user': '',
  'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site and try again.',
  'auth/cancelled-popup-request': '',
  
  // Account/linking errors
  'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method. Please try signing in with that method instead.',
  'auth/credential-already-in-use': 'This credential is already associated with a different account.',
  'auth/requires-recent-login': 'This operation requires recent authentication. Please sign out and sign back in, then try again.',
  'auth/email-change-needs-verification': 'Please verify your new email address before making this change.',
  'auth/invalid-user-token': 'Your session has expired. Please sign in again.',
  'auth/user-token-expired': 'Your session has expired. Please sign in again.',
  'auth/null-user': 'No user is currently signed in. Please sign in and try again.',
  'auth/claims-too-large': 'The custom claims payload is too large. Please contact support.',
  'auth/id-token-expired': 'Your session has expired. Please sign in again.',
  'auth/id-token-revoked': 'Your session has been revoked. Please sign in again.',
  'auth/invalid-id-token': 'Your session is invalid. Please sign in again.',
  'auth/session-cookie-expired': 'Your session has expired. Please sign in again.',
  'auth/session-cookie-revoked': 'Your session has been revoked. Please sign in again.',
  'auth/insufficient-permission': 'You do not have permission to perform this action.',
  
  // Email/verification errors
  'auth/invalid-action-code': 'This link has expired or is invalid. Please request a new one.',
  'auth/expired-action-code': 'This link has expired. Please request a new verification email.',
  'auth/invalid-continue-uri': 'The continue URL is invalid. Please contact support.',
  'auth/missing-continue-uri': 'A continue URL is required. Please contact support.',
  'auth/invalid-dynamic-link-domain': 'The dynamic link domain is not configured. Please contact support.',
  'auth/invalid-recipient-email': 'The email address is invalid. Please check and try again.',
  'auth/invalid-sender': 'The sender email is not verified. Please contact support.',
  'auth/missing-email': 'An email address is required. Please provide one and try again.',
  'auth/missing-verification-code': 'Verification code is required. Please check your email and try again.',
  'auth/missing-verification-id': 'Verification ID is missing. Please request a new verification code.',
  
  // OAuth/provider errors
  'auth/oauth-provider-not-enabled': 'This sign-in provider is not enabled. Please contact support.',
  'auth/unauthorized-domain': 'This domain is not authorized. Please contact support.',
  'auth/invalid-oauth-client-id': 'OAuth configuration error. Please contact support.',
  'auth/invalid-oauth-provider': 'Invalid sign-in provider. Please contact support.',
  
  // Phone authentication errors
  'auth/invalid-phone-number': 'The phone number format is invalid. Please check and try again.',
  'auth/missing-phone-number': 'A phone number is required. Please provide one and try again.',
  'auth/captcha-check-failed': 'Verification failed. Please try again.',
  'auth/invalid-app-credential': 'App verification failed. Please try again.',
  'auth/missing-app-credential': 'App verification is required. Please try again.',
  'auth/session-expired': 'Your session has expired. Please try again.',
  
  // General Firestore/backend errors
  'permission-denied': 'You do not have permission to perform this action.',
  'unavailable': 'Service is temporarily unavailable. Please try again later.',
  'deadline-exceeded': 'Request timed out. Please try again.',
  'not-found': 'The requested resource was not found.',
  'already-exists': 'This resource already exists.',
  'failed-precondition': 'Operation cannot be completed. Please try again later.',
  'aborted': 'Operation was aborted. Please try again.',
  'out-of-range': 'The operation is out of valid range.',
  'unimplemented': 'This feature is not yet implemented.',
  'data-loss': 'Data corruption detected. Please contact support.',
  'unauthenticated': 'Please sign in to continue.',
  'cancelled': 'Operation was cancelled.',
};

/**
 * Checks if an error is a popup-closed error (user cancelled)
 */
export function isPopupClosedError(error: unknown): boolean {
  if (!error) return false;
  
  const errorCode = (error as any)?.code || '';
  const errorMessage = String((error as any)?.message || '').toLowerCase();
  const errorString = JSON.stringify(error).toLowerCase();
  
  // Check for various popup-closed error codes and messages
  return errorCode === 'auth/popup-closed-by-user' ||
         errorCode === 'auth/cancelled-popup-request' ||
         errorCode === 'auth/popup-blocked' ||
         errorMessage.includes('popup closed') ||
         errorMessage.includes('popup was closed') ||
         errorMessage.includes('user cancelled') ||
         errorMessage.includes('cancelled by user') ||
         errorString.includes('popup closed') ||
         errorString.includes('cancelled');
}

/**
 * Sanitizes an error and returns a user-friendly message
 * @param error - The error object from Firebase or any error
 * @returns A user-friendly error message, or empty string if error should be ignored
 */
export function sanitizeError(error: unknown): string {
  // If popup was closed by user, return empty string (no error shown)
  if (isPopupClosedError(error)) {
    return '';
  }
  // Handle null/undefined
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  // Handle string errors
  if (typeof error === 'string') {
    // Check if it's a validation error (user-friendly)
    if (error.includes('required') || error.includes('must be') || error.includes('invalid')) {
      return error;
    }
    // Otherwise, return generic message
    return 'An error occurred. Please try again.';
  }

  // Handle Error objects
  if (error instanceof Error) {
    const errorCode = (error as any).code;
    const errorMessage = error.message || '';
    
    // Check if popup was closed by user first
    if (isPopupClosedError(error)) {
      return '';
    }
    
    // Check for password requirements error (handle before other checks)
    if (errorMessage.includes('PASSWORD_DOES_NOT_MEET_REQUIREMENTS') || 
        errorMessage.includes('password requirements') ||
        errorMessage.includes('Missing password requirements')) {
      return parsePasswordRequirementsError(errorMessage);
    }
    
    // Check for HTTP status code errors (400, 401, 403, 404, 429, 500, etc.)
    const httpStatus = (error as any)?.response?.status || (error as any)?.status || errorCode;
    if (httpStatus === 400 && errorMessage.includes('PASSWORD_DOES_NOT_MEET_REQUIREMENTS')) {
      // Already handled above, but double-check
      return parsePasswordRequirementsError(errorMessage);
    }
    if (httpStatus === 401 || httpStatus === '401') {
      return 'Your session has expired. Please sign in again.';
    }
    if (httpStatus === 403 || httpStatus === '403') {
      return 'You do not have permission to perform this action.';
    }
    if (httpStatus === 404 || httpStatus === '404') {
      return 'The requested resource was not found.';
    }
    if (httpStatus === 429 || httpStatus === '429') {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (httpStatus === 500 || httpStatus === '500' || httpStatus === 502 || httpStatus === '502' || httpStatus === 503 || httpStatus === '503') {
      return 'Server error. Please try again in a few moments.';
    }
    
    // Check for quota exceeded errors (Firebase email sign-in limit) - handle before generic error mapping
    if (errorCode === 'auth/quota-exceeded' || httpStatus === 400) {
      if (errorMessage.includes('QUOTA_EXCEEDED') || errorMessage.includes('quota') || errorMessage.includes('Exceeded daily quota')) {
        return 'We\'ve reached the daily limit for sending sign-in emails. Please try again tomorrow or contact support if you need immediate assistance.';
      }
    }
    
    // Check if we have a user-friendly message for this error code
    if (errorCode && FIREBASE_ERROR_MESSAGES[errorCode]) {
      const message = FIREBASE_ERROR_MESSAGES[errorCode];
      // Return empty string for popup-closed errors
      return message || '';
    }
    
    // Check if the message is already user-friendly (validation errors)
    if (errorMessage.includes('required') || errorMessage.includes('must be') || errorMessage.includes('invalid')) {
      return errorMessage;
    }
    
    // For connection/network errors, show user-friendly message
    if (
      errorMessage.includes('network') || 
      errorMessage.includes('fetch') || 
      errorMessage.includes('connection') ||
      errorMessage.includes('offline') ||
      errorMessage.includes('failed to fetch') ||
      errorMessage.includes('networkerror') ||
      errorMessage.includes('network request failed') ||
      errorMessage.includes('internet')
    ) {
      return 'Device is offline. Please check your internet connection and try again.';
    }
    
    // For unknown errors, try to extract meaningful information
    // Check if error message contains useful information (but not technical stack traces)
    if (errorMessage && 
        errorMessage.length < 200 && 
        !errorMessage.includes('at ') && 
        !errorMessage.includes('Stack trace') &&
        !errorMessage.includes('Error:') &&
        !errorMessage.includes('file://')) {
      // Message seems user-friendly enough
      return errorMessage;
    }
    
    // Generic fallback message
    return 'Something went wrong. Please try again, or contact support if the problem persists.';
  }

  // Handle Firebase error objects
  if (typeof error === 'object' && error !== null) {
    const firebaseError = error as FirebaseError;
    
    // Check for nested error structure (common in HTTP responses)
    if ('error' in firebaseError && typeof (firebaseError as any).error === 'object') {
      const nestedError = (firebaseError as any).error;
      if (nestedError?.message) {
        const nestedMessage = nestedError.message;
        // Check for password requirements in nested error
        if (nestedMessage.includes('PASSWORD_DOES_NOT_MEET_REQUIREMENTS') || 
            nestedMessage.includes('password requirements') ||
            nestedMessage.includes('Missing password requirements')) {
          return parsePasswordRequirementsError(nestedMessage);
        }
        // Check if nested error has a code
        if (nestedError.code && FIREBASE_ERROR_MESSAGES[nestedError.code]) {
          return FIREBASE_ERROR_MESSAGES[nestedError.code];
        }
        // Use nested message if it seems user-friendly
        if (nestedMessage.length < 300 && !nestedMessage.includes('at ') && !nestedMessage.includes('Stack')) {
          return sanitizeError(nestedError);
        }
      }
    }
    
    const errorMessage = firebaseError.message || '';
    
    // Check for password requirements error first
    if (errorMessage.includes('PASSWORD_DOES_NOT_MEET_REQUIREMENTS') || 
        errorMessage.includes('password requirements') ||
        errorMessage.includes('Missing password requirements')) {
      return parsePasswordRequirementsError(errorMessage);
    }
    
    // Check for quota exceeded errors
    if (firebaseError.code === 'auth/quota-exceeded' || firebaseError.code === '400') {
      if (errorMessage.includes('QUOTA_EXCEEDED') || errorMessage.includes('quota') || errorMessage.includes('Exceeded daily quota')) {
        return 'We\'ve reached the daily limit for sending sign-in emails. Please try again tomorrow or contact support if you need immediate assistance.';
      }
    }
    
    // Check for Firebase error code
    if (firebaseError.code && FIREBASE_ERROR_MESSAGES[firebaseError.code]) {
      return FIREBASE_ERROR_MESSAGES[firebaseError.code];
    }
    
    // Check if message is user-friendly
    if (errorMessage && errorMessage.length < 300) {
      if (errorMessage.includes('required') || errorMessage.includes('must be') || errorMessage.includes('invalid')) {
        return errorMessage;
      }
    }
  }

  // Handle objects with error property (nested errors)
  if (typeof error === 'object' && error !== null && 'error' in error) {
    return sanitizeError((error as any).error);
  }
  
  // Default fallback - provide helpful guidance
  return 'Something went wrong. Please try again. If the problem persists, contact support for assistance.';
}

/**
 * Parses password requirements error and returns user-friendly message
 */
function parsePasswordRequirementsError(errorMessage: string): string {
  const requirements: string[] = [];
  
  // Try to extract requirements from bracket format: [Password must contain..., Password must contain...]
  const bracketMatch = errorMessage.match(/\[([^\]]+)\]/);
  if (bracketMatch) {
    const requirementsList = bracketMatch[1];
    // Split by comma and parse each requirement
    const requirementStrings = requirementsList.split(',').map(s => s.trim());
    
    for (const req of requirementStrings) {
      if (req.includes('upper case character') || req.includes('uppercase')) {
        requirements.push('an uppercase letter');
      } else if (req.includes('lower case character') || req.includes('lowercase')) {
        requirements.push('a lowercase letter');
      } else if (req.includes('numeric character') || req.includes('number')) {
        requirements.push('a number');
      } else if (req.includes('non-alphanumeric character') || req.includes('special character')) {
        requirements.push('a special character (e.g., !, @, #, $)');
      } else if (req.includes('minimum length') || req.includes('at least')) {
        const lengthMatch = req.match(/(\d+)\s*(?:characters?|chars?)/i);
        if (lengthMatch) {
          requirements.push(`at least ${lengthMatch[1]} characters`);
        }
      }
    }
  }
  
  // Fallback: Extract requirements from the error message directly
  if (requirements.length === 0) {
    if (errorMessage.includes('upper case character') || errorMessage.includes('uppercase')) {
      requirements.push('an uppercase letter');
    }
    if (errorMessage.includes('lower case character') || errorMessage.includes('lowercase')) {
      requirements.push('a lowercase letter');
    }
    if (errorMessage.includes('numeric character') || errorMessage.includes('number')) {
      requirements.push('a number');
    }
    if (errorMessage.includes('non-alphanumeric character') || errorMessage.includes('special character')) {
      requirements.push('a special character (e.g., !, @, #, $)');
    }
    if (errorMessage.includes('minimum length') || errorMessage.includes('at least')) {
      const lengthMatch = errorMessage.match(/(\d+)\s*(?:characters?|chars?)/i);
      if (lengthMatch) {
        requirements.push(`at least ${lengthMatch[1]} characters`);
      }
    }
  }
  
  if (requirements.length === 0) {
    // Fallback if we can't parse requirements
    return 'Password does not meet requirements. Please ensure your password includes uppercase and lowercase letters, numbers, and special characters.';
  }
  
  // Build user-friendly message
  if (requirements.length === 1) {
    return `Password must contain ${requirements[0]}.`;
  } else if (requirements.length === 2) {
    return `Password must contain ${requirements[0]} and ${requirements[1]}.`;
  } else {
    const lastRequirement = requirements.pop();
    return `Password must contain ${requirements.join(', ')}, and ${lastRequirement}.`;
  }
}

/**
 * Checks if an error is a connection/network error that should be shown to the user
 */
export function isConnectionError(error: unknown): boolean {
  if (!error) return false;
  
  const errorString = JSON.stringify(error).toLowerCase();
  return errorString.includes('network') || 
         errorString.includes('fetch') || 
         errorString.includes('connection') ||
         errorString.includes('timeout') ||
         errorString.includes('unavailable');
}

