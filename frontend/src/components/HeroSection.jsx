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
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-white animate-fadeInUp">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block px-5 py-2 mb-5 rounded-full bg-purple-700/20 text-purple-300 text-sm font-medium tracking-wide shadow-sm">
          🚀 CareerGrow - #1 Job Hunt Platform
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          Search, Apply & <br className="hidden sm:block" />
          Land Your <span className="text-purple-400">Dream Job</span>
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-gray-300 mb-10">
          Discover top job opportunities from elite companies and grow your career with us.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search jobs by title or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
          />
          <Button
            onClick={searchJobHandler}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition duration-200"
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
