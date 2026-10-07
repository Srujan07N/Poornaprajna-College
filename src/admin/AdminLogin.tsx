import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentPage, setIsAdminView } = useCollege();
  const [email, setEmail] = useState('admin@ppc.edu.in');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginAdmin(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillCredentials = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('Admin@123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setIsAdminView(false);
              setCurrentPage('home');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Website
          </button>
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#6B1426] text-white flex items-center justify-center shadow-md mb-3">
            <ShieldCheck className="w-8 h-8 text-[#DEB038]" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#7E192E] font-semibold">Institutional Governance</span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">Poornaprajna Administrative Portal</h2>
          <p className="text-xs text-stone-600 mt-1">Autonomous Institution · Udupi, Karnataka</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-sm border border-stone-200/80 rounded-xl sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ppc.edu.in"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E192E]/20 focus:border-[#7E192E] transition-all bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Administrative Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E192E]/20 focus:border-[#7E192E] transition-all bg-stone-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              {submitting ? 'Verifying Credentials...' : 'Authenticate & Enter Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Demonstration Logins (Click to populate)
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => fillCredentials('admin@ppc.edu.in')}
                className="w-full text-left p-2 rounded-md bg-stone-50 hover:bg-[#7E192E]/5 border border-stone-200/60 text-xs transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-stone-800">Super Administrator</span>
                  <span className="text-stone-500 block text-[11px]">admin@ppc.edu.in · Pass: Admin@123</span>
                </div>
                <span className="text-[10px] bg-[#6B1426]/10 text-[#6B1426] font-semibold px-1.5 py-0.5 rounded">All Access</span>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admissions.admin@ppc.edu.in')}
                className="w-full text-left p-2 rounded-md bg-stone-50 hover:bg-[#7E192E]/5 border border-stone-200/60 text-xs transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-stone-800">Admissions Officer</span>
                  <span className="text-stone-500 block text-[11px]">admissions.admin@ppc.edu.in · Pass: Admin@123</span>
                </div>
                <span className="text-[10px] bg-stone-200 text-stone-700 font-semibold px-1.5 py-0.5 rounded">Admissions</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-stone-500 mt-6">
          © Poornaprajna College (Autonomous), Udupi · Secure SSL Institutional Node
        </p>
      </div>
    </div>
  );
};
