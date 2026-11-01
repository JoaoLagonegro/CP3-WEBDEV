import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { getSession, onAuthChange, signIn, signOut } from '../services/auth';

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSession()
      .then((current) => {
        if (active) setSession(current);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    const unsubscribe = onAuthChange((current) => {
      setSession(current);
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ session, loading, login: signIn, logout: signOut }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
