import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fef6f9] via-[#ece7ff] to-[#d0ebff]">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-4 py-10">
        <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-pink-200 animate-slideInFade">
          
          
          <div className="w-1/2 bg-gradient-to-br from-fuchsia-100 to-indigo-100 p-8 hidden md:flex flex-col items-center justify-center">
            <Link to="/" className="text-4xl font-extrabold text-pink-600 tracking-wide mb-4">
              Career<span className="text-indigo-500">Grow</span>
            </Link>
            <img
              src="/career-growth.png"
              alt="CareerGrow"
              className="w-[300px] h-auto rounded-lg shadow-lg mb-6"
            />
            <p className="text-center text-gray-700 text-lg leading-relaxed px-2 font-medium">
              <span className="text-indigo-700 font-bold text-xl block mb-1">Build Careers. Hire Smarter.</span>
              <span className="text-gray-600 block mb-1">Your next job or hire is just a click away.</span>
              <span className="text-indigo-600 font-medium">
                CareerGrow helps you to land the right job or discover top talent — fast, simple, and effective.
              </span>
            </p>
          </div>

          
          <form
            onSubmit={submitHandler}
            className="w-full md:w-1/2 p-8"
            encType="multipart/form-data"
          >
            <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
              Create Your Account 
            </h1>

            
            <div className="mb-4">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                required
              />
            </div>

           
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="example@domain.com"
                required
              />
            </div>

       
            <div className="mb-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                pattern="[0-9]{10}"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="9876543210"
                required
              />
            </div>

            
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                required
              />
              <div className="mt-2 space-y-1 text-sm">
                <p className={`${input.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                  {input.password.length >= 8 ? '✅' : '❌'} At least 8 characters
                </p>
                <p className={`${/[A-Z]/.test(input.password) ? 'text-green-600' : 'text-red-500'}`}>
                  {/[A-Z]/.test(input.password) ? '✅' : '❌'} One uppercase letter
                </p>
                <p className={`${/[a-z]/.test(input.password) ? 'text-green-600' : 'text-red-500'}`}>
                  {/[a-z]/.test(input.password) ? '✅' : '❌'} One lowercase letter
                </p>
                <p className={`${/\d/.test(input.password) ? 'text-green-600' : 'text-red-500'}`}>
                  {/\d/.test(input.password) ? '✅' : '❌'} One number
                </p>
                <p className={`${/[@$!%*?&#]/.test(input.password) ? 'text-green-600' : 'text-red-500'}`}>
                  {/[@$!%*?&#]/.test(input.password) ? '✅' : '❌'} One special character
                </p>
              </div>
            </div>

           
            <div className="mb-4 flex justify-center gap-6">
              {['student', 'recruiter'].map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id={`role-${role}`}
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                    required
                  />
                  <Label htmlFor={`role-${role}`} className="capitalize text-gray-700 cursor-pointer">
                    {role}
                  </Label>
                </div>
              ))}
            </div>

           
            <div className="mb-6">
              <Label htmlFor="file" className="block mb-2">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="file"
                  className="cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-500">
                  {input.file ? input.file.name : 'No file selected'}
                </span>
              </div>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="hidden"
                disabled={loading}
              />
            </div>

          
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white rounded-md shadow-md flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin h-5 w-5" />}
              {loading ? 'Please wait...' : 'Signup'}
            </Button>

          
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-fuchsia-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideInFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInFade {
          animation: slideInFade 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Signup;
