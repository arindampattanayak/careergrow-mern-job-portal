import React from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ListChecks } from 'lucide-react'; // Optional icons

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-[#f5f9ff] border border-blue-200 hover:border-blue-400 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 group"
    >
      {/* Company Info */}
      <div className="flex items-center gap-4 mb-3">
        <Avatar className="w-12 h-12 border border-gray-300">
          <AvatarImage src={job?.company?.logo} alt="logo" />
          <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
            {job?.company?.name?.charAt(0) || 'C'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-blue-700 font-semibold text-md group-hover:underline">
            {job?.company?.name || 'Unknown Company'}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job?.location || 'India'}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div className="mt-2">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Requirements Preview */}
      {job?.requirements?.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-1">
            <ListChecks className="w-4 h-4" />
            Key Requirements:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
            {job.requirements.slice(0, 3).map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-800 border border-blue-300 font-medium rounded-full px-3 py-1">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="bg-green-100 text-green-800 border border-green-300 font-medium rounded-full px-3 py-1">
          {job?.jobType}
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 font-medium rounded-full px-3 py-1">
          💰 {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
