'use client';

import React, { useState, useTransition } from 'react';
import { 
  createNotification, deleteNotification,
  createEvent, deleteEvent,
  createJobPosting, toggleJobPosting, deleteJobPosting,
  createComplianceDoc, deleteComplianceDoc,
  updateInquiryStatus, deleteInquiry
} from '@/lib/actions';
import { 
  FileText, 
  Calendar, 
  Briefcase, 
  ShieldCheck, 
  Inbox, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Eye,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  notifications: any[];
  events: any[];
  jobs: any[];
  complianceDocs: any[];
  inquiries: any[];
  session: { name: string; email: string; role: string } | null;
}

export default function AdminDashboard({
  notifications,
  events,
  jobs,
  complianceDocs,
  inquiries,
  session
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'jobs' | 'compliance' | 'inquiries'>('notices');
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const [tickerFileName, setTickerFileName] = useState<string | null>(null);
  const [complianceFileName, setComplianceFileName] = useState<string | null>(null);

  const clearMessages = () => {
    setFormError(null);
    setSuccessMsg(null);
  };

  // ----------------------------------------
  // Form Submission Handlers
  // ----------------------------------------
  const handleCreateNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    startTransition(async () => {
      const res = await createNotification(null, formData);
      if (res.success) {
        setSuccessMsg('Notice published successfully!');
        formEl.reset();
        setTickerFileName(null);
      } else {
        setFormError(res.error || 'Failed to create notice');
      }
    });
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    startTransition(async () => {
      const res = await createEvent(null, formData);
      if (res.success) {
        setSuccessMsg('Event added to calendar successfully!');
        formEl.reset();
      } else {
        setFormError(res.error || 'Failed to create event');
      }
    });
  };

  const handleCreateJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    startTransition(async () => {
      const res = await createJobPosting(null, formData);
      if (res.success) {
        setSuccessMsg('Job posting activated successfully!');
        formEl.reset();
      } else {
        setFormError(res.error || 'Failed to create job posting');
      }
    });
  };

  const handleCreateDoc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    startTransition(async () => {
      const res = await createComplianceDoc(null, formData);
      if (res.success) {
        setSuccessMsg('Compliance document uploaded successfully!');
        formEl.reset();
        setComplianceFileName(null);
      } else {
        setFormError(res.error || 'Failed to upload document');
      }
    });
  };

  // ----------------------------------------
  // Delete / Update Item Helpers
  // ----------------------------------------
  const handleDeleteNotice = (id: string) => {
    if (confirm('Delete this notice?')) {
      startTransition(async () => {
        await deleteNotification(id);
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Delete this event?')) {
      startTransition(async () => {
        await deleteEvent(id);
      });
    }
  };

  const handleToggleJob = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleJobPosting(id, !currentStatus);
    });
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Delete this vacancy?')) {
      startTransition(async () => {
        await deleteJobPosting(id);
      });
    }
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm('Delete this compliance document?')) {
      startTransition(async () => {
        await deleteComplianceDoc(id);
      });
    }
  };

  const handleUpdateInquiry = (id: string, status: 'unread' | 'read' | 'resolved') => {
    startTransition(async () => {
      await updateInquiryStatus(id, status);
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    });
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      startTransition(async () => {
        await deleteInquiry(id);
        setSelectedInquiry(null);
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm">
      
      {/* Welcome banner */}
      <div className="bg-brand-blue text-white rounded-xl p-5 shadow-md flex items-center justify-between">
        <div>
          <span className="text-2xs font-semibold text-brand-gold uppercase tracking-wider">Workspace Dashboard</span>
          <h1 className="text-xl font-bold font-serif text-white">Welcome back, {session?.name || 'Academic Administrator'}</h1>
          <p className="text-slate-400 text-2xs mt-0.5">Role privilege: <span className="capitalize">{session?.role || 'staff'} coordinator</span></p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap border-b border-slate-200 gap-2">
        <button
          onClick={() => { setActiveTab('notices'); clearMessages(); }}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold transition-all ${
            activeTab === 'notices' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="h-4.5 w-4.5" />
          <span>Circulars ({notifications.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('events'); clearMessages(); }}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold transition-all ${
            activeTab === 'events' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="h-4.5 w-4.5" />
          <span>Calendar ({events.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('jobs'); clearMessages(); }}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold transition-all ${
            activeTab === 'jobs' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Briefcase className="h-4.5 w-4.5" />
          <span>Careers ({jobs.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('compliance'); clearMessages(); }}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold transition-all ${
            activeTab === 'compliance' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="h-4.5 w-4.5" />
          <span>Board Disclosures ({complianceDocs.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('inquiries'); clearMessages(); }}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold transition-all ${
            activeTab === 'inquiries' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Inbox className="h-4.5 w-4.5" />
          <span>Routed Inbox ({inquiries.length})</span>
        </button>
      </div>

      {/* Global Success / Error banners */}
      <div className="space-y-2">
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-lg p-3.5 flex items-center space-x-2">
            <Check className="h-5 w-5 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3.5 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span className="font-bold">{formError}</span>
          </div>
        )}
      </div>

      {/* Grid content panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL: CIRCULARS */}
        {activeTab === 'notices' && (
          <>
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark flex items-center space-x-1">
                <Plus className="h-4 w-4 text-brand-gold" />
                <span>Publish New Circular</span>
              </h2>
              <form onSubmit={handleCreateNotice} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Notice Title *</label>
                  <input type="text" name="title" required placeholder="Notice Title" className="w-full rounded border border-slate-200 p-2 focus:border-brand-blue focus:outline-none bg-white text-slate-800" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Category *</label>
                    <select name="category" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="general">General</option>
                      <option value="academic">Academic</option>
                      <option value="admissions">Admissions</option>
                      <option value="exam">Examinations</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Audience *</label>
                    <select name="targetAudience" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="all">All</option>
                      <option value="parents">Parents</option>
                      <option value="students">Students</option>
                      <option value="staff">Staff Only</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Circular PDF Attachment</label>
                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf"
                    onChange={(e) => setTickerFileName(e.target.files?.[0]?.name || null)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {tickerFileName && <p className="text-3xs text-emerald-600 font-semibold">Selected: {tickerFileName}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isUrgent" name="isUrgent" value="true" className="h-4 w-4 rounded text-brand-blue" />
                  <label htmlFor="isUrgent" className="font-bold text-slate-700 cursor-pointer">Mark as Urgent (Scrolling Ticker)</label>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Body Content *</label>
                  <textarea name="content" required rows={4} placeholder="Write detailed bulletin content..." className="w-full rounded border border-slate-200 p-2 focus:border-brand-blue focus:outline-none bg-white text-slate-800 resize-none" />
                </div>

                <button type="submit" disabled={isPending} className="w-full bg-brand-blue hover:bg-slate-800 text-white font-bold p-2.5 rounded shadow-sm transition-colors">
                  {isPending ? 'Publishing Notice...' : 'Publish Board Circular'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark">Active Notice Feed</h2>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-2xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3">Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Target</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {notifications.map((notice) => (
                      <tr key={notice._id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900 max-w-[200px] truncate">{notice.title}</td>
                        <td className="p-3 capitalize">{notice.category}</td>
                        <td className="p-3 capitalize">{notice.targetAudience}</td>
                        <td className="p-3">{new Date(notice.publishDate).toLocaleDateString('en-IN')}</td>
                        <td className="p-3 text-right">
                          <button onClick={() => handleDeleteNotice(notice._id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PANEL: EVENTS */}
        {activeTab === 'events' && (
          <>
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark flex items-center space-x-1">
                <Plus className="h-4 w-4 text-brand-gold" />
                <span>Create Calendar Event</span>
              </h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Event Title *</label>
                  <input type="text" name="title" required placeholder="Annual Sports Meet" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Start Date *</label>
                    <input type="datetime-local" name="startDate" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">End Date *</label>
                    <input type="datetime-local" name="endDate" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Category *</label>
                    <select name="category" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="academic">Academic</option>
                      <option value="exam">Examination</option>
                      <option value="holiday">Holiday</option>
                      <option value="sports">Athletics/Sports</option>
                      <option value="cultural">Cultural Festival</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Location</label>
                    <input type="text" name="location" placeholder="Auditorium" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description</label>
                  <textarea name="description" rows={3} placeholder="Brief brief description..." className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none resize-none" />
                </div>

                <button type="submit" disabled={isPending} className="w-full bg-brand-blue hover:bg-slate-800 text-white font-bold p-2.5 rounded shadow-sm">
                  {isPending ? 'Saving Event...' : 'Add Event to Calendar'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark">Calendar Events</h2>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-2xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3">Event Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Start Date</th>
                      <th className="p-3">Location</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {events.map((event) => (
                      <tr key={event._id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900">{event.title}</td>
                        <td className="p-3 capitalize">{event.category}</td>
                        <td className="p-3">{new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="p-3">{event.location}</td>
                        <td className="p-3 text-right">
                          <button onClick={() => handleDeleteEvent(event._id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PANEL: JOBS */}
        {activeTab === 'jobs' && (
          <>
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark flex items-center space-x-1">
                <Plus className="h-4 w-4 text-brand-gold" />
                <span>Post Staff Vacancy</span>
              </h2>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Job / Vacancy Title *</label>
                  <input type="text" name="title" required placeholder="PGT Chemistry Teacher" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Department *</label>
                    <select name="department" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="academic">Academic</option>
                      <option value="admin">Administration</option>
                      <option value="support">Support Staff</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Experience Required *</label>
                    <input type="text" name="experienceRequired" required placeholder="3-5 years" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Qualifications & Requirements *</label>
                  <input type="text" name="requirements" required placeholder="M.Sc. Chemistry, B.Ed. compulsory" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Job Description & Responsibilities *</label>
                  <textarea name="description" required rows={4} placeholder="Detail teaching standards..." className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none resize-none" />
                </div>

                <button type="submit" disabled={isPending} className="w-full bg-brand-blue hover:bg-slate-800 text-white font-bold p-2.5 rounded shadow-sm">
                  {isPending ? 'Posting Vacancy...' : 'Publish Job Vacancy'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark">Active Recruitment Listings</h2>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-2xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3">Job Title</th>
                      <th className="p-3">Dept</th>
                      <th className="p-3">Exp</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job) => (
                      <tr key={job._id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900">{job.title}</td>
                        <td className="p-3 capitalize">{job.department}</td>
                        <td className="p-3">{job.experienceRequired}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleJob(job._id, job.isActive)}
                            className={`px-2 py-0.5 rounded font-bold uppercase text-3xs border ${
                              job.isActive 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}
                          >
                            {job.isActive ? 'Active' : 'Closed'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button onClick={() => handleDeleteJob(job._id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PANEL: COMPLIANCE FILINGS */}
        {activeTab === 'compliance' && (
          <>
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark flex items-center space-x-1">
                <Plus className="h-4 w-4 text-brand-gold" />
                <span>Upload Compliance Doc</span>
              </h2>
              <form onSubmit={handleCreateDoc} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Document Title / Name *</label>
                  <input type="text" name="title" required placeholder="Fire Safety Certificate 2026" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Category *</label>
                    <select name="category" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="safety">Safety Clearance</option>
                      <option value="academic">Affiliation/Academic</option>
                      <option value="smc">SMC Roster</option>
                      <option value="pta">PTA Committee</option>
                      <option value="noc">State NOC (Private)</option>
                      <option value="land_deed">Land Deeds (Private)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Board Code *</label>
                    <select name="boardCode" required className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="STATE">STATE BOARD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Upload Document (PDF) *</label>
                  <input
                    type="file"
                    name="file"
                    required
                    accept=".pdf"
                    onChange={(e) => setComplianceFileName(e.target.files?.[0]?.name || null)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {complianceFileName && <p className="text-3xs text-emerald-600 font-semibold">Selected: {complianceFileName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Public Status *</label>
                  <select name="isPublic" className="w-full rounded border border-slate-200 p-2 bg-white text-slate-800 focus:outline-none">
                    <option value="true">Public (Listed on disclosure page)</option>
                    <option value="false">Private (Visible only in Inspector Hub)</option>
                  </select>
                </div>

                <button type="submit" disabled={isPending} className="w-full bg-brand-blue hover:bg-slate-800 text-white font-bold p-2.5 rounded shadow-sm">
                  {isPending ? 'Uploading File...' : 'Upload & Registry File'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark">Registered Disclosures & NOC Archive</h2>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-2xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3">File Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Board</th>
                      <th className="p-3">Visibility</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complianceDocs.map((doc) => (
                      <tr key={doc._id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-900 max-w-[220px] truncate">{doc.title}</td>
                        <td className="p-3 capitalize">{doc.category}</td>
                        <td className="p-3">{doc.boardCode}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase text-3xs border ${
                            doc.isPublic 
                              ? 'bg-blue-50 text-brand-blue border-blue-100' 
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            {doc.isPublic ? 'Public' : 'Inspector Hub Only'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button onClick={() => handleDeleteDoc(doc._id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PANEL: ROUTED INBOX (SUBMISSIONS) */}
        {activeTab === 'inquiries' && (
          <>
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <h2 className="text-base font-bold font-serif text-brand-dark">Routed Inquiry Inbox</h2>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
                {inquiries.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-8 italic border border-dashed border-slate-150 rounded-lg">No incoming messages at this moment.</p>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`p-4 border rounded-xl cursor-pointer hover:shadow-3xs transition-all relative ${
                        selectedInquiry?._id === inq._id 
                          ? 'border-brand-blue bg-blue-50/10' 
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-3xs font-semibold mb-2">
                        <span className="capitalize px-2 py-0.5 rounded border bg-slate-50 text-slate-655 uppercase">
                          {inq.department} inbox
                        </span>
                        <span className={`px-2 py-0.5 rounded border uppercase ${
                          inq.status === 'resolved' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : inq.status === 'read' 
                              ? 'bg-amber-50 text-amber-700 border-amber-100' 
                              : 'bg-red-50 text-red-750 border-red-100'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-2xs truncate">{inq.subject}</h4>
                      <p className="text-slate-500 text-3xs mt-1">From: {inq.name} ({inq.email})</p>
                      <span className="text-3xs text-slate-400 block mt-2 text-right">{new Date(inq.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-3xs min-h-[300px]">
              {selectedInquiry ? (
                <div className="space-y-6">
                  {/* Title & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <span className="text-3xs font-bold uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {selectedInquiry.department} channel
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm font-serif mt-1">{selectedInquiry.subject}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleUpdateInquiry(selectedInquiry._id, 'read')}
                        className="p-1 text-amber-600 hover:bg-amber-50 rounded border border-slate-200 bg-white"
                        title="Mark as Read"
                      >
                        <Clock className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => handleUpdateInquiry(selectedInquiry._id, 'resolved')}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded border border-slate-200 bg-white"
                        title="Mark as Resolved"
                      >
                        <Check className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteInquiry(selectedInquiry._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded border border-slate-200 bg-white"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>

                  {/* Sender Specs */}
                  <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50/50 p-4 border border-slate-150 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-bold">Contact Name</span>
                      <span className="text-slate-900 font-extrabold">{selectedInquiry.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Mobile Phone</span>
                      <span className="text-slate-900 font-extrabold">{selectedInquiry.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Email Address</span>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-brand-blue hover:underline font-extrabold">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Date Received</span>
                      <span className="text-slate-900 font-extrabold">
                        {new Date(selectedInquiry.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800">Inquiry Message:</span>
                    <p className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-650 whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16 text-center space-y-2">
                  <Eye className="h-10 w-10 text-slate-350" />
                  <p className="text-xs">Select an incoming query from the routed mailbox to review and update ticket status.</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
