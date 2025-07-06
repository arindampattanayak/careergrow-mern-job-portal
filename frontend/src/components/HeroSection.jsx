import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-20 text-gray-800 animate-fadeInUp border-b border-gray-300">
      <div className="max-w-5xl mx-auto px-6 text-center">
     
        <span className="inline-block px-5 py-1 mb-5 rounded-full bg-indigo-200 text-indigo-700 text-sm font-semibold tracking-wide shadow">
          🚀 CareerGrow – #1 Job Hunt Platform
        </span>

      
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
          Search, Apply & <br className="hidden sm:block" />
          Land Your <span className="text-indigo-600">Dream Job</span>
        </h1>

        
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 mb-10">
          Discover top job opportunities tailored for your skills and passion — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search jobs by title or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 border border-gray-300 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
          />
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-200 shadow"
          >
            <Search className="h-5 w-5 mr-2" /> Search
          </Button>
        </div>
      </div>

      
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
