import React, { useEffect, useState } from 'react';
import { LayoutDashboard, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { ADMIN_EMAILS, TEST_ADMIN_BYPASS } from '../config';

export default function AdminLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAdmin = user?.email ? ADMIN_EMAILS.includes(user.email) : false;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u?.email && ADMIN_EMAILS.includes(u.email)) {
        navigate('/admin');
      }
    });

    return () => unsub();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white p-6 text-center shadow-xl sm:p-8 md:p-10">
        <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-semibold text-brand-dark mb-2">Fleet Command Login</h1>
        <p className="text-brand-text-muted text-sm font-medium mb-8">
          A private dashboard concept for booking requests, fleet availability, port handoffs, and daily pickup coordination.
        </p>

        {TEST_ADMIN_BYPASS && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
            <p className="text-xs font-semibold leading-relaxed text-amber-800">
              Testing access is currently enabled. Anyone with this link can open the admin dashboard until the bypass is turned off.
            </p>
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-3 text-left">
          {['Requests', 'Fleet', 'Pickups', 'Docs'].map((item) => (
            <div key={item} className="rounded-xl border border-brand-border bg-brand-surface p-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-semibold text-brand-dark">{item}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-sm font-semibold text-brand-text-muted">Checking session...</div>
        ) : (
          <>
            {TEST_ADMIN_BYPASS && (
              <button
                onClick={() => navigate('/admin')}
                className="mb-3 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-primary/90 active:scale-[0.98]"
              >
                <LayoutDashboard className="w-5 h-5" />
                Continue to dashboard
              </button>
            )}

            <button
              onClick={loginWithGoogle}
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand-dark px-6 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-primary active:scale-[0.98]"
            >
              <UserIcon className="w-5 h-5" />
              Sign in with Google
            </button>

            {user && !isAdmin && (
              <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-left">
                <p className="text-xs font-semibold text-red-700 leading-relaxed">
                  {user.email} is signed in, but it is not authorized for admin access.
                </p>
                <button
                  onClick={logout}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-red-700 transition-colors hover:text-red-900"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-6 min-h-10 text-sm font-semibold text-brand-text-muted transition-colors hover:text-brand-dark"
        >
          Return to public site
        </button>
      </div>
    </div>
  );
}
