/**
 * Utility function to ensure Firebase operations have sufficient time to complete
 * This adds a minimum delay to prevent race conditions and ensure data consistency
 * 
 * @param operation - The Firebase operation promise
 * @param minDelayMs - Minimum delay in milliseconds (default: 500ms)
 * @returns Promise that resolves after both operation and delay complete
 */
export async function withFirebaseDelay<T>(
  operation: Promise<T>,
  minDelayMs: number = 500
): Promise<T> {
  const startTime = Date.now();
  
  try {
    // Execute the operation
    const result = await operation;
    
    // Calculate elapsed time
    const elapsedTime = Date.now() - startTime;
    
    // If operation completed faster than min delay, wait for remaining time
    if (elapsedTime < minDelayMs) {
      const remainingTime = minDelayMs - elapsedTime;
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
    
    return result;
  } catch (error) {
    // If operation failed, still wait for min delay to prevent flashing UI
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minDelayMs) {
      const remainingTime = minDelayMs - elapsedTime;
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
    
    // Re-throw the error
    throw error;
  }
}

