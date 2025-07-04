import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
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
  const { user } = useSelector(store => store.auth);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const filteredJobs = allAdminJobs.filter(job => {
      const matchesSearch =
        !searchJobByText ||
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());

      const isCreatedByUser =
        job?.created_by === user._id || job?.created_by?._id === user._id;

      return matchesSearch && isCreatedByUser;
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText, user]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow bg-gradient-to-br from-[#f8fbff] via-[#eef3fa] to-[#f5f9ff] text-[#1e293b] animate-fadeIn">
      <Table className="min-w-full">
        <TableHeader className="bg-gradient-to-r from-indigo-100 via-white to-indigo-100 border-b border-gray-300">
          <TableRow>
            <TableHead className="py-3 px-6 text-left font-semibold text-indigo-800">Company Name</TableHead>
            <TableHead className="py-3 px-6 text-left font-semibold text-indigo-800">Role</TableHead>
            <TableHead className="py-3 px-6 text-left font-semibold text-indigo-800">Date</TableHead>
            <TableHead className="py-3 px-6 text-right font-semibold text-indigo-800">Action</TableHead>
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
                className="hover:bg-[#e8f0fe] transition duration-200 cursor-pointer"
              >
                <TableCell className="py-3 px-6 font-medium">
                  {job?.company?.name || '—'}
                </TableCell>
                <TableCell className="py-3 px-6">{job?.title || '—'}</TableCell>
                <TableCell className="py-3 px-6 text-gray-600">
                  {job?.createdAt?.split('T')[0] || '—'}
                </TableCell>
                <TableCell className="py-3 px-6 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        aria-label="Actions"
                        className="p-2 rounded hover:bg-indigo-100 active:bg-indigo-200 transition-colors"
                      >
                        <MoreHorizontal size={20} className="text-indigo-700" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-3 bg-white text-gray-900 border border-gray-300 rounded-md shadow-xl space-y-2">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium">Edit Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/show`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Show Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
