import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../hooks/useAuth';
import ImagePlaceholder from '../components/ImagePlaceholder';
import LogoMark from '../components/LogoMark';
import Reveal from '../components/Reveal';

type Mode = 'signin' | 'signup';

const TAB_SPRING = { type: 'spring', stiffness: 380, damping: 34 } as const;

export default function SignInPage() {
  useDocumentTitle('Sign In', 'Sign in or create an AUSTAY account to search stays and manage your bookings.');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const reduced = useReducedMotion();

  const from = (location.state as { from?: Location } | null)?.from;

  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const result = mode === 'signin' ? await signIn(email, password) : await signUp(name, email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong. Please try again.');
      return;
    }

    navigate(from ? `${from.pathname}${from.search}` : '/', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <ImagePlaceholder label="A place to call home" src="/become-host.png" />
        <div className="auth-visual-scrim" />
        <div className="auth-visual-copy">
          <Link to="/" className="auth-logo">
            <LogoMark />
            AUSTAY
          </Link>
          <h2>Find your next place to live</h2>
          <p>Save your favourite stays, book faster, and manage your trips in one place.</p>
        </div>
      </div>

      <div className="auth-panel">
        <Reveal className="auth-card">
          {from ? (
            <p className="auth-redirect-note">Sign in to view search results and book your stay.</p>
          ) : null}

          <div className="auth-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signin'}
              className={mode === 'signin' ? 'is-active' : ''}
              onClick={() => switchMode('signin')}
            >
              {mode === 'signin' ? (
                <motion.span
                  className="auth-tab-highlight"
                  layoutId="auth-tab-highlight"
                  transition={reduced ? { duration: 0 } : TAB_SPRING}
                />
              ) : null}
              <span className="auth-tab-label">Sign In</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={mode === 'signup' ? 'is-active' : ''}
              onClick={() => switchMode('signup')}
            >
              {mode === 'signup' ? (
                <motion.span
                  className="auth-tab-highlight"
                  layoutId="auth-tab-highlight"
                  transition={reduced ? { duration: 0 } : TAB_SPRING}
                />
              ) : null}
              <span className="auth-tab-label">Sign Up</span>
            </button>
          </div>

          <motion.div layout transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={reduced ? { duration: 0.1 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
                <p className="auth-form-lead">
                  {mode === 'signin'
                    ? 'Sign in to manage your saved stays and bookings.'
                    : 'Sign up to save stays, book faster, and manage your trips.'}
                </p>

                {error ? <p className="auth-error">{error}</p> : null}

                {mode === 'signup' ? (
                  <label>
                    Full Name
                    <input
                      required
                      placeholder="Your full name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                ) : null}

                <label>
                  Email Address
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>

                <label>
                  Password
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    minLength={8}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>

                {mode === 'signup' ? (
                  <label>
                    Confirm Password
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      minLength={8}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </label>
                ) : (
                  <div className="auth-form-row-between">
                    <label className="modal-checkbox">
                      <input type="checkbox" /> Remember me
                    </label>
                    <a href="#forgot-password" className="auth-forgot">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
                  {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
                </button>

                <p className="auth-switch">
                  {mode === 'signin' ? (
                    <>
                      Don't have an account?{' '}
                      <button type="button" onClick={() => switchMode('signup')}>
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button type="button" onClick={() => switchMode('signin')}>
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </div>
  );
}
