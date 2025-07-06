import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import Footer from '../shared/Footer';
import { Plus } from 'lucide-react'; 

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#f7faff] to-[#e5edfb] text-gray-900 animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto my-14 px-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-10 animate-fadeInScale">
          <Input
            className="w-full sm:w-80 bg-white border border-gray-300 text-gray-900 placeholder-gray-500
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded-md shadow-md transition"
            placeholder="🔍 Filter by job title, role..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:brightness-110 text-white px-6 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} /> New Job
          </Button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-indigo-700 mb-6 border-b border-indigo-300 pb-1">
          Recently Posted Jobs
        </h2>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition-all duration-300">
          <AdminJobsTable />
        </div>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminJobs;
