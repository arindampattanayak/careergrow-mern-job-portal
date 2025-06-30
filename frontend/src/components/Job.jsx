import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
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
    <div className="p-5 rounded-lg shadow-lg border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 text-white transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300 animate-fadeIn">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="ghost"
          className="rounded-full hover:text-yellow-400 text-gray-400 transition"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-3 mb-4">
        <Avatar className="bg-gray-700 p-1">
          <AvatarImage src={job?.company?.logo} alt="logo" />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-purple-300">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="text-xl font-bold text-white mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-400">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-300 font-semibold border border-blue-500 bg-transparent" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-pink-400 font-semibold border border-pink-600 bg-transparent" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-300 font-semibold border border-purple-600 bg-transparent" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Requirements */}
      {job?.requirements?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requirements.map((req, index) => (
            <Badge
              key={index}
              className="bg-gray-700 text-gray-300 border border-gray-600 rounded-full text-xs"
            >
              {req.trim()}
            </Badge>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="border border-purple-500 text-purple-300 hover:bg-purple-800 hover:text-white transition-all transform hover:scale-[1.03]"
        >
          Details
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white transition-all transform hover:scale-[1.03]">
          Save For Later
        </Button>
      </div>

      {/* Fade-in animation */}
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
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Job;
