import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector(store => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        })
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.error('Failed to fetch applicants:', error)
      }
    }
    fetchAllApplicants()
  }, [id, dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 animate-fadeIn">
        <div className="bg-gray-900 border border-gray-700 shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold flex items-center justify-between text-white mb-6">
            Applicants
            <span className="text-blue-500 text-lg font-semibold">
              {applicants?.applications?.length ?? 0}
            </span>
          </h1>
          <ApplicantsTable />
        </div>
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Applicants
