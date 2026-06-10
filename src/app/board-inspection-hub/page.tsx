import { fetchComplianceDocs } from '@/lib/actions';
import { logoutAction } from '@/lib/actions';
import { getInspectorSession } from '@/lib/auth';
import { ShieldCheck, LogOut, Download, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function InspectorHubPage() {
  const session = await getInspectorSession();
  
  // Guard check (fallback to middleware, but good as secondary defense)
  if (!session) {
    redirect('/board-inspection-hub/login');
  }

  const allDocs = await fetchComplianceDocs();

  // Group by public vs private
  const privateDocs = allDocs.filter(doc => !doc.isPublic);
  const publicDocs = allDocs.filter(doc => doc.isPublic);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'land_deed': return 'Land & Building Deeds';
      case 'noc': return 'No Objection Certificate (NOC)';
      case 'safety': return 'Safety Clearances';
      case 'smc': return 'SMC Governance';
      case 'pta': return 'PTA Governance';
      default: return 'Regulatory Filing';
    }
  };

  return (
    <div className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header Block */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-brand-gold rounded-full text-xs font-bold uppercase tracking-wide">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Board Verification Mode</span>
            </div>
            
            <h1 className="text-2xl font-bold font-serif text-white">Inspector Compliance Hub</h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
              Currently logged in under official credentials. This panel lists all internal deeds, ownership deeds, and NOCs required for school licensing reviews.
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 border border-slate-700 hover:bg-slate-800 hover:text-white rounded-lg text-xs font-semibold transition-all text-slate-400 shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Exit Inspector Mode</span>
            </button>
          </form>
        </div>

        {/* Warning Indicator */}
        <div className="bg-amber-50/50 border border-amber-250 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-650">
          <AlertTriangle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-slate-800">Confidentiality Note:</strong>
            <p className="leading-relaxed">
              Ownership deeds and state No Objection Certificates (NOC) displayed below are strictly non-public. Do not share, publish, or copy any documents without express permission from the Vidyalaya Board of Trustees.
            </p>
          </div>
        </div>

        {/* Private Compliance Docs */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            <span>Private Licensing Documents (Not disclosed on public site)</span>
          </h2>

          {privateDocs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              <p className="text-xs">No private compliance documents uploaded. Add documents in the Admin Panel to populate this view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privateDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 border border-red-100 rounded-xl bg-white shadow-3xs"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-3xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-150 font-bold uppercase">
                      {getCategoryLabel(doc.category)}
                    </span>
                    <h4 className="font-bold text-slate-900 text-2xs leading-snug">
                      {doc.title}
                    </h4>
                    <span className="text-3xs text-slate-400 block font-semibold">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  
                  <a
                    href={doc.docUrl}
                    download
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Download Private Document PDF"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Public Disclosures */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span>Public Affiliation & Safety Documents (Disclosed on public site)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicDocs.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between p-4 border border-slate-150 rounded-xl bg-white shadow-3xs"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-3xs px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100 font-bold uppercase">
                    {getCategoryLabel(doc.category)}
                  </span>
                  <h4 className="font-bold text-slate-900 text-2xs leading-snug">
                    {doc.title}
                  </h4>
                  <span className="text-3xs text-slate-400 block font-semibold">
                    Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
                
                <a
                  href={doc.docUrl}
                  download
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                  title="Download Public Document PDF"
                >
                  <Download className="h-4.5 w-4.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
