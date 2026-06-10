'use client';

import React, { useState, useTransition } from 'react';
import { submitJobApplication } from '@/lib/actions';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
}

interface FormProps {
  jobs: Job[];
  preselectedJobId?: string;
}

export default function JobApplicationForm({ jobs, preselectedJobId = '' }: FormProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedJob, setSelectedJob] = useState(preselectedJobId);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    
    // Simple client-side validation
    const file = formData.get('resume') as File;
    if (!file || file.size === 0) {
      setError('Please upload a PDF or Word document of your resume.');
      return;
    }

    startTransition(async () => {
      const res = await submitJobApplication(null, formData);
      if (res.success) {
        setSuccess(true);
        formEl.reset();
        setFileName(null);
      } else {
        setError(res.error || 'Failed to submit application.');
      }
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold font-serif text-brand-dark border-b border-slate-100 pb-3 mb-6">
        Submit Online Application
      </h2>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base">Application Submitted!</h3>
          <p className="text-xs text-emerald-600 leading-relaxed max-w-sm mx-auto">
            Thank you for applying to Vidyalaya Academy. Our Human Resource department will review your credentials and get in touch with you shortly if your profile matches our criteria.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-2 text-xs font-bold text-brand-blue hover:underline"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Select Job */}
          <div className="space-y-1">
            <label htmlFor="jobId" className="block font-bold text-slate-700">Target Vacancy / Opening *</label>
            <select
              id="jobId"
              name="jobId"
              required
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2.5 bg-white text-slate-800 focus:border-brand-blue focus:outline-none"
            >
              <option value="">-- Choose Vacancy --</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
              <option value="general_application">General Talent Pool (No Active Opening matches)</option>
            </select>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Applicant Full Name"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block font-bold text-slate-700">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="applicant@gmail.com"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="phone" className="block font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Upload CV/Resume (PDF) *</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-lg p-2 flex items-center justify-center bg-slate-50/50 hover:bg-slate-100/30 transition-colors">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-2 text-slate-500 py-1">
                  <Upload className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                  <span className="text-2xs font-semibold">
                    {fileName ? fileName : 'Choose PDF file...'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-1">
            <label htmlFor="coverLetter" className="block font-bold text-slate-700">Brief Cover Letter / Pitch *</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              required
              rows={4}
              placeholder="Outline your educational background, qualifications, and why you wish to teach at Vidyalaya Academy..."
              className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 flex items-center space-x-2 text-2xs">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            <span>{isPending ? 'Submitting Application...' : 'Send Application'}</span>
          </button>

        </form>
      )}
    </div>
  );
}
