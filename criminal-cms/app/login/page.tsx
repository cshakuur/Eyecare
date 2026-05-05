"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roleRoutes: Record<string, string> = {
  Admin: "/dashboard/admin",
  Police: "/dashboard/police",
  Investigator: "/dashboard/investigation",
  Prosecutor: "/dashboard/prosecutor",
  Judge: "/dashboard/judge",
  "Prison Officer": "/dashboard/prison",
};

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validateCredentials = () => {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = "Username is required";
    else if (!username.includes("@")) e.username = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCredentials()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("mfa");
    }, 1000);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfa.length !== 6) {
      setErrors({ mfa: "Enter the 6-digit code" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(roleRoutes[role] ?? "/dashboard/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f172a]">
      {/* Left branding panel */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">INCCMS</h1>
            <p className="text-amber-400 text-sm font-medium mt-0.5">Integrated National Criminal Case Management System</p>
          </div>
        </div>

        <div className="hidden lg:block max-w-sm">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Secure &<br />Efficient Justice
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A unified platform connecting police, investigators, prosecutors, judges, and prison officers for streamlined criminal case management.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Active Cases", value: "2,847" },
              { label: "Officers Online", value: "341" },
              { label: "Court Hearings Today", value: "18" },
              { label: "Cases Resolved (YTD)", value: "1,203" },
            ].map(stat => (
              <div key={stat.label} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          256-bit encrypted · ISO 27001 certified · FIPS 140-2 compliant
        </div>
      </div>

      {/* Right login form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            {step === "credentials" ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
                  <p className="text-slate-500 text-sm mt-1">Secure Government Access Portal</p>
                </div>

                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                  {/* Role selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.keys(roleRoutes).map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Government Email</label>
                    <input
                      type="text"
                      value={username}
                      onChange={e => { setUsername(e.target.value); setErrors(err => ({ ...err, username: "" })); }}
                      placeholder="officer@inccms.gov"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                        ${errors.username ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setErrors(err => ({ ...err, password: "" })); }}
                        placeholder="••••••••••"
                        className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                          ${errors.password ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(s => !s)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPass ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying...
                      </>
                    ) : "Continue →"}
                  </button>
                </form>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Demo Credentials</p>
                  <div className="space-y-1">
                    {[
                      ["Admin", "admin@inccms.gov"],
                      ["Police", "officer@inccms.gov"],
                      ["Judge", "judge@inccms.gov"],
                    ].map(([r, u]) => (
                      <div key={r} className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{r}</span>
                        <button
                          onClick={() => { setRole(r); setUsername(u); setPassword("Demo@2024"); }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Use
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <button onClick={() => setStep("credentials")} className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1 mb-3">
                    ← Back
                  </button>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Two-Factor Auth</h2>
                  <p className="text-slate-500 text-sm mt-1">Enter the 6-digit code from your authenticator app</p>
                </div>

                <form onSubmit={handleMfaSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Authentication Code</label>
                    <input
                      type="text"
                      value={mfa}
                      onChange={e => { setMfa(e.target.value.replace(/\D/g, "").slice(0, 6)); setErrors({}); }}
                      placeholder="000000"
                      className={`w-full px-4 py-3 rounded-lg border text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.mfa ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white"}`}
                    />
                    {errors.mfa && <p className="text-red-500 text-xs mt-1 text-center">{errors.mfa}</p>}
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    Demo: use code <span className="font-mono font-bold text-slate-600">123456</span>
                  </p>

                  <button
                    type="submit"
                    disabled={loading || mfa.length !== 6}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Authenticating...
                      </>
                    ) : "Access System →"}
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            🔒 This is a restricted government system. Unauthorized access is a criminal offense.
          </p>
        </div>
      </div>
    </div>
  );
}
