import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["5 - 10 LPA", "10 - 30 LPA", "30 - 60 LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white border border-purple-700 rounded-xl shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-pink-400">🎯 Filter Jobs</h2>
      <hr className="border-purple-700 mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">{section.filterType}</h3>
            <div className="space-y-3">
              {section.array.map((item, idx) => {
                const id = `radio-${index}-${idx}`;
                return (
                  <div key={id} className="flex items-center space-x-3 hover:scale-[1.01] transition-transform duration-300">
                    <RadioGroupItem
                      id={id}
                      value={item}
                      className="w-5 h-5 border-2 border-pink-500 rounded-full data-[state=checked]:bg-pink-500 focus:outline-none transition"
                    />
                    <Label
                      htmlFor={id}
                      className="cursor-pointer text-gray-200 hover:text-pink-400 transition duration-300"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
            {index !== filterData.length - 1 && (
              <hr className="my-4 border-purple-700" />
            )}
          </div>
        ))}
      </RadioGroup>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FilterCard;
