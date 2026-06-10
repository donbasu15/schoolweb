import { fetchComplianceDocs } from '@/lib/actions';
import { ShieldAlert, Download, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function BoardDisclosurePage() {
  const allDocs = await fetchComplianceDocs();
  // Public-facing documents
  const publicDocs = allDocs.filter((doc) => doc.isPublic);

  // Group docs by category
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'safety': return 'Safety & Sanitary Certificates';
      case 'academic': return 'Affiliation & Academic Rules';
      case 'smc': return 'Management Committee (SMC)';
      case 'pta': return 'Parent-Teacher Association (PTA)';
      default: return 'General Disclosures';
    }
  };

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-brand-dark">Mandatory Public Disclosures</h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Published in accordance with CBSE Affiliation Bye-Laws and Right to Education (RTE) directives.
          </p>
        </div>

        {/* Board Credentials Box */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-brand-blue flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-brand-gold" />
              <span>School Affiliation & Details</span>
            </h2>
            <p className="text-slate-650 text-xs leading-relaxed">
              Vidyalaya Academy is fully recognized by the Directorate of Education, Govt. of NCT Delhi, and affiliated to Central Board of Secondary Education (CBSE) for the Senior Secondary examinations.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">Affiliation No.</span>
                <span className="text-slate-900 font-extrabold">1930058</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">School Code</span>
                <span className="text-slate-900 font-extrabold">55431</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Affiliation Status</span>
                <span className="text-emerald-700 font-extrabold uppercase">Active (Prov.)</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Affiliated Till</span>
                <span className="text-slate-900 font-extrabold">March 31, 2030</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-brand-blue flex items-center space-x-2">
              <FileText className="h-5 w-5 text-brand-gold" />
              <span>Transfer Certificate (TC) Hub</span>
            </h2>
            <p className="text-slate-650 text-xs leading-relaxed">
              As per Board guidelines, school Transfer Certificates (TC) issued to departing students are tracked and verifiable for public validation.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div>
                  <span className="font-semibold block text-slate-800">Sample TC Application Format</span>
                  <span className="text-3xs text-slate-400">Required format for certificate release</span>
                </div>
                <a href="/uploads/sample_tc_format.pdf" className="text-brand-gold hover:text-brand-gold-hover font-bold hover:underline shrink-0">
                  Download Form
                </a>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div>
                  <span className="font-semibold block text-slate-800">Issued TCs Ledger (2025-26)</span>
                  <span className="text-3xs text-slate-400">Updated weekly with verification links</span>
                </div>
                <a href="/uploads/tc_log_2025_2026.pdf" className="text-brand-gold hover:text-brand-gold-hover font-bold hover:underline shrink-0">
                  View Registry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Public Disclosures Archive List */}
        <section id="documents" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-brand-dark">Public Disclosure Documents (Annexure I)</h2>
            <p className="text-slate-500 text-xs">
              Direct download links to verify school compliance certificates, deeds, NOCs, and health certificates.
            </p>
          </div>

          {publicDocs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400 text-xs italic">No disclosure documents have been uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 border border-slate-150 rounded-xl hover:bg-slate-50/50 transition-colors bg-white shadow-3xs"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-3xs px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100 font-bold uppercase">
                      {getCategoryLabel(doc.category)}
                    </span>
                    <h4 className="font-bold text-slate-900 text-2xs leading-snug">
                      {doc.title}
                    </h4>
                    <span className="text-3xs text-slate-400 block font-semibold uppercase">
                      Board Code: {doc.boardCode}
                    </span>
                  </div>
                  
                  <a
                    href={doc.docUrl}
                    download
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-slate-900 transition-all shadow-sm"
                    title="Download Compliance PDF Document"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Regulatory Warning Card */}
          <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-650">
            <ShieldAlert className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-800">Official Notice to School Inspectors:</strong>
              <p className="leading-relaxed text-slate-600">
                Land deeds, State Building Safety Certificates (State PWD), State Fire Clearance (Fire Service Headquarters), and state No Objection Certificates (NOC) are hosted on our secure, non-public Inspector Portal. Please log in using your authorized verification token by visiting the link below.
              </p>
              <Link href="/board-inspection-hub" className="text-brand-blue hover:text-brand-dark font-bold hover:underline inline-block mt-1">
                Go to Secure Inspector Verification Portal →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
