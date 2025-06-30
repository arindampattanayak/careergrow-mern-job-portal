import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  })

  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 animate-slideInFade"
          encType="multipart/form-data"
        >
          <h1 className="text-3xl font-extrabold text-center text-white mb-6">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullname" className="text-gray-300 font-medium">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              required
              className="mt-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@domain.com"
              required
              className="mt-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label htmlFor="phoneNumber" className="text-gray-300 font-medium">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="8080808080"
              required
              className="mt-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength={6}
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              required
              className="mt-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Role Selection */}
          <RadioGroup className="flex justify-center gap-6 mb-6">
            {['student', 'recruiter'].map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id={`role-${role}`}
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  className="accent-blue-500"
                  required
                  disabled={loading}
                />
                <Label htmlFor={`role-${role}`} className="capitalize text-gray-300 cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* File Upload */}
          <div className="mb-6">
            <Label htmlFor="file" className="text-gray-300 font-medium block mb-2">
              Profile Picture
            </Label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="file"
                className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-400">
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md shadow-md flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Please wait...' : 'Signup'}
          </Button>

          {/* Redirect to login */}
          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInFade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInFade {
          animation: slideInFade 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Signup
