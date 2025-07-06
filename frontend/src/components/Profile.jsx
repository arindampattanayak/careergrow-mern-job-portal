import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-3xl shadow-lg p-8 sm:p-12 transition-transform duration-300 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start">
            
            <div className="flex items-center gap-6 mb-8 sm:mb-0">
              <Avatar className="h-28 w-28 border-4 border-indigo-300 shadow-md">
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
                
                <h1 className="text-3xl font-bold text-gray-800">{user?.fullname}</h1>
                <p className="mt-1 text-gray-500 italic">{user?.profile?.bio || 'No bio available'}</p>
              </div>
            </div>

            
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="flex items-center gap-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
            >
              <Pen size={18} />
              Edit Profile
            </Button>
          </div>

          
          <div className="mt-8 space-y-4 text-gray-700 text-base">
            <h2 className="text-lg font-semibold text-indigo-600">• Contact Information</h2>
            <div className="flex items-center gap-4">
              <Mail className="text-indigo-500" size={20} />
              <span>{user?.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center gap-4">
              <Contact className="text-indigo-500" size={20} />
              <span>{user?.phoneNumber || 'Not provided'}</span>
            </div>
          </div>

          
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3 text-indigo-600 border-b border-indigo-300 pb-1 w-fit">
              • Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium border border-indigo-300"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills listed</span>
              )}
            </div>
          </div>

          
          <div className="mt-10">
            <Label className="text-lg font-semibold text-indigo-600">• Resume</Label>
            <div className="mt-2">
              {user?.profile?.resume ? (
                <div className="flex gap-4 items-center flex-wrap">
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline font-medium hover:text-indigo-500 transition-colors duration-300"
                  >
                    View Resume
                  </a>
                  <a
                    href={user.profile.resume}
                    download={user.profile.resumeOriginalName}
                    className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition"
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
                <span className="text-gray-400 italic">Not available</span>
              )}
            </div>
          </div>
        </div>

        
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl p-8 shadow-md border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </main>

    
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      
      <Footer />
    </div>
  );
};

export default Profile;
