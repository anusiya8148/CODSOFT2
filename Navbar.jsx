import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [q, setQ] = useState('');
  const nav = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    nav('/jobs?q=${encodeURIComponent(q)}');
  };

  return (
    <header className="bg-hero-gradient text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link to="/" className="font-extrabold text-2xl">JobBoard<span className="text-yellow-300">Pro</span></Link>
        <form onSubmit={onSearch} className="flex-1 flex gap-2">
          <input className="input" placeholder="Search jobs, companies, skills" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn-accent">Search</button>
        </form>
        <nav className="flex items-center gap-4">
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          {user ? (
            <>
              {user.role === 'employer' ? <Link to="/employer" className="hover:underline">Employer</Link> : <Link to="/candidate" className="hover:underline">Profile</Link>}
              <button onClick={logout} className="btn-primary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}