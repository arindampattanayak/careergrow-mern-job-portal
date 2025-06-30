import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import Footer from '../shared/Footer';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto py-14 px-4 md:px-6">
        {/* Header Row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 
                     opacity-0 scale-95 animate-fadeInScale transition-all duration-500"
        >
          <Input
            className="w-full md:w-72 bg-gray-800 border border-gray-600 text-white placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md shadow-md transition"
            placeholder="Filter by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition 
                       text-white shadow-md hover:scale-105"
          >
            + New Company
          </Button>
        </div>

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-purple-300 mb-4">A list of your registered companies.</h2>

        {/* Table Container */}
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 transition-transform hover:scale-[1.01]">
          <CompaniesTable />
        </div>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
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

export default Companies;
