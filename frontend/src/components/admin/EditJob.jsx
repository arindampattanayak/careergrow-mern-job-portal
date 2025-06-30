import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  })

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true })
        const job = res.data.job
        setInput({
          title: job.title,
          description: job.description,
          requirements: job.requirements.join(', '),
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          experience: job.experienceLevel,
          position: job.position,
          companyId: job.company._id,
        })
      } catch (err) {
        console.error(err)
        toast.error('Failed to load job details.')
      }
    }

    fetchJob()
  }, [id])

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success('✅ Job updated successfully!')
        navigate('/admin/jobs')
      } else {
        toast.error(res.data.message || 'Failed to update job')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-10 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-blue-400">Edit Job</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[
            { label: 'Title', name: 'title' },
            { label: 'Description', name: 'description' },
            { label: 'Requirements (comma separated)', name: 'requirements' },
            { label: 'Salary (in LPA)', name: 'salary', type: 'number' },
            { label: 'Location', name: 'location' },
            { label: 'Job Type', name: 'jobType' },
            { label: 'Experience Level (years)', name: 'experience' },
            { label: 'Position (No. of Openings)', name: 'position' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <Label className="text-sm text-gray-300">{label}</Label>
              <Input
                name={name}
                type={type}
                value={input[name]}
                onChange={handleChange}
                required
                disabled={loading}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
              />
            </div>
          ))}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Updating...' : 'Update Job'}
          </Button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default EditJob
