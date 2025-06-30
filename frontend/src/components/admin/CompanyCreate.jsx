import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name.')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName: companyName.trim() },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      } else {
        toast.error(res?.data?.message || 'Failed to create company.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-14 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Your Company Name</h1>
        <p className="text-gray-300 mb-8">
          What would you like to give your company name? You can change this later.
        </p>

        <div className="mb-6">
          <Label htmlFor="companyName" className="block mb-2 font-medium text-gray-200">
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            value={companyName}
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            autoFocus
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/companies')}
            disabled={loading}
            className="border border-gray-600 text-red-400 hover:text-white hover:bg-red-500 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Creating...' : 'Continue'}
          </Button>
        </div>
      </div>

      <style>
        {`
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
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default CompanyCreate
