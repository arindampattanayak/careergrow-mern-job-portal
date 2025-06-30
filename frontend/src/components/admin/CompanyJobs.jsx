import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const CompanyJobs = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/company/${companyId}/jobs`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("❌ Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [companyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white flex justify-center items-center">
        <p className="text-lg font-medium">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-6 py-10 animate-fadeIn">
      <h2 className="text-4xl font-extrabold mb-8 text-white tracking-wide border-b border-gray-700 pb-2">
        🏢 Jobs Posted by Company
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-300 text-lg">No jobs found for this company.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-1 tracking-wide leading-snug">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 italic">{job.company?.name || "—"}</p>

              <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                {job.description}
              </p>

              <ul className="text-sm text-gray-400 space-y-1">
                <li><strong>📍 Location:</strong> {job.location}</li>
                <li><strong>🕒 Type:</strong> {job.jobType}</li>
                <li><strong>🎯 Experience:</strong> {job.experienceLevel} years</li>
                <li><strong>💼 Openings:</strong> {job.position}</li>
                <li><strong>💰 Salary:</strong> ₹{job.salary} LPA</li>
                <li><strong>🧠 Skills:</strong> {job.requirements.join(", ")}</li>
                <li><strong>📅 Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CompanyJobs;
