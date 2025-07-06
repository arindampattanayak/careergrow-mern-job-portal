import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 rounded-2xl bg-[#f7faff] border border-blue-100 text-gray-800 shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] duration-300 animate-fadeIn">
     
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Posted Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="ghost"
          className="rounded-full hover:text-yellow-500 text-gray-400 transition"
          size="icon"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      
      <div className="flex items-center gap-4 mt-4 mb-5">
        <Avatar className="bg-gray-100 border border-gray-300">
          <AvatarImage src={job?.company?.logo} alt="logo" />
        </Avatar>
        <div>
          <h2 className="text-md font-semibold text-blue-700">
            {job?.company?.name}
          </h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-indigo-500" />
            {job?.location || 'Location not specified'}
          </p>
        </div>
      </div>

    
      <div className="mb-3">
        <h1 className="text-lg font-bold text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{job?.description}</p>
      </div>

      
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="text-blue-600 font-medium bg-blue-100 border border-blue-200">
          {job?.position} {job?.position > 1 ? 'Positions' : 'Position'}
        </Badge>
        <Badge className="text-green-600 font-medium bg-green-100 border border-green-200">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 font-medium bg-purple-100 border border-purple-200">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      
      {job?.requirements?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requirements.map((req, index) => (
            <Badge
              key={index}
              className="bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-xs"
            >
              {req.trim()}
            </Badge>
          ))}
        </div>
      )}

      
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full transition"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          Save for Later
        </Button>
      </div>

      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Job;
