import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { getDb } from '../db';
import { AdminUser, UserRole } from '../../src/types';

// In-memory token store with 12-hour session expiry
interface SessionInfo {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

const sessions = new Map<string, SessionInfo>();

// Predefined password hash for demo administrators (password: "Admin@123")
// We support both "Admin@123" and any custom password set in db
export function hashPassword(pwd: string): string {
  return crypto.createHash('sha256').update(pwd + '_PPC_SECRET_SALT_2026').digest('hex');
}

export function createSession(user: AdminUser): string {
  const token = 'ppc_sess_' + crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 12 * 60 * 60 * 1000; // 12 hours
  sessions.set(token, { token, user, expiresAt });
  return token;
}

export function getSession(token: string): SessionInfo | null {
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return session;
}

export function revokeSession(token: string): void {
  sessions.delete(token);
}

export interface AuthenticatedRequest extends Request {
  user?: AdminUser;
  token?: string;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token required. Please sign in.'
    });
  }

  const token = authHeader.split(' ')[1];
  const session = getSession(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please sign in again.'
    });
  }

  req.user = session.user;
  req.token = token;
  next();
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (req.user.role === 'super_admin') {
      return next(); // Super admin has universal bypass
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: requires one of roles [${allowedRoles.join(', ')}]`
      });
    }

    next();
  };
}
