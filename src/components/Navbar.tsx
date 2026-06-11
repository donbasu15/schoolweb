import Link from 'next/link';
import { getSession, getInspectorSession } from '@/lib/auth';
import { logoutAction } from '@/lib/actions';
import { GraduationCap, Lock, ShieldCheck, LogOut } from 'lucide-react';
import React from 'react';
import MobileMenu from './MobileMenu';

export default async function Navbar() {
  const session = await getSession();
  const inspectorSession = await getInspectorSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Board Disclosure', href: '/board-disclosure' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-lg font-bold tracking-tight text-brand-dark font-serif">
              Vidyalaya Academy
            </span>
            <span className="block text-2xs -mt-1 text-slate-500 font-medium uppercase tracking-widest">
              Nurturing Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors duration-150"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Session / Action Buttons */}
        <div className="flex items-center space-x-3">
          {inspectorSession && (
            <Link
              href="/board-inspection-hub"
              className="hidden sm:flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 animate-pulse"
            >
              <ShieldCheck className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Inspector Mode</span>
            </Link>
          )}

          {session ? (
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/admin"
                className="flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-brand-blue text-white shadow hover:bg-slate-800 transition-colors"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Admin Dashboard</span>
              </Link>
              
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-red-650 hover:bg-red-50 transition-colors"
                  title="Logout Session"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                href="/board-inspection-hub"
                className="flex items-center space-x-1 text-xs font-medium text-slate-550 hover:text-brand-blue px-3 py-2 rounded-lg border border-slate-100 hover:border-slate-200 transition-all bg-white"
              >
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <span>Inspect Hub</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu trigger client component */}
          <MobileMenu 
            navLinks={navLinks} 
            hasSession={!!session} 
            hasInspectorSession={!!inspectorSession} 
          />
        </div>

      </div>
    </header>
  );
}
