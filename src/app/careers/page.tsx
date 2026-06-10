import { fetchJobs } from '@/lib/actions';
import JobApplicationForm from '@/components/JobApplicationForm';
import { Award, ShieldAlert, Cpu, Heart, Briefcase, BookmarkCheck } from 'lucide-react';

export default async function CareersPage() {
  const allJobs = await fetchJobs();
  const activeJobs = allJobs.filter((job) => job.isActive);

  const staffBenefits = [
    { title: 'Competitive Compensation', icon: Award, desc: 'Attractive basic salary structures in compliance with local rules, along with DA, HRA, and travel allowance increments.' },
    { title: 'Social Security Schemes', icon: Heart, desc: 'Provident Fund (PF) allocations, Gratuity schemes, and comprehensive family health insurance covers.' },
    { title: 'Professional Development', icon: Cpu, desc: 'Regular training seminars, pedagogical training sessions, CBSE workshops, and access to premium teaching tools.' },
    { title: 'Ecosystem & Facilities', icon: BookmarkCheck, desc: 'Work in fully air-conditioned smart ICT classrooms, composite science laboratories, and high-speed campus networks.' },
  ];

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-brand-dark">Join Our Team</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Become a part of Vidyalaya Academy and help shape the next generation of innovators, leaders, and thinkers.
          </p>
        </div>

        {/* Staff Benefits Grid */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold font-serif text-brand-blue border-b border-slate-150 pb-2">
            Why Teach at Vidyalaya?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staffBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex space-x-3.5 items-start">
                  <div className="p-2.5 bg-blue-50 text-brand-blue rounded-xl shrink-0">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">{benefit.title}</h4>
                    <p className="text-slate-500 text-2xs leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Current Vacancies and Application Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vacancy List */}
          <section className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold font-serif text-brand-dark flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-brand-gold" />
              <span>Current Openings</span>
            </h2>

            {activeJobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                <p className="text-xs">No active staff vacancies at this moment. Feel free to submit a general application using the form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-3 hover:border-brand-blue/30 transition-colors"
                  >
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-bold text-brand-blue uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-150">
                        {job.department} Department
                      </span>
                      <span className="text-slate-400 font-semibold">Exp: {job.experienceRequired}</span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                    
                    <div className="text-2xs text-slate-500 space-y-2">
                      <p className="leading-relaxed"><strong className="text-slate-850">Description:</strong> {job.description}</p>
                      <p className="leading-relaxed"><strong className="text-slate-850">Requirements:</strong> {job.requirements}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-2 text-3xs text-slate-500">
              <ShieldAlert className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>HR Notice:</strong> Only shortlisted applicants will be contacted for physical interviews and demo teaching lectures. Applications without PDF resumes will be rejected automatically.
              </p>
            </div>
          </section>

          {/* Form */}
          <div className="lg:col-span-6">
            <JobApplicationForm jobs={activeJobs} />
          </div>

        </div>

      </div>
    </div>
  );
}
