"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, REGISTRATION_URL } from "@/lib/content";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-site-header data-open={open || undefined}>
      <div className={styles.bar} data-anim="header">
        <a className={styles.brand} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          AI-SE — FA26
        </a>

        <nav className={styles.nav} aria-label="Điều hướng chính">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {REGISTRATION_URL ? (
            <a className={styles.cta} href={REGISTRATION_URL}>
              Đăng ký
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <span className={`${styles.cta} ${styles.pending}`}>Sắp mở đăng ký</span>
          )}

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className={styles.panel} aria-label="Điều hướng chính trên di động" hidden={!open}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
