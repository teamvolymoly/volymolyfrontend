"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./CompactLoginPanel.module.css";

function EyeIcon({ hidden = false }) {
  return hidden ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="m3 3 18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.2 2.8M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="15" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m10.2 12.8 7.3-7.3 2 2-1.8 1.8 1.3 1.3-2.2 2.2-1.3-1.3-3.1 3.1" />
    </svg>
  );
}

function BrandMark() {
  return (
    <div className={styles.brandLockup} aria-label="VolyMoly">
      <span className={styles.brandSymbol} aria-hidden="true">
        <span className={`${styles.brandCut} ${styles.brandCutOne}`} />
        <span className={`${styles.brandCut} ${styles.brandCutTwo}`} />
      </span>
      <span className={styles.brandWord}>VolyMoly</span>
    </div>
  );
}

export default function CompactLoginPanel() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage("Enter a valid email address to continue.");
      return;
    }

    if (!password) {
      setMessage("Enter your password to continue.");
      return;
    }

    setMessage("");
    setSubmitting(true);
    window.setTimeout(() => router.push("/"), 650);
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginPanel}>
        <div className={styles.loginPanelInner}>
          <BrandMark />

          <div className={styles.loginContent}>
            <div className={styles.loginHeading}>
              <h1>Welcome back</h1>
              <p>Sign in to continue to your VolyMoly workspace.</p>
            </div>

            <form className={styles.loginForm} onSubmit={submit} noValidate>
              <div className={styles.inputField}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage("");
                  }}
                  aria-label="Email address"
                />
              </div>

              <div className={`${styles.inputField} ${styles.passwordField}`}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  aria-label="Password"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.rememberOption}>
                  <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                  <span className={styles.checkboxUi} aria-hidden="true" />
                  <span>Remember me</span>
                </label>
                <button type="button" className={styles.linkButton}>Forgot password?</button>
              </div>

              {message && <div className={styles.formMessage} role="status">{message}</div>}

              <button type="submit" className={styles.loginButton} disabled={submitting}>
                {submitting ? "Logging in…" : "Log in"}
              </button>

              <div className={styles.orDivider}><span>OR</span></div>

              <button type="button" className={styles.ssoButton}>
                <KeyIcon />
                <span>Log in with SSO</span>
              </button>

              <p className={styles.adminHelp}>
                Need help? Contact admin at{" "}
                <a href="mailto:teamvolymoly@gmail.com">teamvolymoly@gmail.com</a>
              </p>
            </form>
          </div>

          <div className={styles.loginMeta}>
            <span>© 2026 VolyMoly</span>
            <span className={styles.metaDot}>•</span>
            <button type="button">Privacy</button>
            <span className={styles.metaDot}>•</span>
            <button type="button">Terms</button>
          </div>
        </div>
      </section>

      <aside className={styles.visualPanel} aria-label="VolyMoly brand panel" />
    </main>
  );
}
