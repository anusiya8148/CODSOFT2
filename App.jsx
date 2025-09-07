import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { setUser } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  // Handle OAuth callback ?token=
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const token = params.get('token');

    if (loc.pathname === '/auth/callback' && token) {
      localStorage.setItem('token', token);

      // fetch user info
      fetch('${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/users/me',
        {
        headers: { Authorization: 'Bearer ${token}' },
      })
        .then((r) => r.json())
        .then((u) => {
          setUser(u);
          nav('/');
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          nav('/login');
        });
    }
  }, [loc.pathname, loc.search, nav, setUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}