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

    const params = useParams();
    const jobId = params.id;
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
            console.log(error);
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
            className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-12 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-700 max-w-6xl mx-auto grid md:grid-cols-3 gap-10"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                {/* Sidebar (Company + Apply) */}
                <div className="col-span-1 flex flex-col items-center gap-6">
                    <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-purple-400 shadow-inner">
                        {singleJob?.company?.name?.charAt(0) || 'C'}
                    </div>
                    <div className="text-center">
                        <h1 className="text-lg font-semibold text-purple-300">{singleJob?.company?.name}</h1>
                        <p className="text-sm text-gray-400 mt-1">{singleJob?.location}</p>
                    </div>
                    <div className="space-y-2">
                        <Badge className="text-blue-400 font-semibold bg-blue-900 border border-blue-600" variant="outline">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-red-400 font-semibold bg-red-900 border border-red-600" variant="outline">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-purple-400 font-semibold bg-purple-900 border border-purple-600" variant="outline">
                            ₹ {singleJob?.salary} LPA
                        </Badge>
                    </div>
                    <motion.div whileHover={{ scale: isApplied ? 1 : 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`w-full rounded-full px-6 py-2 font-semibold text-white transition-all duration-300 shadow-md ${
                                isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-700 to-purple-900 hover:brightness-110'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </motion.div>
                </div>

                {/* Main Section */}
                <div className="col-span-2">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white">{singleJob?.title}</h1>
                        <p className="text-gray-300 mt-2">{singleJob?.description}</p>
                    </div>

                    <div className="space-y-6 text-sm text-gray-300">
                        <div className="flex items-start gap-3">
                            <Briefcase className="text-purple-400" size={20} />
                            <div>
                                <h2 className="font-semibold">Role:</h2>
                                <p>{singleJob?.title}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-purple-400" size={20} />
                            <div>
                                <h2 className="font-semibold">Location:</h2>
                                <p>{singleJob?.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Wallet className="text-purple-400" size={20} />
                            <div>
                                <h2 className="font-semibold">Salary:</h2>
                                <p>₹ {singleJob?.salary} LPA</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users className="text-purple-400" size={20} />
                            <div>
                                <h2 className="font-semibold">Total Applicants:</h2>
                                <p>{singleJob?.applications?.length || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CalendarDays className="text-purple-400" size={20} />
                            <div>
                                <h2 className="font-semibold">Posted On:</h2>
                                <p>{singleJob?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default JobDescription;
