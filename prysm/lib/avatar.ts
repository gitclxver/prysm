/**
 * Generate avatar URL using UI Avatars API
 * This is a free service that generates avatars based on name/initials
 * No storage required - avatars are generated on-demand
 */
export function generateAvatarUrl(name: string, size: number = 200): string {
  // Clean the name and get initials
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
    .padEnd(2, 'A'); // Ensure at least 2 characters

  // Generate a consistent color based on name
  const colors = [
    'd4ff80', // lime
    'e0d7ff', // lavender
    'ff6b6b', // red
    '4ecdc4', // teal
    '45b7d1', // blue
    'f9ca24', // yellow
    '6c5ce7', // purple
    'a29bfe', // light purple
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Use UI Avatars API (free, no API key required)
  const params = new URLSearchParams({
    name: initials,
    size: size.toString(),
    background: bgColor,
    color: '120d2b', // Dark text color
    bold: 'true',
    length: '2',
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}

/**
 * Get avatar URL for a user
 * Falls back to generated avatar if no photoURL is provided
 * @param displayName - User's display name (used for fallback avatar generation)
 * @param photoURL - Optional photo URL (if provided, returns this directly)
 * @param size - Optional size for generated avatar (default: 200)
 */
export function getUserAvatarUrl(
  displayName: string,
  photoURL?: string | null,
  size?: number
): string {
  if (photoURL) {
    return photoURL;
  }
  return generateAvatarUrl(displayName, size);
}

