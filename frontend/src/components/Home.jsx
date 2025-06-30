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
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white animate-fadeIn">
      <Navbar />
      <main className="px-4 md:px-8 lg:px-16">
        <HeroSection />
        <div className="my-10">
          <CategoryCarousel />
        </div>
        <div className="my-10">
          <LatestJobs />
        </div>
      </main>
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
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
