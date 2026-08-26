import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

const USERS_KEY = 'austay-users';
const SESSION_KEY = 'austay-session';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** True until the stored session has been checked on mount. RequireAuth
   * waits for this before deciding whether to redirect, so an already
   * signed-in visitor isn't bounced to /sign-in on a page reload. */
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const stored = loadUsers().find((u) => u.id === sessionId);
      if (stored) setUser({ id: stored.id, name: stored.name, email: stored.email });
    }
    setLoading(false);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string): Promise<AuthResult> => {
    const trimmedName = name.trim();
    const normalizedEmail = normalizeEmail(email);
    if (!trimmedName) return { ok: false, error: 'Enter your full name.' };
    if (!normalizedEmail) return { ok: false, error: 'Enter a valid email address.' };
    if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };

    const users = loadUsers();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: 'An account with this email already exists. Try signing in instead.' };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
    };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, newUser.id);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const normalizedEmail = normalizeEmail(email);
    const users = loadUsers();
    const match = users.find((u) => u.email === normalizedEmail);
    if (!match) return { ok: false, error: 'No account found with that email. Try signing up instead.' };

    const passwordHash = await hashPassword(password);
    if (passwordHash !== match.passwordHash) {
      return { ok: false, error: 'Incorrect email or password.' };
    }

    localStorage.setItem(SESSION_KEY, match.id);
    setUser({ id: match.id, name: match.name, email: match.email });
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
