'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateInspector } from '@/lib/actions';
import { ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';

export default function InspectorLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await authenticateInspector(null, formData);
      if (res.success) {
        // Force full page reload to refresh sessions in Navbar
        router.refresh();
        router.push('/board-inspection-hub');
      } else {
        setError(res.error || 'Invalid Inspector credentials.');
      }
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 py-16 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Logo and Titles */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-900 shadow">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold font-serif text-brand-dark">Board Inspection Portal</h1>
          <p className="text-slate-500 text-2xs max-w-xs leading-relaxed">
            Enter the authorized compliance token issued by the State Department / CBSE to verify internal NOCs and Land Deeds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="space-y-1">
            <label htmlFor="code" className="block font-bold text-slate-700">Official Verification Token *</label>
            <div className="relative">
              <input
                type="password"
                id="code"
                name="code"
                required
                placeholder="Enter 11-digit alphanumeric token"
                className="w-full rounded-lg border border-slate-200 p-2.5 pl-9 bg-white text-slate-800 focus:border-amber-500 focus:outline-none"
              />
              <KeyRound className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Verification Code Tip */}
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-lg text-3xs text-slate-500 leading-relaxed">
            <strong>Inspect Tip:</strong> The default mock token for evaluation is <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono font-bold">INSPECT2026</code>.
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
            className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm disabled:bg-slate-350 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{isPending ? 'Verifying Credentials...' : 'Authenticate & Unlock'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
