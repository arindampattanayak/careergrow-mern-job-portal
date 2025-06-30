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
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 shadow-lg animate-fadeIn">
      <Table className="min-w-full">
        {/* <TableCaption className="text-gray-400 text-sm italic pt-4">
          A list of your registered companies.
        </TableCaption> */}

        <TableHeader className="bg-gray-800 border-b border-gray-700">
          <TableRow>
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Website</TableHead>
            <TableHead className="text-white">Location</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.map(company => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-800 transition-all duration-300"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>

              <TableCell className="text-white font-semibold">{company.name}</TableCell>
              <TableCell className="text-gray-300">{company.description || '—'}</TableCell>

              <TableCell>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                    onClick={e => e.stopPropagation()}
                  >
                    Visit
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>

              <TableCell className="text-gray-300">{company.location || '—'}</TableCell>
              <TableCell className="text-gray-400">
                {new Date(company.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={e => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-gray-700 transition"
                    >
                      <MoreHorizontal size={20} className="text-white" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-48 p-2 space-y-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl"
                    align="end"
                    onOpenAutoFocus={e => e.preventDefault()}
                  >
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/admin/companies/${company._id}`);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-blue-400 hover:bg-gray-700 cursor-pointer"
                    >
                      <Edit2 size={16} />
                      Edit Company
                    </div>

                    <div
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/admin/companies/${company._id}/jobs`);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-green-400 hover:bg-gray-700 cursor-pointer"
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
