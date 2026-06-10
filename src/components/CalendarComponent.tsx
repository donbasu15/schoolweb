'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Download } from 'lucide-react';

interface SchoolEvent {
  _id: string;
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  category: 'exam' | 'holiday' | 'sports' | 'cultural' | 'academic';
  location: string;
}

interface CalendarProps {
  events: SchoolEvent[];
}

export default function CalendarComponent({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exam': return 'bg-red-500 text-white';
      case 'holiday': return 'bg-amber-500 text-slate-905';
      case 'sports': return 'bg-emerald-500 text-white';
      case 'cultural': return 'bg-purple-500 text-white';
      default: return 'bg-brand-blue text-white';
    }
  };

  const getCategoryDotColor = (category: string) => {
    switch (category) {
      case 'exam': return 'bg-red-500';
      case 'holiday': return 'bg-amber-500';
      case 'sports': return 'bg-emerald-500';
      case 'cultural': return 'bg-purple-500';
      default: return 'bg-blue-600';
    }
  };

  // Get events happening on a specific day
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      return (
        eventStart.getDate() === day &&
        eventStart.getMonth() === month &&
        eventStart.getFullYear() === year
      );
    });
  };

  // Generate calendar days grid
  const days = [];
  // Blank days for previous month offset
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50/50 border border-slate-100" />);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day);
    days.push(
      <div key={`day-${day}`} className="h-24 bg-white border border-slate-100 p-1 flex flex-col justify-between hover:bg-slate-50/40 transition-colors">
        <span className="text-2xs font-bold text-slate-500 self-end m-1">{day}</span>
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
          {dayEvents.map(event => (
            <div
              key={event._id}
              className={`text-3xs p-1 rounded font-semibold truncate leading-tight shadow-3xs ${getCategoryColor(event.category)}`}
              title={`${event.title} - ${event.description}`}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Monthly list representation
  const activeMonthEvents = events.filter(event => {
    const start = new Date(event.startDate);
    return start.getMonth() === month && start.getFullYear() === year;
  }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="space-y-6">
      
      {/* Calendar Header Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-dark text-white p-4 rounded-xl shadow">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-brand-gold" />
          <h2 className="text-lg font-bold font-serif uppercase tracking-wider">
            {monthNames[month]} {year}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-slate-800 text-white border border-slate-700 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-700 text-xs font-semibold transition-colors">
            Today
          </button>
          
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-800 text-white border border-slate-700 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <a
            href="/api/calendar/export"
            download="vidyalaya-calendar.ics"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-gold text-slate-900 rounded-lg font-bold text-xs hover:bg-brand-gold-hover transition-colors shadow-sm ml-2"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Sync iCal/Google</span>
          </a>
        </div>
      </div>

      {/* Main Grid for Desktop */}
      <div className="hidden md:grid grid-cols-7 border border-slate-200 rounded-xl overflow-hidden shadow-3xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="bg-slate-100 py-2 text-center text-xs font-bold text-slate-700 border-b border-slate-200">
            {d}
          </div>
        ))}
        {days}
      </div>

      {/* Monthly Event List for Mobile and Quick View */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          Scheduled Term Events - {monthNames[month]}
        </h3>

        {activeMonthEvents.length === 0 ? (
          <p className="text-slate-400 text-xs italic py-4">No events or exams listed for this month.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {activeMonthEvents.map(event => (
              <div key={event._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${getCategoryDotColor(event.category)}`} />
                    <h4 className="font-bold text-slate-900">{event.title}</h4>
                    <span className="text-3xs px-2 py-0.5 rounded border capitalize text-slate-500 font-medium">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-2xs pl-4">{event.description}</p>
                </div>
                
                <div className="flex items-center space-x-4 pl-4 sm:pl-0 shrink-0 text-slate-400 text-2xs">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{event.location}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
