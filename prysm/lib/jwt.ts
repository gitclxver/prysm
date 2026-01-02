import { SignJWT, jwtVerify } from "jose";

// Get JWT secret from environment variable, use a default fallback if not set
const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.NEXT_PUBLIC_JWT_SECRET ||
  "default-secret-key-change-in-production";

if (!JWT_SECRET || JWT_SECRET === "default-secret-key-change-in-production") {
  console.warn(
    "WARNING: JWT_SECRET is not set. Using default secret. This is not secure for production!"
  );
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  uid: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for a user session
 */
export async function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): Promise<string> {
  const jwt = await new SignJWT({ uid: payload.uid, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d") // Token expires in 30 days (sliding expiration - refreshed on each visit)
    .sign(secret);

  return jwt;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    // Cast through unknown first to avoid type conflict between jose's JWTPayload and our custom type
    const customPayload = payload as unknown as JWTPayload;
    // Validate required properties exist
    if (customPayload.uid && customPayload.email) {
      return customPayload;
    }
    return null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

/**
 * Get token from request headers
 */
export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}
