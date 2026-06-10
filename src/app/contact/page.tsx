import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const faqs = [
    {
      q: 'What is the age eligibility criteria for Nursery admissions?',
      a: 'As of March 31st of the session academic year, the child must be a minimum of 3 years old. We strictly adhere to CBSE and Directorate of Education mandates regarding age brackets.'
    },
    {
      q: 'Does the school provide safe transportation facilities?',
      a: 'Yes, Vidyalaya Academy operates a fleet of school buses covering Dwarka, Janakpuri, and Uttam Nagar. All buses are GPS-tracked, equipped with speed governors, CCTV security cameras, and have a mandatory trained female attendant and helper onboard.'
    },
    {
      q: 'What are the general school timings for students?',
      a: 'Nursery & Kindergarten: 8:00 AM to 12:30 PM (Monday to Friday). Classes I to XII: 8:00 AM to 2:00 PM (Monday to Friday, and alternate Saturdays for senior secondary cohorts).'
    },
    {
      q: 'Where can parents purchase textbooks and uniforms?',
      a: 'The school prescribes NCERT publications for standard classes. List of approved syllabus books and uniform design specifications is hosted on the Board Disclosure page. Uniforms can be purchased from any local supplier conforming to the colors.'
    }
  ];

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-brand-dark">Contact Directory & FAQ</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Get in touch with the respective administrative coordinators or read through our frequently asked questions.
          </p>
        </div>

        {/* Directory & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold font-serif text-brand-blue border-b border-slate-100 pb-2.5">
                Vidyalaya Campus Desk
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Address Location</span>
                    <span className="text-slate-550">Sector 12, Dwarka, New Delhi, 110075, India</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Hotline Telephones</span>
                    <span className="text-slate-550">+91 (11) 2808 4321, 2808 4322</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Email Channels</span>
                    <span className="text-slate-550 block">General: info@vidyalaya.edu.in</span>
                    <span className="text-slate-550 block">Admissions: admissions@vidyalaya.edu.in</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Office Timing Hours</span>
                    <span className="text-slate-550">Weekdays: 8:30 AM – 3:30 PM</span>
                    <span className="text-slate-550 block">Saturdays: 9:00 AM – 1:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 border border-slate-300 rounded-2xl h-44 overflow-hidden shadow-inner flex flex-col items-center justify-center text-slate-500 p-4 text-center">
              <MapPin className="h-8 w-8 text-slate-400 mb-1" />
              <span className="text-2xs font-bold text-slate-650">Google Map Location Services</span>
              <span className="text-3xs text-slate-400 mt-0.5">Dwarka Sector 12 Metro Station vicinity</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-brand-dark">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-xs">
              Quick reference answers to uniform purchases, bus safety protocols, and daily routines.
            </p>
          </div>

          {/* Accordion Blocks */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden bg-slate-50/30"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white select-none">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm pr-4">
                    {faq.q}
                  </h3>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-250 font-bold text-sm">
                    ▼
                  </span>
                </summary>
                <div className="p-4 border-t border-slate-100 text-slate-600 text-2xs leading-relaxed bg-white/60">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
