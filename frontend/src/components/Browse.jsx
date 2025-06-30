import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
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
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-bold text-2xl mb-8">Search Results ({allJobs.length})</h1>

        {allJobs.length === 0 ? (
          <div className="text-center text-gray-400 text-lg mt-20">
            No jobs found. Try refining your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
