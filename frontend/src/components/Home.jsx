import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf5ff] via-[#f4f8ff] to-[#e0efff] text-gray-800 animate-fadeIn transition-all duration-500">
    
      <Navbar />

      <section className="px-4 sm:px-6 lg:px-16 pt-12 pb-20">
        <HeroSection />
      </section>

      <section className="px-4 sm:px-6 lg:px-16 py-12 bg-[#f6faff] border-y border-blue-100 shadow-sm rounded-xl mx-4 md:mx-10 my-4">
        <CategoryCarousel />
      </section>

      
      <section className="px-4 sm:px-6 lg:px-16 py-16 bg-gradient-to-br from-[#e0f2fe] to-[#e3ebff] rounded-t-3xl shadow-inner mt-10">
        <LatestJobs />
      </section>

      
      <Footer />

     
      <style>{`
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
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
