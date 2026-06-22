"use client";

import { useState } from "react";

const COURSE_MAP: Record<string, number> = {
  "online_b.com": 6,
  online_ba: 7,
  online_bca: 8,
  "online_m.com": 3,
  online_ma: 4,
  online_mba: 1,
  online_mca: 2,
  executive_mba: 14,
  online_dba: 195,
  online_bsc: 21,
};

const SUB_SOURCES = ["Form", "Land", "Play"] as const;

const COURSE_LABELS: Record<string, string> = {
  "online_b.com": "Online B.Com",
  online_ba: "Online BA",
  online_bca: "Online BCA",
  "online_m.com": "Online M.Com",
  online_ma: "Online MA",
  online_mba: "Online MBA",
  online_mca: "Online MCA",
  executive_mba: "Executive MBA",
  online_dba: "Online DBA",
  online_bsc: "Online BSc",
};

type SubmitResult =
  | { status: "success"; alreadyExists: boolean; id: string }
  | { status: "error"; message: string };

const inputBase =
  "w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 " +
  "transition-all duration-200 outline-none " +
  "border-white/10 hover:border-white/25 " +
  "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

const labelBase = "block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [mobileCode, setMobileCode] = useState("91");
  const [mobile, setMobile] = useState("");
  const [subSource, setSubSource] = useState<string>(SUB_SOURCES[0]);
  const [course, setCourse] = useState<string>("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    const payload = {
      name,
      mobile_code: mobileCode,
      mobile,
      source: "CV Labs",
      sub_source: subSource,
      course_id: COURSE_MAP[course],
      email,
      json_payload: [{ Attribute: "Notes", Value: notes }],
    };

    try {
      const res = await fetch("https://lead-service.collegevidya.com/lead/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        const { id, alreadyExists } = json.data;
        setResult({ status: "success", alreadyExists, id });
      } else {
        let message = `Error ${res.status}: ${res.statusText}`;
        try {
          const errJson = await res.json();
          message = JSON.stringify(errJson, null, 2);
        } catch {
          try {
            const errText = await res.text();
            if (errText) message = errText;
          } catch {}
        }
        setResult({ status: "error", message });
      }
    } catch (err) {
      setResult({
        status: "error",
        message: err instanceof Error ? err.message : "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl p-8 space-y-5"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)" }} />

      {/* Name */}
      <div className="field-group" style={{ animationDelay: "0ms" }}>
        <label className={labelBase}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className={inputBase}
        />
      </div>

      {/* Mobile */}
      <div className="field-group" style={{ animationDelay: "40ms" }}>
        <label className={labelBase}>
          Mobile <span className="text-rose-400 normal-case tracking-normal">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={mobileCode}
            onChange={(e) => setMobileCode(e.target.value)}
            placeholder="91"
            className={`w-16 rounded-xl border bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500
              transition-all duration-200 outline-none border-white/10 hover:border-white/25
              focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-center`}
          />
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="9876543210"
            required
            className={`flex-1 rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500
              transition-all duration-200 outline-none border-white/10 hover:border-white/25
              focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
          />
        </div>
        <p className="text-xs text-slate-600 mt-1.5 ml-0.5">Country code · Mobile number</p>
      </div>

      {/* Email */}
      <div className="field-group" style={{ animationDelay: "80ms" }}>
        <label className={labelBase}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className={inputBase}
        />
      </div>

      {/* Course */}
      <div className="field-group" style={{ animationDelay: "120ms" }}>
        <label className={labelBase}>Course</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className={`${inputBase} cursor-pointer`}
          style={{ colorScheme: "dark" }}
        >
          <option value="" style={{ background: "#1e1b30", color: "#94a3b8" }}>
            — Select a course —
          </option>
          {Object.keys(COURSE_MAP).map((key) => (
            <option key={key} value={key} style={{ background: "#1e1b30", color: "#e2e8f0" }}>
              {COURSE_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      {/* Sub Source */}
      <div className="field-group" style={{ animationDelay: "160ms" }}>
        <label className={labelBase}>Sub Source</label>
        <select
          value={subSource}
          onChange={(e) => setSubSource(e.target.value)}
          className={`${inputBase} cursor-pointer`}
          style={{ colorScheme: "dark" }}
        >
          {SUB_SOURCES.map((s) => (
            <option key={s} value={s} style={{ background: "#1e1b30", color: "#e2e8f0" }}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Source (readonly) */}
      <div className="field-group" style={{ animationDelay: "200ms" }}>
        <label className={labelBase}>Source</label>
        <div className="relative">
          <input
            type="text"
            value="CV Labs"
            readOnly
            className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-violet-500/60 font-medium">
            locked
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="field-group" style={{ animationDelay: "240ms" }}>
        <label className={labelBase}>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
          rows={3}
          className={`${inputBase} resize-none`}
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-shimmer w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting…
          </span>
        ) : (
          "Submit Lead →"
        )}
      </button>

      {/* Result banner */}
      {result && (
        <div className="animate-slide-in-down">
          {result.status === "success" ? (
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: result.alreadyExists
                  ? "rgba(234,179,8,0.08)"
                  : "rgba(34,197,94,0.08)",
                border: result.alreadyExists
                  ? "1px solid rgba(234,179,8,0.25)"
                  : "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">
                  {result.alreadyExists ? "⚠️" : "✅"}
                </span>
                <div>
                  <p className="font-semibold" style={{ color: result.alreadyExists ? "#fbbf24" : "#4ade80" }}>
                    {result.alreadyExists ? "Lead already exists" : "New lead created"}
                  </p>
                  <p className="text-xs mt-0.5 text-slate-400 font-mono">ID: {result.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">❌</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-rose-400">Submission failed</p>
                  <pre className="whitespace-pre-wrap break-all text-xs mt-1.5 text-slate-400 font-mono">
                    {result.message}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
