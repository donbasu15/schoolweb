import { fetchEvents } from '@/lib/actions';
import CalendarComponent from '@/components/CalendarComponent';
import { BookOpen, Landmark, Calendar as CalendarIcon, ClipboardList } from 'lucide-react';

export default async function AcademicsPage() {
  const events = await fetchEvents();

  const curriculumStreams = [
    {
      level: 'Primary Cohort (Nursery - Grade V)',
      syllabus: 'Early Childhood Education Framework with focus on numeracy, phonics, motor skills, environmental studies, art, and moral sciences.',
    },
    {
      level: 'Middle School (Grades VI - VIII)',
      syllabus: 'CBSE aligned core courses including Science, Social Sciences, Mathematics, English, Hindi, and third language options (Sanskrit/French), with introductory coding modules.',
    },
    {
      level: 'Secondary Level (Grades IX - X)',
      syllabus: 'Intensive prep for CBSE Board Examination. Main fields of study: Mathematics, Science (Physics/Chemistry/Biology), Social Science, Language I (English), Language II (Hindi/Regional).',
    },
    {
      level: 'Senior Secondary Stream (Grades XI - XII)',
      syllabus: 'Specialized streams: Science (PCM/PCB, Computer Science, Economics), Commerce (Accountancy, Business Studies, Informatics), and Humanities (History, Political Science, Psychology).',
    },
  ];

  const feeStructure = [
    { particulars: 'Registration & Prospectus Fee (One-Time)', primary: '₹1,000', secondary: '₹1,000', srSecondary: '₹1,000' },
    { particulars: 'Admission Fee (One-Time, Non-Refundable)', primary: '₹12,000', secondary: '₹15,000', srSecondary: '₹18,000' },
    { particulars: 'Tuition Fee (Quarterly)', primary: '₹14,500', secondary: '₹17,200', srSecondary: '₹19,800' },
    { particulars: 'Composite Development Fund (Annual)', primary: '₹8,000', secondary: '₹9,500', srSecondary: '₹11,000' },
    { particulars: 'Laboratory Fee (Annual, Science/Comp streams)', primary: '—', secondary: '₹2,500', srSecondary: '₹4,500' },
  ];

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-brand-dark">Academics & Admissions</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Comprehensive outline of school semesters, CBSE syllabus details, and institutional fee transparency.
          </p>
        </div>

        {/* Curricular Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-50 text-brand-blue rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-brand-dark">Curriculum Framework & Streams</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumStreams.map((stream, idx) => (
              <div key={idx} className="border border-slate-150 rounded-xl p-5 bg-slate-50/50 hover:bg-white transition-colors duration-150">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{stream.level}</h3>
                <p className="text-slate-600 text-2xs leading-relaxed">{stream.syllabus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Calendar Section */}
        <section id="calendar" className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-50 text-brand-gold rounded-lg">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-brand-dark">Academic Calendar & Examinations</h2>
          </div>
          
          <CalendarComponent events={JSON.parse(JSON.stringify(events))} />
        </section>

        {/* Fee Structure Section */}
        <section id="fee" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Landmark className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-brand-dark">Annual Fee Schedule (2026-27)</h2>
            </div>
            <div className="text-3xs text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded font-semibold">
              RTE Reserved Seats: Tuition Exempted
            </div>
          </div>

          {/* Fee Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-3.5">Fee Head / Particulars</th>
                  <th className="p-3.5">Primary (Nursery-V)</th>
                  <th className="p-3.5">Secondary (VI-X)</th>
                  <th className="p-3.5">Sr. Secondary (XI-XII)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {feeStructure.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30">
                    <td className="p-3.5 font-medium text-slate-800">{row.particulars}</td>
                    <td className="p-3.5 text-slate-600">{row.primary}</td>
                    <td className="p-3.5 text-slate-600">{row.secondary}</td>
                    <td className="p-3.5 text-slate-600">{row.srSecondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fee payment policy note */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start space-x-3 text-2xs text-slate-500">
            <ClipboardList className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <strong className="text-slate-800">Fee Compliance Rules:</strong>
              <ul className="list-disc list-inside space-y-1">
                <li>Fees are to be paid quarterly by the 10th of April, July, October, and January.</li>
                <li>Online transactions, bank drafts, and debit/credit payments are accepted through the Admin Accounts office.</li>
                <li>Late payment will attract a delay fine of ₹50 per day following the final due date.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
