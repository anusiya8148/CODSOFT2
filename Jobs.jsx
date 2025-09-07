import { useEffect, useState } from 'react';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import { useSearchParams } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();

  const fetchJobs = async () => {
    const { data } = await api.get('/jobs', {
      params: Object.fromEntries(params.entries()),
    });
    setJobs(data.jobs);
    setCount(data.count);
  };
  useEffect(() => {
    fetchJobs();
  }, [params.toString()]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <p className="text-gray-600 mb-4">{count} results</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((j) => (
          <JobCard key={j._id} job={j} />
        ))}
      </div>
    </div>
  );
}
