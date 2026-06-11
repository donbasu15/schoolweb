import Link from 'next/link';
import { GraduationCap, ShieldCheck, Phone, Mail, MapPin, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold text-slate-900 shadow">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold font-serif text-white tracking-tight">
                Vidyalaya Academy
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Affiliated with CBSE, New Delhi. Dedicated to cultivating intelligence, character, and leadership in the leaders of tomorrow.
            </p>
            <div className="text-xs text-slate-400 border border-slate-800 rounded p-2.5 bg-slate-950/40">
              <span className="font-bold text-white block">CBSE Affiliation No.</span>
              1930058 | School Code: 55431
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Vidyalaya
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-brand-gold transition-colors">Home Page</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">About & SMC</Link></li>
              <li><Link href="/academics" className="hover:text-brand-gold transition-colors">Academics & Fee</Link></li>
              <li><Link href="/careers" className="hover:text-brand-gold transition-colors">Careers & Vacancies</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Directory</Link></li>
            </ul>
          </div>

          {/* Mandatory Disclosures Hub */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Board Disclosures (CBSE)
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/board-disclosure" className="hover:text-brand-gold transition-colors">Mandatory Public Disclosure</Link></li>
              <li><Link href="/board-disclosure#smc" className="hover:text-brand-gold transition-colors">SMC & PTA List</Link></li>
              <li><Link href="/board-disclosure#safety" className="hover:text-brand-gold transition-colors">Safety Certificates</Link></li>
              <li><Link href="/academics#fee" className="hover:text-brand-gold transition-colors">Fee Structure</Link></li>
              <li><Link href="/academics#calendar" className="hover:text-brand-gold transition-colors">Academic Calendar</Link></li>
              <li><Link href="/board-inspection-hub" className="text-slate-500 hover:text-brand-gold flex items-center space-x-1 mt-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Inspector Verification Portal</span>
              </Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-slate-400">Sector 12, Dwarka, New Delhi, 110075, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                <span className="text-slate-400">+91 (11) 2808 4321 / 4322</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                <span className="text-slate-400">info@vidyalaya.edu.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {currentYear} Vidyalaya Academy. All Rights Reserved. Designed in compliance with CBSE & RTE standards.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-center sm:justify-end text-slate-400">
            <Link href="/board-disclosure" className="hover:underline hover:text-brand-gold transition-colors">Right to Education (RTE) Compliance</Link>
            <span>•</span>
            <Link 
              href="/admin/login" 
              className="hover:underline hover:text-brand-gold transition-colors flex items-center space-x-1 text-slate-350 font-semibold"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin & Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
