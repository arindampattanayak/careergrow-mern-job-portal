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

const userId = localStorage.getItem("userId");

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dbe5f1] shadow-lg bg-gradient-to-br from-[#eef5ff] via-[#f4f9ff] to-[#e6f0fa] text-[#1e293b] p-6 animate-fadeIn">
      <Table>
        <TableCaption className="text-sm text-[#64748b] italic">
          A list of your applied jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-[#ddecfb] text-[#1e3a8a]">
            <TableHead className="font-semibold">📅 Date</TableHead>
            <TableHead className="font-semibold">🧑‍💻 Job Role</TableHead>
            <TableHead className="font-semibold">🏢 Company</TableHead>
            <TableHead className="text-right font-semibold">Status & Chat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-slate-400 italic">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-[#eaf3ff] transition duration-200"
              >
                <TableCell className="text-[#334155]">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="font-semibold text-[#0f172a]">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-[#334155]">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right flex justify-end items-center gap-3">
                  <Badge
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      appliedJob.status === 'rejected'
                        ? 'bg-[#ffe2e6] text-[#b91c1c]'
                        : appliedJob.status === 'pending'
                        ? 'bg-[#fff5cc] text-[#ca8a04]'
                        : 'bg-[#d1fae5] text-[#047857]'
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                  {appliedJob.job?.company?.userId ? (
                    <button
                      onClick={() =>
                        navigate(`/chat/${appliedJob.job._id}/${appliedJob.job.company.userId}/${userId}`)
                      }
                      className="text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-1.5 rounded-md font-medium shadow-sm transition"
                    >
                       Chat
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No recruiter</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

   
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
  );
};

export default AppliedJobTable;
