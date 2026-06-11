'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  BookOpen, 
  FileText, 
  Briefcase, 
  Mail, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  GraduationCap 
} from 'lucide-react';
import { logoutAction } from '@/lib/actions';

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
  hasSession: boolean;
  hasInspectorSession: boolean;
}

export default function MobileMenu({ navLinks, hasSession, hasInspectorSession }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Set mounted state on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home': return <Home className="h-5 w-5" />;
      case 'about us': return <Info className="h-5 w-5" />;
      case 'academics': return <BookOpen className="h-5 w-5" />;
      case 'board disclosure': return <FileText className="h-5 w-5" />;
      case 'careers': return <Briefcase className="h-5 w-5" />;
      case 'contact us': return <Mail className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button (Always rendered in Navbar tree) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Slide-out Drawer and Backdrop Overlay rendered in Portal under body */}
      {mounted && createPortal(
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Drawer Overlay (Backdrop) */}
          <div
            className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-out Drawer Panel */}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-sm">
                    <GraduationCap className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-bold text-sm text-brand-dark font-serif">Vidyalaya</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-550 hover:bg-slate-50 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'bg-blue-50 text-brand-blue font-bold shadow-3xs'
                          : 'text-slate-650 hover:bg-slate-55 hover:text-brand-blue'
                      }`}
                    >
                      <span className={isActive ? 'text-brand-blue' : 'text-slate-400'}>
                        {getIcon(link.name)}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Actions (Sessions) */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              {/* Inspector Session indicator/link */}
              {hasInspectorSession ? (
                <Link
                  href="/board-inspection-hub"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-xs font-bold py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 shadow-3xs"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Inspector Panel</span>
                </Link>
              ) : (
                <Link
                  href="/board-inspection-hub"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-xs font-medium py-2.5 rounded-xl bg-slate-50 text-slate-650 hover:bg-slate-100 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  <span>Inspector Access</span>
                </Link>
              )}

              {/* Admin Session indicator/link or Log Out */}
              {hasSession ? (
                <div className="space-y-2">
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full text-xs font-bold py-2.5 rounded-xl bg-brand-blue text-white shadow hover:bg-slate-800 transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  
                  <form action={logoutAction} onSubmit={() => setIsOpen(false)}>
                    <button
                      type="submit"
                      className="flex items-center justify-center space-x-2 w-full text-xs font-semibold py-2.5 rounded-xl text-red-650 hover:bg-red-50 hover:text-red-750 transition-colors border border-red-100 bg-white"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out Session</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center text-4xs text-slate-400 font-medium">
                  Vidyalaya Academy Educational Desk
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
