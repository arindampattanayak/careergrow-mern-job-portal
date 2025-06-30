import React from 'react';
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
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-lg">
      <Table>
        <TableCaption className="text-left text-gray-400 text-sm px-4 py-2">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800 text-gray-100 font-semibold text-sm tracking-wide uppercase border-b border-gray-600">
            <TableHead className="px-4 py-3">Full Name</TableHead>
            <TableHead className="px-4 py-3">Email</TableHead>
            <TableHead className="px-4 py-3">Contact</TableHead>
            <TableHead className="px-4 py-3">Resume</TableHead>
            <TableHead className="px-4 py-3">Date</TableHead>
            <TableHead className="px-4 py-3 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length ? (
            applicants.applications.map((item) => {
              const jobId = typeof item?.job === 'string' ? item.job : item?.job?._id;
              const applicantId = item?.applicant?._id;
              const recruiterId = localStorage.getItem("userId");

              return (
                <TableRow key={item._id} className="hover:bg-gray-800 text-gray-200 transition">
                  <TableCell className="px-4 py-3">{item?.applicant?.fullname}</TableCell>
                  <TableCell className="px-4 py-3 break-words max-w-xs">
                    {item?.applicant?.email}
                  </TableCell>
                  <TableCell className="px-4 py-3">{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell className="px-4 py-3">
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-400 hover:underline"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.applicant.profile.resumeOriginalName}
                      >
                        {item.applicant.profile.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-500">NA</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {item?.applicant?.createdAt
                      ? new Date(item.applicant.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Popover for Accept/Reject */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-gray-400 hover:text-white transition">
                            <MoreHorizontal className="cursor-pointer" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-36 bg-gray-800 text-white border border-gray-700 rounded"
                          align="end"
                        >
                          {shortlistingStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-700 rounded text-sm"
                            >
                              {status}
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>

                      {/* Chat Button */}
                      <button
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => {
                          if (jobId && recruiterId && applicantId) {
                            window.location.href = `/chat/${jobId}/${recruiterId}/${applicantId}`;
                          } else {
                            toast.error("Missing job, recruiter, or applicant ID");
                          }
                        }}
                      >
                        Chat
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
