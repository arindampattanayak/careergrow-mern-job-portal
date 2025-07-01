import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        localStorage.setItem('userId', res.data.user._id)
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh] px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 animate-slideInFade"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>

          {/* Emailllll */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-gray-300 font-medium">
              Email
            </Label>
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

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              required
              className="mt-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6 flex justify-center gap-6">
            {['student', 'recruiter'].map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id={`role-${role}`}
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  required
                  disabled={loading}
                  className="accent-blue-500"
                />
                <Label htmlFor={`role-${role}`} className="capitalize text-gray-300 cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md shadow-md flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Please wait...' : 'Login'}
          </Button>

          {/* Signup Redirect */}
          <p className="mt-6 text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideInFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInFade {
          animation: slideInFade 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Login
