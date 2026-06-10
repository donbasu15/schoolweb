'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateAdmin } from '@/lib/actions';
import { Lock, AlertCircle, Mail, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await authenticateAdmin(null, formData);
      if (res.success) {
        // Trigger layout refresh so navigation recognizes auth state
        router.refresh();
        router.push('/admin');
      } else {
        setError(res.error || 'Invalid credentials');
      }
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 py-16 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Logo and Headings */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold font-serif text-brand-dark">Administration Desk</h1>
          <p className="text-slate-500 text-2xs max-w-xs leading-relaxed">
            Authorized school staff only. Log in to update circulars, post calendar events, and manage applications.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="space-y-1">
            <label htmlFor="email" className="block font-bold text-slate-700">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="staff@vidyalaya.edu.in"
                className="w-full rounded-lg border border-slate-200 p-2.5 pl-9 bg-white text-slate-800 focus:border-brand-blue focus:outline-none"
              />
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block font-bold text-slate-700">Secure Password *</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 p-2.5 pl-9 bg-white text-slate-800 focus:border-brand-blue focus:outline-none"
              />
              <Key className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Dev Demo Tip */}
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-lg text-3xs text-slate-500 leading-relaxed">
            <strong>Demo Credentials:</strong><br />
            Email: <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono font-bold">admin@vidyalaya.edu.in</code><br />
            Password: <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono font-bold">admin123</code>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 flex items-center space-x-2 text-2xs">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm disabled:bg-slate-350 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span>{isPending ? 'Signing In...' : 'Log In Session'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
