import React from 'react';
import { useSelector } from 'react-redux';
import Job from './Job';

const MatchedJobs = () => {
  const { extractedSkills, recommendedJobs } = useSelector(state => state.resume);

  const calculateMatchScore = (jobSkills) => {
    const matched = jobSkills.filter(skill =>
      extractedSkills.includes(skill.toLowerCase())
    );
    return matched.length / jobSkills.length;
  };

  const getSkillGap = (jobSkills) => {
    return jobSkills.filter(skill =>
      !extractedSkills.includes(skill.toLowerCase())
    );
  };

  if (!recommendedJobs.length) return null;

  return (
    <div className="mt-10 text-white animate-fadeIn">
      <h3 className="text-2xl font-bold text-blue-400 mb-4">Matching Jobs</h3>

      <div className="space-y-6">
        {recommendedJobs.map((job, index) => {
          const jobSkills = job.requirements || [];
          const score = calculateMatchScore(jobSkills);
          const skillGap = getSkillGap(jobSkills);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 border border-gray-700 rounded-lg p-5 shadow-lg hover:shadow-xl transition duration-300"
            >
              <Job job={job} />

              <div className="mt-4 text-sm">
                <div className="mb-3">
                  <p className="text-gray-400 font-medium">Match Score</p>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${score * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-300 mt-1">{(score * 100).toFixed(2)}% match</p>
                </div>

                <div>
                  <p className="text-gray-400 font-medium mb-1">Skill Gap</p>
                  {skillGap.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {skillGap.map((skill, i) => (
                        <li
                          key={i}
                          className="px-3 py-1 bg-gray-700 text-red-300 rounded-full text-xs"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-400">No skill gaps 🎯</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MatchedJobs;
