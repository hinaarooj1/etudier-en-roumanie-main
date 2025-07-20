import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession({ userId, isAdmin, email }) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  const session = await encrypt({ userId, isAdmin, email, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}