import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Product Manager"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#edf3ff] via-[#f7faff] to-[#e3ebff] text-[#1e293b] animate-fadeInSlow border-y border-[#dce3f1]">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e293b] tracking-tight">
          🔍 Explore Popular Categories
        </h2>
        <p className="text-[#475569] mt-2 text-base sm:text-lg">
          Click a category to explore jobs that fit your passion
        </p>
      </div>

     
      <Carousel className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <CarouselContent className="flex gap-5">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full text-[#1e293b] font-medium px-5 py-3 rounded-xl bg-white border border-[#cfd8e3] hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

      
        <CarouselPrevious className="left-0 text-[#6366f1] hover:text-[#4338ca] transition" />
        <CarouselNext className="right-0 text-[#6366f1] hover:text-[#4338ca] transition" />
      </Carousel>

      
      <style>{`
        @keyframes fadeInSlow {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default CategoryCarousel;
