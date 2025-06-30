import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const NavLinks = () => (
    <>
      {user && user.role === 'recruiter' ? (
        <>
          <Link to="/admin/companies" className="hover:text-pink-400 transition duration-300">Companies</Link>
          <Link to="/admin/jobs" className="hover:text-pink-400 transition duration-300">Jobs</Link>
        </>
      ) : (
        <>
          <Link to="/" className="hover:text-pink-400 transition duration-300">Home</Link>
          <Link to="/resume/upload" className="hover:text-pink-400 transition duration-300">Upload Resume</Link>
          <Link to="/jobs" className="hover:text-pink-400 transition duration-300">Jobs</Link>
          <Link to="/browse" className="hover:text-pink-400 transition duration-300">Browse</Link>
        </>
      )}
    </>
  );

  return (
    <header className="bg-gradient-to-r from-purple-800 via-violet-900 to-indigo-900 shadow-md sticky top-0 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Career<span className="text-pink-400">Grow</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-white">
          <NavLinks />
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        {/* Auth Buttons or Avatar */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  className="bg-transparent text-white border border-white rounded-md hover:bg-white hover:text-purple-800 transition"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md">Signup</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-white hover:shadow-lg transition duration-300">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 shadow-xl rounded-xl bg-white text-gray-900">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === 'student' && (
                    <div className="flex items-center gap-2 text-gray-700 hover:text-purple-700 transition cursor-pointer">
                      <User2 size={18} />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 h-auto text-purple-700">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition cursor-pointer">
                    <LogOut size={18} />
                    <Button onClick={logoutHandler} variant="link" className="p-0 h-auto text-red-600">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 text-white bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 space-y-3 animate-slideDown">
          <NavLinks />
          {!user ? (
            <>
              <Link to="/login">
                <Button className="w-full bg-white text-purple-800 border border-white hover:bg-purple-800 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={logoutHandler} className="w-full bg-red-600 hover:bg-red-700 text-white">
              Logout
            </Button>
          )}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </header>
  );
};

export default Navbar;
