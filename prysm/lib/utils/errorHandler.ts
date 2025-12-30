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
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/invalid-verification-code': 'Invalid verification code. Please try again.',
  'auth/invalid-verification-id': 'Invalid verification. Please request a new code.',
  'auth/code-expired': 'Verification code has expired. Please request a new one.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection and try again.',
  'auth/internal-error': 'An internal error occurred. Please try again.',
  'auth/invalid-api-key': 'Service configuration error. Please contact support.',
  'auth/app-not-authorized': 'This app is not authorized. Please contact support.',
  // Popup closed by user - don't show error
  'auth/popup-closed-by-user': '',
  'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site and try again.',
  'auth/cancelled-popup-request': '',
  
  // Connection/Network errors
  'auth/network-request-failed': 'Unable to connect. Please check your internet connection.',
  'auth/too-many-requests': 'Too many requests. Please wait a moment and try again.',
  
  // Email errors
  'auth/invalid-action-code': 'This link has expired or is invalid. Please request a new one.',
  'auth/expired-action-code': 'This link has expired. Please request a new verification email.',
  
  // General errors
  'permission-denied': 'You do not have permission to perform this action.',
  'unavailable': 'Service is temporarily unavailable. Please try again later.',
  'deadline-exceeded': 'Request timed out. Please try again.',
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
    
    // Check if popup was closed by user first
    if (isPopupClosedError(error)) {
      return '';
    }
    
    // Check if we have a user-friendly message for this error code
    if (errorCode && FIREBASE_ERROR_MESSAGES[errorCode]) {
      const message = FIREBASE_ERROR_MESSAGES[errorCode];
      // Return empty string for popup-closed errors
      return message || '';
    }
    
    // Check if the message is already user-friendly (validation errors)
    const message = error.message || '';
    if (message.includes('required') || message.includes('must be') || message.includes('invalid')) {
      return message;
    }
    
    // For connection/network errors, show user-friendly message
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'Unable to connect. Please check your internet connection and try again.';
    }
    
    // For unknown errors, return generic message
    return 'An error occurred. Please try again.';
  }

  // Handle Firebase error objects
  if (typeof error === 'object' && error !== null) {
    const firebaseError = error as FirebaseError;
    
    // Check for Firebase error code
    if (firebaseError.code && FIREBASE_ERROR_MESSAGES[firebaseError.code]) {
      return FIREBASE_ERROR_MESSAGES[firebaseError.code];
    }
    
    // Check if message is user-friendly
    if (firebaseError.message) {
      const msg = firebaseError.message;
      if (msg.includes('required') || msg.includes('must be') || msg.includes('invalid')) {
        return msg;
      }
    }
  }

  // Default fallback
  return 'An error occurred. Please try again.';
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

