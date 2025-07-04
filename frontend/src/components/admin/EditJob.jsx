import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
        const job = res.data.job;
        setInput({
          title: job.title,
          description: job.description,
          requirements: job.requirements.join(', '),
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          experience: job.experienceLevel,
          position: job.position,
          companyId: job.company._id,
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load job details.');
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success('✅ Job updated successfully!');
        navigate('/admin/jobs');
      } else {
        toast.error(res.data.message || 'Failed to update job');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f7fafc] via-[#e4e9f0] to-[#d1d9e6] text-gray-800">
      <Navbar />

      <div className="flex-grow px-6 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10 border border-gray-300">
          <h2 className="text-3xl font-bold mb-8 text-indigo-700 border-b border-indigo-200 pb-3">
            Edit Job
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {[
              { label: 'Title', name: 'title' },
              { label: 'Description', name: 'description' },
              { label: 'Requirements (comma separated)', name: 'requirements' },
              { label: 'Salary (in LPA)', name: 'salary', type: 'number' },
              { label: 'Location', name: 'location' },
              { label: 'Job Type', name: 'jobType' },
              { label: 'Experience Level (years)', name: 'experience' },
              { label: 'Position (No. of Openings)', name: 'position' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <Label className="text-sm text-gray-700 font-medium">{label}</Label>
                <Input
                  name={name}
                  type={type}
                  value={input[name]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
            >
              {loading ? 'Updating...' : 'Update Job'}
            </Button>
          </form>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditJob;
