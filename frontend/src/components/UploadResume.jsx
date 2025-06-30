import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setResumeAnalysis } from '@/redux/resumeSlice';
import MatchedJobs from './MatchedJobs';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { extractedSkills, recommendedJobs } = useSelector(state => state.resume);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      dispatch(setResumeAnalysis(res.data));
    } catch (err) {
      console.error("Upload error", err);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 px-6 py-10 text-white animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-4">Upload Your Resume</h2>
        <p className="text-sm text-gray-400 mb-6">
          Upload a PDF resume to extract skills and receive tailored job recommendations.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full mb-4 px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 hover:file:bg-blue-700"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition disabled:bg-gray-600"
          disabled={loading || !file}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {/* Extracted Skills */}
        {extractedSkills.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Extracted Skills</h3>
            <div className="flex flex-wrap gap-3">
              {extractedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-blue-800 text-white border border-blue-500 shadow-sm hover:scale-105 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Matched Jobs */}
        {(recommendedJobs.length > 0) && (
          <div className="mt-10 bg-gray-800 p-6 rounded-xl shadow-inner">
            <MatchedJobs />
          </div>
        )}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UploadResume;
