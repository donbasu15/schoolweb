'use client';

import React, { useState } from 'react';
import { FileText, AlertCircle, Calendar, Download, Eye } from 'lucide-react';

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'academic' | 'admissions' | 'exam';
  targetAudience: 'all' | 'parents' | 'students' | 'staff';
  attachmentUrl: string;
  isUrgent: boolean;
  publishDate: string | Date;
}

interface NoticeBoardProps {
  initialNotices: Notice[];
}

export default function NoticeBoard({ initialNotices }: NoticeBoardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'parents' | 'students' | 'staff'>('all');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Filter Notices
  const filteredNotices = initialNotices.filter((notice) => {
    if (activeTab === 'all') return true;
    return notice.targetAudience === activeTab;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exam':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'admissions':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'academic':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Filtering Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 sm:gap-2">
        {(['all', 'parents', 'students', 'staff'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all capitalize ${
              activeTab === tab
                ? 'border-brand-blue text-brand-blue bg-blue-50/20'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {tab === 'all' ? 'All Circulars' : `${tab} notices`}
          </button>
        ))}
      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-white">
          <p className="text-slate-400 text-sm">No recent notifications found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className={`rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${
                notice.isUrgent ? 'border-amber-200 bg-amber-50/10' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                {/* Badges & Date */}
                <div className="flex items-center justify-between text-2xs">
                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold border uppercase ${getCategoryColor(notice.category)}`}>
                      {notice.category}
                    </span>
                    {notice.isUrgent && (
                      <span className="flex items-center space-x-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase animate-pulse">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>Urgent</span>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center text-slate-400 font-medium space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(notice.publishDate)}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 hover:text-brand-blue cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                  {notice.title}
                </h3>

                {/* Snippet */}
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {notice.content}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="flex items-center space-x-1 text-xs font-semibold text-brand-blue hover:text-brand-dark transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Read Full Text</span>
                </button>

                {notice.attachmentUrl ? (
                  <a
                    href={notice.attachmentUrl}
                    download
                    className="flex items-center space-x-1 text-xs font-semibold text-brand-gold hover:text-brand-gold-hover hover:underline transition-colors"
                    title="Download Official Notice PDF"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <span className="text-2xs text-slate-400">No Attachment</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup for Reading Full Notice */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-scale-up">
            
            {/* Header */}
            <div className={`p-5 text-white flex items-start justify-between ${
              selectedNotice.isUrgent ? 'bg-gradient-to-r from-amber-600 to-amber-500' : 'bg-gradient-to-r from-brand-blue to-slate-800'
            }`}>
              <div>
                <span className="text-2xs uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded font-bold">
                  {selectedNotice.category} Circular
                </span>
                <h2 className="text-lg font-bold font-serif text-white mt-1 leading-snug">
                  {selectedNotice.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="font-semibold">Target: <span className="capitalize text-slate-700">{selectedNotice.targetAudience}</span></span>
                <span>Published: {formatDate(selectedNotice.publishDate)}</span>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {selectedNotice.content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
              {selectedNotice.attachmentUrl ? (
                <a
                  href={selectedNotice.attachmentUrl}
                  download
                  className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 bg-brand-gold text-slate-900 rounded-lg hover:bg-brand-gold-hover transition-colors shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Circular Document (PDF)</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">This circular has no supplemental downloads.</span>
              )}
              
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
