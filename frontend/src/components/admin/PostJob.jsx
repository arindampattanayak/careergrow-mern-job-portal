import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { companies } = useSelector((store) => store.company)

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((c) => c.name.toLowerCase() === value)
    setInput((prev) => ({ ...prev, companyId: selectedCompany?._id || '' }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="flex justify-center w-full px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl w-full bg-gray-900 border border-gray-700 rounded-lg p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-md"
        >
          {[
            { label: 'Job Title', name: 'title', placeholder: 'e.g., Frontend Developer' },
            { label: 'Description', name: 'description', placeholder: 'Brief job description' },
            { label: 'Requirements', name: 'requirements', placeholder: 'Skills, qualifications' },
            { label: 'Salary', name: 'salary', placeholder: 'e.g., ₹30,000 - ₹50,000' },
            { label: 'Location', name: 'location', placeholder: 'City, State' },
            { label: 'Job Type', name: 'jobType', placeholder: 'Full-time, Part-time' },
            { label: 'Experience Level', name: 'experience', placeholder: 'e.g., 2+ years' },
            { label: 'No. of Positions', name: 'position', type: 'number', min: 1 },
          ].map(({ label, name, ...rest }) => (
            <div key={name}>
              <Label htmlFor={name} className="font-semibold text-white mb-1 block">
                {label}
              </Label>
              <Input
                id={name}
                name={name}
                type={rest.type || 'text'}
                min={rest.min}
                value={input[name]}
                onChange={changeEventHandler}
                placeholder={rest.placeholder}
                className="mt-1 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                required
              />
            </div>
          ))}

          {/* Company select */}
          <div className="sm:col-span-2">
            <Label className="font-semibold mb-2 block text-white">Select Company</Label>
            {companies.length > 0 ? (
              <Select onValueChange={selectChangeHandler} disabled={loading} defaultValue="">
                <SelectTrigger className="w-full max-w-md bg-gray-800 border border-gray-600 text-white">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border border-gray-600">
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                        className="capitalize"
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-red-500 mt-2 font-medium">
                * Please register a company first before posting jobs.
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="sm:col-span-2 mt-6">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading || companies.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post New Job'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJob
