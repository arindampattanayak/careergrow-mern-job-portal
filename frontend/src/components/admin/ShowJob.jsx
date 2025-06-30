import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { Loader2 } from 'lucide-react'

const ShowJob = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          setJob(res.data.job)
        }
      } catch (err) {
        console.error('Failed to load job details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        <Loader2 className="animate-spin h-6 w-6 mr-2 text-blue-500" />
        <span>Loading job...</span>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-10 text-red-400 bg-gray-950 min-h-screen text-lg">
        ❌ Job not found or failed to load.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-10 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">{job.title}</h1>

        <div className="space-y-4 text-gray-300 text-sm sm:text-base">
          <p><span className="font-semibold text-white">Company:</span> {job.company?.name}</p>
          <p><span className="font-semibold text-white">Location:</span> {job.location}</p>
          <p><span className="font-semibold text-white">Salary:</span> ₹{job.salary} LPA</p>
          <p><span className="font-semibold text-white">Job Type:</span> {job.jobType}</p>
          <p><span className="font-semibold text-white">Experience Level:</span> {job.experienceLevel} years</p>
          <p><span className="font-semibold text-white">Open Positions:</span> {job.position}</p>

          <div>
            <p className="font-semibold text-white">Description:</p>
            <p className="whitespace-pre-line mt-1 text-gray-400">{job.description}</p>
          </div>

          <div>
            <p className="font-semibold text-white">Required Skills:</p>
            <ul className="list-disc list-inside mt-1 text-gray-400">
              {Array.isArray(job.requirements)
                ? job.requirements.map((req, i) => <li key={i}>{req}</li>)
                : <li>{job.requirements}</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ShowJob
