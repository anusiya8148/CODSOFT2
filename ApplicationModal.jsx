import { useState } from 'react';
import api from '../api/axios';

export default function ApplicationModal({ jobId, onClose, onSuccess }) {
  const [coverLetter, setCover] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    const fd = new FormData();
    fd.append('resume', file);
    const { data } = await api.post('/upload/resume', fd);
    return data.path;
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resumePath = file ? await uploadResume() : undefined;
      await api.post('/applications', { jobId, coverLetter, resumePath });
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full">
        <h3 className="text-xl font-bold mb-2">Apply to this job</h3>
        <form onSubmit={submit} className="space-y-3">
          <textarea
            className="input h-32"
            placeholder="Cover letter"
            value={coverLetter}
            onChange={(e) => setCover(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button disabled={loading} className="btn-primary">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
