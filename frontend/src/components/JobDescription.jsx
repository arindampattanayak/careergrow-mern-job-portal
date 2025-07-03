import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays, Users, Wallet } from 'lucide-react';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <motion.div
      className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-12 bg-gradient-to-br from-[#fdfbff] via-[#f4f6fc] to-[#eef1f8] text-gray-800"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-[#faf5ff] p-10 rounded-3xl shadow-xl border border-purple-100 max-w-6xl mx-auto grid md:grid-cols-3 gap-12"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Sidebar (Company + Apply) */}
        <div className="col-span-1 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center text-3xl font-bold text-violet-700 shadow-sm">
            {singleJob?.company?.name?.charAt(0) || 'C'}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-violet-700">{singleJob?.company?.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{singleJob?.location}</p>
          </div>
          <div className="space-y-2">
            <Badge className="text-blue-600 font-semibold bg-blue-100 border border-blue-200">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-600 font-semibold bg-red-100 border border-red-200">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-indigo-600 font-semibold bg-indigo-100 border border-indigo-200">
              ₹ {singleJob?.salary} LPA
            </Badge>
          </div>
          <motion.div whileHover={{ scale: isApplied ? 1 : 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`w-full rounded-full px-6 py-2 font-medium text-white transition-all duration-300 ${
                isApplied
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:brightness-110'
              }`}
            >
              {isApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
          </motion.div>
        </div>

        {/* Main Section */}
        <div className="col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{singleJob?.title}</h1>
            <p className="text-gray-700 mt-3 leading-relaxed">{singleJob?.description}</p>
          </div>

          <div className="space-y-6 text-sm text-gray-700">
            <InfoRow icon={<Briefcase className="text-violet-600" size={20} />} title="Role" value={singleJob?.title} />
            <InfoRow icon={<MapPin className="text-violet-600" size={20} />} title="Location" value={singleJob?.location} />
            <InfoRow icon={<Wallet className="text-violet-600" size={20} />} title="Salary" value={`₹ ${singleJob?.salary} LPA`} />
            <InfoRow icon={<Users className="text-violet-600" size={20} />} title="Total Applicants" value={singleJob?.applications?.length || 0} />
            <InfoRow icon={<CalendarDays className="text-violet-600" size={20} />} title="Posted On" value={singleJob?.createdAt?.split("T")[0]} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoRow = ({ icon, title, value }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <h2 className="font-semibold">{title}:</h2>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default JobDescription;
