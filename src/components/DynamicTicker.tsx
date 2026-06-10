import { Megaphone } from 'lucide-react';

interface TickerProps {
  notifications: Array<{
    _id: string;
    title: string;
    isUrgent: boolean;
  }>;
}

export default function DynamicTicker({ notifications }: TickerProps) {
  const urgentNotices = notifications.filter((n) => n.isUrgent);

  if (urgentNotices.length === 0) {
    // Fallback to latest 2 notices if no urgent ones exist
    urgentNotices.push(...notifications.slice(0, 2));
  }

  if (urgentNotices.length === 0) return null;

  return (
    <div className="w-full bg-brand-gold text-slate-900 border-b border-brand-gold-hover h-10 flex items-center overflow-hidden text-sm font-semibold select-none z-40 relative">
      {/* Fixed Badge */}
      <div className="bg-brand-dark text-white h-full px-4 flex items-center space-x-1.5 shrink-0 z-10 shadow-[4px_0_8px_rgba(0,0,0,0.15)]">
        <Megaphone className="h-4 w-4 text-brand-gold animate-bounce" />
        <span className="uppercase tracking-wider text-xs font-bold">Announcements</span>
      </div>

      {/* Scrolling Text */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div className="animate-marquee whitespace-nowrap flex space-x-16 hover:[animation-play-state:paused] cursor-pointer">
          {urgentNotices.map((notice) => (
            <span key={notice._id} className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
              <span className="hover:underline text-slate-900">{notice.title}</span>
            </span>
          ))}
          {/* Duplicate for infinite loop illusion */}
          {urgentNotices.map((notice) => (
            <span key={`${notice._id}-dup`} className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
              <span className="hover:underline text-slate-900">{notice.title}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
