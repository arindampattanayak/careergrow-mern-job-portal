import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Plus } from 'lucide-react';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e7ecff] to-[#f9fafe] text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-4 md:px-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 animate-fadeInScale">
          <Input
            className="w-full md:w-72 bg-white border border-gray-300 text-gray-800 placeholder-gray-500
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded-lg shadow-md transition"
            placeholder="🔍 Filter by company name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            New Company
          </Button>
        </div>

       

        {/* Section Heading */}
        <h2 className="text-xl font-semibold text-indigo-700 mb-6 border-b border-indigo-300 pb-1">
          Registered Companies
        </h2>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-300">
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
