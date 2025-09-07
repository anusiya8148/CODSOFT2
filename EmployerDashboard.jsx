import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    tags: '',
  });

  const load = async () => {
    const { data } = await api.get('/jobs/me/list');
    setJobs(data);
  };
  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: [],
    };
    await api.post('/jobs', payload);
    setForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salaryMin: '',
      salaryMax: '',
      description: '',
      tags: '',
    });
    load();
  };

  if (!user || user.role !== 'employer')
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        Login as Employer to continue.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-3">Post a Job</h2>
        <form onSubmit={create} className="space-y-3">
          {['title', 'company', 'location'].map((k) => (
            <input
              key={k}
              className="input"
              placeholder={k}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <select
            className="input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(
              (t) => (
                <option key={t}>{t}</option>
              )
            )}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="input"
              placeholder="Salary Min"
              value={form.salaryMin}
              onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
            />
            <input
              className="input"
              placeholder="Salary Max"
              value={form.salaryMax}
              onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
            />
          </div>
          <textarea
            className="input h-32"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="input"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <button className="btn-accent">Publish Job</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-3">My Jobs</h2>
        <ul className="space-y-3">
          {jobs.map((j) => (
            <li
              key={j._id}
              className="border rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{j.title}</p>
                <p className="text-sm text-gray-600">
                  {j.company} • {j.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
