import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.name.trim()) {
      toast.error('Company name is required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', input.name.trim());
    formData.append('description', input.description.trim());
    formData.append('website', input.website.trim());
    formData.append('location', input.location.trim());
    if (input.file) formData.append('file', input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      } else {
        toast.error(res.data.message || 'Failed to update company.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f7faff] via-[#e9eff6] to-[#dee8f5] text-gray-800">
      <Navbar />

      <div className="flex-grow">
        <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-200 animate-fadeIn">
          <form onSubmit={submitHandler}>
            <div className="flex items-center gap-5 mb-8">
              <button
                type="button"
                onClick={() => navigate('/admin/companies')}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
                disabled={loading}
              >
                <ArrowLeft />
                <span>Back</span>
              </button>
              <h1 className="font-bold text-2xl text-indigo-700">Edit Company Details</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  disabled={loading}
                  required
                  className="bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Microsoft"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  value={input.description}
                  onChange={changeEventHandler}
                  disabled={loading}
                  className="bg-white border border-gray-300 text-gray-800"
                  placeholder="e.g. A leading software firm"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={input.website}
                  onChange={changeEventHandler}
                  disabled={loading}
                  className="bg-white border border-gray-300 text-gray-800"
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={input.location}
                  onChange={changeEventHandler}
                  disabled={loading}
                  className="bg-white border border-gray-300 text-gray-800"
                  placeholder="City, Country"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="logo">Upload Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  disabled={loading}
                  className="bg-white border border-gray-300 text-gray-800 file:bg-indigo-600 file:text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Update Company'
              )}
            </Button>
          </form>
        </div>
      </div>

      <Footer />

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
  );
};

export default CompanySetup;
