import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
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
    <div className="min-h-screen bg-gradient-to-tr from-[#fef6f9] via-[#ece7ff] to-[#d0ebff] text-gray-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-pink-200 animate-slideInFade"
          encType="multipart/form-data"
        >
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Create Your Account 🎉
          </h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullname" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              required
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@domain.com"
              required
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="9876543210"
              required
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              required
              className="mt-1 bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400"
              disabled={loading}
            />

            {/* ✅ Password Strength Indicator */}
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

          {/* Role */}
          <RadioGroup className="flex justify-center gap-6 mb-6">
            {['student', 'recruiter'].map(role => (
              <div key={role} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id={`role-${role}`}
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  className="accent-fuchsia-500"
                  required
                  disabled={loading}
                />
                <Label htmlFor={`role-${role}`} className="capitalize text-gray-700 cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* File Upload */}
          <div className="mb-6">
            <Label htmlFor="file" className="text-gray-700 font-medium block mb-2">Profile Picture</Label>
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

          {/* Submit */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white rounded-md shadow-md flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Please wait...' : 'Signup'}
          </Button>

          {/* Redirect */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-fuchsia-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Animation */}
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
