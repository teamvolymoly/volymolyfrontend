"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Icon({ name, className = "h-5 w-5" }) {
  const common = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6"/></svg>;
  if (name === "lock") return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2"/><path strokeLinecap="round" d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path strokeLinecap="round" d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>;
  if (name === "eye") return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
  if (name === "eye-off") return <svg {...common}><path strokeLinecap="round" d="m3 3 18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.2 2.8M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>;
  if (name === "key") return <svg {...common}><circle cx="8" cy="15" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="m10.2 12.8 7.3-7.3 2 2-1.8 1.8 1.3 1.3-2.2 2.2-1.3-1.3-3.1 3.1"/></svg>;
  if (name === "globe") return <svg {...common}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M3.5 12h17M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z"/></svg>;
  if (name === "chevron") return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m8 10 4 4 4-4"/></svg>;
  if (name === "google") return <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.7 4.7 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.6A10.1 10.1 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.9V7.4H3.1a10 10 0 0 0 0 9.2L6.5 14Z"/><path fill="#EA4335" d="M12 6a5.5 5.5 0 0 1 3.9 1.5l2.9-2.8A9.7 9.7 0 0 0 12 2a10.1 10.1 0 0 0-8.9 5.4l3.4 2.7A5.9 5.9 0 0 1 12 6Z"/></svg>;
  return null;
}

function Logo() {
  return (
    <Link href="/" aria-label="Volymoly home" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10214b] text-lg font-black text-white shadow-sm">V</span>
      <span><span className="block text-[15px] font-bold leading-4 text-slate-950">Volymoly</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">CRM Workspace</span></span>
    </Link>
  );
}

