import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-950 text-white animate-bgFade">
      <Navbar />

      {/* ProfileCard */}
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl shadow-lg mt-8 p-8 sm:p-12 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start">
          {/* Avatar + Name */}
          <div className="flex items-center gap-6 mb-8 sm:mb-0">
            <Avatar className="h-28 w-28 border-4 border-purple-500 shadow-xl transition-shadow duration-500 hover:shadow-purple-500/50">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                }
                alt="profile"
                className="object-cover"
              />
            </Avatar>
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-sm">{user?.fullname}</h1>
              <p className="mt-1 text-gray-400 italic">{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 self-start sm:self-end border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition-colors duration-300 shadow-md"
          >
            <Pen size={18} />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 space-y-4 text-gray-300 text-lg">
          <div className="flex items-center gap-4">
            <Mail className="text-purple-400" size={20} />
            <span className="select-text break-all">{user?.email || 'Not provided'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact className="text-purple-400" size={20} />
            <span className="select-text">{user?.phoneNumber || 'Not provided'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-purple-200 border-b border-purple-400 pb-1 w-fit">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium drop-shadow-md cursor-default select-none hover:scale-105 transform transition-transform duration-200"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 italic">No skills listed</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-10">
          <Label className="text-lg font-semibold text-purple-200">Resume</Label>
          <div className="mt-2">
            {user?.profile?.resume ? (
              <div className="flex gap-4 items-center flex-wrap">
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline font-medium hover:text-purple-300 transition-colors duration-300"
                >
                  View Resume
                </a>
                <a
                  href={user.profile.resume}
                  download={user.profile.resumeOriginalName}
                  className="text-sm bg-purple-800 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                >
                  Download
                </a>
                {user.profile.resumeOriginalName && (
                  <p className="text-sm text-gray-500 italic">
                    {user.profile.resumeOriginalName}
                  </p>
                )}
              </div>
            ) : (
              <span className="text-gray-500 italic">Not available</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-800 animate-fadeInUp">
        <h1 className="text-2xl font-bold text-white mb-6">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes bgFade {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-bgFade {
          background-size: 200% 200%;
          animation: bgFade 15s linear infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Profile;
