import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-14 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 40%, #0f1a2e 100%)",
      }}
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-60px] w-[360px] h-[360px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        {/* header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-4 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
            CV Labs
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Lead Submission</h1>
          <p className="text-slate-400 mt-2 text-sm">Fill in the details below to push a new lead</p>
        </div>

        <LeadForm />
      </div>
    </div>
  );
}
