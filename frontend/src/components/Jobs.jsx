import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <>
    
      <Navbar />

     
      <div className="min-h-screen bg-gradient-to-br from-[#f1f5ff] via-[#f8fbff] to-[#edf3ff] text-gray-800 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="lg:w-1/4 w-full bg-white border border-blue-200 rounded-xl p-5 shadow-md animate-slideInLeft">
              <FilterCard />
            </aside>

            
            <main className="flex-1">
              {filterJobs.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-16 animate-fadeIn">
                   No jobs found matching your criteria.
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      exit={{ opacity: 0 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </main>
          </div>
        </div>

       
        <style jsx>{`
          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.98);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>

   
      <Footer />
    </>
  );
};

export default Jobs;
