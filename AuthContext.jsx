import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    api.get('/users/me').then(r => setUser(r.data)).finally(() => setLoading(false));
  }, []);

  const loginWithGoogle = () => {
    window.location.href =' ${api.defaults.baseURL}/auth/google';
  };

  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return <AuthCtx.Provider value={{ user, setUser, loading, loginWithGoogle, logout }}>{children}</AuthCtx.Provider>;
}