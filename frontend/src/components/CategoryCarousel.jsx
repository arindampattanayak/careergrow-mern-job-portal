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

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white animate-fadeInSlow">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-purple-300 drop-shadow-sm tracking-tight">
          🔍 Popular Categories
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Tap a category to explore jobs you'll love
        </p>
      </div>

      <Carousel className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="ghost"
                className="rounded-full text-sm sm:text-base font-semibold px-6 py-3 bg-gray-800 hover:bg-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-purple-500"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 text-purple-300 hover:text-white transition" />
        <CarouselNext className="right-0 text-purple-300 hover:text-white transition" />
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
          animation: fadeInSlow 1.2s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default CategoryCarousel;
