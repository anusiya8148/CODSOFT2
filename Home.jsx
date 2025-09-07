import { useEffect, useState } from 'react';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    api.get('/jobs?limit=6').then((r) => setFeatured(r.data.jobs));
  }, []);
  return (
    <div>
      <section className="bg-hero-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Find your next dream job
            </h1>
            <p className="mt-3 text-white/90">
              Search thousands of roles and apply in one click. Colorful,
              modern, LinkedIn‑inspired UI.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/jobs" className="btn-primary">
                Browse Jobs
              </Link>
              <Link to="/employer" className="btn-accent">
                Post a Job
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="card bg-white/20 backdrop-blur text-white">
              <p className="text-lg">🚀 Trending skills</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['React', 'Node', 'Design', 'Marketing', 'Python', 'SQL'].map(
                  (s) => (
                    <span key={s} className="badge bg-white/80 text-primary">
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((j) => (
            <JobCard key={j._id} job={j} />
          ))}
        </div>
      </section>
    </div>
  );
}
