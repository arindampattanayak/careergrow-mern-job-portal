import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg bg-gray-900 text-white animate-fadeIn">
      <Table className="min-w-full">
        {/* <TableCaption className="text-gray-400 text-sm italic py-2">
          A list of your recently posted jobs
        </TableCaption> */}

        <TableHeader className="bg-gray-800 border-b border-gray-700">
          <TableRow>
            <TableHead className="py-3 px-6 text-left text-white">Company Name</TableHead>
            <TableHead className="py-3 px-6 text-left text-white">Role</TableHead>
            <TableHead className="py-3 px-6 text-left text-white">Date</TableHead>
            <TableHead className="py-3 px-6 text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 italic">
                No jobs found matching your search.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map(job => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-800 transition duration-200 cursor-pointer"
              >
                <TableCell className="py-3 px-6 font-medium text-gray-100">
                  {job?.company?.name || '—'}
                </TableCell>
                <TableCell className="py-3 px-6 text-gray-300">{job?.title || '—'}</TableCell>
                <TableCell className="py-3 px-6 text-gray-400">
                  {job?.createdAt?.split('T')[0] || '—'}
                </TableCell>
                <TableCell className="py-3 px-6 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        aria-label="Actions"
                        className="p-1 rounded hover:bg-gray-700 active:bg-gray-600 transition-colors"
                      >
                        <MoreHorizontal size={20} className="text-white" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-xl space-y-1">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Edit Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/show`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Show Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Animations */}
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

export default AdminJobsTable;
