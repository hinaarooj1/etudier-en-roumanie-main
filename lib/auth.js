// lib/auth.js
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'auth-token';

// Unified token verification function
export function verifyToken(token) {
  try {
    if (!token) return null;

    // Try Node.js (server-side) verification first
    if (typeof require !== 'undefined') {
      const { verify } = require('jsonwebtoken');
      return verify(token, JWT_SECRET);
    }

    // Fallback to Edge-compatible verification
    return verifyTokenEdge(token);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Edge-compatible verification (for middleware, etc.)
export async function verifyTokenEdge(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(`${header}.${payload}`);
    const signatureBytes = base64UrlDecode(signature);
    
    const key = await crypto.subtle.importKey(
      'raw',
      textEncoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      data
    );
    
    if (!isValid) return null;
    
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error('Edge token verification failed:', error);
    return null;
  }
}

// Get token from request
// lib/auth.js
export function getAuthToken(req) {
  try {
    // Server-side (API routes, middleware, etc.)
    if (req) {
      // Check for cookies in the headers
      const cookieHeader = req.headers?.get('cookie') || req.headers?.cookie;
      if (!cookieHeader) return null;
      
      // Parse the cookies
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
      }, {});
      
      return cookies[COOKIE_NAME];
    }
    
    // Client-side
    if (typeof window !== 'undefined') {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${COOKIE_NAME}=`))
        ?.split('=')[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Create a new token
export function createToken(payload) {
  try {
    const { sign } = require('jsonwebtoken');
    return sign(payload, JWT_SECRET, { expiresIn: '7d' });
  } catch (error) {
    console.error('Error creating token:', error);
    throw new Error('Failed to create token');
  }
}

// Utility function for base64 URL decoding
function base64UrlDecode(str) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: break;
    case 2: output += '=='; break;
    case 3: output += '='; break;
    default: throw new Error('Illegal base64url string!');
  }
  return new Uint8Array(Array.from(atob(output)).map(c => c.charCodeAt(0)));
}

// ... keep other existing functions (hashPassword, verifyPassword,comparePassword etc.) ...

export async function setAuthCookie(res, token) {
  setCookie(COOKIE_NAME, token, {
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearAuthCookie(res) {
  deleteCookie(COOKIE_NAME, { res });
}

export function getCurrentUserToken(req) {
  return getCookie(COOKIE_NAME, { req });
}
 export async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


 // Keep existing functions for server-side use
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

