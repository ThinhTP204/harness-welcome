"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, REGISTRATION_URL } from "@/lib/content";

const HEADER =
  "fixed inset-[0_0_auto] z-50 [transition:background-color_0.25s_ease,box-shadow_0.25s_ease] " +
  // data-scrolled do HeroMotion bật/tắt khi cuộn, data-open do state của menu.
  "data-[scrolled]:bg-paper data-[scrolled]:[box-shadow:0_1px_0_color-mix(in_srgb,var(--color-ink)_14%,transparent)] " +
  "data-[open]:bg-paper data-[open]:[box-shadow:0_1px_0_color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

const BAR =
  "flex items-center justify-between gap-4 h-18 px-(--gutter) " +
  "lg:grid lg:grid-cols-[1fr_auto_1fr] lg:h-(--header-h)";

const CTA =
  "inline-flex items-center gap-2 py-[10px] px-4 rounded-[12px_15px_11px_16px/15px_11px_16px_12px] bg-coral-deep text-paper text-[14px] font-semibold whitespace-nowrap [transition:transform_0.18s_ease,box-shadow_0.18s_ease] " +
  "lg:py-3 lg:px-[22px] lg:text-[16px]";

const NAV_LINK =
  "lg:py-2 lg:[background:linear-gradient(var(--color-coral),var(--color-coral))_left_bottom/0_2px_no-repeat] lg:[transition:background-size_0.2s_ease] lg:hover:[background-size:100%_2px]";

const TOGGLE_BAR = "block w-[22px] h-[2px] bg-current [transition:transform_0.2s_ease]";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={HEADER} data-site-header data-open={open || undefined}>
      <div className={BAR} data-anim="header">
        <a className="inline-flex items-center gap-[10px] font-display text-[21px] tracking-[0.01em] whitespace-nowrap" href="#top">
          <span className="w-[22px] h-[18px] bg-coral [clip-path:polygon(38%_0,100%_4%,62%_100%,0_96%)]" aria-hidden="true" />
          AI-SE — FA26
        </a>

        <nav className="hidden lg:flex lg:gap-[clamp(28px,3.4vw,52px)] lg:font-medium" aria-label="Điều hướng chính">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className={NAV_LINK} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:[justify-self:end]">
          {REGISTRATION_URL ? (
            <a
              className={`${CTA} hover:[transform:translateY(-2px)] hover:[box-shadow:0_6px_14px_rgb(18_62_70/22%)]`}
              href={REGISTRATION_URL}
            >
              Đăng ký
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <span className={`${CTA} cursor-default`}>Sắp mở đăng ký</span>
          )}

          <button
            type="button"
            className="grid place-content-center gap-[6px] w-11 h-11 text-ink cursor-pointer lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`${TOGGLE_BAR} in-data-[open]:[transform:translateY(4px)_rotate(45deg)]`} />
            <span className={`${TOGGLE_BAR} in-data-[open]:[transform:translateY(-4px)_rotate(-45deg)]`} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className="grid pt-1 pb-4 px-(--gutter) lg:hidden"
        aria-label="Điều hướng chính trên di động"
        hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} className="py-3 font-medium" href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
