import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

export default function CandidateDashboard() {
  const { user, setUser } = useAuth();
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({
    name: '',
    headline: '',
    location: '',
    skills: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        headline: user.headline || '',
        location: user.location || '',
        skills: (user.skills || []).join(','),
        bio: user.bio || '',
      });
    }
  }, [user]);
  useEffect(() => {
    api.get('/applications/me').then((r) => setApps(r.data));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const { data } = await api.put('/users/me', {
      ...form,
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setUser(data);
  };

  if (!user)
    return <div className="max-w-5xl mx-auto px-4 py-8">Please login.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-3">Profile</h2>
        <form onSubmit={save} className="space-y-3">
          {['name', 'headline', 'location'].map((k) => (
            <input
              key={k}
              className="input"
              placeholder={k}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <input
            className="input"
            placeholder="skills (comma separated)"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
          />
          <textarea
            className="input h-32"
            placeholder="bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <button className="btn-primary">Save</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-3">My Applications</h2>
        <ul className="space-y-3">
          {apps.map((a) => (
            <li key={a._id} className="border rounded-xl p-3">
              <p className="font-semibold">
                {a.job?.title} at {a.job?.company}
              </p>
              <p className="text-sm text-gray-600">Status: {a.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
