import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-xl bg-gradient-to-br from-gray-1000 to-gray-800 border border-gray-600 hover:border-purple-500 cursor-pointer transition-all duration-300 shadow-md hover:shadow-purple-800/40 text-white"
    >
      {/* Company Info */}
      <div className="mb-2">
        <h2 className="font-semibold text-lg text-purple-300">
          {job?.company?.name || 'Unknown Company'}
        </h2>
        <p className="text-sm text-gray-400">📍 India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-2">
        <h1 className="text-xl font-bold text-white mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-300 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-purple-100 text-purple-700 border border-purple-400 font-semibold" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-700 border border-red-400 font-semibold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-400 font-semibold" variant="outline">
          💰 {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