function TextInput({ id, type = "text", placeholder, icon, value, onChange, autoComplete, error }) {
  return (
    <label htmlFor={id} className="block">
      <span className={`flex h-[54px] items-center gap-3 rounded-md border bg-white px-4 transition-colors ${error ? "border-red-300 ring-2 ring-red-50" : "border-slate-200 focus-within:border-blue-500"}`}>
        <Icon name={icon} className={`h-[18px] w-[18px] shrink-0 ${error ? "text-red-400" : "text-slate-500"}`}/>
        <input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete} className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-500"/>
      </span>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function PasswordInput({ id, placeholder, value, onChange, autoComplete, error }) {
  const [visible, setVisible] = useState(false);
  return (
    <label htmlFor={id} className="block">
      <span className={`flex h-[54px] items-center gap-3 rounded-md border bg-white pl-4 pr-2 transition-colors ${error ? "border-red-300 ring-2 ring-red-50" : "border-slate-200 focus-within:border-blue-500"}`}>
        <Icon name="lock" className={`h-[18px] w-[18px] shrink-0 ${error ? "text-red-400" : "text-slate-500"}`}/>
        <input id={id} name={id} type={visible ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete} className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-500"/>
        <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} className="flex h-9 w-9 items-center justify-center rounded text-slate-400 hover:bg-slate-50 hover:text-slate-600"><Icon name={visible ? "eye-off" : "eye"} className="h-[17px] w-[17px]"/></button>
      </span>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function validate(mode, fields, acceptedTerms) {
  const errors = {};
  if (mode === "register" && fields.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (fields.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (mode === "register" && fields.confirmPassword !== fields.password) errors.confirmPassword = "Passwords do not match.";
  if (mode === "register" && !acceptedTerms) errors.terms = "Please accept the terms to continue.";
  return errors;
}

export default function AuthPanel({ mode = "login" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const [fields, setFields] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [remember, setRemember] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
    if (isRegister) window.localStorage.setItem("volymoly-demo-user", JSON.stringify({ name: fields.name.trim(), email: fields.email.trim() }));
    window.setTimeout(() => router.push("/"), 650);
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <header className="flex h-20 shrink-0 items-center justify-center px-5 sm:h-24"><Logo/></header>

      <section className="flex flex-1 flex-col items-center px-5 pb-10 pt-3 sm:pt-5">
        <div className="w-full max-w-[470px] text-center">
          <h1 className="text-[30px] font-bold tracking-[-0.025em] text-slate-950">{isRegister ? "Create account" : "Log in"}</h1>
          <p className="mt-2 text-sm text-slate-600">{isRegister ? "Create your account to continue" : "Please log in to continue"}</p>
        </div>

        <div className="mt-8 w-full max-w-[470px] rounded-sm border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-9">
          <form onSubmit={submit} noValidate className="space-y-5">
            {isRegister && <TextInput id="name" placeholder="Full name" icon="user" value={fields.name} onChange={updateField("name")} autoComplete="name" error={errors.name}/>}
            <TextInput id="email" type="email" placeholder="Email" icon="mail" value={fields.email} onChange={updateField("email")} autoComplete="email" error={errors.email}/>
            <PasswordInput id="password" placeholder="Password" value={fields.password} onChange={updateField("password")} autoComplete={isRegister ? "new-password" : "current-password"} error={errors.password}/>
            {isRegister && <PasswordInput id="confirmPassword" placeholder="Confirm password" value={fields.confirmPassword} onChange={updateField("confirmPassword")} autoComplete="new-password" error={errors.confirmPassword}/>}

            {isRegister && (
              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-600"><input type="checkbox" checked={acceptedTerms} onChange={(event) => { setAcceptedTerms(event.target.checked); setErrors((current) => ({ ...current, terms: "" })); }} className="mt-0.5 h-5 w-5 rounded border-slate-300 accent-blue-600"/><span>I agree to the <button type="button" className="font-semibold text-blue-600">Terms of Service</button> and <button type="button" className="font-semibold text-blue-600">Privacy Policy</button>.</span></label>
                {errors.terms && <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.terms}</p>}
              </div>
            )}

            <button type="submit" disabled={submitting} className="flex h-[54px] w-full items-center justify-center rounded-md bg-blue-600 px-4 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70">
              {submitting ? (isRegister ? "Creating account…" : "Logging in…") : (isRegister ? "Create account" : "Log in")}
            </button>

            {!isRegister && (
              <>
                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[13px] text-slate-700"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-5 w-5 rounded border-slate-300 accent-blue-600"/>Remember me</label>
                <button type="button" className="mx-auto block text-[13px] text-slate-500 hover:text-blue-600">Forgot password?</button>
              </>
            )}
          </form>

          <div className="my-8 flex items-center gap-4"><span className="h-px flex-1 bg-slate-200"/><span className="text-xs font-semibold text-slate-500">or access quickly</span><span className="h-px flex-1 bg-slate-200"/></div>
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" className="flex h-11 items-center justify-center gap-2 rounded border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"><Icon name="google" className="h-[18px] w-[18px]"/>Google</button>
            <button type="button" className="flex h-11 items-center justify-center gap-2 rounded border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"><Icon name="key" className="h-[17px] w-[17px]"/>SSO</button>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-slate-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link href={isRegister ? "/login" : "/register"} className="font-semibold text-blue-600 hover:text-blue-700">{isRegister ? "Log in" : "Create account"}</Link>
        </p>
      </section>

      <footer className="shrink-0 px-6 pb-7 pt-3 text-xs text-slate-500 sm:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"><Icon name="globe" className="h-[18px] w-[18px]"/>English (US)<Icon name="chevron" className="h-4 w-4"/></button>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1"><span>© 2026 Volymoly</span><span className="text-slate-300">|</span><button type="button">Terms of Service</button><span className="text-slate-300">|</span><button type="button">Privacy Policy</button></div>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end"><div className="flex gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 font-bold text-slate-500">f</span><span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 font-bold text-slate-500">in</span></div><span>Volymoly is a Web-based Sales CRM.</span></div>
        </div>
      </footer>
    </main>
  );
}
