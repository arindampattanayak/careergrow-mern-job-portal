import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-fadeIn">
        <span className="text-[#9D4EDD]">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
        {allJobs.length <= 0 ? (
          <span className="text-gray-400">🚫 No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LatestJobs;
