import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <>
      
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#f1f5ff] via-[#e8f0fc] to-[#dce9fb] text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="font-bold text-3xl text-blue-800 mb-8 text-center">
            🔍 Search Results ({allJobs.length})
          </h1>

          {allJobs.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-20">
              No jobs found. Try refining your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>

      
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Browse;
