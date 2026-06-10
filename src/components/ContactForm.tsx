'use client';

import React, { useState, useTransition } from 'react';
import { submitContact } from '@/lib/actions';
import { Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    startTransition(async () => {
      const res = await submitContact(null, formData);
      if (res.success) {
        setSuccess(true);
        formEl.reset();
      } else {
        setError(res.error || 'Failed to submit query.');
      }
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold font-serif text-brand-dark border-b border-slate-100 pb-3 mb-6 flex items-center space-x-2">
        <Mail className="h-5 w-5 text-brand-gold" />
        <span>Send Administration Message</span>
      </h2>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base">Message Sent Successfully!</h3>
          <p className="text-xs text-emerald-600 leading-relaxed max-w-sm mx-auto">
            Your inquiry has been cataloged. Based on your selection, the ticket is routed directly to the respective department head. We will reply to your email address within 24-48 working hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-2 text-xs font-bold text-brand-blue hover:underline"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="block font-bold text-slate-700">Your Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Full Name"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>
            
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block font-bold text-slate-700">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="parent@example.com"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block font-bold text-slate-700">Mobile Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="10-digit mobile"
                pattern="[0-9]{10}"
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
              />
            </div>

            {/* Department routing selection */}
            <div className="space-y-1">
              <label htmlFor="department" className="block font-bold text-slate-700">Target Department *</label>
              <select
                id="department"
                name="department"
                required
                className="w-full rounded-lg border border-slate-200 p-2.5 bg-white text-slate-800 focus:border-brand-blue focus:outline-none"
              >
                <option value="">-- Route Message To --</option>
                <option value="admissions">Admissions Desk (Admissions & RTE)</option>
                <option value="accounts">Accounts Office (Fees & Payments)</option>
                <option value="transport">Transport Coordinator (School Bus routing)</option>
                <option value="grievance">Grievance Cell (Principal & SMC desk)</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label htmlFor="subject" className="block font-bold text-slate-700">Subject of Inquiry *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="e.g. Request for fee installment extension"
              className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label htmlFor="message" className="block font-bold text-slate-700">Detailed Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Write your detailed query or message here..."
              className="w-full rounded-lg border border-slate-200 p-2.5 bg-white focus:border-brand-blue focus:outline-none resize-none"
            />
          </div>

          {/* Error */}
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
            className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{isPending ? 'Sending Message...' : 'Send Routed Inquiry'}</span>
          </button>

        </form>
      )}
    </div>
  );
}
