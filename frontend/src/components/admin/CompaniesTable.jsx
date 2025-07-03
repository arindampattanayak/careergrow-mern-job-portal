import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Edit2, MoreHorizontal, Briefcase } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dbe2ee] bg-gradient-to-br from-[#f8fbff] via-[#eef3fa] to-[#f5f9ff] shadow-md animate-fadeIn">
      <Table className="min-w-full">
        <TableHeader className="bg-gradient-to-r from-indigo-100 to-white border-b border-gray-300">
          <TableRow>
            <TableHead className="text-indigo-800 font-semibold">Logo</TableHead>
            <TableHead className="text-indigo-800 font-semibold">Name</TableHead>
            <TableHead className="text-indigo-800 font-semibold">Description</TableHead>
            <TableHead className="text-indigo-800 font-semibold">Website</TableHead>
            <TableHead className="text-indigo-800 font-semibold">Location</TableHead>
            <TableHead className="text-indigo-800 font-semibold">Date</TableHead>
            <TableHead className="text-indigo-800 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.map(company => (
            <TableRow
              key={company._id}
              className="hover:bg-[#e8f0fe] transition-all duration-200"
            >
              <TableCell>
                <Avatar className="bg-white border border-gray-200 shadow-sm">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>

              <TableCell className="text-gray-900 font-medium">{company.name}</TableCell>
              <TableCell className="text-gray-600 text-sm">{company.description || '—'}</TableCell>

              <TableCell>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                    onClick={e => e.stopPropagation()}
                  >
                    Visit
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>

              <TableCell className="text-gray-700 text-sm">{company.location || '—'}</TableCell>
              <TableCell className="text-gray-500 text-sm">
                {new Date(company.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={e => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-indigo-100 transition"
                    >
                      <MoreHorizontal size={20} className="text-indigo-700" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-48 p-2 space-y-2 bg-white border border-gray-200 rounded-xl shadow-xl"
                    align="end"
                    onOpenAutoFocus={e => e.preventDefault()}
                  >
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/admin/companies/${company._id}`);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                    >
                      <Edit2 size={16} />
                      Edit Company
                    </div>

                    <div
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/admin/companies/${company._id}/jobs`);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-green-600 hover:bg-green-50 cursor-pointer"
                    >
                      <Briefcase size={16} />
                      View Jobs
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}

          {filteredCompanies.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
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

export default CompaniesTable;
