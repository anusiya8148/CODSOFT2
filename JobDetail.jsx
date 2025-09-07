import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ApplicationModal from '../components/ApplicationModal';
import { useAuth } from '../contexts/AuthContext';

export default function JobDetail(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => { api.get('/jobs/${id}').then(r=>setJob(r.data)); }, [id]);

  if (!job) return <div className="max-w-4xl mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-primary">{job.title}</h1>
        <p className="text-gray-600">{job.company} • {job.location} • <span className="badge">{job.type}</span></p>
        <p className="mt-4 whitespace-pre-wrap text-gray-800">{job.description}</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          {(job.requirements||[]).map(r => <span className="badge" key={r}>{r}</span>)}
        </div>
        {user?.role === 'candidate' && (
          <button onClick={()=>setOpen(true)} className="mt-6 btn-primary">Apply Now</button>
        )}
      </div>
      {open && <ApplicationModal jobId={job._id} onClose={()=>setOpen(false)} onSuccess={()=>{ setOpen(false); alert('Application submitted!'); }} />}
    </div>
  );
}