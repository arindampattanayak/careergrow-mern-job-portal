import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ')?.replace(/\s*,\s*/g, ', ') || '',
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Max size is 5MB.');
        return;
      }
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setTimeout(() => setOpen(false), 500);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-indigo-100 to-blue-50 rounded-xl p-0 border-0 shadow-xl animate-fadeIn">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold text-indigo-700">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-6 px-6 pb-6 pt-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Your full name"
              className="col-span-3 bg-white text-gray-800 border border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
              required
            />
          </div>

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="col-span-3 bg-white text-gray-800 border border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
              required
            />
          </div>

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right font-medium text-gray-700">
              Phone
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91 98765 43210"
              className="col-span-3 bg-white text-gray-800 border border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
              required
            />
          </div>

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right font-medium text-gray-700">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Short bio about yourself"
              className="col-span-3 bg-white text-gray-800 border border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
            />
          </div>

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right font-medium text-gray-700">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="JavaScript, React, Node.js"
              className="col-span-3 bg-white text-gray-800 border border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
            />
          </div>

          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right font-medium text-gray-700">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              aria-label="Upload Resume"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="col-span-3 text-gray-800 file:bg-indigo-600 file:text-white file:border-none file:px-4 file:py-1 file:rounded-md file:cursor-pointer"
            />
          </div>

          
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400
                         text-white font-semibold rounded-md py-2 transition duration-150"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin inline-block" />
                  Please wait
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>

        
        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
