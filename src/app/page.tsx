import Link from 'next/link';
import { fetchNotifications } from '@/lib/actions';
import DynamicTicker from '@/components/DynamicTicker';
import NoticeBoard from '@/components/NoticeBoard';
import { 
  BookOpen, 
  Award, 
  Users, 
  Cpu, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default async function HomePage() {
  const notifications = await fetchNotifications();

  const statistics = [
    { label: 'Enrolled Students', value: '2,500+', icon: Users, desc: 'Nursery to Grade XII' },
    { label: 'Smart Classrooms', value: '45+', icon: Cpu, desc: 'Fully ICT enabled setup' },
    { label: 'Board Examination', value: '100%', icon: Award, desc: 'Pass rate in CBSE X & XII' },
    { label: 'Qualified Staff', value: '150+', icon: BookOpen, desc: 'Trained & experienced educators' },
  ];

  const corePillars = [
    {
      title: 'Advanced STEM & Comp Labs',
      description: 'Equipped with the latest core scientific apparatus, composite physics/chemistry equipment, and state-of-the-art computer systems for artificial intelligence curriculum.',
    },
    {
      title: 'Mandatory CBSE Compliance',
      description: 'Transparent disclosure of fee structures, SMC, PTA bodies, building structural deeds, water sanitation clearances, and general rules for public viewing.',
    },
    {
      title: 'Holistic Sports & Athletics',
      description: 'Lush grass football turf, standard size basketball courts, indoor badminton facilities, cricket training nets, and physical fitness programs.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Dynamic News Ticker */}
      <DynamicTicker notifications={notifications} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-dark to-brand-blue text-white py-20 px-4 sm:px-6 lg:px-8">
        {/* Abstract decorative shapes */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-brand-gold tracking-wide uppercase">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>CBSE Affiliated Senior Secondary School</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-tight text-white">
              Cultivating Academic Excellence & Integrity
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Vidyalaya Academy Dwarka offers a nurturing environment, high-tech smart classrooms, professional laboratories, and an award-winning syllabus aligned with RTE directives.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="flex items-center space-x-1 px-6 py-3 rounded-lg bg-brand-gold text-slate-900 font-bold hover:bg-brand-gold-hover hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-brand-gold/20"
              >
                <span>Admissions 2026-27</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="/board-disclosure"
                className="flex items-center space-x-1.5 px-6 py-3 rounded-lg bg-white/15 border border-white/20 font-semibold hover:bg-white/20 transition-all text-white"
              >
                <FileText className="h-4 w-4 text-brand-gold" />
                <span>Mandatory Public Disclosures</span>
              </Link>
            </div>
          </div>

          {/* Featured Highlights Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold font-serif text-brand-gold border-b border-white/10 pb-3">
                Admission Expressions & Criteria
              </h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold">1</span>
                  <p className="text-slate-300"><span className="text-white font-semibold">Nursery Criteria:</span> Child must be 3+ years old as of March 31st of the session year.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold">2</span>
                  <p className="text-slate-300"><span className="text-white font-semibold">RTE Admissions:</span> 25% seats reserved for economically weaker sections as per guidelines.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold">3</span>
                  <p className="text-slate-300"><span className="text-white font-semibold">Senior Admission:</span> Merit interactions and entrance scores in science/math.</p>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block text-center text-xs font-semibold text-white bg-slate-800 border border-slate-700 py-2 rounded hover:bg-slate-750 transition-colors uppercase tracking-wider"
                >
                  Download Application PDF Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Block */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded bg-blue-50 text-brand-blue shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-brand-dark">{stat.value}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{stat.label}</h4>
                  <p className="text-2xs text-slate-500">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Welcome Message & School Features */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Welcome Letter Teaser */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
            <div className="absolute top-0 right-0 mt-6 mr-6 opacity-5">
              <BookOpen className="h-32 w-32" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-brand-dark border-b border-slate-100 pb-3">
                Principal&apos;s Greeting
              </h2>
              
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-brand-blue text-lg uppercase shadow-inner">
                  PK
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dr. Pritam Kumar</h4>
                  <p className="text-2xs text-slate-500">M.Sc., Ph.D., Principal Coordinator</p>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed italic">
                &ldquo;Dear Parents, Students, and Visitors, welcome to Vidyalaya Academy. Our institution has stood as a beacon of quality education for over two decades. We foster academic rigour while equipping students with emotional resilience, civic responsibility, and technical fluency to meet tomorrow&apos;s challenges.&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-2xs text-slate-500 font-bold uppercase">Apex Leadership</span>
              <Link href="/about" className="text-xs font-semibold text-brand-blue hover:text-brand-dark flex items-center space-x-0.5 hover:underline">
                <span>Read Full Message</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xs font-bold uppercase tracking-widest text-brand-gold">Our Pedagogy</h3>
              <h2 className="text-3xl font-bold font-serif text-brand-dark">
                Modern Facilities with Grounded Core Values
              </h2>
              <p className="text-slate-500 text-sm">
                We believe that education must encompass the latest developments in science and technology while maintaining strong cultural roots.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {corePillars.slice(0, 2).map((pillar, idx) => (
                <div key={idx} className="space-y-2 bg-white p-5 rounded-xl border border-slate-200 shadow-3xs">
                  <h4 className="font-bold text-brand-blue text-sm">{pillar.title}</h4>
                  <p className="text-slate-500 text-2xs leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Filterable Notices / Circulars Panel */}
      <section className="py-16 bg-white border-t border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xs font-bold uppercase tracking-widest text-brand-gold">Administrative Hub</h3>
              <h2 className="text-3xl font-bold font-serif text-brand-dark">
                Recent Notices & Board Circulars
              </h2>
            </div>
            
            <div className="flex items-center space-x-3 text-xs">
              <Link
                href="/board-disclosure"
                className="flex items-center space-x-1 font-semibold text-slate-600 hover:text-brand-blue"
              >
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <span>Regulatory Hub</span>
              </Link>
            </div>
          </div>

          {/* Notices Grid Component */}
          <NoticeBoard initialNotices={JSON.parse(JSON.stringify(notifications))} />
        </div>
      </section>

    </div>
  );
}
