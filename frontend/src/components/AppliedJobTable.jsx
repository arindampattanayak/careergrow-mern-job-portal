import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const userId = localStorage.getItem("userId"); // ✅ Use userId directly

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-lg bg-gray-900 text-white">
      <Table>
        <TableCaption className="text-gray-400 text-sm italic">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-left text-purple-400">Date</TableHead>
            <TableHead className="text-left text-purple-400">Job Role</TableHead>
            <TableHead className="text-left text-purple-400">Company</TableHead>
            <TableHead className="text-right text-purple-400">Status & Chat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500 italic">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-800 transition-colors duration-200"
              >
                <TableCell className="text-gray-300">{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="font-semibold text-white">{appliedJob.job?.title}</TableCell>
                <TableCell className="text-gray-300">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right flex justify-end items-center gap-2">
                  <Badge
                    className={`px-3 py-1 rounded-full font-semibold text-white animate-pulse
                      ${appliedJob.status === 'rejected'
                        ? 'bg-red-600'
                        : appliedJob.status === 'pending'
                          ? 'bg-yellow-500 text-yellow-900'
                          : 'bg-green-600'
                      }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                  {appliedJob.job?.company?.userId ? (
                    <button
                      onClick={() =>
                        navigate(`/chat/${appliedJob.job._id}/${appliedJob.job.company.userId}/${userId}`)
                      }
                      className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition duration-300"
                    >
                      Chat
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 italic">No recruiter</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
