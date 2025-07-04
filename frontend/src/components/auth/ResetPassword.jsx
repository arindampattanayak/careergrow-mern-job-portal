import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { Check, X } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[@$!%*?#&]/.test(password);

  const isStrongPassword = isValidLength && hasUpper && hasLower && hasDigit && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (!isStrongPassword) {
      return toast.error('Password does not meet complexity requirements');
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/reset-password/${token}`, { password });
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ isValid, text }) => (
    <p className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
      {isValid ? <Check size={16} /> : <X size={16} />}
      {text}
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a strong new password below
        </p>

        <div className="mb-4">
          <Label htmlFor="password" className="text-gray-700 font-medium mb-1 block">
            New Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium mb-1 block">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300"
          />
        </div>

        <div className="mb-6 space-y-1">
          <Rule isValid={isValidLength} text="At least 8 characters" />
          <Rule isValid={hasUpper} text="One uppercase letter" />
          <Rule isValid={hasLower} text="One lowercase letter" />
          <Rule isValid={hasDigit} text="One number" />
          <Rule isValid={hasSpecial} text="One special character (@$!%*?#&)" />
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all font-medium"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
