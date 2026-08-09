"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.9,
  };

  if (name === "mail") {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6"/></svg>;
  }
  if (name === "lock") {
    return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2"/><path strokeLinecap="round" d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
  }
  if (name === "user") {
    return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path strokeLinecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>;
  }
  if (name === "eye") {
    return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
  }
  if (name === "eye-off") {
    return <svg {...common}><path strokeLinecap="round" d="m3 3 18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.2 2.8M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>;
  }
  if (name === "check") {
    return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6"/></svg>;
  }
  if (name === "arrow") {
    return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5"/></svg>;
  }
  return null;
}

function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${compact ? "h-10 w-10 rounded-xl text-lg" : "h-12 w-12 rounded-2xl text-xl"} flex items-center justify-center bg-white font-black text-[#10214b] shadow-[0_10px_30px_rgba(2,8,23,0.2)]`}>
        V
      </div>
      <div>
        <p className={`${compact ? "text-base text-slate-950" : "text-lg text-white"} font-bold tracking-tight`}>Volymoly</p>
        <p className={`${compact ? "text-slate-500" : "text-blue-200"} text-[11px] font-semibold uppercase tracking-[0.18em]`}>CRM Workspace</p>
      </div>
    </div>
  );
}

function ProductPreview() {
  const stages = [
    { label: "New Inquiry", color: "bg-sky-400", value: "₹2.8L" },
    { label: "Consultation", color: "bg-indigo-400", value: "₹4.2L" },
    { label: "Proposal", color: "bg-violet-400", value: "₹1.8L" },
  ];

  return (
    <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_28px_70px_rgba(2,8,23,0.28)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3">
        <div>
          <p className="text-xs font-semibold text-white">Sales pipeline</p>
          <p className="mt-0.5 text-[10px] text-blue-200">5 active opportunities</p>
        </div>
        <div className="rounded-lg bg-blue-500 px-2.5 py-1.5 text-[10px] font-semibold text-white">+ Deal</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {stages.map((stage, index) => (
          <div key={stage.label} className="rounded-xl border border-white/10 bg-[#f8faff] p-2.5 text-[#10214b] shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${stage.color}`}/>
              <span className="truncate text-[9px] font-bold">{stage.label}</span>
            </div>
            <p className="mt-2 text-xs font-bold">{stage.value}</p>
            <div className="mt-2.5 rounded-lg border border-slate-200 bg-white p-2">
              <div className={`${index === 1 ? "w-11" : "w-14"} h-1.5 rounded-full bg-slate-800`}/>
              <div className="mt-1.5 h-1 w-9 rounded-full bg-slate-200"/>
              <div className="mt-3 flex gap-1">
                <span className="h-3.5 w-7 rounded bg-blue-50"/>
                <span className="h-3.5 w-8 rounded bg-blue-50"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputField({ id, label, type = "text", value, onChange, placeholder, icon, autoComplete, error, action }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 flex items-center justify-between text-[13px] font-semibold text-slate-700">
        {label}
        {action}
      </span>
      <span className={`flex h-11 items-center gap-2.5 rounded-lg border bg-white px-3 transition ${error ? "border-red-300 ring-2 ring-red-50" : "border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"}`}>
        <Icon name={icon} className={`h-[17px] w-[17px] shrink-0 ${error ? "text-red-400" : "text-slate-400"}`}/>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </span>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function PasswordField({ id, label, value, onChange, placeholder, autoComplete, error, forgotPassword = false }) {
  const [visible, setVisible] = useState(false);
  const action = forgotPassword ? <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</button> : null;

  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 flex items-center justify-between text-[13px] font-semibold text-slate-700">
        {label}
        {action}
      </span>
      <span className={`flex h-11 items-center gap-2.5 rounded-lg border bg-white pl-3 pr-1.5 transition ${error ? "border-red-300 ring-2 ring-red-50" : "border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"}`}>
        <Icon name="lock" className={`h-[17px] w-[17px] shrink-0 ${error ? "text-red-400" : "text-slate-400"}`}/>
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-600">
          <Icon name={visible ? "eye-off" : "eye"} className="h-[17px] w-[17px]"/>
        </button>
      </span>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function validate(mode, fields, acceptedTerms) {
  const errors = {};
  if (mode === "register" && fields.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = "Enter a valid work email.";
  if (fields.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (mode === "register" && fields.confirmPassword !== fields.password) errors.confirmPassword = "Passwords do not match.";
  if (mode === "register" && !acceptedTerms) errors.terms = "Please accept the terms to continue.";
  return errors;
}

export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setFields((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate(mode, fields, acceptedTerms);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    if (isRegister) {
      window.localStorage.setItem("volymoly-demo-user", JSON.stringify({ name: fields.name.trim(), email: fields.email.trim() }));
    }
    window.setTimeout(() => router.push("/"), 650);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900 lg:grid lg:grid-cols-[minmax(420px,0.92fr)_minmax(560px,1.08fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#10214b] px-10 py-9 text-white lg:flex lg:flex-col xl:px-14 xl:py-11">
        <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"/>
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl"/>
        <div className="relative z-10">
          <BrandMark/>
        </div>

        <div className="relative z-10 my-auto max-w-xl py-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400"/>
            One workspace. Every opportunity.
          </span>
          <h1 className="mt-6 max-w-lg text-4xl font-bold leading-[1.15] tracking-[-0.035em] xl:text-[44px]">
            Turn every lead into your next great project.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-blue-100/80">
            Capture enquiries, qualify faster and keep every deal moving with a clear, collaborative CRM workflow.
          </p>

          <div className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
            {["Lead qualification", "Visual deal pipeline", "Activity follow-ups", "Team ownership"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-[13px] font-medium text-blue-50">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/25 text-blue-200"><Icon name="check" className="h-3 w-3"/></span>
                {item}
              </div>
            ))}
          </div>

          <ProductPreview/>
        </div>

        <p className="relative z-10 text-xs text-blue-200/65">© 2026 Volymoly. Built for high-performing teams.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-[440px]">
          <div className="mb-9 lg:hidden"><BrandMark compact/></div>

          <div className="mb-7">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon name={isRegister ? "user" : "lock"} className="h-5 w-5"/>
            </span>
            <h2 className="mt-5 text-[28px] font-bold tracking-[-0.025em] text-slate-950">{isRegister ? "Create your account" : "Welcome back"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isRegister ? "Set up your workspace and start managing opportunities." : "Sign in to continue to your CRM workspace."}
            </p>
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {isRegister && (
              <InputField id="name" label="Full name" value={fields.name} onChange={updateField("name")} placeholder="Enter your full name" icon="user" autoComplete="name" error={errors.name}/>
            )}
            <InputField id="email" label="Work email" type="email" value={fields.email} onChange={updateField("email")} placeholder="you@company.com" icon="mail" autoComplete="email" error={errors.email}/>
            <PasswordField id="password" label="Password" value={fields.password} onChange={updateField("password")} placeholder={isRegister ? "Create a strong password" : "Enter your password"} autoComplete={isRegister ? "new-password" : "current-password"} error={errors.password} forgotPassword={!isRegister}/>
            {isRegister && (
              <PasswordField id="confirmPassword" label="Confirm password" value={fields.confirmPassword} onChange={updateField("confirmPassword")} placeholder="Enter the password again" autoComplete="new-password" error={errors.confirmPassword}/>
            )}

            {isRegister ? (
              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-500">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => { setAcceptedTerms(event.target.checked); setErrors((current) => ({ ...current, terms: "" })); }} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"/>
                  <span>I agree to the <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">Terms of Service</button> and <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">Privacy Policy</button>.</span>
                </label>
                {errors.terms && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>}
              </div>
            ) : (
              <label className="flex w-fit cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-600">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-blue-600"/>
                Keep me signed in
              </label>
            )}

            <button type="submit" disabled={submitting} className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70">
              {submitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"/>{isRegister ? "Creating account…" : "Signing in…"}</>
              ) : (
                <>{isRegister ? "Create account" : "Sign in"}<Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/></>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200"/>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Secure access</span>
            <span className="h-px flex-1 bg-slate-200"/>
          </div>

          <p className="text-center text-sm text-slate-500">
            {isRegister ? "Already have an account?" : "New to Volymoly?"}{" "}
            <Link href={isRegister ? "/login" : "/register"} className="font-semibold text-blue-600 hover:text-blue-700">
              {isRegister ? "Sign in" : "Create an account"}
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-5 text-[11px] font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5"><Icon name="lock" className="h-3.5 w-3.5"/>Secure sign-in</span>
            <span className="h-1 w-1 rounded-full bg-slate-300"/>
            <span>Privacy protected</span>
          </div>
        </div>
      </section>
    </main>
  );
}
