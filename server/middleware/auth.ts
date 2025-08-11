import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Simple admin password (in production, this should be hashed and stored securely)
const ADMIN_PASSWORD = "gdgoc2024admin"; // Change this to a secure password
const JWT_SECRET = "gdgoc-jwt-secret-key"; // In production, use environment variable

// Simple session storage (in production, use Redis or database)
const activeSessions = new Set<string>();

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  const token = generateToken();
  activeSessions.add(token);
  return token;
}

export function validateSession(token: string): boolean {
  return activeSessions.has(token);
}

export function destroySession(token: string): void {
  activeSessions.delete(token);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !validateSession(token)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first.",
    });
  }

  next();
}
