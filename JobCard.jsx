import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="card hover:shadow-xl transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary">{job.title}</h3>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>
        <span className="badge">{job.type}</span>
      </div>
      <p className="mt-3 text-gray-700 line-clamp-2">{job.description}</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {(job.tags || []).slice(0,4).map(t => <span key={t} className="badge">#{t}</span>)}
      </div>
      <div className="mt-4">
        <Link to={'/jobs/${job._id}'} className="btn-primary">View Details</Link>
      </div>
    </div>
  );
}