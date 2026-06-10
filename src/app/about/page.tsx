import { GraduationCap, BookOpen, Target, Landmark, Award, ShieldAlert } from 'lucide-react';

export default function AboutPage() {
  const smcMembers = [
    { name: 'Dr. Pritam Kumar', designation: 'Member Secretary (Principal)', qualification: 'M.Sc., Ph.D. (Education)' },
    { name: 'Shri R. K. Dixit', designation: 'Chairman (Nominated by Trust)', qualification: 'B.Tech, MBA' },
    { name: 'Smt. Kavita Sen', designation: 'Parent Representative (Mother)', qualification: 'M.A., B.Ed.' },
    { name: 'Shri Manoj Tiwary', designation: 'Parent Representative (Father)', qualification: 'B.Com, Advocate' },
    { name: 'Smt. Deepa Roy', designation: 'Teacher Representative (PGT English)', qualification: 'M.A. (English), B.Ed.' },
    { name: 'Shri Suresh Rawat', designation: 'Member (Educationist)', qualification: 'M.Sc., Retired Principal KVS' },
    { name: 'Dr. (Smt) Anjali Bose', designation: 'Member (Medical Practitioner)', qualification: 'MBBS, DGO' },
  ];

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-brand-dark">About Vidyalaya Academy</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Established in 2004, our institution is dedicated to fostering global citizenship grounded in traditional values.
          </p>
        </div>

        {/* Welcome Letter section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="h-28 w-28 rounded-full bg-slate-100 border-2 border-brand-gold flex items-center justify-center font-bold text-brand-blue text-3xl shadow-inner font-serif">
              PK
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Dr. Pritam Kumar</h3>
              <p className="text-2xs text-slate-500 font-semibold">Principal & Member Secretary</p>
              <p className="text-3xs text-slate-400 mt-1">Vidyalaya Academy, Dwarka</p>
            </div>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-3xs text-left text-slate-500 leading-relaxed">
              <strong>Academic Qualifications:</strong> M.Sc. Physics (Delhi University), M.Ed., Ph.D. in Educational Administration with 22+ years of teaching and leadership experience.
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-slate-650 leading-relaxed">
            <h2 className="text-xl font-bold font-serif text-brand-blue border-b border-slate-100 pb-2">
              Principal&apos;s Welcome Address
            </h2>
            <p>
              Dear Parents, Patrons, and Friends,
            </p>
            <p>
              It is a matter of pride and privilege to welcome you to Vidyalaya Academy. Over the years, we have grown from a modest schoolhouse to a premier CBSE educational landmark, serving over 2,500 students with excellence and innovation.
            </p>
            <p>
              At Vidyalaya, we believe that education is not merely the acquisition of textbook knowledge; it is a holistic process of sharpening intellect, molding character, and raising socially conscious leaders. We achieve this by balancing rigorous scholastic curriculum with advanced scientific exploration in our composite labs, robust sports initiatives, and creative arts exposure.
            </p>
            <p>
              Our dedicated educators work tireless hours to ensure no child is left behind, tailoring instructions to individual styles. We invite you to join hands with us on this collaborative journey of excellence.
            </p>
            <p className="font-semibold text-slate-900 pt-2">
              Warmest Regards,<br />
              Dr. Pritam Kumar
            </p>
          </div>
        </section>

        {/* Vision, Mission, and Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-3xs">
            <div className="inline-flex p-2 bg-amber-50 border border-amber-100 text-brand-gold rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">Our Vision</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To be an educational center of global standards, equipping learners with academic superiority, critical inquiry mindsets, high moral standards, and the capacity to adapt and innovate in an increasingly digital world.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-3xs">
            <div className="inline-flex p-2 bg-blue-50 border border-blue-100 text-brand-blue rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">Our Mission</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To provide affordable, accessible, and high-quality modern education. We aim to nurture active intelligence, physical vitality, artistic capabilities, and patriotic values, in full compliance with CBSE curricula and RTE directives.
            </p>
          </div>
        </section>

        {/* School Management Committee (SMC) Section */}
        <section id="smc" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1 text-2xs font-bold uppercase text-brand-gold">
              <Landmark className="h-4 w-4" />
              <span>Governance</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-brand-dark">School Management Committee (SMC)</h2>
            <p className="text-slate-500 text-xs">
              List of executive members constituting the governing council, reconstituted in accordance with Section 20 of CBSE Affiliation Bye-Laws.
            </p>
          </div>

          {/* Table of SMC members */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-3.5">Name of the Member</th>
                  <th className="p-3.5">SMC Designation</th>
                  <th className="p-3.5">Educational / Professional Qualifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {smcMembers.map((member, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-semibold text-slate-900">{member.name}</td>
                    <td className="p-3.5 text-brand-blue font-medium">{member.designation}</td>
                    <td className="p-3.5 text-slate-500">{member.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SLA / Compliance Note */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 flex items-start space-x-2.5 text-2xs text-slate-500">
            <ShieldAlert className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> The School Management Committee convenes quarterly to review academic progress, audit fee restructuring, oversee infrastructural stability, and evaluate water safety and hygienic clearances.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
