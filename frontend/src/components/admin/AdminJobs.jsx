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

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Search & New Job Button */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8
                     opacity-0 scale-95 animate-fadeInScale transition-all duration-500 ease-out"
        >
          <Input
            className="w-full sm:w-72 bg-gray-800 border border-gray-600 text-white placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:outline-none focus:shadow-lg transition"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md 
                       transform hover:scale-105 hover:shadow-lg transition duration-300"
          >
            + New Job
          </Button>
        </div>

        {/* Section Title */}
        <h2 className="text-xl font-semibold text-purple-300 mb-4">A list of your recently posted jobs</h2>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default AdminJobs;
